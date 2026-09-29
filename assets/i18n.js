// i18n client-side, sin dependencias ni build.
// El HTML mantiene el texto server-rendered (SEO + funciona sin JS);
// i18n/<lang>.json es la fuente de verdad para editar y da paridad ES/EN.
//
// Uso en el HTML:
//   <a data-i18n="nav.features">Funciones</a>
//   <img data-i18n-attr="alt:meta.logoAlt">
// Claves con punto: get("nav.features").
(function () {
  "use strict";
  var lang = document.documentElement.lang === "en" ? "en" : "es";
  var base = new URL("../i18n/", document.currentScript.src).href;

  fetch(base + lang + ".json")
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (dict) {
      if (!dict) return;
      var get = function (k) {
        return k.split(".").reduce(function (o, p) {
          return o == null ? o : o[p];
        }, dict);
      };
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        var v = get(el.getAttribute("data-i18n"));
        if (v != null) el.innerHTML = v;
      });
      document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
        el.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
          var kv = pair.split(":");
          if (kv.length !== 2) return;
          var v = get(kv[1].trim());
          if (v != null) el.setAttribute(kv[0].trim(), v);
        });
      });
    })
    .catch(function () { /* deja el texto del HTML */ });

  if (lang === "en" && location.pathname.indexOf("/en/download/started/") !== -1) {
    var header = document.querySelector(".header");
    var home = header && header.querySelector(".home");
    if (home && !header.querySelector(".language")) {
      var actions = document.createElement("span");
      var language = document.createElement("a");
      actions.className = "header-actions";
      language.className = "language";
      language.href = "../../../download/started/";
      language.hreflang = "es";
      language.setAttribute("aria-label", "Ver en español");
      language.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3c2.5 2.6 4 5.8 4 9s-1.5 6.4-4 9c-2.5-2.6-4-5.8-4-9s1.5-6.4 4-9z"></path></svg>';
      actions.append(language, home);
      header.append(actions);
    }
  }
})();
