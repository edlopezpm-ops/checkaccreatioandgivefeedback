# Evaluación independiente de producto — accreatio

Fecha: 20 de octubre de 2026, America/New_York. Evidencias del navegador fechadas en UTC el 21 de octubre. Código examinado: `70612512e2115036fa71a08075a596a04bbff942`, versión declarada 0.8.0.

## Juicio

**accreatio entrega un preparador de paquetes de contexto que funciona, pero su propuesta todavía es más amplia y amable que el trabajo que realmente facilita.** Hay valor en convertir decisiones dispersas en archivos portables, revisables y listos para llevar a un IDE. El recorrido local examinado produjo un ZIP real. No encontré una transformación comparable de la idea en un proyecto de software específico: el prompt repite las respuestas y el plan describe la exportación. La continuación añade, además, la construcción de un orquestador que el usuario no pidió en el flujo básico.

Mi recomendación es concentrarlo primero en **preparar un buen encargo para trabajar con un asistente de programación**, con una salida autocontenida y una primera acción inequívoca. Aumentar integraciones o automatización antes de resolver esto ampliaría la superficie del producto sin probar que ahorra trabajo al usuario.

Este juicio evalúa utilidad, comprensión y esfuerzo de uso. No califica adhesión a AEKR ni la calidad de ese método. El contenido metodológico incluido en el ZIP se considera únicamente como parte de lo que recibe y debe entender una persona que llega al producto.

## Método y límites

- Revisión desde cero de las superficies actuales, sin consultar memoria, auditorías previas, planes de diseño ni informes de otros revisores.
- Navegación real en Microsoft Edge, con sesiones nuevas y separadas: web pública `https://accreatio.com/` y frontend local `http://localhost:5173/`.
- En producción examiné bienvenida, explicación de privacidad, pantalla de acceso, About, FAQ de acceso y Blog. **No inicié sesión, no solicité códigos, no envié correo y no ejecuté mutaciones externas.**
- En local completé las ocho preguntas del recorrido de idea inicial y descargué el ZIP. Las API de cuenta se interceptaron únicamente en localhost con respuestas ficticias; el fixture usado está en la evidencia. Esto comprueba el recorrido del frontend y su exportación local; **no comprueba identidad, cuota, backend de cuenta ni exportación autenticada de producción**.
- Caso ficticio: una app para que veinte vecinos reserven turnos de riego y consulten tareas de un huerto; restricción de servicios gratuitos, Windows y datos personales mínimos. Se mantuvieron un generalista, ruta local y opciones iniciales de integración. No se activó orquestación; el ZIP no contiene su YAML.
- Inspeccioné nombres y tamaños de todas las entradas y leí START, PROJECT_PROMPT, discovery y SETUP del ZIP. No ejecuté sus instrucciones ni pedí a otra AI que construyera nada.
- Fuentes principales: `src/App.tsx`, `src/core.ts`, `src/webExport.ts`, componentes de bienvenida, About, creación, revisión y resultado; `shared/domain.ts`, `shared/exportManifest.ts` y los párrafos del Blog ya visibles públicamente. No examiné la aplicación Electron en ejecución.
- No hay entrevistas, métricas de adopción, prueba de retención ni comparación de resultados en proyectos reales. Las afirmaciones sobre público y abandono son hipótesis de producto, no datos de usuarios.

## Lo que sí entrega y conviene conservar

