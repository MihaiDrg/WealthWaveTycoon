/* =====================================================================
   WealthWave Idle Tycoon — site behaviour
   Vanilla JS only. No dependencies.
   ===================================================================== */

(function () {
  "use strict";

  /* -------------------------------------------------------------------
     1. Footer year
     ------------------------------------------------------------------- */
  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* -------------------------------------------------------------------
     2. Mobile navigation toggle
     ------------------------------------------------------------------- */
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------------------------------------------------------------------
     3. Live "idle earnings" ticker — the hero's signature element.
        Mirrors the game's own tap-to-earn / passive-income loop: the
        number quietly climbs the same way a player's net worth would
        while the game runs in the background.
     ------------------------------------------------------------------- */
  var tickerEl = document.querySelector("[data-wealth-ticker]");

  if (tickerEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var value = 1284902;
    var formatter = new Intl.NumberFormat("en-US");

    tickerEl.textContent = "$" + formatter.format(value);

    setInterval(function () {
      // Small, semi-random passive tick — never jarring, always upward.
      value += Math.floor(80 + Math.random() * 340);
      tickerEl.textContent = "$" + formatter.format(value);
    }, 1400);
  } else if (tickerEl) {
    tickerEl.textContent = "$1,284,902";
  }

  /* -------------------------------------------------------------------
     4. Scroll-reveal for cards and sections
     ------------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(
    ".feature-card, .why-item, .gallery-frame, .mechanics-list li, .contact-card"
  );

  if ("IntersectionObserver" in window && revealTargets.length) {
    revealTargets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* -------------------------------------------------------------------
     5. Header shadow on scroll (subtle depth cue)
     ------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 8) {
          header.style.boxShadow = "0 12px 30px -18px rgba(0,0,0,0.6)";
        } else {
          header.style.boxShadow = "none";
        }
      },
      { passive: true }
    );
  }
})();
