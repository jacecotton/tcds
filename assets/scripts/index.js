/* eslint-disable no-unused-vars */
/**
 * Brings in each module for bundling. No configuration or scripting happens
 * here.
 */

import "./components/Accordion.js";
import "./components/Dialog.js";
import "./components/Header.js";
import "./components/Hero.js";
import "./components/MegaMenu.js";
import "./components/Notification.js";
import "./components/Tabs.js";
import "./components/Carousel.js";

if(!("container" in document.documentElement.style) && document.querySelectorAll(".is-self-responsive").length > 0) {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/container-query-polyfill/cqfill.iife.min.js";
  document.head.appendChild(script);
}
