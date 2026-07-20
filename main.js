/* The Pantheon of Scents — main.js
   1) Pyramid toggle: expands/collapses the "Lihat Piramida Aroma" panels on koleksi.html
   2) Page-leave fade: uses the .page-leaving class already defined in style.css
      for a soft transition when navigating to another internal page
*/
(function () {
  "use strict";

  /* ---------- 1. Pyramid toggle (data-toggle buttons) ---------- */
  document.querySelectorAll("[data-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var isOpen = btn.getAttribute("aria-expanded") === "true";
      var panelId = btn.getAttribute("aria-controls");
      var panel = panelId ? document.getElementById(panelId) : null;

      btn.setAttribute("aria-expanded", String(!isOpen));
      if (panel) {
        panel.classList.toggle("open", !isOpen);
      }
    });
  });

  /* ---------- 2. Smooth internal page transitions ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    document.querySelectorAll("a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      var isInternalPage =
        href &&
        !href.startsWith("#") &&
        !href.startsWith("http") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        link.target !== "_blank";

      if (!isInternalPage) return;

      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.add("page-leaving");
        window.setTimeout(function () {
          window.location.href = href;
        }, 260);
      });
    });
  }
})();