1. **Un resultado que la persona se puede llevar.** El ZIP se descargó y pudo inspeccionarse sin instalación ni conexión a un proveedor de AI dentro del flujo de preparación local. Tiene 17 entradas: 59.261 bytes de contenido sin comprimir; el archivo ZIP ocupa 62.231 bytes. La construcción usa un manifiesto compartido y añade SETUP para los pasos que el navegador no puede hacer. Evidencia: `src/webExport.ts:100-148`; `product/zip-inspection.txt`; `product/local-output.png`.
2. **La interfaz reduce el formulario a preguntas manejables.** El nombre, el punto de partida, la idea y los límites tienen ayuda breve; los límites son opcionales; hay vuelta atrás y revisión. El caso ensayado conservó sus respuestas hasta el resultado. Esto es una mejora concreta frente a entregar una plantilla vacía sin explicación. Evidencia: `src/components/creation/GuidedCreation.tsx:227-266`; `product/local-review.md`.
3. **El equipo por defecto no exige diseñar una organización.** Un generalista basta y la configuración adicional queda plegada. La advertencia de que los roles preparan instrucciones y no ejecutan agentes es clara y honesta. Evidencia: `src/components/creation/GuidedCreation.tsx:486-550`; snapshot `.playwright-cli/page-2026-10-21T02-14-04-975Z.yml`.
4. **El producto permite inspeccionar antes de exportar.** El prompt se puede leer, copiar o descargar. El manifiesto y el plan están disponibles por separado. El resultado distingue preparación del ZIP de comprobación de que el navegador lo guardó. Evidencia: `src/components/creation/ReviewStage.tsx:212-284`; `src/components/creation/OutcomePanel.tsx:130-138`; `product/local-review-expanded.md`.
5. **Hay identidad visual y una navegación pública sencilla.** La bienvenida, el acceso y el resultado comparten una presentación reconocible; el producto no parece un conjunto de formularios sin conexión. Es una apreciación visual del recorrido observado, no un estudio de usabilidad. Evidencia: `product/public-home.png`, `product/public-access.png`, `product/local-output.png`.

## Hallazgos principales

### P0 — La salida no es autocontenida para su propio prompt

**Verificado.** PROJECT_PROMPT termina indicando que se sigan `toolkit/MASTER_SOP.md` y `toolkit/project-scaffolds/project-lifecycle/SOP.md`. Ninguna ruta existe en el ZIP descargado. Tampoco se proporcionan ahí instrucciones para obtenerlas. No es sólo una preocupación sobre un estándar: la persona entrega a su asistente una orden que depende de archivos ausentes.

Evidencia: `shared/domain.ts:533-545`; lista completa en `shared/exportManifest.ts:255-310`; comprobación de rutas ausentes y texto exportado en `product/zip-inspection.txt`.

**Impacto inferido.** La primera sesión en un IDE puede detenerse, buscar material fuera del paquete o inventar cómo continuar. El producto pierde parte de su ventaja de portabilidad justo cuando deja de estar presente para orientar al usuario.

**Propuesta.** Entregar un prompt que funcione sólo con lo incluido y comprobar sus referencias en cada exportación. Si se decide mantener una dependencia externa, nombrarla como requisito previo y proporcionar una resolución explícita. El éxito se mide abriendo el ZIP en una carpeta nueva y pudiendo cumplir la primera instrucción sin contexto de su autor.

### P1 — El primer trabajo recomendado es construir infraestructura de coordinación

**Verificado.** START manda construir el orquestador antes de comenzar. La instrucción no depende de haber activado orquestación. El manifiesto incluye `orchestrator/BUILD_ORCHESTRATOR.md` siempre; el YAML sí es condicional. En el caso básico examinado recibí esa guía aunque no habilité orquestación.

Evidencia: `shared/exportManifest.ts:49-80`, `:88-109`, `:283-299`; START y ausencia del YAML en `product/zip-inspection.txt`.

**Impacto inferido.** Quien quería organizar una app de turnos termina pidiendo a una AI que construya herramientas de trabajo. Para un usuario experto puede ser una elección válida; para el recorrido básico aumenta dependencias y aplaza el primer avance en su idea. La frase de START que atribuye el resto del trabajo a la AI también transmite más facilidad de la demostrada por esta revisión.

**Propuesta.** El primer paso por defecto debería tratar el proyecto del usuario: revisar el encargo, identificar desconocidos y proponer un primer entregable pequeño. La preparación de un orquestador debe aparecer al elegir expresamente ese tipo de kit. Esto no exige eliminar esa capacidad del producto.

### P1 — “Plan determinista” describe exportar archivos, no resolver la idea

**Verificado.** Para el huerto, el plan visible consta de crear la carpeta y preparar reglas/firma. PROJECT_PROMPT conserva la descripción y las restricciones prácticamente como fueron escritas. No añade historias de uso, alcance mínimo, prioridades ni un criterio específico de éxito. La ruta elegida se inserta como un valor en el prompt; el plan de exportación no deriva tareas del problema.

Evidencia: `src/core.ts:132-223`; `shared/domain.ts:533-553`; `product/local-review-expanded.md`, especialmente el plan y el prompt.

