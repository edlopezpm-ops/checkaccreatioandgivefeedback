# Evaluación independiente de diseño visual — accreatio

Fecha de inspección: 20 de octubre de 2026, hora de Nueva York; las capturas llevan fecha UTC del 21 de octubre. Código local observado: `70612512e2115036fa71a08075a596a04bbff942`.

## Dictamen

La base visual es coherente y está bastante más resuelta en el formulario de creación que en la entrada y la lectura del Blog. La paleta oscura, el acento lavanda, los títulos claros y la columna de trabajo contenida producen una interfaz reconocible. El creador evita el aspecto de un formulario administrativo genérico y mantiene una acción principal identificable.

No recomiendo rehacer la marca ni añadir más ornamentación. Recomiendo una pasada de legibilidad y consistencia: hacer distinguibles los campos sin foco, corregir la justificación del Blog, reducir la densidad de la entrada y resolver detalles de acabado. Hay fallos concretos y oportunidades editoriales; no todo lo que sigue es un defecto funcional.

La evaluación usa criterios de comunicación visual, legibilidad, interacción y acabado del producto. AEKR no se utilizó como marco de calidad, requisito estético ni argumento de aprobación.

## Método y límites

- Navegador real Microsoft Edge mediante Playwright. Producción pública `https://accreatio.com/` observada sin iniciar sesión, aceptar términos, enviar formularios ni abrir proveedores externos.
- Viewports principales: **1440 × 1000 CSS px** y **390 × 844 CSS px**. En producción, la barra de desplazamiento deja 375 px de ancho útil en capturas móviles. No se probó un dispositivo físico, Safari, lector de pantalla, zoom del sistema ni todos los tamaños intermedios.
- Producción: bienvenida 1–2, entrada, Blog, About y preferencias de cookies. Local: los ocho pasos del creador, error de campo vacío, roles expandidos, revisión final, diálogo previo a ejecución y menú de cuenta.
- Los interiores se observaron en `http://localhost:5173/` con respuestas de cuenta **ficticias**, cuota 5 y un correo `.test`. El harness está en `.local/logs/independent-review-2026-10-20/design/inspect-local.mjs` y usa `../review-fixture.mjs`. Es evidencia del frontend; no prueba autenticación, cuota, backend, exportación real ni equivalencia completa con producción. No se ejecutó la revisión final ni se descargaron proyectos o datos de cuenta.
- Las capturas locales se hicieron con movimiento reducido. Producción conservó su presentación normal. No se juzgó la comodidad de la animación durante una sesión prolongada.
- Primero se observaron píxeles; después se consultaron componentes y CSS para localizar causas. No se leyeron memoria, documentación histórica, `docs/design*`, `docs/archive` ni informes de otros auditores. No se implementaron cambios en el producto.
- Una captura de página completa con scroll previo puede desplazar elementos fijos. Las capturas locales de referencia se regeneraron desde scroll 0 y los dos overlays se capturaron como viewport. Esos artefactos iniciales no se consideran fallos del producto.

## Lo que conservaría

**La jerarquía del creador.** Pregunta principal, ayuda, control y siguiente acción están en un orden estable. El formulario deja suficiente aire entre decisiones y no obliga a leer una explicación extensa para encontrar el campo. Las opciones de los pasos 2 y 5 combinan borde, fondo y marca de selección; la selección no depende solo del color. Evidencia: `local-builder-desktop.png`, `local-step-2-desktop.png` y `local-step-5-desktop.png`.

**La adaptación móvil básica.** A 390 px, el creador mantiene una columna, botones utilizables, etiquetas visibles y texto sin recortes en los estados inspeccionados. El ancho de documento medido en la revisión local fue 390 px: no se encontró desbordamiento horizontal en esa muestra. La navegación móvil tiene objetivos de 44 px para New project, cuenta, Blog, About e idioma. Evidencia: `local-builder-mobile.png`, `local-roles-expanded-mobile.png`, `local-step-8-mobile.png` y `local-measurements.json`.

**La señalización del error de campo.** El estado vacío muestra texto coral junto al campo y un aviso adicional, con borde de error y foco lavanda. Es más claro que un aviso genérico separado. Evidencia: `local-builder-empty-error.png` y `local-builder-mobile.png`. Esto no constituye una auditoría completa de anuncios por lector de pantalla.

**La familia gráfica principal.** El símbolo orbital, la paleta azul violeta, los contenedores oscuros y los iconos de línea funcionan juntos. Los iconos de acciones suelen acompañar texto, evitando que la persona tenga que adivinar su significado. Mantendría esos activos y la marca existente.

**El diálogo de confirmación.** En el viewport móvil inspeccionado se distinguen el modo elegido, el efecto de la operación, la cancelación y la acción. Los objetivos son amplios y la superficie está claramente separada del fondo. Evidencia: `local-confirm-mobile.png`. Hay un detalle de presentación de ruta redundante que se recoge abajo.

## Hallazgos comprobados

