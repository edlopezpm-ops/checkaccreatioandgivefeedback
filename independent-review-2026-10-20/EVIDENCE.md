# Evidencia seleccionada y procedencia

Revisión independiente de accreatio, 20 de octubre de 2026, America/New_York. Las capturas nocturnas tienen fecha UTC del 21. Checkout local examinado: `70612512e2115036fa71a08075a596a04bbff942`.

Esta selección permite examinar las observaciones principales sin recuperar los logs ignorados. No es un runner de pruebas completo ni una prueba de equivalencia entre el checkout y el despliegue público.

## Archivos preservados

| Archivo | Origen y significado |
| --- | --- |
| [public-welcome-desktop.png](evidence/public-welcome-desktop.png) | Web pública ES, sesión nueva del coordinador. Viewport 1440 × 1000; imagen de página completa de 1440 × 1109. |
| [public-access-mobile.png](evidence/public-access-mobile.png) | Web pública ES, coordinador; viewport 390 × 844, imagen completa de 390 × 1445. No se pulsó el acceso a Google. |
| [public-blog-snapshot.txt](evidence/public-blog-snapshot.txt) | Árbol accesible del Blog público, leído sin sesión; interfaz ES y artículos originales EN. Permite contrastar la afirmación histórica de Access con la lectura pública observada. |
| [public-mobile-blog-reading.png](evidence/public-mobile-blog-reading.png) | Auditor visual, web pública; viewport de 390 × 844. Se conservó el scroll de lectura intencionado para mostrar la composición de los párrafos. |
| [public-signin-measurements.txt](evidence/public-signin-measurements.txt) | Auditor visual, acceso público EN a 390 × 844. Tamaño de políticas, altura y posición del botón. No es la misma captura ES del coordinador. |
| [local-builder-desktop.png](evidence/local-builder-desktop.png) | Auditor visual, frontend local con cuenta ficticia, 1440 × 1000. Campo neutro y jerarquía del creador. |
| [contrast-measurements.json](evidence/contrast-measurements.json) | Auditor visual: colores calculados y muestras del campo de la imagen anterior. Relación borde–exterior ≈1,48:1. El JSON incluye método y límites. |
| [local-output-fixture.png](evidence/local-output-fixture.png) | Auditor de producto, resultado del frontend local con cuenta ficticia; imagen 1113 × 1686. No es una captura de producción autenticada. |
| [zip-inspection.txt](evidence/zip-inspection.txt) | Auditor de producto: inventario del ZIP, tamaños descomprimidos, hash y fragmentos de START, discovery y PROJECT_PROMPT. El campo `bytes: 59261` es la suma sin comprimir. |
| [huerto-comunitario-sample.zip](evidence/huerto-comunitario-sample.zip) | Descarga local examinada, con idea inventada de turnos de riego y tareas de un huerto. 17 entradas, 62.231 bytes de archivo y 59.261 de contenido sin comprimir. No se ejecutaron las instrucciones del paquete. |
| [review-fixture.mjs](evidence/review-fixture.mjs) | Harness compartido de observación: intercepta exclusivamente API en `http://localhost:5173`, simula cuenta, cuota y publicaciones semilla. No implementa ni valida identidad o backend. Cada auditor describe en su informe el procedimiento que usó. |
| [Navegación: antes](evidence/navigation-before-browser-back.json), [Atrás](evidence/navigation-after-browser-back.json), [Adelante](evidence/navigation-after-browser-forward.json), [idea recuperada](evidence/navigation-recovered-idea.json) | Auditor de flujo, localhost con cuenta ficticia. Documentan el texto recién introducido, salida a about:blank, vuelta al paso 1 y ausencia de ese último texto al regresar a la idea. No se esperó expresamente al guardado. |
| [inspect-navigation.mjs](evidence/inspect-navigation.mjs) | Script original de esa observación. La importación `../review-fixture.mjs` corresponde a su ubicación original bajo `flow/`; para repetir desde esta copia hay que apuntarla a `./review-fixture.mjs` y tener el servidor local activo. |
| [manifest-v2.json](evidence/manifest-v2.json) | Selección final, incluidos los registros de navegación: tamaños, dimensiones de PNG y SHA-256. Excluye los propios manifiestos. [manifest.json](evidence/manifest.json) conserva la primera selección de once archivos. |

Los archivos son copias de la evidencia original, sin redibujar ni editar capturas. Los nombres de cuenta sintéticos usan el dominio reservado `.test`. No se incluyen cookies, tokens, códigos de acceso ni datos de una cuenta real.

SHA-256 del ZIP: `1E24BF0320113C13139EAFF9063579A8DF3F7DA794641BB144B445DAC98F0590`.

## Límites y evidencia restante

Producción se observó en modo público. No se inició sesión, solicitaron códigos ni realizaron acciones de cuenta. El fixture local permite evaluar las pantallas posteriores sin usar identidad real; su respuesta de cuota no prueba autorización, límites ni recuperación en el servicio desplegado.

La evidencia detallada original está bajo `.local/logs/independent-review-2026-10-20/`, separada en `product/`, `design/`, `copy/`, `flow/` y `root/`. Es material ignorado por Git y puede no existir en otro checkout. Los informes individuales identifican las capturas realmente vistas, los snapshots y las lecturas de fuente; las listas no implican que cada estado del producto haya sido ejecutado.

La inspección en Edge con un viewport estrecho no sustituye un dispositivo móvil físico ni pruebas completas de teclado, zoom o lector de pantalla. La medición del contraste de un campo no certifica accesibilidad global. El archivo ZIP demuestra lo descargado en el escenario local, sin demostrar el éxito de la continuación posterior en un IDE.
