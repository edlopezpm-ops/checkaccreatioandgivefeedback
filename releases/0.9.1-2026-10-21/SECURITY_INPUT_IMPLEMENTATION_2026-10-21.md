# Protección de entradas — recibo de implementación local

Fecha: 2026-10-21. Versión de trabajo: 0.9.1. Este recibo registra el incremento implementado después del [diseño y evidencia previa](SECURITY_INPUT_ABUSE_DESIGN_2026-10-21.md); aquel documento conserva las condiciones anteriores al cambio. Los cambios conviven con la corrección de aislamiento de cuentas del agente principal, que tiene su evidencia propia.

## Resultado implementado

| Hallazgo | Cambio y ubicación | Alcance verificado |
|---|---|---|
| S1: esquema superficial / YAML numérico | `shared/inputValidation.ts`, `src/operationGuard.ts:18`, `shared/domain.ts:620`, `shared/exportManifest.ts:194` | Contratos de campos y tipos, enums de proyecto/settings, números enteros finitos dentro del rango, cantidades y textos acotados. Los campos extra, objetos con getters y snapshots inválidos se rechazan antes del fingerprint. Una duración string con salto de línea no llega a generar YAML. Las reglas semánticas de roles, proveedores y financiación siguen en sus validadores existentes. |
| S2: salida del directorio por nombres | `electron/files.ts:32`, `:48`, `:83`; `electron/main.ts:369` | Nombres hoja portables y contención léxica; rechazo de ancestros symlink/junction antes y después de crear directorios. Se conservan `wx` y copias versionadas, sin sobreescribir destinos. Un junction de Windows de prueba no permite escribir en su destino. |
| S3: confianza IPC / fuente de adjuntos | `electron/main.ts:73`, `:340`, `:799`, `:839`; `electron/files.ts:83` | Todos los handlers usan ventana registrada, main frame y URL del documento esperado. Settings se valida en main. El selector guarda identidad/metadatos; ejecución exige selección previa coincidente y archivo regular sin symlink. La copia usa descriptor, límite real, identidad antes/después y bloques acotados. |
| S4: texto ilimitado | `shared/inputValidation.ts:2`; `GuidedCreation.tsx:320`; `ContextStage.tsx:50`; `AutoGrowTaskField.tsx:55`; `mode1Draft.ts:151` | Contexto 20.000, restricciones 10.000 y tarea 5.000 unidades UTF-16. Contadores y `maxLength` en la entrada; validación compartida vuelve a comprobar snapshots restaurados/manipulados. El agente principal integró los errores ES/EN y el bloqueo de preview excedido en App/flujo. |
| S5: estructura Markdown no delimitada | `shared/domain.ts:549` | Contexto/restricciones con sintaxis Markdown, HTML o saltos se representan literalmente en una cerca más larga que cualquier secuencia interna de backticks. Nombre/labels/adjuntos se escapan para contexto inline. El contenido original de prosa permanece íntegro; `<script>`, SQL y Unicode legítimo siguen permitidos. |
| S6: nombres / paths ZIP | `shared/inputValidation.ts:227`; `shared/domain.ts`, `slugify`; `src/webExport.ts:158` | NUL/controles y nombres excesivos se rechazan. Slug reservado `CON` pasa a `project-con`. Cada ruta final del ZIP debe estar bajo la raíz, ser relativa y portable, sin segmentos de ascenso ni duplicados tras NFC/case. El resolver de nombres web conserva su asignación determinista y añade un límite de longitud. |
| S7: comunicación sobre adjuntos | `src/components/creation/GuidedAttachments.tsx:67`, `:115` | “Listo para incluir / Ready to include”; texto explícito de comprobación de tipo/tamaño y ausencia de análisis de malware o verificación de licencia. |

No se añadió IA, dependencia de servicio, endpoint, telemetría, envío del proyecto, detector de palabras, sanción de cuenta ni cambio de Términos como parte de este incremento. La prosa no se borra ni se sustituye por un texto “limpio”. La representación Markdown y el nombre del archivo exportado son transformaciones de salida por contexto, no una clasificación del usuario.

## Límites y compatibilidad

- La longitud utiliza `String.length` y `maxLength`: unidades UTF-16, no bytes ni grafemas. Por ejemplo, muchos emoji cuentan como dos. El texto multilínea acepta tabulador, CR y LF; rechaza NUL y otros controles C0/DEL. Nombres, etiquetas y rutas son de una línea. Los controles de dirección visual se restringen en nombres de destino, no en toda la prosa.
- Un borrador anterior por encima del límite queda inválido para preparar/exportar; el validador no lo recorta. `maxLength` limita nuevas entradas en el formulario y el contador hace visible el presupuesto. La migración y aislamiento del almacén de borradores pertenecen al trabajo concurrente. No se agregó el límite global de 256 KiB que el diseño proponía calibrar: sí se acotaron campos, arrays y objetos antes de serializar.
- El contrato estricto exige campos actuales y rechaza extras. La ruta normal conserva la migración existente de borradores anteriores. Se corrigieron tres fixtures de exportación que omitían `funding` o usaban la ruta inexistente `aekr`; no se relajó el contrato para aceptar esos valores.
- Los nombres web se resuelven como antes y ahora tienen longitud acotada; el ZIP contiene los nombres resultantes y sus bytes originales. No se añadió una nueva tabla UI de renombrados. El destino desktop rechaza nombres no portables en vez de admitir traversal o controles. Un archivo cambiado, selección perdida al reiniciar, junction o nombre rechazado puede requerir volver a seleccionar el archivo/directorio.
- La identidad local comprobada (`size`, `mtimeMs`, `ino`, `dev`) detecta sustituciones/cambios ordinarios; no equivale a un hash de contenido ni a antivirus. Los chequeos de padres por path no forman un sandbox resistente a un proceso local hostil que reemplace directorios concurrentemente. La copia no sigue el symlink final y revalida el descriptor, pero no se promete una transacción de filesystem completa.
- S3 se implementó de forma acotada: el registro main guarda las selecciones de archivo por su path y metadatos; no se sustituyó el protocolo por tokens opacos. El directorio de destino continúa siendo una opción explícita del proyecto; no se impuso un nuevo registro de capacidades de directorios. El emisor válido reduce superficie, pero no convierte un renderer comprometido en una entidad confiable para toda operación disponible.
- S5 reduce la creación accidental de estructura activa en Markdown. Una instrucción escrita dentro de datos aún puede influir en un modelo posterior. No se afirma protección absoluta contra prompt injection, ni control de visores, herramientas o permisos fuera de accreatio.
- Las extensiones siguen siendo el filtro actual; no se agregaron parsers de PDF/Office, descompresión, firmas mágicas o análisis antivirus. Un documento dañino renombrado puede incluirse como bytes. Incluirlo no lo ejecuta en accreatio; abrirlo o interpretarlo en otra aplicación tiene otra frontera.

