// Pantheon of Scents — shared behaviour across all pages

(function () {
  'use strict';

  // ---------- Page transition (fade out before navigating, fade in on load) ----------
  // Entrance fade is handled purely by CSS (@keyframes pageFadeIn on body), so it
  // works even if this script fails to load. This script only adds the exit fade.
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href) return;

    // Skip: new-tab links, anchors, mailto/tel, and anything not a local .html page
    if (link.target === '_blank') return;
    if (href.charAt(0) === '#') return;
    if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
    if (/^https?:\/\//i.test(href)) return;

    // Respect modifier keys / middle click (let the browser handle new tab etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    e.preventDefault();
    document.body.classList.add('page-leaving');
    window.setTimeout(function () {
      window.location.href = href;
    }, 280);
  });

  // If the page is restored from the back/forward cache, make sure it's visible again
  window.addEventListener('pageshow', function (evt) {
    if (evt.persisted) {
      document.body.classList.remove('page-leaving');
    }
  });

  // ---------- Fragrance pyramid accordion (koleksi.html) ----------
  document.querySelectorAll('[data-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.classList.toggle('open', !expanded);
    });
  });
})();
