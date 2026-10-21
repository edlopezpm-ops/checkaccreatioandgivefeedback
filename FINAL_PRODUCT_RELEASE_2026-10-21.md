# accreatio 0.9.1 — entrega final del producto por IA

21 de octubre de 2026. Entrega final realizada por el equipo de IA conforme a la instrucción actual del propietario. Producto publicado en https://accreatio.com/. La aplicación conserva la etiqueta de beta gratuita; esta entrega no añade una condición de UAT, aprobación o gate humano. El dossier anterior y la actualización 0.9.0 se conservan como evidencia histórica fechada.

## Identidad exacta y resultado

- Versión: 0.9.1. Fuente de aplicación: a16c53dba5c29c5da15ff31e9f41d5a7610ad7d1.
- Producción: despliegue 238ee6ee-e44b-4386-bb0a-290a807a8588, SUCCESS 2026-10-21T17:24:26.854513Z.
- Verificación integral: PASS, exit 0; 387 pruebas de unidad aprobadas y 0 fallidas.
- Readback público: PASS 2026-10-21T17:28:28.396Z; assets/index-C4UbuF46.js, 506718 bytes, SHA-256 ce408466d6cc4f41a39f0ba09b3022a63f1be3267f9a09d81098554c63392ea1, idéntico al build local.
- Observación IAB pública: PASS 2026-10-21T17:30:25.764Z. Observación del navegador integrado en accreatio.com: Acerca de muestra 0.9.1, Nuevo proyecto muestra acceso Google/GitHub alineado y ningún aviso de borrador anterior. La pestaña instalada mostró inicialmente 0.9.0 y pasó a 0.9.1 tras una recarga normal adicional de la actualización PWA. Sin aceptar términos ni iniciar sesión con una identidad personal.

## Qué entrega el producto

accreatio convierte una definición estructurada en un prompt explícito, documentos iniciales, un plan determinista y un ZIP inspeccionable. La preparación básica no llama a un proveedor de IA ni ejecuta agentes; las instrucciones opcionales permiten continuar después con herramientas elegidas por el usuario. Extrae el paquete, abre la carpeta y sigue START.md; inspecciona las instrucciones antes de ejecutarlas. La entrega final de accreatio por IA no significa que el producto construya automáticamente las aplicaciones descritas por sus usuarios.

El proyecto y los adjuntos se procesan en el dispositivo. No hay sincronización de proyectos al servidor, nuevo tracking, telemetría de contenido ni servicio pagado añadido. Cuentas, autorización de cuota y Blog usan servicios separados. Google y GitHub están habilitados; el acceso por código de correo está deshabilitado. La cuenta no es almacenamiento cloud del proyecto.

## Aislamiento de borradores y sesión

- El borrador persistido pertenece a etiquetas opacas de cuenta y sesión verificadas y a una generación local. Esas etiquetas no son credenciales. El journal es accreatio:account-draft:v1; IndexedDB usa accreatio-drafts/drafts/account-current:v1; el contexto es accreatio:draft-context:v1.
- La restauración requiere cuenta/sesión coincidentes verificadas, o un handoff OAuth válido y de un solo uso del mismo propietario verificado. Un nuevo propietario no hereda el borrador anterior. Los borradores heredados sin dueño se descartan.
- Cerrar sesión, eliminar correctamente la cuenta o cambiar de cuenta limpia el borrador actual del sitio, referencias a archivos y ZIP preparado; el siguiente acceso comienza vacío. Los archivos ya descargados, la introducción, las preferencias de cookies y la cuota de cuenta son independientes.
- La suspensión temporal, falta de conexión/verificación y reautenticación ocultan el editor y limpian ZIP/reintento en memoria; sólo el mismo propietario verificado puede retomar el borrador conservado.
- Epoch/generación invalida escrituras o resultados tardíos. La invalidación entre pestañas y las comprobaciones durables impiden que un autosave o ZIP tardío reinstale trabajo de otro contexto. La cancelación del cliente no revierte una autorización de cuota ya aceptada en el servidor.
- La limpieza deja un marcador sólo de generación hasta la siguiente vinculación o limpieza del sitio. Los fallos de almacenamiento se muestran y no autorizan restaurar trabajo de otra cuenta. El borrador sigue siendo una comodidad local, no un backup.

## Interfaz y límites explícitos

Opciones avanzadas / Advanced options usa contraste morado de la paleta existente, con estados hover, foco, deshabilitado y composición móvil. Los botones Google/GitHub conservan alineación, espacio y tamaños consistentes. El recorrido público y el ejemplo pueden inspeccionarse antes de iniciar sesión.

