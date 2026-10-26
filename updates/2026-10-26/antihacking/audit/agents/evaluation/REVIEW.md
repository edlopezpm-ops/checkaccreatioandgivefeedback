# Integridad de evaluación — accreatio

Snapshot auditado: 0dcafbc426b01faea621d13121e36a54099b283a. Ningún archivo de producto fue cambiado. Mutaciones y fixture exclusivamente bajo este directorio ignorado.

## Resultado

- **E-01 CONFIRMED CONTRACT_FAILURE, C27:** npm audit --audit-level=high retorna 1. Son7 entradas de paquetes afectadas(4 high,2 moderate,1 low),5 advisories únicos. Zod/ChromiumBidi/Puppeteer y Undici/Miniflare/Wrangler son cadenas de tooling;serialize-javascript aparece en build. No se afirma explotación del frontend.522 paquetes presentes coinciden exactamente con el lock;124 faltantes son opcionales de plataforma y0 obligatorios faltan.
- **E-02 CONFIRMED WEAK_TEST + FALSE_SUCCESS del verificador, C26:** Vite real falla por puerto ocupado, pero Lighthouse acepta el servidor previo y producePASS100/100/100/91con HTML ajeno. La reproducción cambia solo los dos puertos en una copia y conserva los recibos originales y reforzados. Esto contradice la obligación del gate de verificar el build y propagar fallos;no demuestra manipulación intencional.
- B-W01 de backend corroborado por lectura y ejecución: data/delete no alcanzan el hook de revocación sin proof ligado a la acción;con el proof alcanzan1 vez. Debilidad del test,no defecto demostrado de autorización.
- B-W02 de backend revisado: sustituir el último byte por ff no garantiza alterarlo. El fixture determinista de111 IVs contiene un original ya terminado en ff;el expected rejection falla sobre producto correcto.

## Evidencia confiable y controles negativos

El runner Node usa assert/strict real y descubre73 archivos tests/*.test.ts. Inventario AST:473 declaraciones estáticas y2519 llamadas assert;las parametrizaciones explican diferencia con conteos de ejecución que conserva root.8 archivos son enteramente verificaciones de fuente;los restantes mezclan comportamiento,SSR,SQL o fuente. Estos números no se presentan como cobertura semántica. No se observaron skip/only/todo/xfail activos ni comparadores alterados. CI encadena instalación,audit y verify sin continue-on-error. Se inspeccionó historial reciente y no apareció eliminación de archivos de tests/scripts en la historia disponible.

El wrapper run-logged preservó exit 7de un child deliberadamente fallido. Mutante publicación sin rechazo:detectado por assert.rejects. Mutante confirmación no-op:la suite estructural reviewManifest sigue4/4;el nuevo oráculo de activación pasa baseline y detecta el mutante. Este último superviviente no se reporta como defecto global:la suite declara forma/SSR y web-functional/guided sí activan el botón y comprueban ZIP real. Ambos archivos de producto se restauraron byte-a-byte dentro de sus subcopias.

Lighthouse conserva thresholds 80performance/90accessibility/90best-practices/90SEO;solo is-crawlable admite la excepción pública beta. La categoría adicional agentic-browsing no pertenece al gate declarado de cuatro categorías. Las mediciones inicial/repetida del producto son evidencia de root;no se reemplazan por resultados del decoy.

## Mocks y límites

Los smokes browser declaran fixtures account/blog/proveedor. web-functional y guided activan la UI real,inspeccionan ZIP descargado y comparan bytes de reintento;la publicación Blog UI usa transporte simulado y no pruebaD1remoto. Las pruebas persistence ejecutan fuente sin cambiar y sustituyen I/O/migración/clock de forma explícita;no acreditan IndexedDB real por sí solas. Las de bridge inyectan archive/download para controles de secuencia,complementadas por ZIP y browser reales. Los wrappers de WebGL observan y reenvían las llamadas originales;no fuerzan el resultado. No se halló adaptación indebida a fixtures ni manipulación del evaluador. Autoría/intención no determinadas.

Lectura semántica completa propia:64archivos, incluidos37 tests. La lista exacta está en reviewed-files.json. Otros tests/scripts se asignaron a root/backend/contracts y solo sus ledgers confirman cobertura adicional. package-lock recibió inspección estructural de todos sus647 registros,versiones,integrities y endpoints:646 entradas dependencias,integrity presente en todas y resolved exclusivo npmjs;no revisión integral de código de terceros. No se comprobaron CI remoto,OAuth personal,correo externo,Access real,deploy,producción ni facturación de servicios.

## Reproducción

1. node .local/logs/antihacking-20261026-full/agents/evaluation/evaluation-checks.mjs
2. node .local/logs/antihacking-20261026-full/agents/evaluation/repro-lighthouse-port.mjs
3. Desde snapshot:npm.cmd audit --audit-level=high

La primera versión de nuestro oráculo(.ts)falló en transform CJS antes de ejecutarse.Se descartó como evidencia funcional y la versión.mtsvalidada produce pristine0/mutant1. Un primer intento de copia alcanzó un PNGchroma ignorado no disponible enOneDrive;se repitió desde snapshot sanitizado sin eseasset. Ninguna de esas incidencias se atribuye al producto.
