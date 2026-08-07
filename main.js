/* The Pantheon of Scents — main.js
   1) Pyramid toggle: expands/collapses the "Lihat Piramida Aroma" panels on koleksi.html
   2) Scroll reveal: fades/lifts hub cards, product blocks, testimonials,
      contact & shipping cards into view as the user scrolls (skipped safely
      if JS never loads, and respects prefers-reduced-motion)
   3) Page-leave fade: uses the .page-leaving class already defined in style.css
      for a soft transition when navigating to another internal page
*/
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  /* ---------- 2. Scroll reveal for cards & product blocks ---------- */
  var revealEls = document.querySelectorAll(
    ".hub-card, .deity, .testimonial-card, .contact-card, .shipping-item"
  );
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach(function (el) {
        el.classList.add("reveal-init");
        io.observe(el);
      });
    }
  }

  /* ---------- 3. Smooth internal page transitions ---------- */
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
