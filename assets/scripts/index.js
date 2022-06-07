/* eslint-disable no-unused-vars */
/**
 * Brings in each module for bundling. No configuration or scripting happens
 * here.
 */

import Accordion from "./components/Accordion.js";
import Dialog from "./components/Dialog.js";
import "./components/Header.js";
import Hero from "./components/Hero.js";
import MegaMenu from "./components/MegaMenu.js";
import Notification from "./components/Notification.js";
import Tabs from "./components/Tabs.js";
import Carousel from "./components/Carousel.js";

if(!("container" in document.documentElement.style) && document.querySelectorAll(".is-self-responsive").length > 0) {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/container-query-polyfill/cqfill.iife.min.js";
  document.head.appendChild(script);
}
