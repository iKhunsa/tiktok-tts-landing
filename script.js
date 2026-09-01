document.documentElement.classList.add("js");

// --- Umami analytics (self-hosted en el VPS) -------------------------------
// Rellenar UMAMI_WEBSITE_ID con el ID del sitio creado en el panel de Umami
// (Settings > Websites > el sitio > Edit). Mientras tenga "__" no carga nada.
var UMAMI_SRC = "https://umami.tiklivetts.es/script.js";
var UMAMI_WEBSITE_ID = "84331c44-8dec-4ca4-8d81-e2fb6369738a";
if (UMAMI_WEBSITE_ID.indexOf("__") === -1) {
  var umamiScript = document.createElement("script");
  umamiScript.defer = true;
  umamiScript.src = UMAMI_SRC;
  umamiScript.setAttribute("data-website-id", UMAMI_WEBSITE_ID);
  document.head.appendChild(umamiScript);
}
// -------------------------------------------------------------------------

// Aparición suave al hacer scroll
const revealEls = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (revealEls.length) {
  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      observer.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }
}

// Menú desplegable
const navToggle = document.getElementById("nav-toggle");
const navDrawer = document.getElementById("nav-drawer");
const navGlyph = document.getElementById("nav-toggle-glyph");

if (navToggle && navDrawer) {
  const closeNav = () => {
    navDrawer.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    if (navGlyph) navGlyph.textContent = "≡";
  };

  navToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = navDrawer.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    if (navGlyph) navGlyph.textContent = open ? "×" : "≡";
  });

  navDrawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (!navDrawer.contains(event.target) && event.target !== navToggle) closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
}

// Conteo de estrellas del repo (siempre actualizado)
const starCountEls = document.querySelectorAll("[data-star-count]");
if (starCountEls.length) {
  fetch("https://api.github.com/repos/iKhunsa/tiktok-tts")
    .then((res) => (res.ok ? res.json() : null))
    .then((repo) => {
      if (!repo || typeof repo.stargazers_count !== "number") return;
      const formatted = new Intl.NumberFormat("en-US", {
        notation: "compact",
      }).format(repo.stargazers_count);
      starCountEls.forEach((el) => {
        el.textContent = formatted;
      });
    })
    .catch(() => {});
}

// Enlace directo a la última versión del instalador (siempre actualizado)
const downloadButtons = document.querySelectorAll("[data-latest-exe]");
if (downloadButtons.length) {
  fetch("https://api.github.com/repos/iKhunsa/tiktok-tts/releases/latest")
    .then((res) => (res.ok ? res.json() : null))
    .then((release) => {
      if (!release) return;
      const installer = (release.assets || []).find(
        (asset) => asset.name.endsWith(".exe")
      );
      if (installer) {
        downloadButtons.forEach((btn) => {
          btn.href = installer.browser_download_url;
        });
      }
      if (release.tag_name) {
        document.querySelectorAll("[data-release-version]").forEach((el) => {
          el.textContent = " · " + release.tag_name;
        });
      }
    })
    .catch(() => {});
}

// Copiar direcciones de donación
document.querySelectorAll(".copy-btn").forEach((button) => {
  const originalText = button.textContent.trim();

  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    let copied = false;

    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      const input = document.createElement("textarea");
      input.value = text;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      copied = document.execCommand("copy");
      document.body.removeChild(input);
    }

    button.textContent = copied ? "✓ Copiado" : "No se pudo copiar";

    setTimeout(() => {
      button.textContent = originalText;
    }, 1600);
  });
});
