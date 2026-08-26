/**
 * Pause any media inside a subtree that is about to be hidden (dialog closed,
 * carousel slide deactivated, tab panel switched, etc.), and optionally restore
 * it when the subtree becomes visible again.
 *
 * Handles:
 * - <video> / <audio> -> native pause()
 * - YouTube iframes   -> postMessage (requires enablejsapi=1 in the src)
 * - Vimeo iframes     -> postMessage (no extra params needed)
 * - any other iframe  -> detach src to about:blank, restore later
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
  "youtu.be",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
]);

const VIMEO_HOSTS = new Set(["player.vimeo.com"]);

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

function pauseHtmlMedia(el, {remember, respectPictureInPicture, respectFullscreen}) {
  if (respectPictureInPicture && document.pictureInPictureElement === el) {
    // The user explicitly popped this out; it is no longer "inside" the
    // component in any meaningful sense.
    return "skipped:pip";
  }

  if (respectFullscreen && document.fullscreenElement === el) {
    return "skipped:fullscreen";
  }

  if (el.paused) return "noop:already-paused";
  if (remember) el.dataset.autopauseResume = "true";

  el.pause();

  return "paused:native";
}

function pauseIframe(el, {remember}) {
  const url = iframeUrl(el);
  if (!url) return "noop:no-src";

  if (YOUTUBE_HOSTS.has(url.hostname)) {
    // The player only listens once it has loaded and only if enablejsapi=1 was
    // in the URL at load time. Without the flag the message is silently
    // dropped, so fall through to detaching instead.
    if (url.searchParams.get("enablejsapi") === "1") {
      const sent = post(
        el,
        url.origin,
        JSON.stringify({event: "command", func: "pauseVideo", args: []}),
      );

      if (sent) return "paused:youtube-api";
    }
  } else if (VIMEO_HOSTS.has(url.hostname)) {
    const sent = post(el, url.origin, JSON.stringify({method: "pause"}));
    if (sent) return "paused:vimeo-api";
  }

  // Fallback: release the embed entirely. Going to about:blank rather than
  // reassigning the same URL means we don"t pay for a reload while hidden.
  if (el.dataset.autopauseSrc) return "noop:already-detached";
  el.dataset.autopauseSrc = url.href;
  if (remember) el.dataset.autopauseResume = "true";
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
 * @param {boolean} [options.respectPictureInPicture=true]
 * @param {boolean} [options.respectFullscreen=true]
 * @returns {Array<{element: Element, result: string}>} for logging/tests
 */
export function pauseMedia(root = document, options = {}) {
  const opts = {
    deep: true,
    remember: true,
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

    results.push({ element: el, result });
  }

  return results;
}

/**
 * Undo pauseMedia() for a subtree that is becoming visible again.
 *
 * @param {Element|Document|ShadowRoot} root
 * @param {object} [options]
 * @param {boolean} [options.deep=true]
 * @param {boolean} [options.resume=false]
 */
export function restoreMedia(root = document, options = {}) {
  const {deep = true, resume = false} = options;
  const results = [];

  for (const el of collectMedia(root, deep)) {
    const shouldResume = resume && el.dataset.autopauseResume === "true";
    delete el.dataset.autopauseResume;

    if (el.tagName.toLowerCase() === "iframe") {
      const src = el.dataset.autopauseSrc;

      if (!src) {
        results.push({element: el, result: "noop:not-detached"});
        continue;
      }

      delete el.dataset.autopauseSrc;

      el.setAttribute("src", shouldResume ? src : stripAutoplay(src));
      results.push({ element: el, result: "restored:reattached" });

      continue;
    }

    if (!shouldResume) {
      results.push({ element: el, result: "noop:left-paused" });
      continue;
    }

    // play() rejects with NotAllowedError when autoplay policy blocks it, and
    // with AbortError if something pauses it again before the promise settles.
    // Neither is actionable here, but an unhandled rejection is noisy.
    const p = el.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
    results.push({element: el, result: "restored:playing"});
  }
  return results;
}

/**
 * Add enablejsapi=1 to YouTube embeds so they can be paused without a teardown.
 */
export function prepareMedia(root = document, {deep = true} = {}) {
  for (const el of collectMedia(root, deep)) {
    if (el.tagName.toLowerCase() !== "iframe") continue;
    if (el.dataset.autopausePrepared === "true") continue;

    const url = iframeUrl(el);
    if (!url || !YOUTUBE_HOSTS.has(url.hostname)) continue;

    el.dataset.autopausePrepared = "true";
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
