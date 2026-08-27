/**
 * Pause any media inside a subtree that is about to be hidden (dialog closed,
 * carousel slide deactivated, tab panel switched, etc.), and restore it when
 * the subtree becomes visible again.
 *
 * Handles:
 * - <video> / <audio> -> native pause()
 * - YouTube iframes   -> postMessage (requires enablejsapi=1 in the src)
 * - Vimeo iframes     -> postMessage (no extra params needed)
 * - any other iframe  -> detach src to about:blank, restore later
 *
 * Autoplaying, looped, muted media is read as decorative background video and
 * resumes on its own. Everything else stays paused unless `resume` is passed,
 * so nothing with a soundtrack restarts without the caller asking for it.
 *
 * State is stored in data-* attributes rather than a WeakMap so it survives
 * cloneNode()/innerHTML round-trips and is visible in devtools.
 */

const BLANK = "about:blank";
const MEDIA_SELECTOR = "video, audio, iframe";
const OPT_OUT_SELECTOR = `[data-autopause="off"]`;

const YOUTUBE_HOSTS = new Set([
  "www.youtube.com",
  "youtube.com",
  "m.youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
]);

const VIMEO_HOSTS = new Set(["player.vimeo.com"]);

const YOUTUBE_PAUSE = JSON.stringify({event: "command", func: "pauseVideo", args: []});
const YOUTUBE_PLAY = JSON.stringify({event: "command", func: "playVideo", args: []});
const VIMEO_PAUSE = JSON.stringify({method: "pause"});
const VIMEO_PLAY = JSON.stringify({method: "play"});

/**
 * postMessage sent before a player has registered its own listener is dropped
 * with no acknowledgement, so the iframe's load event stands in for readiness.
 * A frame that finished loading before prepareMedia() saw it is never marked
 * and takes the detach path instead: slower, but always correct.
 */
const trackedFrames = new WeakSet();
const readyFrames = new WeakSet();

function trackReadiness(iframe) {
  if (trackedFrames.has(iframe)) return;

  trackedFrames.add(iframe);

  iframe.addEventListener("load", () => {
    if (iframe.getAttribute("src") === BLANK) readyFrames.delete(iframe);
    else readyFrames.add(iframe);
  });
}

function collectMedia(root, deep, found = new Set()) {
  if (!root) return found;

  if (typeof root.matches === "function" && root.matches(MEDIA_SELECTOR)) {
    found.add(root);
  }

  if (typeof root.querySelectorAll !== "function") return found;

  for (const el of root.querySelectorAll(MEDIA_SELECTOR)) found.add(el);

  if (deep) {
    for (const el of root.querySelectorAll("*")) {
      if (el.shadowRoot) collectMedia(el.shadowRoot, deep, found);
    }
  }

  return found;
}

/**
 * closest() deliberately stops at the shadow boundary — an opt-out on a host
 * element does not silently disable autopause for everything inside it.
 */
function isOptedOut(el) {
  return typeof el.closest === "function" && el.closest(OPT_OUT_SELECTOR) !== null;
}

function iframeUrl(iframe) {
  const raw = iframe.getAttribute("src");

  if (!raw || raw === BLANK) return null;

  try {
    // Resolves protocol-relative and relative URLs.
    return new URL(raw, document.baseURI);
  } catch {
    return null;
  }
}

function post(iframe, origin, payload) {
  try {
    if (!iframe.contentWindow) return false;
    // Target the embed's own origin rather than "*" so the command isn't
    // readable by an unrelated document that happens to be loaded there.
    iframe.contentWindow.postMessage(payload, origin);
    return true;
  } catch {
    return false;
  }
}

function stripAutoplay(href) {
  try {
    const url = new URL(href, document.baseURI);
    url.searchParams.delete("autoplay");
    url.searchParams.delete("autostart"); // some third-party players
    return url.href;
  } catch {
    return href;
  }
}

/**
 * Decorative background video: no soundtrack to interrupt and no end to reach,
 * so restarting it can't surprise anyone. `muted` is read live rather than from
 * the attribute, so anything unmuted at runtime loses the exemption.
 */
function isBackgroundMedia(el) {
  return el.autoplay && el.loop && el.muted;
}

