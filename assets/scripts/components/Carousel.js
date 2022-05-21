import Tabs from "@tcds/components/Tabs.js";

/**
 * Carousel component.
 *
 * The Carousel extends the Tabs component because they're functionally the
 * same, with the Carousel just having a few added features and different
 * styling. Otherwise, it inherits its semantics and interaction (for example,
 * the "tab" buttons become indicator dots at the bottom).
 *
 * These added features include next/previous buttons, autoplay, and a
 * play/pause button. Additionally, since the Carousel "slides" between panels
 * (rather than instantly switching to them as with the Tabs component), it uses
 * horizontal scrolling with scroll snapping to enable "swiping".
 *
 * Because the Carousel extends the Tabs script, it inherits all the same
 * properties and methods, and therefore much of its vocabulary. However,
 * because of the slightly different user experience, there's slightly different
 * terminology:
 * 1. "tabs" or "tab buttons" become "indicator dots".
 * 2. "panels" or "tabpanels" become "slides".
 *
 * @property {object} props - Carousel settings.
 * @property {boolean} props.autoplay - Whether to automatically play the
 * Carousel as soon as it becomes visible.
 * @property {number} [props.interval=5000] - The time (in milliseconds) between
 * slide changes.
 */
export default class Carousel extends Tabs {
  constructor(element, props) {
    super(element, props);

    // Get DOM elements.
    this.controls = {
      next: this.element.querySelector("[data-action=next]"),
      previous: this.element.querySelector("[data-action=previous]"),
      playPause: this.element.querySelector("[data-action=play-pause]"),
      expandCollapse: this.element.querySelector("[data-action=expand-collapse]"),
    };

    /** Initialize state. */

    // Detect if reduced motion preference has been set, or if the device's
    // primary pointer does not "hover"...
    if(window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches === true) {
      // ...Do not play carousel by default.
      this.state.playing = false;
    } else {
      // If no reduced motion preference is set and the device's primary pointer
      // can hover, initialize playing state from autoplay prop (true/false).
      this.state.playing = this.props.autoplay;
    }

    // Set initial "expanded" state.
    this.state.expanded = false;

    /** Add event listeners and observers. */

    // Go to next tab and pause on next button click.
    this.controls.next.addEventListener("click", () => {
      this.state.activeTab = this.getNextTab();
      this.state.playing = false;
    });

    // Go to previous tab and pause on previous button click.
    this.controls.previous.addEventListener("click", () => {
      this.state.activeTab = this.getPreviousTab();
      this.state.playing = false;
    });

    // Toggle play state on play/pause button click.
    this.controls.playPause.addEventListener("click", () => {
      this.state.playing = !this.state.playing;
    });

    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Pause on tab button click.
        this.state.playing = false;
      });

      // Pause on tab button key press.
      tab.addEventListener("keydown", () => {
        this.state.playing = false;
      });
    });

    // Pause on touch.
    this.panelsContainer.addEventListener("touchstart", () => {
      this.state.playing = false;
    });

    // Temporarily pause on "enter" (hover or focus).
    this.panelsContainer.addEventListener("mouseenter", this.temporarilyPause.bind(this));
    this.panelsContainer.addEventListener("focusin", this.temporarilyPause.bind(this));

    // Resume on "exit".
    this.panelsContainer.addEventListener("mouseleave", this.resumeFromTemporaryPause.bind(this));
    this.panelsContainer.addEventListener("focusout", this.resumeFromTemporaryPause.bind(this));

    // Set up an intersection observer to pause the carousel when it's scrolled
    // out of view.
    const pauseWhenOutOfView = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the carousel is out of view and was playing...
        if(!entry.isIntersecting) {
          // Temporarily pause.
          this.temporarilyPause();
          this.isIntersecting = false;
        } else {
          // Otherwise, resume if pause was temporary.
          this.resumeFromTemporaryPause();
          this.isIntersecting = true;
        }
      });
    }, {
      threshold: .9,
    });

    // Attach intersection observer.
    pauseWhenOutOfView.observe(this.element);

    // Temporarily pause the carousel when the browser window becomes inactive.
    document.addEventListener("visibilitychange", () => {
      // If window is hidden...
      if(document.hidden === true) {
        // Temporarily pause.
        this.temporarilyPause();
      } else if(document.hidden === false && this.temporaryPause === true && this.isIntersecting !== false) {
        // If the window returns to active, the last pause was temporary, and
        // the carousel is not scrolled out of view, resume the carousel.
        requestAnimationFrame(() => {
          this.resumeFromTemporaryPause();
        });
      }
    }, false);

    // Support swiping between slides (horizontal scrolling with scroll
    // snapping).
    const switchSlideOnSwipe = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the current slide was scrolled to...
        if(entry.isIntersecting && this.state.expanded !== true) {
          // Set the associated tab (indicator) as active.
          this.state.activeTab = this.element.querySelector(`[role=tab][aria-controls=${entry.target.id}]`);
        }
      });
    }, {
      // The container of the slides is the scrollable (i.e. "swipable") area.
      root: this.panelsContainer,
      // Don't switch active state until scrolled-to slide is 100% intersecting.
      threshold: 1.0,
      rootMargin: "1px",
    });

    this.panelsContainer.addEventListener("mouseenter", () => {
      // Attach intersection observer on each slide (panel).
      this.panels.forEach((panel) => {
        switchSlideOnSwipe.observe(panel);
      });
    });

    this.panelsContainer.addEventListener("mouseleave", () => {
      this.panels.forEach((panel) => {
        switchSlideOnSwipe.unobserve(panel);
      });
    });

    // Expand/collapse carousel on expand/collapse button click.
    this.controls.expandCollapse.addEventListener("click", () => {
      this.state.playing = false;
      this.state.expanded = !this.state.expanded;
    });
  }

  // Update DOM after state change.
  sync() {
    // Components that extend other components need to call the parent
    // component's `sync` from its own `sync` function.
    super.sync();

    return {
      // Handler for `activeTab` state change.
      activeTab: () => {
        // For each state that's reused from the parent component, call the
        // associated callback.
        super.sync().activeTab();

        // Get the panel (slide) associated with the active tab (indicator).
        const activePanel = this.getPanelByTab(this.state.activeTab);

        // Get the number of pixels to the left of the panel container.
        const panelsContainerOffset = this.panelsContainer.getBoundingClientRect().left;
        // Get the number of pixels to the left of the active slide.
        const panelOffset = activePanel.getBoundingClientRect().left;

        // Scroll the panel container to the active slide.
        this.panelsContainer.scrollLeft += panelOffset - panelsContainerOffset;

        this.panels.forEach((panel) => {
          // Set attributes to communicate to screen readers based on whether
          // the panel is in view of the scrollport.
          panel.ariaHidden = panel === activePanel ? null : "true";
          panel.tabIndex = panel === activePanel ? null : "-1";
        });
      },

      // Handler for `playing` state change.
      playing: () => {
        // Indicate state for styling hook.
        this.element.setAttribute("data-playing", this.state.playing);

        // Change ARIA label and tooltip of the play/pause button according to
        // current state.
        this.controls.playPause.setAttribute("aria-label", this.state.playing ? "Pause carousel" : "Play carousel");
        this.controls.playPause.setAttribute("title", this.state.playing ? "Pause carousel" : "Play carousel");

        // Change the icon of the play/pause button according to current state.
        // @todo Don't hardcode the SVG here. Think of a way to pull it in from
        //   the icon library.
        this.controls.playPause.innerHTML = this.state.playing
          ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;

        // Indiciate whether the carousel is a "live region" according to its
        // current play state. Due to several interface elements having the
        // ability to change a panel (next/previous buttons, indicator dots,
        // scrolling, etc.), screen readers should announce slide changes
        // (`polite`) when the user triggers them. However, if the carousel is
        // playing, screen readers should not announce changes (`off`), as the
        // user is not triggering them and therefore not asking for updates.
        this.panelsContainer.setAttribute("aria-live", this.state.playing ? "off" : "polite");

        // If the carousel should be playing...
        if(this.state.playing === true) {
          // Initialize recursive cycle.
          this.playTimer = setTimeout(this.play.bind(this), this.props.interval);
        } else {
          // Otherwise, clear the cycle.
          clearTimeout(this.playTimer);
        }
      },

      // Handler for `expanded` state change.
      expanded: () => {
        // Indicate state.
        const label = this.state.expanded ? "Collapse carousel" : "Expand carousel";
        this.controls.expandCollapse.setAttribute("title", label);
        this.controls.expandCollapse.setAttribute("aria-label", label);
        this.controls.expandCollapse.setAttribute("aria-expanded", this.state.expanded);
        this.element.setAttribute("data-expanded", this.state.expanded);
        this.element.setAttribute("aria-roledescription", this.state.expanded ? "" : "carousel");

        // Hide all controls and indicators when expanded.
        this.tablist.hidden = this.state.expanded;
        this.controls.playPause.hidden = this.state.expanded;
        this.controls.next.hidden = this.state.expanded;
        this.controls.previous.hidden = this.state.expanded;

        this.panels.forEach((panel) => {
          panel.setAttribute("role", this.state.expanded ? "" : "tabpanel");
          panel.setAttribute("aria-roledescription", this.state.expanded ? "" : "slide");
        });

        if(this.state.expanded) {
          this.panelsContainer.removeAttribute("aria-live");

          this.panels.forEach((panel) => {
            panel.removeAttribute("aria-hidden");
            panel.removeAttribute("tabindex");
          });
        } else {
          // Call `activeTab` callback to add other attributes that are
          // state-based.
          this.sync().activeTab();
        }
      },
    };
  }

  // A recursive function to continually play the Carousel until the contained
  // timeout is cleared.
  play() {
    if(this.state.playing === true) {
      this.state.activeTab = this.getNextTab();
      this.playTimer = setTimeout(this.play.bind(this), this.props.interval);
    }
  }

  // Temporarily pause the carousel due to some navigation event (hovering,
  // focusing, scrolling away, clicking off the browser window, etc.)
  temporarilyPause() {
    if(this.state.playing === true) {
      this.state.playing = false;
      // Flag pause as temporary.
      this.temporaryPause = true;
    }
  }

  // Resume the carousel if the last pause was temporary.
  resumeFromTemporaryPause() {
    if(this.temporaryPause === true) {
      this.state.playing = true;
      // Reset "temporary" flag.
      this.temporaryPause = null;
    }
  }
}

window.addEventListener("load", () => {
  // Attach component.
  document.querySelectorAll("[data-component=Carousel]").forEach((instance) => {
    instance && new Carousel(instance, {
      interval: parseInt(instance.getAttribute("data-interval")) || 5000,
      // Returns a boolean based on the how the string value compares to the
      // equality condition.
      autoplay: instance.getAttribute("data-autoplay") === "true",
      // We'll handle visibility separately, so disable `[hidden]` attribute
      // from being added by the parent Tabs script.
      keepPanelVisibility: true,
    });
  });
});
