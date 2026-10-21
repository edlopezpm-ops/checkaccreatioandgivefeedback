# Diseño de protección de entradas, archivos y abuso — 2026-10-21

Estado: **diseño y auditoría local; controles propuestos sin implementar**. Base Git observada: `20e5053f3d0a41c10cbef2e561fa3b2949703683`, con cambios de otros trabajos en curso. Las referencias de línea identifican el código inspeccionado durante esta revisión; los nombres de función permiten localizarlo si esos cambios desplazan líneas.

La recomendación es reforzar los límites técnicos donde los datos adquieren significado —DOM, configuración, ZIP, filesystem, procesos y SQL— y tratar las infracciones de uso mediante evidencia y revisión. Un sanitizador secreto que elimine palabras, scripts o referencias a marcas no ofrece esa protección. En un cliente descargable tampoco constituye un control contra un usuario que modifica su propia copia.

## 1. Alcance y resultado

Se inspeccionaron los campos del proyecto, la vista React, los generadores Markdown/JSON/YAML, el ZIP, la frontera Electron/IPC/filesystem y el contrato de autorización de exportaciones con D1. Se consultaron fuentes primarias de OWASP, Electron, Cloudflare, WIPO y U.S. Copyright Office. Se ejecutaron pruebas sintéticas de funciones puras, sin escribir archivos de proyecto ni ejecutar los contenidos probados.

No se leyó el archivo raíz `PRIVACY.md` no versionado, `.local/private`, credenciales ni datos de producción. No se ejecutó orquestación, IA, despliegue, publicación, sanción o cambio de Términos. La separación de borradores entre cuentas pertenece al trabajo concurrente y no se modifica aquí. Este informe no es una certificación de seguridad, prueba de explotación remota, análisis antivirus o dictamen jurídico.

El hallazgo central es concreto: **el proyecto no necesita eliminar SQL o JavaScript de la prosa para proteger D1 o React; sí necesita un esquema de ejecución completo, límites de texto y fronteras estrictas para nombres/rutas y archivos**. Hay una brecha demostrada de tipo numérico que permite introducir una clave adicional en YAML mediante una llamada manipulada. La edición Electron retenida tiene además una brecha de contención de rutas de adjuntos ante metadatos falsificados.

## 2. Superficies y controles observados

| Superficie | Evidencia de código | Lectura de seguridad |
|---|---|---|
| Nombre, contexto, restricciones y vista de prompt | `src/components/creation/GuidedCreation.tsx:296-326`; `ReviewStage.tsx:175-187,321` | React recibe valores de formulario y nodos de texto; el prompt se muestra dentro de `pre`. No se encontró `dangerouslySetInnerHTML`, `innerHTML`, `eval()` ni `new Function` en `src`, `shared`, `electron` o `functions`. No demuestra ausencia de cualquier XSS, pero no aparece una ejecución directa de estos campos. |
| Seguridad del documento web | `public/_headers:2-8` | CSP restringe scripts/conexiones a mismo origen, deshabilita objetos y framing; existe `nosniff`. Es configuración de fuente, no comprobación de cabeceras desplegadas. |
| Proyecto y servicio de cuentas | `src/account/webClient.ts`, `authorizeWebExport`; `functions/_lib/accounts.ts`, rama `action === "authorize"` | La solicitud contiene únicamente `operationId`. El servidor exige cuerpo de hasta 256 bytes, UUID y ausencia de otros campos. No recibe objetivo, prompt, nombres ni bytes de adjuntos. |
| SQL de cuentas y Blog | `functions/_lib/accounts.ts`, `findSession` y rama `authorize`; `functions/_lib/blog.ts:254-279` | Las consultas inspeccionadas usan parámetros con `bind`; sus fragmentos SQL dinámicos son constantes de código. No se observó una ruta desde texto de proyecto hasta SQL. |
| API y publicación editorial | `functions/_lib/http.ts:89-159`; `functions/_lib/blog.ts:50-123`; `src/components/BlogExperience.tsx:620-630` | JSON tiene límite real de bytes durante lectura, esquema editorial y salida textual. Blog es otra superficie y otra autorización, no una publicación de proyectos. |
| Adjuntos web | `shared/domain.ts:3-18,157-202`; `src/webExport.ts:35-74,99-142` | Hay lista de extensiones, 20 archivos, 20 MiB por archivo y 100 MiB por conjunto. Se comprueba correspondencia de metadatos/Blob, se elimina ruta del nombre, se resuelven nombres reservados de adjuntos y duplicados. Se conservan los bytes; no hay análisis de malware. |
| ZIP | `src/bridge/web.ts:77-87,152-202`; `shared/exportManifest.ts:188-248` | Se generan archivos en memoria y se descarga un Blob; no se extraen ni ejecutan. Las rutas de plantillas están fijadas por código. La lista `FORBIDDEN_EXPORT_EXTENSIONS` es declarativa: por sí sola no es un guardián universal del manifiesto. |
| Markdown y configuración exportada | `shared/domain.ts:533-553,587-655`; `shared/projectTemplates.ts:32-74` | La prosa y los labels se interpolan en Markdown; YAML entrecomilla la tarea mediante JSON. Las instrucciones canónicas advierten que adjuntos son referencia y que acciones sensibles necesitan autoridad humana. No hay garantía de que una herramienta externa respete esas instrucciones. |
| Comandos | `src/core.ts:230-262`; `electron/main.ts:87-100,365-405` | SETUP usa slug y gramática de branch; Electron usa `spawn` con argumentos, sin `shell: true`. Es una defensa real que debe mantenerse; un sanitizador de prosa no la sustituye. |
| Frontera privilegiada | `electron/main.ts:641-661,717-771`; `src/operationGuard.ts:12-26`; `electron/files.ts:5-42` | Renderer con sandbox/aislamiento y sin Node; nombres del selector inicialmente son basename. IPC acepta snapshots sólo superficialmente; la copia posterior confía en los metadatos recibidos. `wx` y `COPYFILE_EXCL` preservan destinos existentes, pero no confinan una ruta. |