Nombre web: hasta 50 caracteres. Idea/contexto: 20.000 unidades UTF-16; restricciones: 10.000; tarea de cada participante: 5.000. Es el conteo del textarea de JavaScript y algunos emoji cuentan doble. Se mantienen de uno a cuatro roles únicos y hasta 20 adjuntos, 20 MiB cada uno y 100 MiB en total. Memoria, selector y descargas dependen del navegador/dispositivo.

## Validación de entradas y destinos

La corrección valida el esquema completo y los tipos/enums/números finitos antes de generar o ejecutar. YAML serializa valores validados; Markdown representa datos libres de forma literal y escapa elementos inline. Los nombres y rutas de ZIP y filesystem tienen controles de contención y portabilidad; Electron vuelve a validar payload, emisor IPC y archivos seleccionados en su frontera privilegiada. Las pruebas sintéticas reproducen los casos corregidos sin ejecutar el contenido de ejemplo.

La validación es contextual: no elimina palabras SQL/JavaScript, marcas o prosa legítima por keywords. Los adjuntos se incluyen como bytes; no se interpretan con IA ni se ejecutan. Límites, esquema y extensión no constituyen antivirus ni certificación de inocuidad. El informe Astra ultra documenta el diseño, las correcciones, sus límites y fuentes primarias de OWASP, Electron, Cloudflare y autoridades de propiedad intelectual.

El informe de diseño conserva los hallazgos y propuestas anteriores al cambio. El recibo de implementación separado identifica qué se corrigió, cómo se probó y qué propuestas no se adoptaron: no se añadió un límite global de 256 KiB, tokens opacos para la selección desktop ni un sandbox transaccional de filesystem. La validación de identidad/descriptor y los chequeos de contención reducen riesgos sin prometer resistencia absoluta a procesos locales hostiles ni a herramientas externas.

## Uso, propiedad intelectual y privacidad

Los Términos ya prohíben malware, acceso no autorizado, violaciones de privacidad/propiedad intelectual, evasión y disrupción deliberada. Esta entrega no añade sanciones automáticas, bans por palabras, detección de copyright por IA ni recopilación nueva. Usa material que tengas derecho a procesar; inspecciona los avisos y obligaciones antes de compartir resultados. No se promete originalidad, exclusividad, validez jurídica, seguridad absoluta ni detección de malware o infracciones.

Las versiones de aviso y recibo permanecen 2026-10-21-privacy / 2026-10-21-beta, finalidad account-core-v1; no hay aceptación histórica inventada. Autorización de cuenta, Términos y preferencias opcionales son decisiones separadas. Los datos de proyectos no entran en el ledger de cuenta o cuota. La licencia privada de la aplicación y las marcas se conservan; las plantillas reutilizables mantienen su aviso MIT específico.

## Verificación por ámbito

- Pruebas de unidad: PASS. 387/387 aprobadas, sin fallos ni omisiones; dominio, snapshots, rutas, exportación, aislamiento y continuidad OAuth.
- Tipos, formato y builds: PASS. TypeScript App/Electron/Functions, formato, build web y desktop; mailer tests/types/dry-run y Functions compiladas.
- Smoke funcional de producto: PASS. Superficies web, ejecución Electron real con fixtures, 12 recorridos del mapa en 4 viewports, UI ES/EN a 320/390/760/1280.
- Cuentas y sesión con backend real local: PASS. SQLite y handlers reales con identidades sintéticas: cuota/idempotencia, A→logout→B, A→logout→A, cookie reemplazada, pestaña secundaria, resultados tardíos y preferencias independientes.
- Proveedores y continuidad: PASS. Navegador local con handlers reales y proveedores Google/GitHub sintéticos HTTPS; reautenticación/linking del mismo propietario conserva trabajo, logout y nuevo ingreso comienzan vacíos.
- Activos y límites: PASS. Branding fijado, Blog seed, ejemplos, mapa y paquete ZIP; auditoría de rendimiento/accesibilidad y excepción SEO noindex declarada.

Lighthouse: rendimiento 97, accesibilidad 100, buenas prácticas 100, SEO 69. Son mediciones del escenario registrado; no certifican accesibilidad completa, seguridad ni posicionamiento. La política noindex de la beta explica la limitación SEO cuando así figura en el recibo.

### Aislamiento entre cuentas y pestañas

PASS · synthetic. Ámbito: Backend real local SQLite, navegador Chromium y cuentas de prueba.. Siete comprobaciones del recibo de aislamiento aprobadas: logout A→B y A→A vacíos; contexto, opciones, navegación, adjuntos y recuperación borrados; cambio de cookie bloquea el editor; logout de pestaña secundaria invalida trabajo pendiente; cookie preferences y cuota previa conservadas.

### Google/GitHub y reautenticación

PASS · synthetic. Ámbito: Handlers reales y SQLite local con Google/GitHub sintéticos HTTPS; ningún grant personal de producción.. Linking y prueba del mismo propietario conservan borrador con rotación de sesión, exportación de identidades y eliminación verificados. Handoff de redirección es de un solo uso, diez minutos, sólo etiquetas opacas; marcador antiguo retirado antes de iniciar cualquier nuevo acceso.