**Interpretación.** Una transformación determinista y local no tiene que inventar decisiones ni usar AI para ser útil. El problema es que el lenguaje amplio de “organizar la idea en un plan” deja ambiguo qué clase de plan recibe la persona.

**Propuesta.** Nombrar la vista actual “Qué incluirá tu paquete” o “Pasos de exportación”. Para aportar más valor sin llamadas a AI, recoger explícitamente problema, destinatario, primera versión, exclusiones y cómo reconocer un buen resultado. Exportar esas respuestas como un encargo legible, conservando como desconocido lo que el usuario no sabe. No hacen falta cinco nuevas pantallas: puede ser una sola sección con campos opcionales y un ejemplo.

### P1 — El acceso exige compromiso antes de mostrar una prueba concreta de utilidad

**Verificado.** La visita nueva pasa por dos pantallas de bienvenida y luego requiere cuenta antes de nombrar o probar un proyecto. La pantalla pública observada ofrecía Google para cuentas nuevas y anunciaba cinco exportaciones por 24 horas. En las superficies públicas examinadas no encontré un ejemplo ya resuelto de prompt/ZIP ni una demo del armador sin cuenta.

Evidencia: `product/public-home.png`, `product/public-locality.md`, `product/public-access.png`; `src/components/account/WebAccountBoundary.tsx:770-793`; `src/components/WebProjectInformation.tsx:17-20`.

**Impacto inferido.** Se pide revelar identidad y entender condiciones antes de que el visitante pueda comparar el beneficio con rellenar una plantilla. No observé abandonos ni puedo cuantificar su efecto. La cuenta puede estar justificada para controlar una beta; la revisión no conoce una necesidad comercial que obligue a bloquear también una demostración local.

**Propuesta.** Como mínimo, mostrar un ejemplo completo y un ZIP de muestra público antes del acceso. Si el objetivo es autoservicio general, permitir probar un borrador local antes de exigir cuenta es una opción a evaluar. Si el objetivo sigue siendo beta restringida, declararlo en la primera pantalla y explicar qué consigue quien entra. No propongo eludir controles existentes.

### P1 — El resultado explica la operación mejor que la siguiente acción

**Verificado.** La pantalla posterior muestra una lista extensa de archivos y estados. Su orientación principal es revisar Descargas y abrir el ZIP; la acción destacada es preparar otro ZIP. No explica en esa pantalla qué archivo leer primero ni ofrece el siguiente encargo de trabajo. Esa orientación está dentro del propio ZIP, y actualmente conduce al orquestador.

Evidencia: `src/components/creation/OutcomePanel.tsx:130-138`, `:164-215`; `product/local-output.png` y `product/local-output.md`.

**Propuesta.** Poner primero tres acciones breves: localizar el ZIP, extraerlo y abrir el punto de entrada correcto en el IDE. Mostrar ahí la instrucción que se copiará. Dejar la lista de evidencias disponible bajo un desplegable. La precisión operacional es útil; no debe ocupar el lugar de la orientación para usar el resultado.

### P2 — Hay decisiones y explicaciones que añaden pantallas sin cambiar el resultado básico

**Verificado.** La ruta de idea inicial tiene ocho pasos. “Entrega” pide decidir cómo llevarse el proyecto, pero en la web la salida es un ZIP fijo. Equipo permite aceptar el generalista sin tocar nada. Revisión y confirmación vuelven a presentar opciones de revisión/descarga. La ruta de discovery añade un paso de adjuntos.

Evidencia: `src/components/creation/guidedFlow.ts:4-23`; `src/components/creation/DeliveryStage.tsx:45-74`; `src/components/creation/ReviewStage.tsx:285-321`; `src/App.tsx:1541-1569`; `product/local-delivery.png`, `product/local-confirm.md`.

**Propuesta.** Probar un recorrido básico de tres bloques: idea y límites, revisión del encargo, descarga. Fase, equipo, ruta e integraciones pueden ser personalización opcional. Mantener una confirmación clara para acciones que la requieran, sin convertir la validación de un ZIP local en una simulación de una operación de alto impacto. La revisión previa puede permanecer como vista, sin necesitar su propio resultado final.