function isBackgroundEmbed(url) {
  const params = url.searchParams;

  if (params.get("background") === "1") return true; // Vimeo background mode

  return params.get("autoplay") === "1"
    && params.get("loop") === "1"
    && (params.get("mute") === "1" || params.get("muted") === "1");
}

/**
 * Whether an earlier pauseMedia() already recorded this element. Bailing out on
 * it keeps the first scope to pause something as its owner, which is what makes
 * nested scopes restore correctly.
 */
function isHandled(el) {
  return el.dataset.autopauseResume !== undefined
    || el.dataset.autopauseOwner !== undefined;
}

function mark(el, {remember, owner}, background) {
  if (remember) el.dataset.autopauseResume = background ? "auto" : "true";
  if (owner) el.dataset.autopauseOwner = owner;
}

function playEmbed(el) {
  const url = iframeUrl(el);

  if (!url || !readyFrames.has(el)) return false;
  if (YOUTUBE_HOSTS.has(url.hostname)) return post(el, url.origin, YOUTUBE_PLAY);
  if (VIMEO_HOSTS.has(url.hostname)) return post(el, url.origin, VIMEO_PLAY);

  return false;
}

function pauseHtmlMedia(el, opts) {
  if (opts.respectPictureInPicture && document.pictureInPictureElement === el) {
    // The user explicitly popped this out; it is no longer "inside" the
    // component in any meaningful sense.
    return "skipped:pip";
  }

  if (opts.respectFullscreen && document.fullscreenElement === el) {
    return "skipped:fullscreen";
  }

  if (isHandled(el)) return "noop:already-paused";

  const background = isBackgroundMedia(el);

  // Background video a frame into page load has often not started yet, and
  // returning here would leave it free to start once we've walked away.
  if (el.paused && !background) return "noop:already-paused";

  mark(el, opts, background);
  el.pause();

  return "paused:native";
}

function pauseIframe(el, opts) {
  const url = iframeUrl(el);

  if (!url) return "noop:no-src";
  if (isHandled(el)) return "noop:already-paused";

  const background = isBackgroundEmbed(url);
  const youtube = YOUTUBE_HOSTS.has(url.hostname);

  // Both APIs ignore commands sent before the player loads, and YouTube's also
  // needs enablejsapi=1 to have been in the URL at load time. Neither reports
  // failure, so anything unconfirmed falls through to detaching.
  if (readyFrames.has(el)) {
    if (youtube && url.searchParams.get("enablejsapi") === "1") {
      if (post(el, url.origin, YOUTUBE_PAUSE)) {
        mark(el, opts, background);
        return "paused:youtube-api";
      }
    } else if (VIMEO_HOSTS.has(url.hostname)) {
      if (post(el, url.origin, VIMEO_PAUSE)) {
        mark(el, opts, background);
        return "paused:vimeo-api";
      }
    }
  }

  // Fallback: release the embed entirely. Going to about:blank rather than
  // reassigning the same URL means we don't pay for a reload while hidden.
  readyFrames.delete(el);
  el.dataset.autopauseSrc = url.href;
  mark(el, opts, background);
  el.setAttribute("src", BLANK);

  return "paused:detached";
}

/**
 * Pause all media within `root`.
 *
 * @param {Element|Document|ShadowRoot} root
 * @param {object} [options]
 * @param {boolean} [options.deep=true]     descend into open shadow roots
 * @param {boolean} [options.remember=true] mark elements so restoreMedia() can
 *   resume them
 * @param {string} [options.owner=null]     tag whatever this call pauses, so a
 *   matching restoreMedia() leaves media paused by a nested scope alone
 * @param {boolean} [options.respectPictureInPicture=true]
 * @param {boolean} [options.respectFullscreen=true]
 * @returns {Array<{element: Element, result: string}>} for logging/tests
 */
export function pauseMedia(root = document, options = {}) {
  const opts = {
    deep: true,
    remember: true,
    owner: null,
    respectPictureInPicture: true,
    respectFullscreen: true,
    ...options,
  };

  const results = [];

  for (const el of collectMedia(root, opts.deep)) {
    if (isOptedOut(el)) {
      results.push({element: el, result: "skipped:opt-out"});
      continue;
    }

    const tag = el.tagName.toLowerCase();

    const result = tag === "iframe"
      ? pauseIframe(el, opts)
      : pauseHtmlMedia(el, opts);

    results.push({element: el, result});
  }

  return results;
}