### Recorrido visual en navegador integrado

PASS · synthetic. Ámbito: Fixture de cuentas A/B local; capturas previas al último ajuste no visual de handoff.. Logout de A y acceso de B dejan nombre vacío. SQL y scripts educativos se muestran como texto; no se ejecutó código. Contadores 20000/10000 visibles; Opciones avanzadas morado y alineado. Esta evidencia visual no se presenta como login de producción ni como equivalencia byte a byte del último build.

### ZIP real en límites de adjuntos

PASS · synthetic. Ámbito: Build final index-C4UbuF46.js; selector y descarga reales, API de autorización sintética.. 20 archivos/100 MiB y un archivo/20 MiB descargados, extraídos y comparados byte a byte y SHA-256. ZIP de 104882708 y 20989774 bytes. Generación 478.5 ms y 95.1 ms; tecla Tab procesada en 3 ms y 2 ms. Sólo mediciones de esta máquina, sin comparación con otro build.

### Actualización PWA y borradores

PASS · synthetic. Ámbito: Upgrade local desde activos legacy, navegador y sesión sintética.. Regresión de prompts repetidos recuperada, borrador legacy sin dueño descartado, borrador de sesión verificada retenido, sin recargas automáticas de actualización y OTP inline conserva trabajo. Proceso final exit 0.

### Reproducción dirigida WebKit

PASS · synthetic. Ámbito: WebKit 26.5 contra el mismo build final; un solo recorrido dirigido sin relajar assertions.. Nombre→fase→contexto→recarga→revisión→dry-run→ZIP PASS, sin pageErrors. La corrida combinada previa conserva 12 PASS y un timeout WebKit no reproducido; la causa sigue sin determinar y ambos recibos se publican.

### Fronteras de seguridad corregidas

PASS · synthetic. Ámbito: Suite de regresión contextual, Electron y tipos antes de la verificación integral final.. 121/121 pruebas de seguridad aprobadas; snapshots inválidos, Markdown/YAML, rutas ZIP/filesystem, emisor IPC y selección de adjuntos. Se preserva el diseño inicial independiente de Astra ultra y el recibo de cambios separado.

### Inventario de dependencias

PASS · source-review. Ámbito: 709 componentes instalados de desarrollo/build; dependencias sin cambios en esta entrega.. Inventario completado: 0 vulnerabilidades altas/críticas, 8 moderadas en la cadena Electron/build. PASS significa inventario ejecutado y límites publicados, no ausencia de toda vulnerabilidad.

### Artefacto público y controles HTTP

PASS · public-readback. Ámbito: Readback anónimo de accreatio.com y despliegue exacto de Cloudflare.. Bundle de 506718 bytes idéntico al build probado; rutas públicas y legales 200, ejemplos idénticos, cuenta anónima 401/no-store, métodos Google/GitHub activos y OTP propio deshabilitado. CSP script-src self, object-src none, nosniff y frame DENY presentes. ACCOUNT_DB conservada sin migración ni nuevos secretos.

## Límites de evidencia

Las fixtures de cuenta, ledger y navegador demuestran los contratos en escenarios controlados; el readback público y la observación IAB describen el servicio real observado. No se presentan como pruebas de OAuth personal, de controles autenticados con consentimiento personal ni de Safari en un iPhone físico. Son límites de lo ejecutado y no nuevas condiciones humanas para esta entrega final.

- No existe garantía de seguridad absoluta. La validación contextual no es antivirus ni analiza semánticamente binarios, PDF u Office; tampoco garantiza inmunidad a prompt injection en herramientas externas.
- No se determina automáticamente si una idea viola copyright ni se bloquean cuentas por palabras. Los ToS fijan obligaciones, la creación sigue local y no se añadió vigilancia del contenido ni un servicio de moderación pagado.
- La corrida adicional combinada del build final terminó con 12 PASS y un timeout WebKit esperando la selección de fase. Una única reproducción dirigida sobre el mismo asset aprobó todo el recorrido. No se demostró la causa del fallo intermitente; ambos recibos quedan conservados sin sustituir el resultado fallido por una afirmación de todas las corridas verdes.
- No se realizó OAuth con consentimiento personal de producción ni exportación autenticada de una cuenta real en esta entrega; sí handlers/backend reales locales con proveedores sintéticos y readback público real. WebKit local no equivale a Safari en un iPhone físico.
- La comprobación del repositorio hermano upstream de AEKR se omitió por depender de otro checkout; sí aprobaron el branding fijado, la verificación offline y las copias ZIP vendorizadas. No se presentan como una auditoría nueva del repositorio upstream.
- Se detectan 8 vulnerabilidades moderadas de la cadena Electron/build y 0 altas/críticas según el inventario fechado. Lighthouse SEO69 conserva la política noindex de beta; los demás puntajes tampoco certifican accesibilidad universal.
- Electron permanece congelado: se comprobaron localmente sus correcciones de frontera sin distribuir un nuevo instalador. No hay sandbox atómico contra un proceso local hostil que modifique directorios simultáneamente.
- Los chequeos visuales y las fixtures automatizadas no predicen todos los usos humanos o dispositivos. La entrega final está completada por IA y estos límites no introducen gates humanos.

