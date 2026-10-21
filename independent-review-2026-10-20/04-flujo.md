# Auditoría independiente del flujo de producto

Fecha: 2026-10-20. Auditor dedicado al recorrido. Checkout observado: `70612512e2115036fa71a08075a596a04bbff942`.

**Dictamen.** El recorrido se puede completar y tiene buenas bases para corregir respuestas sin miedo. Lo que ofrece hoy es un paquete de instrucciones y documentos para continuar en un IDE. Mi objeción principal es de producto: se tarda demasiado en ver ese valor y el cierre prioriza evidencias técnicas sobre la siguiente acción del usuario. La presentación de un «plan paso a paso» también sugiere más elaboración del proyecto de la que entrega el plan observado. Conservaría el asistente, pero reduciría sus decisiones obligatorias y repararía el traspaso al trabajo real antes de atraer más usuarios primerizos.

Es una valoración profesional de este recorrido, no una medición de conversión ni un estudio con usuarios. No se aplicó una metodología externa como rúbrica.

**Método y límites.** Inspección con Microsoft Edge real, automatizado mediante Playwright, versión `155.0.4283.62`. Viewports: escritorio `1440 × 1000` y móvil emulado `390 × 844`; no se utilizó un teléfono físico. Se observaron `https://accreatio.com/` y `http://localhost:5173/`. La superficie pública se recorrió hasta la pantalla de acceso: no se inició sesión, no se aceptaron términos ni se enviaron correos. El creador local se abrió con `installReviewFixture(page, { authenticated: true })`, instalado antes de navegar. La cuenta y la cuota fueron simuladas; esta auditoría no acredita autenticación, consumo real de cuota ni comportamiento del backend.

Se utilizaron los datos ficticios «Huerto Vecinal», una idea de turnos de riego y límites sin pagos ni publicación de datos personales. Se recorrió la rama «empezar con una idea», incluidos errores de nombre e idea vacíos, volver, editar desde revisión, simulación y descarga real de un ZIP local. Se inspeccionaron únicamente los archivos de entrada del paquete para evaluar la entrega. No se ejecutaron sus instrucciones. No se probaron las ramas con adjuntos, la configuración avanzada de equipos, Electron, fallos de red, agotamiento de cuota ni cuentas reales. No se consultaron memoria, informes anteriores, otros auditores, documentación de diseño ni archivo histórico. No se modificó el código del producto.

**Recorrido comprobado.**

| Momento | Resultado observado |
| --- | --- |
| Primera visita pública | Una bienvenida de tres pasos anuncia 5–10 minutos, prompt, plan y ZIP. La segunda pantalla explica la localización de datos. La tercera solicita acceso antes de poder trabajar con una idea. |
| Entrada local simulada | La segunda bienvenida aún dice «Continue to sign in», aunque ya aparece una cuenta simulada en la cabecera. Después se abre un asistente nuevo de ocho pasos. |
| Preguntas | Nombre → punto de partida → idea → límites opcionales → forma de trabajo → equipo → entrega → revisión. El generalista y la ruta local permiten avanzar sin configuración adicional. |
| Errores básicos | Nombre e idea vacíos muestran el error junto al campo y una indicación general. Tras corregirlos se puede continuar. |
| Volver y editar | «Back» conserva las respuestas de idea y límites. «Context · edit» lleva a la idea; «Back to review» vuelve directamente a revisión y el prompt refleja el cambio. |
| Revisión | Hay resumen, edición, manifiesto, plan y prompt desplegables. El resumen corta la idea y no expone los límites introducidos. |
| Confirmación | La simulación está activada por defecto. «Review and confirm» abre otro selector entre revisar y descargar; ejecutar la revisión conduce a un resultado desde el que se vuelve a confirmar la descarga. |
| Entrega | Se descargó `huerto-vecinal.zip`; Playwright no registró fallo en esa descarga. El resultado distingue correctamente ZIP preparado y solicitud al navegador. La lista visible contiene los documentos generados. |
| Continuación | El resultado pide revisar Descargas y abrir el ZIP. La instrucción útil para continuar está dentro de `START.md`; la acción principal visible es preparar otro ZIP. |
| Reentrada | Tras recargar desde revisión reaparece el paso 1 con el nombre anterior. En otra reproducción, Atrás del navegador sale a `about:blank`; Adelante vuelve al paso 1. El último texto de idea, recién escrito antes de salir, no se recuperó. |