### P2 — El relato público contiene versiones incompatibles del producto

**Verificado.** En la sesión pública se pudo leer el Blog sin iniciar sesión; su segundo artículo dice que leer publicaciones requiere una sesión Access. La FAQ actual explica acceso por correo/código, mientras la pantalla pública de alta mostraba Google para cuentas nuevas. About y la bienvenida describen una edición de escritorio utilizable; la FAQ informa que está congelada. Estos textos pueden narrar momentos distintos, pero no separan con suficiente claridad historia y disponibilidad actual.

Evidencia: `product/public-blog.md`, párrafo del segundo artículo; `content/blog/founding-posts.json:27`; `product/public-faq-access.md` frente a `product/public-access.md`; `src/components/WebProjectInformation.tsx:13-20`; `src/components/AboutExperience.tsx:61-63`, `:90-94`.

**Impacto inferido.** El visitante tiene que reconciliar si el producto es privado o público, qué método debe usar y si hay una aplicación de escritorio disponible. La complejidad organizativa del producto pasa a ser trabajo del lector.

**Propuesta.** Tener una descripción corta y vigente del producto y sus métodos de acceso. Marcar los artículos históricos con fecha de vigencia o una corrección visible, conservando la procedencia. En la presentación inicial, describir sólo lo que se puede usar hoy y enlazar aparte la situación del escritorio.

## Público y posicionamiento

Lo siguiente es una hipótesis basada en los requisitos y la salida, no en una base de clientes observada.

| Público posible | Ajuste de la versión examinada | Motivo |
| --- | --- | --- |
| Persona técnica que usa un IDE con AI y repite arranques de proyectos | Mayor | Puede valorar un paquete consistente de contexto, límites e instrucciones; ya sabe usar Markdown, repositorios y asistentes. |
| Autor de una idea sin experiencia técnica | Bajo a medio | Las preguntas son accesibles, pero la continuación exige IDE, AI y decisiones sobre infraestructura que no están resueltas por el producto. |
| Equipo que necesita compartir un encargo inicial | Medio | El ZIP facilita el traspaso, pero no se verificó colaboración, edición compartida ni actualización del encargo dentro de un repositorio existente. |
| Usuario que espera una aplicación funcionando | Bajo | La salida observada contiene preparación documental, no la app, su código ni un despliegue. La FAQ lo aclara, pero debería quedar claro antes del acceso. |

Propuesta de mensaje para probar: **“Prepara el encargo de tu próximo proyecto de software. Define para quién es, qué necesitas y qué límites debe respetar; llévate un paquete de Markdown para continuar en tu IDE con AI.”** Una segunda frase puede explicar que se prepara en el dispositivo. “Determinista” y “local-first” son propiedades útiles para un público técnico; no sustituyen la explicación del resultado.

## Alternativas de alcance

| Alternativa | Qué ofrece | Qué simplifica | Evaluación |
| --- | --- | --- | --- |
| A. Preparador de encargos para trabajo con AI | Un encargo, un prompt autocontenido, fuentes y siguiente paso | Equipo y orquestación pasan a opcionales; menos documentos iniciales | **Recomendada para probar utilidad general.** Se acerca al valor ya existente y requiere poca infraestructura nueva. |
| B. Generador de un kit de trabajo metodológico específico | Convenciones, roles, documentos y preparación de orquestación | Reduce la ambigüedad de público, aunque conserve un paquete amplio | Coherente si ése es el objetivo real. La primera pantalla debe decir qué método/kit entrega y sus requisitos. No presentarlo como punto de partida universal. |
| C. Constructor de aplicaciones | Código, ejecución y despliegue del producto solicitado | Facilita el resultado final, pero multiplica dependencias y soporte | No lo recomiendo como siguiente ampliación. Es un producto de alcance mucho mayor que el examinado. |

El sustituto más directo de A es una plantilla Markdown rellenada a mano o una conversación directa con un asistente. accreatio debe demostrar que orienta mejor las decisiones, conserva mejor el encargo o hace más fácil trasladarlo. Que exporte más archivos no demuestra por sí mismo esa diferencia. Esta comparación es conceptual; no se hizo una investigación actual del mercado ni de precios.

## Qué cambiar, quitar y agregar