## Stack y arquitectura de esta versión

- react: 19.2.8 (package-lock.json del commit de aplicación).
- react-dom: 19.2.8 (package-lock.json del commit de aplicación).
- typescript: 7.0.2 (package-lock.json del commit de aplicación).
- vite: 8.3.4 (package-lock.json del commit de aplicación).
- client-zip: 2.5.0 (package-lock.json del commit de aplicación).
- idb: 8.0.3 (package-lock.json del commit de aplicación).
- openid-client: 6.8.8 (package-lock.json del commit de aplicación).
- vite-plugin-pwa: 1.3.0 (package-lock.json del commit de aplicación).
- wrangler: 4.151.3 (package-lock.json del commit de aplicación).
- playwright: 1.62.1 (package-lock.json del commit de aplicación).
- tsx: 4.23.1 (package-lock.json del commit de aplicación).
- prettier: 3.9.6 (package-lock.json del commit de aplicación).
- lighthouse: 13.4.1 (package-lock.json del commit de aplicación).
- electron: 43.8.1 (package-lock.json del commit de aplicación).
- electron-builder: 26.15.3 (package-lock.json del commit de aplicación).

Web: React/TypeScript/Vite, generación local de ZIP con client-zip e IndexedDB mediante idb, PWA/service worker para activos públicos. Cloudflare Pages/Functions sirve la aplicación y las APIs; D1 separa cuentas/cuota del Blog. Google OIDC y GitHub OAuth prueban identidad; la aplicación usa sesiones propias revocables y no retiene tokens de terceros como credenciales. Autenticación y API de cuenta usan la red y quedan fuera de la caché pública.

Electron se conserva con desarrollo congelado. La validación local de sus fronteras no declara una nueva distribución instalada o una prueba de todos los sistemas operativos. Los números de dependencia provienen del lockfile del SHA indicado; no se inventa una versión de runtime remoto.

## Documentos y evidencia descargable

- [Resultado y procedencia saneados (JSON)](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/release-summary.json)
- [Stack exacto (JSON)](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/stack.json)
- [Diseño y hallazgos previos conservados (Astra ultra)](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/SECURITY_INPUT_ABUSE_DESIGN_2026-10-21.md)
- [Recibo final de implementación de seguridad](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/SECURITY_INPUT_IMPLEMENTATION_2026-10-21.md)
- [Manifiesto de integridad de todo el dossier](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/manifest.json)
- [Actualización 0.9.0 conservada](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/update-2026-10-21.html)
- [Snapshot factual histórico](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/index.html)
- [Master independiente original](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/INDEPENDENT_REVIEW_MASTER_2026-10-20.md)

- [iab-production-0.9.1.png · public-anonymous](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/evidence/iab-production-0.9.1.png)
- [iab-account-b-empty.png · synthetic](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/evidence/iab-account-b-empty.png)
- [iab-final-review-purple.png · synthetic](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/evidence/iab-final-review-purple.png)
- [iab-synthetic-receipt.json · synthetic](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/evidence/iab-synthetic-receipt.json)
- [account-isolation-receipt.json · synthetic](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/evidence/account-isolation-receipt.json)
- [identity-continuity-receipt.json · synthetic](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/evidence/identity-continuity-receipt.json)
- [integrated-functional-combined.json · synthetic](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/evidence/integrated-functional-combined.json)
- [integrated-functional-webkit-directed.json · synthetic](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/evidence/integrated-functional-webkit-directed.json)
- [export-load.json · synthetic](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/evidence/export-load.json)
- [dependency-inventory.json · synthetic](https://edlopezpm-ops.github.io/checkaccreatioandgivefeedback/releases/0.9.1-2026-10-21/evidence/dependency-inventory.json)

## Procedencia e integridad

Documento generado desde recibos ejecutados y resultados identificados por ámbito, incluido el fallo intermitente de la corrida adicional WebKit. Se conservan los 24 archivos de revisión histórica y el master independiente original con sus hashes, más 116 archivos previos inmutables, incluida la actualización 0.9.0. El manifiesto recalculado cubre todos los archivos del dossier salvo .git y el propio manifest.json. No se publica el código privado completo, credenciales, datos de cuentas reales ni el log crudo de verificación: sólo su hash y resultados agregados seleccionados.
