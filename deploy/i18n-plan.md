# Plan de migración a i18n (JSON + JS)

Decisión del usuario (2026-09-09): migrar a i18n client-side aunque implique coste SEO.

## Por qué no se hizo en una pasada

La web son 32 páginas HTML hechas a mano, sin build. La migración no es mecánica:

1. **Header/footer NO son idénticos entre ES y EN.** Ejemplos reales:
   - ES nav tiene link `Releases`; EN no.
   - EN nav tiene `Roadmap`; ES no.
   - `aria-label="Secciones"` (ES) vs `"Sections"` (EN).
   - En subpáginas los anchors son `index.html#features`; en `index.html` son `#features`.
   Unificar en un fragmento compartido es un proyecto de normalización, no un extract.

2. **Párrafos con `<span style>` inline.** No se pueden migrar con `textContent`
   (borra los spans). Hay que keyear el fragmento HTML entero (`innerHTML`).

3. **Riesgo.** El sitio hoy está limpio y rankea. Media migración = sitio roto.

## Arquitectura propuesta

```
i18n/
  es.json        # única fuente de verdad de los textos ES
  en.json        # id. EN
assets/i18n.js   # loader: fetch i18n/<lang>.json, aplica [data-i18n] (innerHTML)
                 # y [data-i18n-attr="alt:key,content:key"] (atributos)
```

`i18n.js` (ya diseñado, ~25 líneas, sin dependencias):
- lang desde `document.documentElement.lang`
- base `../` si el path incluye `/en/`
- claves con dot-notation (`hero.title`)
- si el fetch falla, deja el texto server-rendered (no rompe sin JS)

## Orden de ejecución (una sesión enfocada por bloque)

1. **Infra** — ✅ HECHO (2026-09-09). `assets/i18n.js` (loader, ~40 líneas, sin
   deps), `i18n/es.json` + `i18n/en.json`, `<script defer src="i18n.js">` wired en
   las 30 páginas de contenido antes de `script.js`. Verificado en navegador (ES
   y EN, sin errores de consola). Claves actuales: `nav.*` + `cta.download`.
2. **nav-drawer + header CTA** — ✅ HECHO. Los 8-9 links del `nav-drawer` y el
   botón "Descargar/Download" del header llevan `data-i18n`. Sin cambio visible
   (el JSON refleja el texto actual); a partir de ahora se editan en el JSON.
3. **Footer** — PENDIENTE. 4 columnas + intro + tagline. El footer EN tiene un
   `<p>` intro y link "Español" que el ES no → normalizar antes de keyear.
4. **Body de cada página** — PENDIENTE. 1 par por bloque, verificando en
   navegador. Los párrafos con `<span style>` se keyean como fragmento HTML
   (el loader usa `innerHTML`, no `textContent`).

## Coste aceptado

- Contenido pasa a vivir en JS → peor indexación de las landings SEO.
- +1 request JSON por página.
- Se mantiene el split de archivos ES/EN (URLs y hreflang intactos).