## Rechazos y mensajes

`contextTooLong` y `restrictionsTooLong` corresponden a errores de campo traducidos por App. Para tipos, fases y contratos inválidos se conserva el código genérico `invalid` o los códigos existentes de participantes/financiación. El guardián de ejecución lanza un error antes de preparar el paquete; los errores enumeran campos/códigos, no el contenido privado.

En desktop, una selección inexistente devuelve `Attachment is not an authorized file selection; select it again`; una identidad modificada devuelve `Attachment changed; select it again`; un ancestro redirigido devuelve `Unsafe project destination`. Son errores de ejecución mostrables por el mecanismo existente, no pruebas de mala intención ni motivos de suspensión. El control de directorios puede rechazar un junction legítimo: seleccionar una ruta física normal resuelve ese caso conservador.

El único documento `data:` admitido por la validación de emisor es el documento fijo del smoke, con su bandera explícita existente y ventana registrada. El smoke utiliza `attachments: []`; no se añadió excepción para omitir selección o controles de archivo en producción.

## Evidencia ejecutada

En este incremento se ejecutó el siguiente conjunto sobre el código final:

```powershell
node --import tsx --test tests/inputSecurity.test.ts tests/core.test.ts tests/webExport.test.ts tests/operationGuard.test.ts tests/files.test.ts tests/exportManifest.test.ts tests/bridge.test.ts tests/draftStore.test.ts tests/mode1Draft.test.ts tests/providerRegistry.test.ts tests/funding.test.ts
npx.cmd tsc -p tsconfig.app.json --pretty false
npx.cmd tsc -p electron/tsconfig.json --noEmit --pretty false
```

Resultado: **121 pruebas aprobadas, 0 fallos, 0 omitidas; ambos typechecks con exit 0**. Log local: `.local/logs/security-input-targeted-2026-10-21.log`.

`tests/inputSecurity.test.ts` aporta ocho pruebas agrupadas: tipos/enums/campos extra/controles/YAML; rechazo previo a fingerprint, archivo, autorización y descarga; límites exactos y exceso sin mutar texto; SQL/script/Unicode literales y escape React; rutas ZIP; rechazo de nombres sin crear directorio; fuentes modificadas/directorio sin copia; junction real sin escritura redirigida. Las pruebas existentes conservan copia exclusiva/versionada, extracción de ZIP con bytes binarios/NUL e identidad de adjuntos, topologías, proveedores y financiación. La prueba de React usa render SSR de un nodo `pre`; no se presenta como un ensayo de explotación XSS en un navegador real.

Las escrituras de pruebas se hicieron en directorios temporales propios con limpieza posterior. Los payloads sintéticos no se enviaron a servicios externos. Ningún test ejecutó como programa los textos SQL/JavaScript probados ni un runtime de orquestación.

La revisión de `scripts/electron-execute-smoke.mjs` y `runExecuteSmoke` confirmó compatibilidad de fuente con el nuevo emisor y selección de archivos. Este subagente no ejecutó build general, smoke empaquetado, UI global, commit ni despliegue. El agente principal realiza esos pasos sobre el conjunto integrado; sus resultados deben citarse desde el recibo general, sin convertir los typechecks o esta lectura de fuente en evidencia de ejecución de Electron.

## Moderación y copyright

Permanece el diseño descrito en las secciones 5–6 del informe anterior: no inferir infracción, licencia o intención por palabras. Una exportación local rechazada por tamaño/ruta no constituye evidencia server-side de abuso. El servicio de cuentas sigue sin recibir el proyecto; una suspensión por contenido no podría fundarse en esos datos inexistentes ni en un booleano del cliente. Una futura política necesitaría hechos verificables, proporcionalidad, motivos y revisión/apelación según el contexto jurídico aplicable. No se implantó esa política ni se añadió un gate humano para este incremento técnico autorizado.

Las referencias primarias OWASP/Electron/Cloudflare/WIPO/U.S. Copyright Office se mantienen vinculadas en el [informe de diseño](SECURITY_INPUT_ABUSE_DESIGN_2026-10-21.md#8-referencias-primarias-consultadas). Describen criterios y límites; este recibo documenta controles comprobados, no seguridad absoluta ni asesoría jurídica definitiva.
