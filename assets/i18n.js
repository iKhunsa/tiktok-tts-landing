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
  var base = location.pathname.indexOf("/en/") !== -1 ? "../" : "";

  fetch(base + "i18n/" + lang + ".json")
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
})();