Las capturas de escritorio y móvil no mostraron desbordamiento horizontal en las vistas locales medidas: ancho de documento y viewport de 390 px. Esto no cubre todos los estados del producto. Las capturas de página completa con cabecera fija pueden situar esa cabecera en una posición intermedia; no se consideran por sí solas defectos de disposición.

**Qué conservar, cambiar, quitar y agregar.**

| Acción | Decisión propuesta |
| --- | --- |
| Conservar | Lenguaje sencillo de las preguntas, un foco por pantalla cuando hace falta, límites opcionales con ejemplos, errores locales claros, respuestas editables y retorno directo a revisión. Mantener la simulación segura y la distinción entre preparar un ZIP y verificar su guardado. |
| Cambiar | Presentar el resultado concreto antes del acceso; llamar al plan observado «Archivos que se prepararán»; mostrar en revisión todas las decisiones que afectan a la salida; recuperar la posición y hacer inequívocos los controles de retorno. |
| Quitar del recorrido obligatorio | La pantalla de entrega cuando solo informa de una salida posible; la elección de equipo y ruta cuando se aceptan valores iniciales; la repetición de la misma elección de simulación/descarga en dos lugares. Quitar de la vista principal la lista técnica extensa, conservándola desplegable. |
| Agregar | Ejemplo inspeccionable de salida antes de registrarse, indicación de guardado/reanudación, un único punto de entrada coherente en el paquete y una siguiente acción visible: extraer, abrir la carpeta y usar `START.md` en el IDE. |

**Hallazgos priorizados.** P1 indica un problema que puede desorientar o interrumpir el objetivo principal; P2, fricción importante; P3, ajuste menor. La prioridad no es una clasificación de seguridad.

**F1 · P1 · El «plan paso a paso» no desarrolla el proyecto descrito.**

Comprobado: al abrirlo en un proyecto de turnos de riego aparecen dos acciones: crear la carpeta y sembrar documentos/firma de proyecto. No aparecen pasos sobre parcelas, turnos o el primer flujo descrito. La bienvenida promete un «deterministic plan» y la pregunta sobre forma de trabajo dice que orienta ese plan. El plan observado sí explica la preparación del paquete, pero su etiqueta no delimita ese alcance.

Inferencia: alguien que ha dedicado varias pantallas a su idea puede esperar una secuencia de construcción específica y percibir una salida genérica. No se midió esa reacción con usuarios.

Recomendación: renombrar el bloque a «Qué contendrá tu paquete» o «Preparación de archivos». Si se desea conservar «Plan de tu proyecto», mostrar una descomposición concreta y verificable del alcance, sin atribuir al producto capacidades que todavía no realiza. Antes del acceso, enseñar una muestra real del resultado.

Evidencia: [plan desplegado](../evidence-extended/flow/local-expanded-plan.png), [estado textual](../evidence-extended/flow/local-expanded-plan.json); `src/components/Onboarding.tsx:52–67`, `src/components/creation/GuidedCreation.tsx:251–253`, `src/components/creation/ReviewStage.tsx:213–225`.

**F2 · P1 · El traspaso desde el ZIP al trabajo siguiente queda oculto y ofrece entradas inconsistentes.**

