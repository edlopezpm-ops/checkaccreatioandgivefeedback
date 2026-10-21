# Apéndice técnico factual de accreatio

Fecha de lectura: 2026-10-20. Base: rama `main`, commit `70612512e2115036fa71a08075a596a04bbff942`, versión declarada `0.8.0`. No había diferencias de archivos versionados respecto a HEAD en los directorios técnicos examinados. Las referencias siguientes son rutas relativas al repositorio y números de línea de esa base; facilitan preparar extractos públicos sin publicar el repositorio completo.

## Alcance y clases de evidencia

- **Código observado [C]:** lectura estática de los archivos citados. Describe contratos, llamadas y comportamiento programado; no acredita por sí sola ejecución en un navegador, paquete instalado o entorno remoto.
- **Afirmación documental [D]:** lo que declaran README y las reglas del proyecto. Se conserva como declaración con procedencia, diferenciada del código y de las pruebas.
- **Prueba ejecutada en esta revisión [E]: ninguna.** No se ejecutaron suites, compilaciones, aplicaciones, autenticaciones ni despliegues. Solo se consultaron fuentes y metadatos Git y se escribió este apéndice.

No se consultaron `PRIVACY.md`, archivos `.env`, valores del entorno, credenciales, registros de cuentas, `.local/private/` ni informes previos. No se incorpora información histórica de memoria como prueba actual. AEKR se describe exclusivamente donde forma parte del contenido o las integraciones del producto; no es el marco de evaluación exigido al lector.

## Producto que implementa la fuente

**[C] accreatio estructura una definición de proyecto y produce documentos iniciales, un prompt explícito, un plan y una entrega.** Los datos incluyen nombre, fase, contexto, restricciones, ruta, acción, participantes, adjuntos y opciones de entrega/orquestación. El prompt se construye por interpolación determinista de esos datos; esta ruta no llama a un modelo para inventar un proyecto ni implementa automáticamente la aplicación descrita. Referencias: `shared/domain.ts:113-139`, `shared/domain.ts:533-569`, `src/core.ts:55-225`.

**[C] Los roles representan participantes planificados.** Las cuatro categorías son generalista, arquitecto, implementador y auditor. La validación web limita la definición a cuatro participantes con roles distintos y un nombre de hasta 50 caracteres; el dominio conservado para escritorio permite de uno a seis participantes y hasta 80 caracteres. Declarar un auditor no demuestra que se haya ejecutado una auditoría independiente. Referencias: `shared/domain.ts:1-2`, `shared/domain.ts:42-50`, `shared/domain.ts:205-234`, `shared/domain.ts:548-549`, `src/webExport.ts:7-17`.

**[C] Dry-run comienza activado y la ejecución captura una solicitud para confirmación.** La revisión web no construye ni descarga el ZIP. Cambiar desde una revisión correcta a descarga abre una confirmación nueva. Referencias: `src/App.tsx:268-294`, `src/App.tsx:1020-1072`, `src/bridge/web.ts:127-150`, `electron/main.ts:274-286`.

**[D] El README identifica la web autenticada como producto actual y declara congelados desarrollo y lanzamientos de escritorio desde la instrucción del propietario del 2026-09-04.** También declara beta gratuita, autenticación de GitHub y facturación por suscripción no implementadas. Esto no equivale a haber comprobado en esta revisión el dominio público, la configuración de producción o sus condiciones comerciales. Referencias: `README.md:3-11`, `README.md:22-28`.

## Separación web y escritorio