/**
 * Undo pauseMedia() for a subtree that is becoming visible again. Background
 * video restarts either way; `resume` additionally restarts media that was
 * playing under its own steam when it was paused.
 *
 * @param {Element|Document|ShadowRoot} root
 * @param {object} [options]
 * @param {boolean} [options.deep=true]
 * @param {boolean} [options.resume=false]
 * @param {string} [options.owner=null] only touch media tagged with this owner
 */
export function restoreMedia(root = document, options = {}) {
  const {deep = true, resume = false, owner = null} = options;
  const results = [];

  for (const el of collectMedia(root, deep)) {
    // Media paused by a nested scope belongs to that scope; it stays paused
    // until the scope that owns it decides otherwise.
    if (owner && el.dataset.autopauseOwner !== owner) {
      results.push({element: el, result: "skipped:other-owner"});
      continue;
    }

    const flag = el.dataset.autopauseResume;
    const shouldResume = flag === "auto" || (resume && flag === "true");

    delete el.dataset.autopauseOwner;
    delete el.dataset.autopauseResume;

    if (el.tagName.toLowerCase() === "iframe") {
      const src = el.dataset.autopauseSrc;

      // No stored src means it was paused over postMessage and is still
      // loaded, so it only needs telling to start again.
      if (!src) {
        const played = shouldResume && playEmbed(el);
        results.push({element: el, result: played ? "restored:playing" : "noop:not-detached"});
        continue;
      }

      delete el.dataset.autopauseSrc;
      el.setAttribute("src", shouldResume ? src : stripAutoplay(src));
      results.push({element: el, result: "restored:reattached"});

      continue;
    }

    if (!shouldResume) {
      results.push({element: el, result: "noop:left-paused"});
      continue;
    }

    // play() rejects with NotAllowedError when autoplay policy blocks it, and
    // with AbortError if something pauses it again before the promise settles.
    // Neither is actionable here, but an unhandled rejection is noisy.
    const played = el.play();
    if (played && typeof played.catch === "function") played.catch(() => {});
    results.push({element: el, result: "restored:playing"});
  }

  return results;
}

/**
 * Add enablejsapi=1 to YouTube embeds so they can be paused without a teardown,
 * and start watching provider iframes for readiness. Rewriting src reloads the
 * iframe, so this has to run before anything can be playing.
 */
export function prepareMedia(root = document, {deep = true} = {}) {
  for (const el of collectMedia(root, deep)) {
    if (el.tagName.toLowerCase() !== "iframe") continue;

    const url = iframeUrl(el);
    if (!url) continue;

    const youtube = YOUTUBE_HOSTS.has(url.hostname);
    if (!youtube && !VIMEO_HOSTS.has(url.hostname)) continue;

    trackReadiness(el);

    if (el.dataset.autopausePrepared === "true") continue;
    el.dataset.autopausePrepared = "true";

    if (!youtube) continue;
    if (url.searchParams.get("enablejsapi") === "1") continue;

    url.searchParams.set("enablejsapi", "1");
    // YouTube uses this to validate the postMessage sender.
    url.searchParams.set("origin", window.location.origin);
    el.setAttribute("src", url.href);
  }
}

/**
 * Safety net for components built on native state (<dialog>, popover,
 * <details>), where a consumer can change state without going through your API
 * — dialog.close(), el.hidePopover(), details.open = false, or the Esc key.
 *
 * `close` and `toggle` do not bubble, but non-bubbling events still travel
 * through the capture phase, so a capturing listener on the document sees them.
 *
 * @returns {() => void} teardown
 */
export function observeNativeDisclosures(scope = document, options = {}) {
  const onClose = (event) => {
    const target = event.target;
    if (target instanceof HTMLDialogElement) pauseMedia(target, options);
  };

  const onToggle = (event) => {
    const target = event.target;
    // Popover: event has oldState/newState. <details>: check .open.
    if (event.newState === "closed") {
      pauseMedia(target, options);
    } else if (target instanceof HTMLDetailsElement && !target.open) {
      pauseMedia(target, options);
    }
  };

  scope.addEventListener("close", onClose, true);
  scope.addEventListener("toggle", onToggle, true);

  return () => {
    scope.removeEventListener("close", onClose, true);
    scope.removeEventListener("toggle", onToggle, true);
  };
}