Comprobado: después de descargar, la página dedica el espacio principal a una lista larga de artefactos. Indica abrir el ZIP, pero no destaca «extrae y abre START.md». `START.md` sí contiene una instrucción concreta para pegar en el chat del IDE. Por separado, el prompt mostrado en la revisión y guardado como `PROJECT_PROMPT.md` termina mandando seguir `toolkit/MASTER_SOP.md` y `toolkit/project-scaffolds/project-lifecycle/SOP.md`; esas rutas no aparecen en el ZIP descargado. No se comprobó si un entorno externo podría aportarlas.

Inferencia: hay dos entradas plausibles —el prompt que el producto invita a copiar y el inicio que se descubre dentro del paquete— con expectativas distintas. Una persona puede copiar el primero y encontrarse con documentos ausentes en su nueva carpeta.

Recomendación: establecer una sola entrada canónica, autocontenida y presentada en la web y en el ZIP. Mostrar primero «1. Extrae el ZIP. 2. Abre la carpeta en tu IDE. 3. Abre START.md o copia esta instrucción». Dejar manifiesto, códigos de estado y diagnóstico detrás de «Ver detalles». Conservar la posibilidad de reintentar la misma descarga.

Evidencia: [resultado de entrega](../assets/screenshots/flow/local-zip-result.png), [prompt visible](../evidence-extended/flow/local-review-full-prompt.txt), [START.md entregado](../evidence-extended/flow/START.md.txt), [inventario del ZIP](../evidence-extended/flow/zip-inventory.json); `src/components/creation/OutcomePanel.tsx:130–161`, `src/components/creation/OutcomePanel.tsx:164–215`, `src/components/creation/OutcomePanel.tsx:241–258`, `shared/domain.ts:544`.

**F3 · P1 · Navegación y reanudación no conservan la posición; una salida inmediata puede perder el último texto.**

Comprobado: los pasos recorridos conservan la URL `/`. Desde el paso 3, Atrás del navegador regresó a la página anterior, `about:blank` en esta sesión, y Adelante reabrió el paso 1 con el nombre guardado. La idea recién escrita estaba vacía al volver al paso 3; sucedió en dos ejecuciones rápidas, sin esperar expresamente al guardado. Una recarga anterior, después de completar el flujo, también volvió al paso 1. El guardado de cambios está diferido 500 ms y la pregunta inicial se crea como `name`.

Límite: la pérdida observada corresponde al último texto seguido inmediatamente por navegación; no se afirma que fallen los datos ya guardados ni que se pierda todo el borrador.

Recomendación: hacer que Atrás dentro del recorrido retroceda de pregunta y preservar posición y contenido al recargar. Mostrar «Guardando»/«Guardado en este navegador» y un estado explícito «Retomamos tu borrador en…». Resolver la salida durante un guardado pendiente para que esa indicación sea fiable.

Evidencia: [antes de Atrás](evidence/navigation-before-browser-back.json), [después de Atrás](evidence/navigation-after-browser-back.json), [después de Adelante](evidence/navigation-after-browser-forward.json), [idea al volver](evidence/navigation-recovered-idea.json), [recarga móvil](../assets/screenshots/flow/local-mobile-reload.png); `src/App.tsx:397–398`, `src/App.tsx:625–645`.

**F4 · P2 · La revisión no permite verificar de un vistazo todo lo que se decidió.**

Comprobado: la idea se corta a 220 caracteres; los límites y la forma de trabajo no figuran en el resumen visible, aunque sí en el prompt desplegable. Los botones para corregir usan categorías «Foundation» y «Context», distintas de los nombres de pregunta que se acaban de recorrer. «Context · edit» funciona y permite regresar directamente, lo cual conviene conservar.

Inferencia: confirmar exige recordar respuestas o descubrir que están dentro del prompt técnico. La frase «Check your answers» resulta más amplia que lo que se presenta inmediatamente.

Recomendación: resumen por decisiones —idea completa expandible, límites, materiales, ruta y equipo— con un «Editar» contextual para cada una. Usar las mismas palabras que las preguntas; distinguir «Sin límites añadidos» de una ausencia accidental. Mantener el manifiesto detallado y el prompt como opciones secundarias.