| Responsabilidad | Web [C] | Electron retenido [C] |
| --- | --- | --- |
| Entrada y superficie | `index.html:42` carga `src/main.web.tsx`; añade Blog, límite de cuenta y preferencias de cookies (`src/main.web.tsx:1-44`). | `desktop.html:19` carga `src/main.desktop.tsx`, que monta la aplicación compartida (`src/main.desktop.tsx:1-7`). |
| Entrega | Construye un ZIP en memoria con `client-zip` y solicita descarga al navegador (`src/bridge/web.ts:77-87`, `src/bridge/web.ts:152-202`). | Crea directorios/documentos, copia adjuntos, inicializa Git y ejecuta las opciones privilegiadas seleccionadas (`electron/main.ts:288-470`). |
| Sistema local | Selección de archivos mediante control del navegador. Selección de carpetas, configuración persistente del host, historial, GitHub y ejecución de orquestación se declaran no compatibles (`src/bridge/web.ts:51-74`, `src/bridge/web.ts:333-348`). | Diálogos, configuración, historial, estado/conexión de GitHub y control de orquestación pasan por IPC (`electron/preload.ts:1-20`, `electron/main.ts:740-800`). |
| Git/GitHub/IDE | Escribe instrucciones literales en `SETUP.md`; el navegador no ejecuta esas órdenes (`src/core.ts:227-249`). | Usa procesos con ejecutable y argumentos separados. GitHub usa la sesión local de `gh`; el remoto comienza privado por defecto; la ruta no contiene commit ni push automático (`electron/main.ts:87-99`, `electron/main.ts:365-419`, `src/App.tsx:278-282`). |
| Seguimiento | Tracking-only se rechaza. La previsualización indica que Both entrega el mismo ZIP de repositorio, sin seguimiento web (`src/core.ts:62-87`, `src/webExport.ts:93-96`). | Puede escribir `PROJECT_STATUS.md` en la ubicación de seguimiento configurada (`electron/main.ts:424-439`). |
| Aislamiento | Cuenta y APIs son del mismo origen (`src/account/webClient.ts:70-87`). | Ventana con `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`, aperturas nuevas denegadas y permisos denegados por defecto (`electron/main.ts:641-650`). |

La separación de builds también está codificada: salidas `dist` y `dist-desktop`, entradas HTML distintas, PWA solo para web y directorio público deshabilitado para escritorio. El service worker excluye `/api` y `/cdn-cgi` del fallback de navegación. Tener app shell instalable no convierte autenticación y autorizaciones de exportación en operaciones completamente sin conexión. Referencias: `vite.config.mts:14-52`, `src/main.web.tsx:30-38`.

## Generación, archivos y adjuntos

**[C] La exportación web utiliza `buildExportManifest`.** Incluye `START.md`; copias de la plantilla de constitución en `CLAUDE.md`, `AGENTS.md` y `CODEX.md`; ajustes de atribución de Claude; perfil del propietario con espacios por completar; documento maestro; definición de terminado, ciclo de orquestación y checklist de auditoría; participantes; ADR inicial; discovery; prompt; instrucciones para construir el orquestador; firma `.accreatio/project.json`; y YAML de orquestación solo si se habilitó esa opción. El ZIP añade `SETUP.md` y adjuntos. Referencias: `shared/exportManifest.ts:247-313`, `src/webExport.ts:115-139`.

Las plantillas AEKR y la revisión que se añade a la firma son contenido incorporado del producto. El dossier no exige a una IA revisora adoptar esas instrucciones ni tratarlas como autoridad sobre su propio análisis. `orchestrator/BUILD_ORCHESTRATOR.md` es una especificación para que después se construya un runtime en la máquina del usuario: la exportación no entrega por esa vía un orquestador ejecutable ya instalado ni verifica qué CLI tiene el destinatario. Referencias: `shared/exportManifest.ts:118-229`, `shared/exportManifest.ts:255-306`.

**[C] El manifiesto genera texto inerte; el ZIP además puede contener los adjuntos binarios permitidos.** Los límites son 20 archivos, 20 MiB por archivo y 100 MiB acumulados. Las extensiones admitidas incluyen Markdown, texto, PDF, DOCX, JSON, YAML, CSV e imágenes PNG/JPEG. La ruta web comprueba coincidencia entre metadatos y selección viva, conserva los blobs, sanea nombres y resuelve colisiones de forma determinista sin distinguir mayúsculas. No se observa aquí extracción semántica de PDF/DOCX ni envío de su contenido a una IA. Referencias: `shared/domain.ts:3-18`, `shared/domain.ts:157-202`, `shared/exportManifest.ts:30-45`, `src/webExport.ts:34-73`, `src/webExport.ts:98-113`, `src/webExport.ts:132-137`.

La firma registra origen, versión, fecha, nombre, participantes, política de financiación y nombres de fuentes. Si no se proporciona una fecha fija, usa la hora actual; por tanto, la reproducibilidad byte a byte exige fijar también la fecha de procedencia. Referencia: `shared/domain.ts:556-569`.

