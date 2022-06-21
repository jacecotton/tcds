import Toggleable from "@tcds/components/Toggleable.js";

// Attach component.
document.querySelectorAll("[data-component=Notification]").forEach((instance) => {
  instance && new Toggleable(instance, {
    openOnload: true,
    target: instance.querySelector(".Notification__content"),
    closeOnClickOutside: false,
    animation: { open: "expand-down", close: "collapse-up" },
  });
});