Evidencia: [revisión](../evidence-extended/flow/local-step-8-review.png), [edición desde revisión](../evidence-extended/flow/local-review-edit-context.png), [prompt completo](../evidence-extended/flow/local-review-full-prompt.txt); `src/components/creation/ReviewStage.tsx:162–203`, `src/components/creation/GuidedCreation.tsx:103–111`.

**F5 · P2 · Se gastan pantallas en decisiones que el usuario básico no necesita tomar.**

Comprobado: antes del creador público hay dos pantallas informativas y acceso. Después empieza otro contador de ocho pasos. El paso de equipo permite continuar con un generalista sin cambio; el de entrega web describe una única salida ZIP e incluye un desplegable «Repository, GitHub, and IDE · no options». En el camino recorrido no hubo que elegir nada en esa pantalla. La segunda bienvenida local pidió continuar al acceso aunque la cabecera ya mostraba la cuenta simulada.

Inferencia: el cambio de «3 de 3» a «1 de 8» y los pasos sin decisión elevan el esfuerzo percibido. No hay evidencia de abandono ni una duración humana medida.

Recomendación: una introducción breve con muestra y expectativa de salida. Integrar la información sobre ZIP en revisión; presentar equipo/ruta como preferencias editables con sus valores iniciales visibles. Ofrecer una muestra pública sin cuenta permite evaluar valor aunque se conserve el acceso obligatorio para el creador. Cambiar el CTA para quien ya tiene sesión a «Continuar con mi proyecto».

Evidencia: [primera visita](../evidence-extended/flow/public-desktop.png), [acceso público](../evidence-extended/flow/public-signin.png), [bienvenida con sesión simulada](../evidence-extended/flow/local-welcome-2.png), [equipo](../evidence-extended/flow/local-step-6.png), [entrega](../evidence-extended/flow/local-step-7.png); `src/components/creation/DeliveryStage.tsx:43–74`, `src/components/Onboarding.tsx:115–123`.

**F6 · P2 · Simular y descargar se eligen dos veces, y la simulación termina con aspecto de trabajo omitido.**

Comprobado: la revisión contiene «Review without writing» activado; su CTA abre un diálogo que vuelve a ofrecer revisar o descargar. Con la opción inicial, el resultado dice que la revisión terminó, pero presenta `0/2 steps completed` y dos acciones «Skipped». Desde allí se puede solicitar el ZIP y confirmar otra vez. El mismo diálogo ya permite elegir descargar, por lo que ese desvío no es obligatorio para un usuario que comprenda la opción. Tras elegir descarga y volver a revisión, el checkbox queda desmarcado pero mantiene el texto fijo «On by default».

Inferencia: se mezcla «ya he revisado el contenido» con «ejecutar una operación de revisión». Un resultado correcto de simulación puede parecer una ejecución que no consiguió nada.

Recomendación: conservar el modo seguro inicial, pero escoger simulación/descarga en un solo lugar. La vista previa debe comunicar «Puedes revisar todo aquí; todavía no generamos el ZIP». Si se conserva un resultado de simulación, mostrar éxito de la comprobación y dejar las operaciones omitidas en detalles. Una confirmación final explícita puede seguir siendo apropiada para crear la descarga.

Evidencia: [confirmación de simulación](../assets/screenshots/flow/local-dryrun-confirmation.png), [resultado de simulación](../assets/screenshots/flow/local-dryrun-result.png), [confirmación ZIP](../assets/screenshots/flow/local-zip-confirmation.png), [revisión posterior](../evidence-extended/flow/local-mobile-prepare-another.txt); `src/components/creation/ReviewStage.tsx:262–309`, `src/App.tsx:1541–1569`, `src/components/creation/OutcomePanel.tsx:164–181`.

**F7 · P3 · Los controles de retorno y selección tienen significados diferentes sin anticiparlo.**