**[C] La confirmación de éxito web significa ZIP construido y descarga solicitada.** El resultado declara expresamente `browserPersistenceVerified: false`. No demuestra que el usuario haya guardado, extraído, abierto o ejecutado lo descargado. El último ZIP queda en memoria de la pestaña para reintento, con elegibilidad temporal de 48 horas y autorización de la misma operación; no es una copia de seguridad persistente. Referencias: `src/bridge/web.ts:245-272`, `src/bridge/web.ts:285-323`.

## Contraste entre los escritores web y escritorio

La afirmación de un «manifiesto compartido por web y escritorio» aparece en comentarios (`src/core.ts:30-32`, `src/webExport.ts:121-122`, `shared/exportManifest.ts:243-245`). **El grafo de llamadas actual no sostiene esa afirmación completa.**

- **Web:** `index.html:42` → `src/main.web.tsx:41` → `src/main.tsx:37-44` → `src/App.tsx:1098` → bridge elegido en `src/bridge/index.ts:8-11` → `src/bridge/web.ts:154` → `src/webExport.ts:123` → `shared/exportManifest.ts:247`.
- **Escritorio:** `desktop.html:19` → `src/main.desktop.tsx:7` → `src/main.tsx:37-44` → `src/App.tsx:1098` → `src/bridge/electron.ts:17-22` → `electron/preload.ts:10` → handler `project:execute` en `electron/main.ts:767-771` → `LogicalOperationGuard` con trabajador `execute` en `electron/main.ts:763-766` → escritor directo `electron/main.ts:319-344`.

El escritor de escritorio genera directamente `PROJECT_PROMPT.md`, `docs/product/discovery.md`, `AGENTS.md`, `.accreatio/project.json` y, si corresponde, `.ai-engineering/orchestration.yaml`; no invoca `buildExportManifest`. Comparte generadores de contenido del dominio, pero no la lista completa de archivos ni toda la procedencia añadida por el manifiesto web. Además, escritorio usa `createdBy: "accreatio"` y web `"accreatio-web"`. Referencias: `electron/main.ts:8-18`, `electron/main.ts:319-344`, `src/webExport.ts:123-126`, `shared/exportManifest.ts:301-310`.

No se ha confundido una función de soporte sin llamadas con la ruta seleccionable: el IPC expuesto conecta directamente con ese escritor. Existe además una UI anterior seleccionable en tiempo de build mediante `VITE_CREATION_FLOW`; esta también llama `bridge.execute` (`src/main.tsx:7-10`, `src/legacy/LegacyApp.tsx:42`, `src/legacy/LegacyApp.tsx:834`). No se inspeccionaron valores del entorno ni bundles para afirmar qué variante está desplegada actualmente.

## Datos y persistencia

| Ámbito | Comportamiento observado [C] | Referencias |
| --- | --- | --- |
| Borrador web | Un registro `current` en IndexedDB `accreatio-drafts`; esquema de borrador 5. Guarda la definición sin adjuntos y solo un contador que avisa de la reselección necesaria. La UI restaura y guarda con debounce de 500 ms. | `src/draftStore.ts:4-9`, `src/draftStore.ts:56-84`, `src/draftStore.ts:116-150`; `src/App.tsx:571-646`. |
| Archivos seleccionados | Blobs conservados en estado de la pestaña; no forman parte del borrador persistido. | `src/App.tsx:379`, `src/App.tsx:933-975`; `src/draftStore.ts:78-84`. |
| Preferencias locales | Onboarding en localStorage. Preferencia de cookies también local, con `necessary: true`, `analytics: false`, `advertising: false` y vigencia de 180 días. | `src/draftStore.ts:18-49`; `src/account/cookiePreferences.ts:1-18`, `src/account/cookiePreferences.ts:51-65`. |
| Escritorio | Configuración e historial JSON en `app.getPath("userData")`; historial limitado a las últimas 50 entradas. Escrituras de documentos y copias usan creación exclusiva y nombres versionados. | `electron/main.ts:63-85`, `electron/main.ts:441-458`, `electron/main.ts:740-744`; `electron/files.ts:5-42`. |
| Cuenta web | Servicio separado de cuentas con sesiones revocables, recibos de exportación y autorización versionada de avisos/términos. El cliente envía a la autorización de exportación únicamente `operationId`; el handler rechaza campos adicionales. | `shared/accountPolicy.ts:1-13`; `src/account/webClient.ts:313-346`; `functions/_lib/accounts.ts:834-924`. |
| Identidad | Ruta OIDC valida identidad Google, cifra correo y nombre para almacenamiento, usa identificadores opacos/HMAC y sesiones propias cuyo token se guarda como hash. El mapeo de identidad no conserva foto. El código contempla además compatibilidad/migración de registros anteriores; no se verificó el contenido real de ninguna D1. | `functions/_lib/auth/oidc.ts:309-350`, `functions/_lib/auth/oidc.ts:619-651`; `functions/_lib/auth/oidc-store.ts:311-373`; `functions/_lib/auth/privacy.ts:84-173`, `functions/_lib/auth/privacy.ts:255-287`; `functions/_lib/accounts.ts:180-208`. |
| Derechos y limpieza | Existen exportación de datos y eliminación con sesión recientemente autenticada. La eliminación borra campos personales y revoca sesiones; conserva temporalmente localizadores opacos y elementos elegibles para limpieza. Hay función de mantenimiento y un worker programado con interruptor explícito. Su presencia no acredita ejecución del scheduler en producción. | `functions/_lib/accounts.ts:819-832`, `functions/_lib/accounts.ts:926-1056`; `functions/_lib/auth/privacy.ts:289-317`; `workers/account-maintenance/index.ts:11-17`. |
| Blog | Lectura de artículos publicados y publicación administrativa usan un almacén Blog diferente del contrato de cuentas. La publicación exige autenticación y autorización administrativas específicas. | `functions/_lib/platform.ts:26-32`; `functions/_lib/accounts.ts:45-55`; `functions/_lib/handlers.ts:34-58`, `functions/_lib/handlers.ts:86-109`. |