| ID | Hallazgo y efecto observable | Evidencia | Prioridad / impacto / esfuerzo |
| --- | --- | --- | --- |
| V01 | **El campo en estado neutro se separa muy poco de su entorno.** El borde medido es `#2b3246`, el relleno `#0d1019` y la tarjeta exterior muestreada `#0f111b`. La relación borde–relleno es **1,49:1** y borde–exterior aproximadamente **1,48:1**. El texto sí tiene contraste alto; el problema es reconocer la superficie editable antes de enfocar. | `local-builder-desktop.png`, `local-measurements.json`, `field-pixel-samples.json`, `contrast-measurements.json`; `src/styles.css:48`, `src/styles.css:51`, `src/styles.css:820`. | **P1** / alto para baja visión / bajo. Elevar el contraste de la delimitación de entradas y validar los controles equivalentes. |
| V02 | **La justificación produce huecos y ríos de blanco en el Blog móvil.** Con una columna medida de 313,96 px, cuerpo de 14 px e interlínea de 23,8 px, varias líneas estiran mucho los espacios entre palabras. La cadencia se vuelve irregular pese a tener una interlínea razonable. | `public-mobile-blog-reading.png`, `public-mobile-blog-top.png`, `public-mobile-measurements.txt`; `src/components/BlogExperience.css:280`–`286`. | **P2** / medio-alto para lectura / bajo. Alinear al inicio, especialmente en móvil; conservar ancho e interlínea y volver a ver los párrafos largos. |
| V03 | **La entrada concentra demasiado texto pequeño antes de su única acción.** A 390 × 844, el aviso de políticas usa **11,9 px**, ocupa aproximadamente 295 px y el botón de Google comienza a **906 px** desde el inicio de la página. El botón requiere scroll antes de poder empezar. Después aparecen más párrafos y enlaces legales repetidos. | `public-mobile-signin.png`, `public-desktop-signin.png`, `public-signin-measurements.txt`; `src/web-branding.css:537`–`550`, `src/web-branding.css:623`–`625`. | **P2** / medio-alto / medio. Reorganizar el texto y sus niveles visuales manteniendo visible el aviso necesario junto a la continuación. No ocultar condiciones para ganar espacio. |
| V04 | **El primer título de bienvenida recibe un contorno negro nativo.** Se ve un rectángulo oscuro alrededor del H1 sobre una tarjeta ya oscura, como un residuo del navegador. Está confirmado también en local: H1 activo, `outline: auto 1px rgb(16,16,16)`. | `public-desktop-initial.png`, `local-initial.png`, `local-measurements.json`; `src/components/Onboarding.tsx:30`, `src/components/Onboarding.tsx:49`, `src/styles.css:709`. La entrada ya tiene una excepción específica en `src/web-branding.css:528`. | **P3** / bajo / bajo. Dar al encabezado enfocado un tratamiento deliberado; conservar el foco semántico y los anillos de controles interactivos. |
| V05 | **El diálogo repite el nombre del ZIP como ruta y nombre.** Se presenta `independent-visual-review.zip: independent-visual-review.zip`. El bloque monoespaciado ocupa dos líneas y parece una ruta técnica sin añadir información en web. | `local-confirm-mobile.png`, `local-confirm-snapshot.txt`. | **P3** / bajo / bajo. Mostrar el nombre una sola vez y reservar estructura de rutas para cuando aporte una distinción real. |

Para V01, la referencia de accesibilidad es el contraste de **3:1** para información visual necesaria para identificar controles y estados, explicado en [WCAG 2.2, contraste no textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). La medición identifica un problema concreto de delimitación del campo, no certifica el conjunto de la aplicación. Se muestreó una tarjeta translúcida y un fondo específico; deberán comprobarse también otras posiciones y estados.

V03 es una medición de densidad y ubicación. Un cuerpo de 11,9 px o un botón bajo el primer pliegue no demuestran por sí solos incumplimiento WCAG ni abandono de usuarios. La inferencia de diseño es que la pantalla da más peso a la explicación institucional que a la decisión inmediata.

## Preferencias de diseño y oportunidades

Estas propuestas son juicios profesionales o hipótesis para comprobar, no errores funcionales demostrados.