OWASP distingue validación, autorización y protección de cada destino: rechazar apóstrofes o palabras SQL rompe texto válido y no hace segura una consulta. Recomienda reglas de estructura y tamaño sin destruir Unicode legítimo. [OWASP: validación de entradas](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).

## 3. Brechas priorizadas y evidencia reproducida

Las prioridades expresan orden de reparación del contrato afectado, no una afirmación de incidente. No se verificó un ataque remoto que comprometa el renderer.

| ID / prioridad | Hallazgo verificado | Condición e impacto | Cambio mínimo propuesto |
|---|---|---|---|
| S1 — P1 | `validateExecutionRequest` valida UUID y objetos externos, pero hace cast de snapshots sin validar campos (`src/operationGuard.ts:12-26`). `validationErrors` no exige tipos, enums completos ni enteros finitos (`shared/domain.ts:205-284`). | Una invocación directa acepta `definition: {}`; un proyecto con `phase: "invented"` pasa validación. Una duración string `60\nsynthetic_key: true` pasa comparaciones y aparece como clave adicional YAML por interpolación en `:611`. No se ejecutó ese YAML. La migración habitual sí sustituye duraciones no numéricas (`:493-502`); la prueba corresponde a una llamada manipulada que salta esa migración. | Parser único `unknown → snapshot validado`, con objetos/campos permitidos, tipos estrictos, enums, límites y enteros. Usarlo antes del fingerprint y de todo generador/efecto. Aplicar el mismo contrato en web e IPC, con diferencias de host explícitas. |
| S2 — P1 antes de reactivar/distribuir Electron | El nombre `..\\..\\..\\outside.txt` pasa `validateAttachmentSet`; `copyVersioned` une `dir` y nombre sin contención (`shared/domain.ts:168-176`; `electron/main.ts:349-359`; `electron/files.ts:5-42`). | `path.win32.join(C:\\fixture\\project\\docs\\product\\sources, nombre)` produce `C:\\fixture\\project\\outside.txt`. Con más ascensos puede salir del proyecto. Requiere metadatos manipulados/renderer comprometido; el selector normal genera basename. No se hizo copia. La web reduce el mismo nombre a `fixture/docs/product/sources/outside.txt`. | Nombres de destino propios del host y validación final de contención; comprobar padre real y rechazar escape por symlink/junction. Mantener escritura exclusiva. No confiar en nombres/rutas reenviados por renderer. |
| S3 — P1 para la misma frontera Electron | Los handlers privilegiados no verifican `senderFrame`; `settings:save` acepta cualquier objeto; al ejecutar adjuntos sólo se exige `path` string, sin volver a comprobar archivo, tamaño, identidad o selección (`electron/main.ts:711-780`). | Una solicitud privilegiada falsificada puede elegir una fuente no seleccionada, superar límites mediante metadatos falsos o aprovechar cambios del archivo entre selección y copia. La existencia de sandbox reduce superficie, pero no autentica cada operación IPC. | Validar emisor/ventana/frame; registrar selección con identificadores opacos en main; resolver/reabrir y verificar archivo regular y tamaño real antes de copiar. Validar settings en main. Restringir destinos a selección/confirmación autorizada, sin aceptar una ruta nueva por mera declaración del renderer. |
| S4 — P2 | Contexto, restricciones y tareas no tienen máximos (`shared/domain.ts:210-214,258-262`; `GuidedCreation.tsx:317-326`). | Un contexto de 1.000.000 de caracteres pasa `validateWebProject`. Aumenta trabajo de render, journal, serialización, hash y ZIP. Se confirmó aceptación; no se realizó prueba de agotamiento o congelación. | Límites compartidos de campo y snapshot, mensajes visibles y comprobación antes de serializar/copiar. Respetar escritura IME y conservar texto anterior al error. |
| S5 — P2 | Texto y labels pueden crear estructura Markdown adicional (`shared/domain.ts:540-549`); el prompt conserva HTML y enlaces literales. | La prueba preservó un encabezado sintético dentro del contexto y otro dentro de un label. En web son texto; en export un visor externo puede interpretar Markdown, enlaces o HTML según sus permisos. Un agente posterior puede confundir una supuesta autorización con datos. No se probó ejecución de script. | Serializar datos libres en bloques literales robustos o archivo JSON de datos; mantener instrucciones fijas fuera de esos bloques. Encabezados, nombres y labels como texto escapado. Respetar el objetivo humano real, sin permitir que una etiqueta de referencia cree autoridad. |
| S6 — P2 | `validName` comprueba que exista algún carácter no control, no que estén ausentes los controles (`shared/domain.ts:169-170`). `a\u0000.txt` pasa. El slug raíz puede ser `con`; no hereda protección de dispositivos de adjuntos. | Nombres incompatibles, invisibles, demasiado largos o reservados pueden dar errores y discrepancias entre vista y extracción. La web limpia nombres, pero no registra explícitamente toda transformación como un cambio de nombre. | Validar controles/tamaño; gramática de ruta final y root slug portable; asignación determinista y mapa `original → exportado` visible. El texto del proyecto permanece intacto. |
| S7 — P2 de comunicación, no malware confirmado | La validación de adjuntos usa extensión/metadatos; `GuidedAttachments.tsx:108-111` muestra “Listo/Ready”. | Un ejecutable renombrado, PDF activo o documento con contenido peligroso puede viajar como bytes en un tipo admitido. El programa actual no lo ejecuta. Extensión o firma de formato no prueban inocuidad. | Aclarar “Listo para incluir; contenido no analizado”. Preservar la separación entre incluir, abrir, interpretar y ejecutar. Evaluar comprobaciones de formato limitadas, sin llamarlas antivirus. |