**[C] La cuota programada es de cinco autorizaciones nuevas por ventana móvil de 24 horas, con recibos idempotentes por cuenta/operación y tiempo de base de datos.** No cuenta comprobaciones dry-run como descarga nueva. El endpoint no recibe el ZIP, el prompt ni los adjuntos. Referencias: `functions/_lib/accounts.ts:34-41`, `functions/_lib/accounts.ts:89-97`, `functions/_lib/accounts.ts:834-924`, `src/bridge/web.ts:132-150`, `src/account/webClient.ts:313-315`.

**[D] «Sin telemetría» y «sin sincronización cloud del proyecto» son compromisos declarados en las reglas del proyecto y el README. [C] La preferencia de cookies no habilita analítica/publicidad y la ruta revisada de autorización no transmite contenido de proyecto.** Esto no debe resumirse como «aplicación sin red» ni como «no se procesa ningún dato personal»: hay autenticación, cuotas, Blog y defensas de abuso que usan HMAC derivados de IP en las rutas de autenticación. Referencias: `AGENTS.md:12-14`, `README.md:5`, `README.md:57-63`, `src/account/cookiePreferences.ts:17-18`, `functions/_lib/auth/oidc.ts:210-231`, `functions/_lib/accounts.ts:391-460`.

## Integraciones opcionales y límites

- **[C] IA:** Mode 1 está deshabilitado inicialmente; Codex y Claude Code son los dos proveedores del registro y Codex es el valor por defecto al configurar. La web puede exportar configuración, pero no detectar ni arrancar las CLI locales. El registro actual no declara perfiles API de pago. Esto describe capacidad del código; no acredita instalación, autenticación ni saldo/suscripción de un usuario. Referencias: `shared/domain.ts:90-98`, `shared/providerRegistry.ts:66-115`, `src/bridge/web.ts:329-348`.
- **[C] Orquestación de escritorio:** el IPC conecta preflight, inicio, snapshot, decisiones y cancelación con un controlador local. El arranque vuelve a comprobar los proveedores configurados. La existencia de este controlador retenido no cambia la congelación de lanzamientos de escritorio declarada en README. Referencias: `electron/main.ts:773-800`, `electron/orchestration.ts:216-265`, `electron/orchestration.ts:265-305`.
- **[C] Identidad web:** hay Google OIDC y email OTP separados de Cloudflare Access para administración; los métodos dependen de configuración válida. En el callback se consume el resultado validado del proveedor y se entrega al almacén una identidad y hash de sesión propios, no los tokens del proveedor. **[D]** README declara deshabilitado el mailer privado pendiente de aceptación real de entrega; esta revisión no lo comprobó remotamente. Referencias: `functions/_lib/auth/oidc.ts:619-651`, `functions/_lib/accounts.ts:270-289`, `src/components/account/WebAccountBoundary.tsx:156-165`, `functions/_lib/handlers.ts:45-58`, `README.md:26-28`.