| Conservar / cambiar / quitar / agregar | Propuesta y motivo | Impacto / esfuerzo |
| --- | --- | --- |
| **Cambiar** la composición de entrada | La tarjeta inicial queda a la izquierda y gran parte del desktop se dedica a atmósfera. Es intencional y puede funcionar como identidad, pero se explica un resultado todavía invisible. Reequilibraría la composición con una muestra real y pequeña del resultado: prompt, plan y árbol de archivos. No agrandaría más el título ni el logo. Evidencia: `public-desktop-initial.png`. | Medio / medio. Hipótesis de comprensión; no se midió conversión. |
| **Agregar** una muestra antes del acceso | Un ejemplo de salida o una vista de tres artefactos haría tangible el producto sin crear un carrusel decorativo. Serviría mejor que otro párrafo sobre el método. Debe ser ejemplo identificado, no falsa ejecución o contenido de otra persona. | Medio-alto / medio. |
| **Cambiar** el Blog como destino de lectura | Tres artículos completos seguidos producen una página de **7290 px** en la muestra móvil. Añadir un índice breve por título o entradas independientes permitiría elegir lectura y volver a orientarse. No hacen falta imágenes de relleno. Evidencia: `public-mobile-blog.png`, `public-mobile-measurements.txt`; render de artículos completos en `src/components/BlogExperience.tsx:488`–`524`. | Medio / medio. |
| **Cambiar** la escala de texto auxiliar | FAQ, ToS y Cookie preferences llegan a **10,5 px** en el creador móvil; la navegación principal usa 12,25 px. Sus áreas táctiles suelen ser de 44 px, así que el problema observado es de lectura, no de tamaño del área pulsable. Subiría un nivel la ayuda útil y conservaría las etiquetas secundarias realmente secundarias. Evidencia: `local-measurements.json`; `src/web-branding.css:213`–`237`. | Medio / bajo. No se declara un incumplimiento solo por tamaño. |
| **Cambiar** el peso del CTA final | El botón final pasa de rectángulo moderado a gran píldora, brillo y cohete. Es visible, pero introduce otra voz gráfica y hace parecer más extraordinaria una revisión seca. Mantendría énfasis y tamaño accesible con la familia de botones ya establecida. Evidencia: `local-step-7-desktop.png` frente a `local-step-8-desktop.png`. | Bajo-medio / bajo. Preferencia de consistencia. |
| **Quitar** los perfiles sociales pendientes de la superficie pública hasta que tengan destino | X y LinkedIn tienen aspecto de iconos sociales vecinos al enlace de Instagram, pero el árbol accesible los identifica como imágenes de perfil pendiente. No están rotos como enlaces: no son enlaces. Aun así, visualmente prometen una acción que no existe. Evidencia: `public-mobile-signin.png`, snapshots públicos; `src/components/AekrSignature.tsx:42`, `src/components/AekrSignature.tsx:63`. La recomendación no implica redibujar activos ni alterar su propiedad. | Bajo / bajo. |
| **Cambiar** la separación visual de acciones de cuenta | Exportar datos, salir y eliminar cuenta reciben casi el mismo botón. Separaría la acción irreversible mediante agrupación y texto, conservando claridad y sin depender solo del rojo. No se abrió la eliminación ni se evaluó su confirmación. Evidencia: `local-account-menu-mobile.png`. | Medio / bajo. Riesgo de confusión hipotético, no eliminación accidental observada. |
| **Conservar** el fondo y moderar su protagonismo | La atmósfera da personalidad. En el creador es secundaria y funciona mejor que en la bienvenida. Mantendría esa relación: la decisión y el resultado deben llevar el contraste y la atención principales. No recomiendo sustituirla por otra ilustración generada. | Medio / bajo-medio. |

## Orden de trabajo recomendado

1. Corregir delimitación de campos y verificar contraste en estados neutro, hover, foco y error. Mantener los buenos indicadores ya presentes.
2. Corregir alineación del Blog y reorganizar entrada y tamaños auxiliares. Verificar en los mismos viewports antes de añadir secciones.
3. Resolver contorno del H1, nombre duplicado del ZIP, iconos pendientes y consistencia de botones.
4. Probar una muestra real de salida y navegación editorial. Evaluar si mejora la comprensión con personas ajenas al proyecto; no asumirlo a partir de esta revisión.

No abriría una nueva dirección artística para resolver estos puntos. El trabajo con mayor retorno está en la presentación de la información y la calidad de los estados existentes.

## Evidencia visual consultada

Directorio de evidencia: [.local/logs/independent-review-2026-10-20/design](../gallery.json).

Se abrieron y observaron los píxeles de estas capturas, no solo sus nombres o snapshots:

- Públicas: `public-desktop-initial.png`, `public-desktop-welcome-2.png`, `public-desktop-signin.png`, `public-desktop-blog.png`; `public-mobile-signin.png`, `public-mobile-blog.png`, `public-mobile-blog-top.png`, `public-mobile-blog-reading.png`, `public-mobile-about-top.png`, `public-mobile-cookie.png`.
- Locales con fixture: `local-initial.png`, `local-builder-desktop.png`, `local-builder-empty-error.png`, `local-builder-mobile.png`, `local-step-2-desktop.png`, `local-step-3-desktop.png`, `local-step-4-desktop.png`, `local-step-5-desktop.png`, `local-step-6-desktop.png`, `local-roles-expanded-desktop.png`, `local-roles-expanded-mobile.png`, `local-step-7-desktop.png`, `local-step-8-desktop.png`, `local-step-8-mobile.png`, `local-confirm-mobile.png`, `local-account-menu-mobile.png`.

`public-mobile-about.png` se capturó, pero no se utilizó como revisión de píxeles de la página completa. About se evaluó en su primer viewport y mediante estructura accesible; no se afirma revisión visual de cada bloque inferior. Tampoco se inspeccionó visualmente la aplicación Electron ni estados reales de éxito, error de red, cuota agotada o cuenta pendiente.

Los valores reproducibles están en `local-measurements.json`, `field-pixel-samples.json`, `contrast-measurements.json`, `public-mobile-measurements.txt` y `public-signin-measurements.txt`. Los snapshots describen estructura y texto; por sí solos no prueban legibilidad visual ni accesibilidad completa.
