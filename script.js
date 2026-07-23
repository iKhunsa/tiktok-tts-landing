document.documentElement.classList.add("js");

// Año en el footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menú móvil
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (header && navToggle && navLinks) {
  const closeNav = () => {
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
  };

  navToggle.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
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
        el.textContent = "★ " + formatted;
      });
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
      const input = button.closest(".copy-row")?.querySelector("input");
      if (input) {
        input.select();
        copied = document.execCommand("copy");
        input.blur();
      }
    }

    button.textContent = copied ? "✓ Copiado" : "No se pudo copiar";
    button.classList.toggle("copied", copied);

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("copied");
    }, 1600);
  });
});

// Aparición suave al hacer scroll
const revealEls = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

// Toggle de creadores extra
const creatorsToggle = document.getElementById("creators-toggle");
if (creatorsToggle) {
  const extraCards = document.querySelectorAll(".creator-card--extra");
  const isEnglish = document.documentElement.lang === "en";
  const labels = isEnglish
    ? { more: "Show more creators", less: "Show fewer creators" }
    : { more: "Ver más creadores", less: "Ver menos creadores" };

  creatorsToggle.addEventListener("click", () => {
    const expanded = creatorsToggle.getAttribute("aria-expanded") === "true";
    extraCards.forEach((card) => {
      card.hidden = expanded;
      if (!expanded) card.classList.add("visible");
    });
    creatorsToggle.setAttribute("aria-expanded", String(!expanded));
    creatorsToggle.querySelector("span").textContent = expanded ? labels.more : labels.less;
  });
}