## Stack y validaciones disponibles

**[C] Versiones declaradas en `package.json`:** la tabla registra exactamente el manifiesto leído. No verifica las versiones instaladas, la compatibilidad entre componentes, el runtime remoto ni el contenido de un paquete ya distribuido. Todas estas entradas están declaradas en `devDependencies`; la tabla describe su función en la construcción o aplicación, sin reinterpretar esa clasificación del manifiesto.

| Capa | Tecnología y versión observada | Responsabilidad y archivos |
| --- | --- | --- |
| Lenguajes | TypeScript `7.0.2`; TSX/JavaScript, CSS, HTML; SQL de migraciones | Dominio compartido y UI en `shared/` y `src/`; host en `electron/`; funciones en `functions/`; estilos en `src/`; esquema en `migrations/` y `migrations-auth/`. |
| UI | React `19.2.8`, React DOM `19.2.8`; tipos React `19.2.18`, React DOM `19.2.4` | `src/App.tsx`, componentes y montaje `src/main.tsx`. |
| Build y servidor de desarrollo | Vite `8.3.4`, plugin React `6.0.5` | `vite.config.mts` separa web y escritorio; `package.json` define compilaciones. |
| Host de escritorio | Electron `43.8.1` | `electron/main.ts` tiene privilegios; `electron/preload.ts` delimita IPC. No se leyó una versión de Node/Chromium incorporada al ejecutable. |
| Empaquetado Windows | electron-builder `26.15.3` | `package.json:39-61` define portable, entradas y salida. No se construyó un instalable/portable en esta revisión. |
| Runtime de herramientas | Node.js usado por scripts; `@types/node` `26.1.2`; `tsx` `4.23.1` | `package.json:8-40` ejecuta scripts y pruebas. La versión de tipos no es la versión probada del runtime Node; no se consultó el binario instalado. |
| Backend web | Cloudflare Pages Functions y D1; Wrangler `4.151.3` | `functions/api/` enruta a `functions/_lib/`; los contratos separan Blog y cuentas. La plataforma alojada no tiene una versión fija declarada en `package.json`. No se publican IDs ni configuración de entornos. |
| Instalación/caché web | `vite-plugin-pwa` `1.3.0`; APIs Service Worker del navegador | `vite.config.mts:20-36`, `src/main.web.tsx:30-38`. No hay comprobación de compatibilidad de navegadores en esta lectura. |
| Persistencia de borrador | `idb` `8.0.3`; IndexedDB y localStorage del navegador | `src/draftStore.ts`; sin base de proyectos remota en esta ruta. IndexedDB/localStorage son APIs de plataforma, sin versión de paquete propia. |
| Archivo de entrega | `client-zip` `2.5.0`; Blob y Object URL del navegador | `src/bridge/web.ts`, `src/webExport.ts` y `shared/exportManifest.ts`. |
| Identidad y criptografía | `openid-client` `6.8.8`; Web Crypto del runtime | `functions/_lib/auth/oidc.ts`, `oidc-store.ts` y `privacy.ts`: OIDC/PKCE, validación de token, HMAC y AES-GCM. No se validó un proveedor real en esta revisión. |
| Iconos UI | `lucide-react` `1.28.0` | Componentes React de interfaz. |
| Automatización y rendimiento | Playwright `1.62.1`, Lighthouse `13.4.1` | Smoke/validaciones en `scripts/`, incluidas web, cuentas y rendimiento. |
| Formato y desarrollo local | Prettier `3.9.6`, concurrently `10.0.6`, wait-on `9.1.0` | Scripts de formato, ejecución de desarrollo y espera de artefactos/puerto. |

Referencias del inventario: `package.json:8-40`, `package.json:62-84`; límites de plataforma: `vite.config.mts:14-52`, `functions/_lib/platform.ts:18-37`, `functions/_lib/accounts.ts:45-72`, `src/draftStore.ts:56-64`.

**[C] Comandos definidos:** pruebas Node con `tsx`; smoke de Electron, web, cuentas, límites entre superficies y mapa de proyecto; verificación del mailer; typecheck de aplicación/Electron/Functions; formato; build web/escritorio/Functions; checks de branding/payload/semillas; Lighthouse. `npm run verify` encadena esas comprobaciones y `package:win` construye el portable. La existencia de scripts no acredita que pasen en este commit. Referencias: `package.json:8-40`.