**Cambiar primero:** hacer autocontenido el prompt; dirigir START hacia el proyecto elegido; llamar al plan por su función real; mostrar un ejemplo terminado antes del acceso; explicar la siguiente acción al descargar; actualizar mensajes públicos de disponibilidad.

**Quitar del recorrido básico:** la obligación implícita de construir un orquestador, la pantalla de entrega cuando no hay una elección real y la exposición principal de un manifiesto técnico largo. Reducir documentos iniciales para quien sólo pide un encargo; conservar un kit amplio como elección explícita, si tiene un público definido.

**Agregar:** un ejemplo pequeño completo, campos breves de primera versión/no incluido/criterio de éxito y un punto de entrada inequívoco. Evaluar posteriormente importar o actualizar un encargo existente sólo si los usuarios observados lo necesitan. No agregaría por ahora chat propio, AI alojada, gestión de equipos ni nuevas integraciones cloud.

## Prioridades e impacto/esfuerzo

Estimaciones relativas de producto; no son una cotización de implementación.

| Orden | Cambio | Impacto esperado | Esfuerzo relativo | Cómo comprobar su utilidad |
| --- | --- | --- | --- | --- |
| 1 | Prompt autocontenido y primer paso que respete la opción de orquestación | Alto: elimina obstáculos concretos al usar la salida | Bajo a medio | Abrir el paquete en carpeta vacía; todas las referencias existen y la primera instrucción trata el proyecto elegido. |
| 2 | Público y resultado explícitos + ejemplo público | Alto: permite decidir si vale la pena entrar | Bajo | Una persona ajena describe correctamente qué recibirá y qué necesitará después, sin explicación del autor. |
| 3 | Resultado orientado a continuar y simplificación del recorrido básico | Medio a alto: reduce lectura y decisiones sin consecuencia | Medio | Observar si puede descargar, extraer y empezar sin ayuda; registrar dónde se detiene. |
| 4 | Encargo con primera versión, exclusiones y éxito declarado | Alto potencial, aún no validado: más valor que repetir el contexto | Medio | Comparar el paquete con una plantilla simple en un encargo real; identificar decisiones que dejó más claras. |
| 5 | Reconciliar FAQ, Blog y estado del escritorio | Medio: confianza y menos instrucciones contradictorias | Bajo | Una revisión cruzada de las pantallas vigentes describe el mismo acceso y la misma disponibilidad. |
| 6 | Nuevas integraciones, orquestación más potente o colaboración | Incierto antes de validar lo anterior | Alto | Posponer hasta observar una necesidad concreta que el núcleo simplificado no cubre. |

La siguiente validación valiosa sería observar a unas pocas personas del público elegido intentando continuar un proyecto propio, comparar contra una plantilla y preguntar qué parte conservaron al día siguiente. No hace falta seguimiento invasivo para empezar: observación consentida y notas bastan. No se debe inferir ahorro de tiempo ni disposición de pago del hecho de que el ZIP se descargue correctamente.

## Evidencia reproducible

Base de evidencia: `.local/logs/independent-review-2026-10-20/product/`.

- Público: `public-home.png`, `public-locality.md`, `public-access.md/.png`, `public-about.md/.png`, `public-faq-access.md/.png`, `public-blog.md/.png`.
- Frontend local con cuenta ficticia: `install-local-fixture.js`, `local-home-v2.md`, `local-delivery.png`, `local-review.md`, `local-review-expanded.md/.png`, `local-confirm.md`, `local-confirm-export.md`, `local-output.md/.png`.
- Salida examinada: `.playwright-cli/huerto-comunitario.zip`; inventario, tamaños, hash y textos seleccionados en `zip-inspection.txt`. SHA-256: `1E24BF0320113C13139EAFF9063579A8DF3F7DA794641BB144B445DAC98F0590`.
- Los snapshots automáticos de cada paso están en `.playwright-cli/` bajo esa misma base. El primer intento de fixture falló por comillas de PowerShell; se corrigió mediante archivo y no alcanzó a instalar respuestas ni a navegar al producto local.

No se modificó código del producto ni se ejecutó el trabajo propuesto por el ZIP. Este informe es la evaluación de un revisor independiente dentro de esta sesión; no es validación de clientes, certificación de seguridad ni prueba de éxito comercial.
