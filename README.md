# TikLive TTS Landing

Landing page estática para la app de escritorio [TikLive TTS](https://github.com/iKhunsa/tiktok-tts).

## Estructura

- `index.html` — landing en español (idioma principal)
- `en/` — versión en inglés (`index.html`, `blog.html`, `terms.html`, `privacy.html`)
- `blog.html`, `terminos.html`, `privacidad.html` — blog y páginas legales en español
- `robots.txt`, `sitemap.xml` — SEO
- `styles.css`, `script.js` — compartidos por todas las páginas

## Desarrollo

Abre `index.html` directamente en el navegador o sirve la carpeta con cualquier servidor estático:

```bash
python -m http.server 4173
```

Luego entra a `http://localhost:4173`.

## Publicación

El repo no necesita build. Puedes publicarlo en GitHub Pages, Vercel o Netlify usando la raíz del proyecto como directorio público.

**Al desplegar:** reemplaza el dominio placeholder (`https://ikhunsa.github.io/tiktok-tts-landing/`) en `sitemap.xml`, `robots.txt` y en las etiquetas `canonical`/`hreflang`/`og:url` de `index.html` y `en/index.html`.
