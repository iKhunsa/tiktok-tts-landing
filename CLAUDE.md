# TikLive TTS landing — reglas del proyecto

## Paridad ES/EN obligatoria

Este sitio tiene versión española (raíz: `index.html`, `notas-de-parche.html`, `roadmap.html`, etc.) y versión inglesa (`en/index.html`, `en/patch-notes.html`, `en/roadmap.html`, etc.).

**Cada vez que se agregue, edite o elimine contenido en una página en español, hay que replicar el mismo cambio en su contraparte en inglés en la misma tarea — sin que el usuario lo tenga que pedir aparte.** Esto incluye:

- Agregar/quitar una sección, feature, item de roadmap, entrada de FAQ, post de blog, etc.
- Agregar/quitar un link en headers, `nav-drawer` o footer (`Recursos`/`Resources`).
- Cambios de diseño, layout o comportamiento (CSS/JS) de un componente compartido entre ambas versiones.
- Nuevas páginas: si se crea una página nueva en español, crear también su par en `en/` (traducida, con las mismas rutas relativas ajustadas a `en/`).

**Excepciones** (no requieren espejo automático, pero avisar si aplica):

- Copys puramente promocionales/redes de un idioma que no tengan equivalente directo.
- Fixes triviales de tipeo que no cambian significado.

**Mapeo de archivos ES → EN:**

| ES | EN |
|---|---|
| `index.html` | `en/index.html` |
| `notas-de-parche.html` | `en/patch-notes.html` |
| `preguntas-frecuentes.html` | `en/faq.html` |
| `blog.html` | `en/blog.html` |
| `roadmap.html` | `en/roadmap.html` |
| `privacidad.html` | `en/privacy.html` |
| `terminos.html` | `en/terms.html` |
| `creadores.html` | `en/creadores.html` |
| `epik.html` | `en/epik.html` *(noindex, landing privada por WhatsApp — no está linkeada en ningún nav/footer, ES ni EN)* |
| `tiklivetts-vs-tikfinity.html` | `en/tiklivetts-vs-tikfinity.html` |
| `tiklivetts-vs-tts-monster.html` | `en/tiklivetts-vs-tts-monster.html` |
| `tts-twitch-chat-en-voz-alta.html` | `en/twitch-chat-text-to-speech.html` |
| `tts-youtube-live-chat-en-voz-alta.html` | `en/youtube-live-chat-text-to-speech.html` |
| `leer-chat-tiktok-live-en-voz-alta.html` | `en/tiktok-live-chat-text-to-speech.html` |
| `unificar-chat-tiktok-twitch-youtube.html` | `en/unify-tiktok-twitch-youtube-chat.html` |
| `alertas-obs-gratis-regalos-seguidores.html` | `en/free-obs-alerts-gifts-followers.html` |

Rutas relativas: los archivos en `en/` referencian assets/estilos como `../assets/...`, `../styles.css`, `../script.js`; y a páginas hermanas dentro de `en/` con ruta directa (`roadmap.html`, no `../roadmap.html` — ese patrón `../` para hermanos es un bug preexistente en varias páginas, no replicarlo en contenido nuevo).

## Servidor de desarrollo local

Sitio estático (sin build, sin `package.json`). Se sirve con Python `http.server`, configurado en `.claude/launch.json`, puerto fijo **4173**, `autoPort: true` (si 4173 está ocupado por otra sesión, se asigna uno random — normal si hay varias sesiones de chat abiertas en paralelo).

El servidor no manda headers anti-caché: si el navegador (el del usuario o el mío) muestra contenido viejo después de editar un archivo, es caché del navegador, no del server — pedir hard refresh (Ctrl+Shift+R) o agregar un query param (`?v=2`) para bypasear caché, no reiniciar el server.