Comprobado: «Go back»/«Volver» en la barra superior lleva a la primera bienvenida; «Back»/«Atrás» inferior retrocede una pregunta. Desde revisión, «Prepare another ZIP» vuelve a revisar el mismo proyecto, conservando sus respuestas. Las tarjetas de fase y ruta avanzan al seleccionarlas, mientras que también existe «Continue» y una opción ya aparece seleccionada. El texto dice elegir una opción aunque se puede continuar con la predeterminada.

Recomendación: etiquetar «Ver bienvenida», «Pregunta anterior» y «Editar y volver a exportar». Elegir una interacción uniforme para las tarjetas: seleccionar y continuar, o selección que avanza con una indicación clara. No cambiar las respuestas automáticamente como efecto de simplificar el flujo.

Evidencia: [destino de Volver superior](../evidence-extended/flow/local-top-back-destination.png), [punto de partida](../evidence-extended/flow/local-step-2.png), [vuelta desde entrega](../evidence-extended/flow/local-mobile-prepare-another.png); `src/App.tsx:1291–1301`, `src/components/creation/GuidedCreation.tsx:350–390`, `src/components/creation/GuidedCreation.tsx:429–437`, `src/components/creation/OutcomePanel.tsx:241–258`.

**Un recorrido propuesto más sencillo.** Esta es una propuesta de diseño, no una implementación ni una validación con usuarios.

1. **Entender el resultado.** Una sola introducción muestra una salida de ejemplo: «Convierte tu idea en instrucciones y documentos para continuar en tu IDE». Presenta tiempo estimado, carácter local y qué incluye el ZIP. Permite inspeccionar un ejemplo antes de pedir acceso.
2. **Definir la idea.** Nombre y descripción, con ejemplos de usuario, problema y primera versión. «Ya tengo material» abre adjuntos; «Añadir límites» despliega el campo actual. No hace falta una pantalla obligatoria para clasificar a todo el mundo por fase.
3. **Revisar decisiones y salida.** Mostrar idea, límites, material y valores iniciales de equipo/ruta, cada uno editable. Las preferencias avanzadas se abren aquí cuando se necesitan. El manifiesto se llama «Archivos que recibirás». La vista previa permanece disponible y es la situación inicial segura.
4. **Confirmar una acción.** Elegir «Preparar y descargar ZIP», con nombre y contenido resumido, en un único punto. Mostrar lo necesario sobre acceso/cuota y confirmar explícitamente. Si el acceso debe seguir bloqueando el creador por decisión de producto, mantenerlo antes del paso 2 sin bloquear la muestra pública del paso 1.
5. **Continuar el trabajo.** Mostrar «Extrae el ZIP y abre START.md en tu IDE», con la instrucción canónica lista para copiar. Colocar después «Volver a editar», reintento de descarga y detalles técnicos. El indicador de progreso termina aquí, no en una lista de documentos.

**Tradeoffs.** Agrupar preguntas reduce interrupciones, pero puede llenar demasiado una pantalla móvil; los campos opcionales desplegables y una jerarquía clara son necesarios. Ocultar equipo/ruta como preferencias reduce la deliberación inicial, por lo que sus valores deben permanecer visibles en revisión. Simplificar la simulación no debe debilitar la confirmación ni el modo seguro predeterminado. Mover el acceso requiere una decisión del propietario y revisar el límite de uso; una muestra pública ofrece parte del beneficio sin cambiar ese límite. Recuperar posición e integrar Atrás añade trabajo de estado, pero evita tratar al navegador como si fuera una ventana sin navegación. Destacar START.md mejora el siguiente paso solo si web, prompt y paquete comparten realmente esa misma entrada.

**Conclusión del alcance.** El camino local con una idea llegó a un ZIP descargable y permitió corregir respuestas. El mayor trabajo pendiente del flujo está en explicar con precisión el resultado, reducir pasos sin decisión, ofrecer revisión completa, reanudar sin sorpresas y terminar con una acción útil para construir. La autenticación y cuota reales, la ejecución posterior del paquete y la aptitud operativa del backend quedan fuera de este dictamen.