**[C] Hay casos de prueba nombrados** para límites de adjuntos, prompt bilingüe, manifiesto y exportación, versionado concurrente, separación de superficies, cuota concurrente y reintentos, recibos/términos y OIDC. Por ejemplo: `tests/core.test.ts:47-105`, `tests/webExport.test.ts:83-148`, `tests/webExport.test.ts:366-418`, `tests/files.test.ts:8-46`, `tests/surfaceBoundary.test.ts:8-51`, `tests/accountsApi.test.ts:53-87`, `tests/oidcApi.test.ts:275-325`. **[E] No fueron ejecutados en esta revisión.** Un test que compara el prompt compartido no debe presentarse como evidencia de igualdad del conjunto completo de archivos de ambos hosts.

## Extractos de fuente recomendados para el dossier público

Preparar recortes con ruta, líneas y commit, conservando comentarios necesarios para entender el contrato. Usar datos sintéticos en ejemplos y excluir valores de configuración, identidades, cookies, tokens, claves, adjuntos reales y registros operativos. No se propone publicar automáticamente estos archivos completos.

| Prioridad | Archivo y recorte útil | Motivo |
| --- | --- | --- |
| Alta | `shared/domain.ts:113-139`, `shared/domain.ts:205-284`, `shared/domain.ts:533-569` | Contrato de entrada, validación y prompt/firma reales. |
| Alta | `src/core.ts:55-127`, `src/core.ts:129-249` | Plan, previsualización y pasos manuales del navegador. |
| Alta | `shared/exportManifest.ts:247-313` | Conjunto efectivo de documentos exportados; muestra AEKR como contenido. |
| Alta | `src/webExport.ts:34-73`, `src/webExport.ts:87-139` | Sanitización, correspondencia de adjuntos y montaje del ZIP. |
| Alta | `src/bridge/web.ts:132-202`, `src/bridge/web.ts:245-323` | Dry-run, autorización, límites de la evidencia de descarga y reintento. |
| Alta | `src/App.tsx:1020-1119` | Confirmación de intención y solicitud de ejecución capturada. |
| Alta | `src/draftStore.ts:56-84`, `src/draftStore.ts:116-150` | Persistencia efectiva del borrador y exclusión de adjuntos. |
| Alta | `src/main.web.tsx:19-44`, `src/main.desktop.tsx:1-7`, `src/main.tsx:7-10`, `src/bridge/index.ts:1-11` | Entradas, composición y selección del host/variante. |
| Alta | `electron/main.ts:310-344`, `electron/main.ts:763-771`, `electron/preload.ts:1-20`, `src/bridge/electron.ts:8-29` | Call graph que prueba la diferencia entre escritores web y escritorio. |
| Media | `electron/files.ts:5-42`, `electron/main.ts:641-650` | Escrituras exclusivas/versionadas y aislamiento del renderer. |
| Alta | `src/account/webClient.ts:313-346`, `functions/_lib/accounts.ts:834-924`, `shared/accountPolicy.ts:1-13` | Payload mínimo de autorización, cuota y política versionada. |
| Media | `functions/_lib/auth/oidc.ts:309-350`, `functions/_lib/auth/oidc.ts:619-651`, `functions/_lib/auth/privacy.ts:84-173` | Identidad seleccionada, frontera con proveedor y cifrado; sin configuración real. |
| Media | `functions/_lib/accounts.ts:819-832`, `functions/_lib/accounts.ts:978-1056`, `workers/account-maintenance/index.ts:11-17` | Exportación/eliminación, prueba reciente y responsabilidad del mantenimiento. |
| Media | `shared/providerRegistry.ts:66-115`, `shared/domain.ts:90-98` | Proveedores opcionales, modo desactivado y ausencia de perfiles API. |
| Media | `functions/_lib/platform.ts:26-37`, `functions/_lib/handlers.ts:34-58` | Blog separado de cuentas y autorización administrativa. |
| Alta | `package.json:8-40`, `package.json:62-84`, `vite.config.mts:14-52` | Stack declarado, comandos de validación y separación de builds. |

No incluir el payload generado completo de plantillas, dumps D1, directorios privados, bundles, paquetes de escritorio ni archivos fuente ajenos al objetivo de análisis. La selección anterior permite discutir arquitectura y comportamiento con evidencia suficiente y un alcance público limitado.