Electron recomienda validar el emisor de todos los mensajes IPC. Los controles de ventana existentes deben conservarse; no justifican confiar en el payload privilegiado. [Electron: seguridad](https://www.electronjs.org/docs/latest/tutorial/security).

### Registro de las pruebas puras

Se importaron `shared/domain.ts`, `src/operationGuard.ts` y `src/webExport.ts` con el runtime local `node --import tsx --input-type=module`. Resultado observado, sin filesystem de prueba ni APIs remotas:

```json
{
  "baseline": {},
  "largeTextAccepted": true,
  "invalidEnumAccepted": true,
  "ipcShallowAcceptsEmpty": true,
  "attachmentTraversalAccepted": true,
  "desktopDestinationCalculation": "C:\\fixture\\project\\outside.txt",
  "webArchivePath": "fixture/docs/product/sources/outside.txt",
  "controlInNameAccepted": true,
  "rawMarkdownHeadingPreserved": true,
  "rawRoleHeadingPreserved": true,
  "malformedNumericAccepted": true,
  "syntheticYamlKeyEmitted": true
}
```

El nombre de prueba fue `Security fixture`, con proyecto válido, un participante generalista, orquestación inicialmente apagada y destino sintético `C:\fixture`. Cada variante se cambió de forma independiente. Para YAML se activó una única tarea sintética y se sustituyó exclusivamente la duración por el string indicado en S1. Estos resultados prueban aceptación/serialización; no prueban que un runtime externo acepte o ejecute la clave adicional.

## 4. Diseño local implementable

### 4.1 Contrato y flujo

Introducir una función pura compartida, por ejemplo `parseProjectExecution(input, host)`, que devuelva un snapshot tipado e inmutable o errores `{field, code, message}`. Ningún error necesita incluir el texto completo ni viajar al servidor. El orden sería:

1. Validación ligera de tipo/tamaño al recibir entrada o restauración; límites antes de copias/serialización costosas.
2. Migración conocida del borrador, separada de validación. Valores incompatibles quedan recuperables y visibles, sin coerción silenciosa a una acción ejecutable.
3. Validación completa del snapshot y resolución explícita de nombres.
4. Preview exacto del manifiesto y del prompt. Si hay errores estructurales, se deshabilita la preparación/ejecución y se conserva la edición.
5. Construcción/validación final de cada ruta y contenido generado; sólo después se solicita autorización oficial de exportación. Mantener que revisión/cancelación/error local no consuma cuota.
6. En Electron, repetir comprobaciones privilegiadas inmediatamente antes de los efectos. El renderer no es una frontera confiable.

Propuesta inicial de presupuesto para calibrar, **no límites ya adoptados**: contexto 20.000 caracteres, restricciones 10.000, tarea 5.000 por participante y snapshot serializado hasta 256 KiB, sin bytes de adjuntos. Mantener los límites vigentes de nombre web 50, label 120 y conjunto de archivos. Documentar si el contador usa unidades UTF-16 o puntos Unicode y complementar con bytes UTF-8. Antes de cambiar límites, probar dispositivos modestos y borradores sintéticos grandes; no inspeccionar contenido privado para calibrar.

Rechazar NUL y controles no representables en campos de texto con una ubicación editable; aceptar saltos de línea en prosa, signos, acentos, emoji y escritura no latina. Un título/label es de una línea. No convertir `O'Connor`, `SELECT`, `<script>` o una explicación de seguridad en una acusación. No usar NFKC general para alterar el contenido; normalizar sólo identificadores/comparaciones cuando el contrato lo requiera.

### 4.2 Protección por destino

| Destino | Regla propuesta |
|---|---|
| React | Mantener nodos de texto y atributos controlados. No añadir un renderizador HTML para el prompt. Si más adelante existe Markdown enriquecido, raw HTML apagado y protocolos/recursos externos controlados; una librería de saneamiento de HTML sólo tendría sentido en esa nueva superficie. |
| JSON/YAML | JSON mediante serializador. YAML sólo con tipos validados y serialización de escalares; números deben ser finitos y enteros dentro del rango. Probar retorno exacto de tareas con comillas, saltos, dos puntos y backticks, sin nuevas claves. |
| Markdown generado | Conservar original en datos estructurados del paquete y producir representación literal. Una cerca de código debe ser más larga que cualquier secuencia del delimitador en el contenido, o usar otro mecanismo que no pueda cerrarse desde el dato. Escape contextual para elementos inline. No colocar labels libres en un archivo de instrucciones privilegiadas. |
| ZIP | Revalidar cada entrada: relativa, sin raíz/unidad/UNC, `.`/`..`, NUL, separadores alternos o destino fuera del prefijo; unicidad según comparación portable y límites de nombre/ruta. Generados y adjuntos en espacios separados. Mantener bytes de adjuntos y nombres resultantes deterministas. |
| Filesystem | Elegir destino en main; contención léxica y real, padres sin redirección inesperada, identificadores de archivos seleccionados y acceso exclusivo. Verificar identidad/tamaño desde el descriptor usado para copiar. Una comprobación `realpath` seguida de uso posterior por path tiene carrera; no afirmar resistencia absoluta a un proceso local que cambia directorios concurrentemente. |
| Procesos | Ejecutables fijos, argumentos separados, opciones tipadas y gramática específica de branch/destino. No `cmd /c`, PowerShell construido con texto, `eval` ni `shell: true` para la definición del proyecto. |
| SQL/API | Mantener placeholders y `bind`, esquema exacto y límites de request. Ningún campo del proyecto debe incorporarse al endpoint de cuota. No enviar ni siquiera hashes de contenido como sustituto de consentimiento o como “prueba” de infracción. |

La codificación depende del contexto: HTML, URL, texto y JavaScript no comparten una rutina universal de escape. CSP es defensa adicional. [OWASP: prevención de XSS](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html). Para SQL, la separación consulta/datos es el control relevante, ya presente en las rutas observadas. [OWASP: SQL injection](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html), [Cloudflare D1: prepared statements](https://developers.cloudflare.com/d1/worker-api/prepared-statements/). Para procesos, validar argumentos además de evitar intérpretes. [OWASP: command injection](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html).

### 4.3 Adjuntos y contenido activo

La primera entrega debe seguir empaquetando los adjuntos como datos, sin ejecutarlos, previsualizarlos en HTML, abrirlos automáticamente o descomprimir DOCX/ZIP recursivamente. No incorporar parsers de PDF/Office sólo para buscar palabras prohibidas: aumenta superficie y coste de mantenimiento.

Una fase posterior podría verificar cabeceras de tipos binarios y estructura mínima de formato con trabajo acotado. Una discrepancia comprobable se informa como tipo incompatible, no “malware detectado”; una firma válida no certifica seguridad. No enviar bytes a VirusTotal, un proveedor IA o un escáner remoto. Un antivirus local opcional necesitaría una integración separada y resultados como “no analizado”, “análisis no disponible” o “detección reportada por motor X”, nunca un sello de inocuidad universal.

PDF/DOCX pueden conservar contenido activo; CSV puede contener fórmulas que otro programa interprete. No anteponer apóstrofes ni borrar fórmulas silenciosamente: si se ofrece una copia transformada para un destino específico, mostrar diferencia y conservar original. Los tests existentes preservan incluso bytes NUL en fixtures (`tests/webExport.test.ts:443-503`); un filtro nuevo de formato cambiaría ese contrato y necesita una decisión explícita de compatibilidad.

OWASP advierte que MIME/extensión/firma no bastan y que servicios públicos de análisis pueden filtrar datos. Aquí se adopta el principio, adaptado a archivos que permanecen locales y no se publican. [OWASP: archivos](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html).

### 4.4 Prompt entregado a otro asistente

La intención escrita por la persona es el objetivo del proyecto y debe conservarse. Los adjuntos, ejemplos pegados, labels y supuestas órdenes dentro de referencias no reciben autoridad adicional por exportarse. Las plantillas deben diferenciar procedencia y decisiones humanas reales de afirmaciones contenidas en fuentes.

Separar y citar datos mejora la legibilidad y reduce confusión, pero una cerca, un marcador “untrusted” o una lista de palabras no impide por sí sola la inyección semántica. La seguridad de una herramienta posterior depende de permisos mínimos, validación de acciones fuera del modelo y decisiones humanas ante operaciones sensibles. accreatio no debe prometer controlar una IA que el usuario abra después. [OWASP: prompt injection](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html).

No se propone una llamada a IA para clasificar intenciones, un clasificador oculto ni un proveedor obligatorio. Tampoco se propone analizar o recopilar contenido desde el servidor.

## 5. Qué bloquear, advertir o permitir

| Situación | Respuesta proporcionada |
|---|---|
| Tipo, enum, número o estructura inválida | Bloquear exportación/ejecución del snapshot; conservar borrador. “La configuración contiene un valor no admitido en duración. Revísalo para continuar.” |
| Campo excede límite | Bloquear esa entrega; indicar campo y máximo. Permitir editar/copiar/recuperar el contenido. No truncar silenciosamente ni sancionar cuenta. |
| Ruta final escapa del destino, emisor IPC inválido o archivo no autorizado | Bloquear la operación antes de efectos y explicar la frontera aplicable sin exponer rutas sensibles de otros archivos. No intentar reparar automáticamente una solicitud privilegiada falsificada. |
| Tipo/tamaño de archivo no soportado o fuente cambió | Rechazar ese adjunto y permitir reselección o continuar sin él. “El archivo cambió desde la selección; selecciónalo nuevamente.” |
| Nombre necesita transformación portable | Mostrar `original → exportado` antes de entregar. No alterar el archivo original ni atribuir malicia al nombre. |
| SQL, HTML o scripts citados como texto; investigación de seguridad | Permitir como datos dentro de límites y proteger sus destinos. No usar keywords como criterio de culpa. |
| Marca, personaje, obra, competidor, “clonar” o similitud de idea | No determinar infracción por palabra. Mostrar orientación de derechos cuando aporte contexto; no bloqueo automático de cuenta. |
| Archivo no analizado | Informar el límite. No marcarlo “seguro”. Su inclusión no autoriza ejecución posterior. |
| API sin sesión, política pendiente o cuota agotada | Aplicar el control servidor existente con su causa específica. No llamar “abuso” a un vencimiento, error o límite normal. |

Mensaje breve sugerido para la revisión, sólo como propuesta: “Comprobamos formato, tamaño y rutas. No analizamos malware ni verificamos derechos de terceros. Revisa los archivos y las instrucciones antes de usarlos.” Los detalles técnicos pueden ir en ayuda; los errores deben señalar exactamente qué corregir.

## 6. Copyright, Términos y suspensiones

### 6.1 No hay un detector fiable a partir del objetivo

Un objetivo breve no establece titularidad, licencia, consentimiento, uso permitido o jurisdicción. En el marco estadounidense, las ideas y métodos se distinguen de su expresión, y nombres/marcas no se resuelven con la misma prueba de copyright. [U.S. Copyright Office: qué protege](https://www.copyright.gov/help/faq/faq-protect.html). Las excepciones dependen de hechos; que un proyecto sea educativo o comercial no decide por sí solo el resultado. [U.S. Copyright Office: fair use](https://www.copyright.gov/fair-use/). WIPO reconoce autorización, licencias y excepciones como vías diferentes; no basta que un recurso esté visible en Internet. [WIPO: copyright](https://www.wipo.int/en/web/copyright/faq-copyright).

Estas referencias orientan el producto, no fijan la ley aplicable a accreatio ni resuelven un caso particular. Se necesita revisión jurídica del servicio/jurisdicción antes de prometer un régimen concreto de moderación, indemnización o safe harbor.

El control útil para este producto es procedencia local opcional: obra/fuente, titular declarado, URL de licencia o autorización, uso previsto y estado `pendiente` cuando no se sabe. No autocompletar titularidad, no convertir una casilla en certificación jurídica y no recopilar esos datos en D1. Conservar avisos de licencias ya incluidos en `shared/exportManifest.ts:224-227`.

### 6.2 Términos existentes y cambio mínimo futuro

`docs/TERMS_OF_SERVICE.md`, secciones 6 y 9, ya exige material autorizado, prohíbe malware/acceso no autorizado/violaciones de privacidad o IP y aclara que los controles de archivo no son análisis de malware ni garantía de derechos. La sección 7 prevé restricciones operativas/abuso. No hace falta inventar que una palabra bloqueada prueba una infracción.

Si se decide ampliar esa política, redactar para aprobación humana: conducta concreta prohibida; alcance del servicio; limitación temporal, suspensión y terminación diferenciadas; causa y evidencia; posibilidad de corregir/apelar; tratamiento de incidentes urgentes; revisión de falsos positivos y retención mínima. Preservar usos legales, investigación autorizada y derechos no renunciables. No implantar sanciones ni aceptación retroactiva. Si cambian propósitos o datos retenidos, actualizar el aviso y obtener la decisión aplicable; consentimiento de cookies no habilita esa recopilación.

Para material alojado en Blog puede existir un proceso de reclamación sobre una URL y contenido verificables. No afirmar que accreatio puede retirar archivos locales que nunca alojó. La sección 512 estadounidense tiene requisitos y mecanismos de notificación/contranotificación específicos; este informe no establece su aplicabilidad ni una política DMCA operativa. [U.S. Copyright Office: sección 512](https://www.copyright.gov/512/).

### 6.3 Evidencia exigible para una restricción de cuenta

Con el diseño local actual, el backend **no puede probar que un proyecto infringe copyright o contiene malware**: recibe identificador de operación y datos de cuenta, no el proyecto. Un resultado JavaScript `abuseDetected: true`, un hash o una palabra en un cliente modificado no es evidencia fiable. Un atacante podría falsificarlo; además, no explicaría licencia/contexto.

La actuación del servidor debe vincularse a hechos que realmente verifica: solicitudes autenticadas, invariantes de cuota, uso de endpoints, sesión comprometida o publicación editorial existente; o a una reclamación externa revisada y proporcional. Fallos repetidos de validación no prueban por sí solos intención maliciosa ni justifican sanción permanente.

Si se aprueba una futura operación de abuso: separar limitación automática reversible por recurso de suspensión revisada; registrar sólo cuenta/acción/regla/fecha/expiración y referencia de evidencia necesaria; acceso administrativo restringido; motivos comprensibles y vía de apelación; revisión antes de permanencia; recuperación tras falso positivo; acceso a derechos de cuenta por un canal adecuado. El diseño exacto de retención, cambios de D1 y notificaciones sería otro incremento autorizado. No añadir ahora IP, user-agent, proyectos, telemetría de campos o historial de “palabras sospechosas”.

## 7. Secuencia mínima de implementación y pruebas

1. **Contrato puro y límites (S1/S4):** esquema exhaustivo, validación temprana y errores por campo. Aplicarlo a ejecución, generadores y restauración sin borrar borradores. Pruebas negativas de enums, booleanos string, objetos ausentes, campos extra, arrays excesivos, `NaN`, infinitos, fracciones y duración string; probar que no se emite YAML extra ni se solicita cuota.
2. **Salidas y nombres (S5/S6):** serialización literal, paths finales, nombres portables y preview de renombrados. Probar round-trip de texto con `O'Connor`, acentos, emoji, comillas, `<script>` literal, `SELECT`, backticks y encabezados. Validar que no aparecen nodos activos ni conexiones externas al editar/revisar; que el texto original sigue recuperable.
3. **Adjuntos y manifest (S7):** mantener límites reales y Blob/metadatos, validar rutas de todas las entradas, corregir comunicación. ZIP con duplicados Unicode/case, reservados, traversal, controles, nombres largos y bytes binarios; extracción de fixtures sólo en un directorio temporal autorizado, sin abrir ejecutables. No ampliar un detector de formato sin pruebas/decisión de compatibilidad.
4. **Electron antes de reactivación (S2/S3):** validación de sender y capabilities de selección, settings, fuentes reales y contención. Fixtures de junction/symlink, archivo cambiado, fuente no seleccionada, metadata de tamaño falsa, destino externo y emisor incorrecto. Probar cero efectos al rechazar y conservación de destinos existentes en carreras. No requiere reactivar desktop durante este trabajo web.
5. **Regresión de fronteras:** petición de exportación sigue siendo únicamente `operationId`; datos locales no salen a red; no nuevas llamadas IA; no mezcla de borradores/cuentas ni recuperación de ZIP de otro dueño; Blog sigue con autorización separada. Verificar SQL con datos sintéticos hostiles como valores parametrizados, no con D1 de producción.
6. **Entrega técnica automatizada:** después de implementar, ejecutar tests pertinentes, typecheck, build, smoke empaquetado cuando toque Electron y pase UI funcional automatizado. Añadir casos de corrección de error sin perder entrada, IME, teclado, mobile y borrador previo demasiado largo. El incremento técnico autorizado no requiere esperar UAT humano adicional. Las comprobaciones no prueban seguridad absoluta ni amplían por sí solas el tratamiento de datos, los Términos o la autoridad de sanción.

Se puede ejecutar 1–3 con funciones puras y las dependencias presentes, sin coste directo de servicio ni nuevas transmisiones. Los números propuestos, formatos de exportación y migración de borradores requieren pruebas de compatibilidad antes de fijar la versión de contrato. El trabajo actual sólo entrega el diseño y evidencia de fuente/pruebas puras; no afirma haber cerrado S1–S7. Si el equipo implementa después estos controles en la misma entrega, registrar el cierre y sus pruebas en un recibo de implementación separado para conservar esta evidencia anterior al cambio.

## 8. Referencias primarias consultadas

Consultadas el 2026-10-21; no se enviaron ejemplos privados del proyecto a estos servicios.

- [OWASP — Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html).
- [OWASP — SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html).
- [OWASP — Cross Site Scripting Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).
- [OWASP — OS Command Injection Defense](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html).
- [OWASP — File Upload](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html).
- [OWASP — LLM Prompt Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html).
- [Electron — Security](https://www.electronjs.org/docs/latest/tutorial/security).
- [Cloudflare — D1 prepared statements](https://developers.cloudflare.com/d1/worker-api/prepared-statements/).
- [Cloudflare — Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/).
- [WIPO — Copyright FAQ](https://www.wipo.int/en/web/copyright/faq-copyright).
- [U.S. Copyright Office — What does copyright protect?](https://www.copyright.gov/help/faq/faq-protect.html).
- [U.S. Copyright Office — Fair Use Index](https://www.copyright.gov/fair-use/).
- [U.S. Copyright Office — Section 512 resources](https://www.copyright.gov/512/).
