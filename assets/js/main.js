/* ============================================================
   PORTFOLIO — Interactions & animations
   Aucune dépendance externe. Tout est commenté.
   ============================================================ */

(function () {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     1. THÈME (sombre / clair) — mémorisé dans le navigateur
     ---------------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = $("#theme-toggle");

  const getStoredTheme = () => {
    try {
      return localStorage.getItem("portfolio-theme");
    } catch {
      return null;
    }
  };

  const storeTheme = (theme) => {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* stockage indisponible (navigation privée) : on ignore */
    }
  };

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre"
      );
    }
    const themeColor = $('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#080b12" : "#f7f8fc");
  };

  applyTheme(getStoredTheme() || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    storeTheme(next);
  });

  /* ----------------------------------------------------------
     2. HEADER : fond au scroll + barre de progression
     ---------------------------------------------------------- */
  const header = $("#header");
  const progressBar = $("#scroll-progress-bar");
  const backToTop = $("#back-to-top");

  const onScroll = () => {
    const scrollY = window.scrollY;
    header?.classList.toggle("scrolled", scrollY > 10);
    backToTop?.classList.toggle("visible", scrollY > 600);

    if (progressBar) {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (scrollY / height) * 100 : 0;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  /* ----------------------------------------------------------
     3. MENU MOBILE
     ---------------------------------------------------------- */
  const menuToggle = $("#menu-toggle");
  const navLinks = $("#nav-links");

  const closeMenu = () => {
    header?.classList.remove("nav-open");
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Ouvrir le menu");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = header?.classList.toggle("nav-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  });

  navLinks?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  /* ----------------------------------------------------------
     4. LIEN DE NAVIGATION ACTIF SELON LA SECTION VISIBLE
     ---------------------------------------------------------- */
  const sections = $$("main section[id]");
  const navAnchors = $$(".nav-link");

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navAnchors.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* ----------------------------------------------------------
     5. ANIMATIONS D'APPARITION AU SCROLL
     ---------------------------------------------------------- */
  const revealElements = $$(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("revealed"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ----------------------------------------------------------
     6. COMPTEURS ANIMÉS (section chiffres clés)
     ---------------------------------------------------------- */
  const counters = $$("[data-count]");

  const animateCounter = (el) => {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    counters.forEach((el) => {
      el.textContent = `${el.dataset.count}${el.dataset.suffix || ""}`;
    });
  } else {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* ----------------------------------------------------------
     7. EFFET MACHINE À ÉCRIRE (rôle dans le hero)
     ---------------------------------------------------------- */
  const typewriter = $("#typewriter");
  const phrases = [
    "Développeur Backend / Fullstack PHP & Node.js",
    "API REST · gRPC · Microservices",
    "Symfony · Laravel · NestJS",
  ];

  if (typewriter && !prefersReducedMotion) {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const phrase = phrases[phraseIndex];
      typewriter.textContent = phrase.slice(0, charIndex);

      if (!deleting && charIndex < phrase.length) {
        charIndex += 1;
        setTimeout(type, 55);
      } else if (!deleting && charIndex === phrase.length) {
        deleting = true;
        setTimeout(type, 2200);
      } else if (deleting && charIndex > 0) {
        charIndex -= 1;
        setTimeout(type, 28);
      } else {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 350);
      }
    };

    typewriter.textContent = "";
    setTimeout(type, 600);
  }

  /* ----------------------------------------------------------
     8. FORMULAIRE DE CONTACT
     - Par défaut : ouvre le client mail de l'utilisateur.
     - Pour un envoi direct : ajoute data-endpoint="URL Formspree"
       sur la balise <form> (voir README).
     ---------------------------------------------------------- */
  const form = $("#contact-form");
  const statusEl = $("#form-status");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const setError = (field, message) => {
    const errorEl = $(`[data-error-for="${field.name}"]`);
    if (errorEl) errorEl.textContent = message;
    field.classList.toggle("error", Boolean(message));
    field.setAttribute("aria-invalid", message ? "true" : "false");
  };

  const validateField = (field) => {
    const value = field.value.trim();
    let message = "";

    if (!value) {
      message = "Ce champ est obligatoire.";
    } else if (field.name === "name" && value.length < 2) {
      message = "Indiquez au moins 2 caractères.";
    } else if (field.name === "email" && !emailPattern.test(value)) {
      message = "Adresse email invalide.";
    } else if (field.name === "subject" && value.length < 3) {
      message = "Le sujet est trop court.";
    } else if (field.name === "message" && value.length < 10) {
      message = "Décrivez votre projet en 10 caractères minimum.";
    }

    setError(field, message);
    return message === "";
  };

  if (form) {
    const fields = $$("input[required], textarea[required]", form);

    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.classList.contains("error")) validateField(field);
      });
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Piège anti-spam : un robot remplit ce champ caché
      if ($("#website", form)?.value) return;

      const isValid = fields.map(validateField).every(Boolean);

      if (!isValid) {
        statusEl.textContent = "Merci de corriger les champs en rouge.";
        statusEl.className = "form-status error";
        form.querySelector(".error")?.focus();
        return;
      }

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const subject = String(data.get("subject") || "").trim();
      const message = String(data.get("message") || "").trim();
      const endpoint = form.dataset.endpoint;

      const submitBtn = $('button[type="submit"]', form);
      const originalLabel = submitBtn?.innerHTML;

      try {
        if (endpoint) {
          // --- Envoi direct via un service (Formspree, Getform, etc.) ---
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Envoi en cours...";
          }

          const response = await fetch(endpoint, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: data,
          });

          if (!response.ok) throw new Error("Envoi impossible");

          statusEl.textContent = "Message envoyé ! Je vous réponds sous 24 h.";
          statusEl.className = "form-status success";
          form.reset();
        } else {
          // --- Solution sans back-end : ouverture du client mail ---
          const mailto = `mailto:contact@votre-email.com?subject=${encodeURIComponent(
            `[Portfolio] ${subject}`
          )}&body=${encodeURIComponent(
            `Nom : ${name}\nEmail : ${email}\n\n${message}`
          )}`;
          window.location.href = mailto;

          statusEl.textContent = "Votre logiciel de messagerie va s'ouvrir avec le message pré-rempli.";
          statusEl.className = "form-status success";
        }
      } catch {
        statusEl.textContent = "Oups, l'envoi a échoué. Écrivez-moi directement par email.";
        statusEl.className = "form-status error";
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (endpoint) submitBtn.innerHTML = originalLabel;
        }
      }
    });
  }

  /* ----------------------------------------------------------
     9. ANNÉE DANS LE PIED DE PAGE
     ---------------------------------------------------------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
