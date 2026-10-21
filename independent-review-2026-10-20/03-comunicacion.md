# Revisión independiente de comunicación y microcopy

Fecha: 20 de octubre de 2026, America/New_York. Auditoría exclusivamente editorial, sin implementación.

## Dictamen

accreatio explica razonablemente bien **qué pasos seguir**, pero explica peor **por qué una persona concreta debería empezarlos**. Las preguntas del creador son más claras que la presentación del producto. El tono tranquilo y la precisión sobre revisión, archivos y control del usuario merecen conservarse. El problema principal no es la falta de texto: es la combinación de lenguaje técnico prematuro, información decisiva repartida entre varias superficies y algunas instrucciones incompatibles entre sí.

Las dos correcciones más urgentes son verificables: la FAQ integrada indica entrar por correo y código aunque el acceso público observado ofrece Google; un artículo público afirma que leer el Blog requiere una sesión de Access, aunque se leyó completo sin iniciar sesión. Esas discrepancias perjudican la confianza más que una frase comercial poco atractiva.

No recomiendo una voz más enfática ni más promesas. Recomiendo una promesa más concreta, una muestra del resultado y menos vocabulario interno en el recorrido principal.

## Método, independencia y límites

- Se revisaron los textos actuales de `src/components/Onboarding.tsx`, `WebExperience.tsx`, `AboutExperience.tsx`, `AppFrame.tsx`, `src/components/account/`, `src/components/creation/` y las cadenas pertinentes de `src/App.tsx`. También los materiales directamente enlazados: `WebProjectInformation.tsx`, FAQ y documentos públicos, y los artículos servidos por el Blog.
- Se observó `https://accreatio.com/` con Edge en una sesión aislada: bienvenida, privacidad, acceso, About en ES/EN, respuestas de la FAQ y Blog. No se pulsó Google, no se introdujeron correos ni códigos y no se realizó ninguna mutación externa. La captura ocurrió aproximadamente entre 2026-10-21 02:10 y 02:18 UTC, todavía 20 de octubre en la zona del proyecto.
- Se recorrió `http://localhost:5173/` hasta la confirmación de exportación, con respuestas ficticias, sin adjuntos, sin ejecutar ni descargar. Las respuestas de cuenta se interceptaron **solo para localhost** con una cuenta sintética y cinco usos. Eso permite observar la interfaz interna; no valida login, backend, cupos reales, seguridad, exportación ni comportamiento desplegado.
- El checkout leído fue `70612512e2115036fa71a08075a596a04bbff942`. La página pública mostró versión 0.8.0. No se estableció paridad exacta entre el despliegue y ese commit.
- No se consultaron memoria, auditorías anteriores, documentos de diseño, archivos históricos ni informes de otros revisores. AGENTS.md se usó para seguridad operativa, sin usar criterios AEKR para juzgar el producto.
- **Verificado** significa texto leído en fuente o interfaz, identificado en cada caso. **Inferido** significa una consecuencia editorial plausible. **Recomendado** es una propuesta, no una conclusión obtenida de pruebas con usuarios.
- No se midieron conversión, abandono, comprensión ni el tiempo anunciado de 5–10 minutos. No se verificaron criptografía, ausencia de telemetría, almacenamiento remoto ni las afirmaciones técnicas como garantías de seguridad.
- La revisión de avisos evalúa claridad, consistencia y ubicación. No determina validez contractual, bases jurídicas, suficiencia del consentimiento ni cumplimiento normativo.

Las evidencias temporales propias están únicamente en `.local/logs/independent-review-2026-10-20/copy/`. Los snapshots distinguen `public-*` de `local-fixture-*`. `local-initial.md` corresponde a un intento fallido de instalar el fixture y conserva todavía la página pública; no se utiliza como evidencia local.

## Qué conservar

1. **Las preguntas conversacionales del creador.** “¿Cómo se llama tu proyecto?”, “¿Qué quieres crear?” y “Unas frases bastan” reducen el esfuerzo de responder sin fingir que ya se conocen todos los requisitos. Evidencia: `src/components/creation/GuidedCreation.tsx:227–253` y `:308–328`; observado en `local-fixture-name.md` y `local-fixture-idea.md`.
2. **La opcionalidad explícita.** “Omitir por ahora” y ejemplos concretos para los límites son mejores que un campo vacío con una etiqueta abstracta. Evidencia: `src/components/creation/GuidedCreation.tsx:166–182`, `:248–250` y `src/components/creation/GuidedAttachments.tsx:37–45`.
3. **La distinción entre roles y agentes en ejecución.** “Definir roles prepara instrucciones; no contrata ni ejecuta agentes” evita una promesa falsa. Evidencia: `src/components/creation/GuidedCreation.tsx:516–519`; observado en `local-fixture-team-es.md`.
4. **La revisión previa y el nombre de la acción final.** La confirmación diferencia “Revisar sin descargar” de “Crear y descargar ZIP”. La acción sigue dependiendo de una confirmación explícita. Evidencia: `src/App.tsx:1534–1568` y `:1727–1749`; observado en `local-fixture-confirm-es.md`.
5. **La precisión sobre la descarga.** “ZIP preparado; descarga solicitada” y la indicación de revisar Descargas son más honestas que afirmar que el archivo ya está guardado. Evidencia de fuente: `src/components/creation/OutcomePanel.tsx:79–82` y `:133–137`; no se ejecutó ese resultado durante esta auditoría.
6. **Los errores que explican qué hacer y qué se conserva.** Los mensajes sobre ventana bloqueada, borrador sin guardar, código vencido y reintento tienen una acción reconocible. Evidencia de fuente: `src/components/account/WebAccountBoundary.tsx:57–103`, `:937–944` y `:1002–1006`.
7. **La separación explícita entre cuenta y proyecto.** Es una diferencia útil del producto, siempre que se explique con palabras de usuario y sin convertir “local” en una garantía sobre todo el servicio. Evidencia: `src/components/Onboarding.tsx:79–90`, `src/components/account/AccountPolicyFields.tsx:17–29`.
8. **La independencia de las preferencias de cookies.** “Iniciar sesión no acepta cookies opcionales” es breve y entendible. Evidencia: `src/components/account/CookiePreferences.tsx:60–86`.

## Hallazgos priorizados

Las prioridades son editoriales: P1 = instrucción o afirmación pública contradictoria; P2 = comprensión y confianza; P3 = acabado. Impacto y esfuerzo son estimaciones relativas, no métricas de negocio.

| ID | Prioridad | Acción | Impacto probable | Esfuerzo |
|---|---|---|---|---|
| C01 | P1 | Actualizar la FAQ integrada de acceso | Evita buscar un método inexistente | Bajo |
| C02 | P1 | Señalar el contexto histórico del artículo del Blog | Evita una contradicción pública sobre acceso y privacidad | Bajo para aviso; medio para revisión editorial |
| C03 | P2 | Corregir qué datos de adjuntos conserva el borrador | Aclara privacidad y recuperación | Bajo |
| C04 | P2 | Corregir la instrucción ES posterior al dry run | Evita volver a la pantalla equivocada | Bajo |
| C05 | P2 | Explicar resultado, audiencia y siguiente uso al comienzo | Facilita decidir si el producto sirve | Medio |
| C06 | P2 | Separar explicación de seguridad web y escritorio | Mejora comprensión y credibilidad | Bajo/medio |
| C07 | P2 | Ordenar el acceso y aclarar operador/estado documental | Reduce lectura repetida antes del CTA | Medio |
| C08 | P2 | Unificar vocabulario y traducción | Reduce aprendizaje innecesario | Bajo/medio |
| C09 | P2 | Mostrar condiciones y disponibilidad en contexto | Evita expectativas de acceso o escritorio incorrectas | Bajo |
| C10 | P3 | Precisar el significado del tiempo estimado | Evita confundir completar preguntas con terminar el proyecto | Bajo |

### C01 — La FAQ prescribe un método distinto al disponible

**Verificado:** la FAQ integrada dice “introduce tu correo y el código de un solo uso” y desarrolla el transporte controlado de correo. Fuente ES/EN: `src/components/WebProjectInformation.tsx:17–20`. En producción se observó “Continuar con Google”, sin formulario de correo/código: `copy/public-es-signin.md:38–41`. La FAQ pública separada ya usa “choose an available sign-in method”: `public/legal/faq.html:47–63`. El aviso completo de términos indica que OTP propio está deshabilitado en producción: `public/legal/terms.html:35–42`.

**Inferido:** una persona que usa la ayuda para resolver el acceso puede buscar una opción que esa misma interfaz no ofrece. La longitud de la respuesta dificulta descubrir que se trata de información condicionada.

**Recomendado:** una respuesta corta que sirva para los métodos efectivamente habilitados; separar cuenta, cuota y recuperación en preguntas distintas. No prometer acceso universal ni activación de un método futuro.

Antes: “Después del resumen de privacidad, introduce tu correo y el código de un solo uso…”

Propuesta ES: “Sí. Para abrir el creador necesitas iniciar sesión con uno de los métodos que aparecen en la pantalla de acceso. Las cuentas nuevas admitidas actualmente usan Gmail o Google Workspace. La beta puede limitar el acceso.”

Propuesta EN: “Yes. Sign in using one of the methods shown on the sign-in screen to open the project builder. New accounts currently require Gmail or Google Workspace. Access to the beta may be limited.”

La frase concreta sobre nuevas cuentas debe mantenerse sincronizada con la configuración real. Quitar de esta respuesta “Un cliente modificado puede generar archivos localmente”: es una precisión de arquitectura que no resuelve la duda del visitante (`src/components/WebProjectInformation.tsx:19–20`). Puede conservarse en documentación técnica.

### C02 — El Blog público cuenta una arquitectura anterior como si fuera la actual

**Verificado en producción:** el segundo artículo, “Nebula made ideas for accreatio”, afirma “Reading published posts still requires a valid Access session”. Se leyó ese artículo completo sin iniciar sesión. Snapshot: `copy/public-blog.md:38–54`, en especial `:50`. El mismo texto existe en `content/blog/founding-posts.json:27`; esa coincidencia no demuestra paridad general de la base editorial y el seed. About afirma que la lectura del Blog es pública (`src/components/WebProjectInformation.tsx:128–130`).

El artículo tiene fecha de agosto. Que sea histórico es legítimo; lo que falta es señalar de forma visible que sus detalles ya no describen la operación actual. La cadena de tecnicismos JWT/RS256/JWKS y la frase “D1 stores… only post rows” amplían el riesgo de que alguien use una explicación editorial antigua como declaración actual de privacidad.

**Inferido:** una corrección pasada presentada con mucha seguridad técnica termina debilitando la confianza si ahora contiene otra afirmación desactualizada.

**Recomendado:** preservar autoría, fecha y procedencia; añadir una nota editorial visible antes del artículo, enlazada a la descripción actual. No reescribir silenciosamente la historia ni afirmar una arquitectura nueva sin verificarla.

Propuesta EN: “Historical architecture note. This article describes the August 2026 release. Blog reading is now public; some access and account details below have changed. See the current product information and privacy notice.”

Propuesta ES: “Nota histórica de arquitectura. Este artículo describe la versión de agosto de 2026. La lectura del Blog ahora es pública y algunos detalles de acceso y cuentas han cambiado. Consulta la información actual del producto y el aviso de privacidad.”

### C03 — El texto de adjuntos dice que se guardan nombres, pero la serialización no los guarda

**Verificado en fuente:** `src/components/creation/GuidedAttachments.tsx:63–65` dice que el borrador guarda “nombres y cantidades”. También aparece en `src/components/creation/FoundationStage.tsx:179–182`. La serialización actual vacía `attachments` y guarda únicamente un marcador con el número: `src/draftStore.ts:72–83`. La FAQ pública es más exacta: los nombres y bytes seleccionados no se conservan (`public/legal/faq.html:107–114`).

**Inferido:** “nombres” podría interpretarse como nombres del proyecto, pero dentro de la nota de archivos seleccionados su lectura natural son los nombres de los adjuntos. Es una ambigüedad evitable en una promesa de privacidad.

Propuesta ES: “Guardamos tus respuestas y la cantidad de adjuntos en este navegador. Los archivos y sus nombres no se guardan en el borrador. Tendrás que seleccionarlos de nuevo después de recargar.”

Propuesta EN: “This browser saves your answers and the number of attachments. The draft does not save the selected files or their names. Select them again after a reload.”

No se ejecutó una prueba de persistencia de archivos; el hallazgo compara texto con la función explícita de serialización.

### C04 — La recuperación ES del dry run apunta a Entrega; EN apunta a Review

**Verificado en fuente:** `src/components/creation/OutcomePanel.tsx:145–147` indica en español “Desactívalo en Entrega”, mientras en inglés dice “Turn it off in Review”. La casilla vive en Revisión (`src/components/creation/ReviewStage.tsx:262–290`), y también hay elección dentro de Confirmar exportación (`src/App.tsx:1541–1568`). El resultado afectado se refiere al recorrido sin el botón web de descarga posterior; no se reprodujo en un ejecutable de escritorio.

Propuesta ES: “La revisión terminó sin crear archivos. Vuelve a Revisión, desactiva «Revisar sin escribir nada» y confirma para crear.”

Propuesta EN: “The review finished without creating files. Return to Review, turn off ‘Review without writing’, and confirm to create.”

Conservar la precisión “sin crear archivos”; no convertir la revisión en una afirmación de que el proyecto fue implementado o validado funcionalmente.

### C05 — Se describe una transformación, pero no se concreta pronto su utilidad ni su destinatario

**Verificado:** la primera pantalla dice “Lo que vas a crear” y enumera “prompt explícito”, “plan determinista” y “archivos de proyecto”. El resultado se define como un contenedor: carpeta o ZIP. Evidencia: `src/components/Onboarding.tsx:49–67`, `copy/public-return.md:21–32`. About usa “Un punto de partida local-first… preparado para continuar” (`src/components/AboutExperience.tsx:112–121`). La frase más esclarecedora —qué incluye y que no construye una aplicación terminada— aparece dentro de una FAQ cerrada (`src/components/WebProjectInformation.tsx:5–8`). La frase de marca no ayuda en la web: `.formation-mark small` está oculta (`src/web-branding.css:43–44`).

**Inferido:** el producto parece dirigido a quien prepara un proyecto de software para trabajarlo después con personas o asistentes IA: hay prompts, roles, Git, GitHub e IDE. Esa audiencia no se declara; el ejemplo de nombre “Mi huerto urbano” incluso puede leerse como planificación de cualquier actividad (`src/components/creation/GuidedCreation.tsx:308–309`). No es evidencia de que deba excluirse otro público.

**Recomendado:** elegir y declarar una audiencia primaria; presentar primero el trabajo que ahorra, luego el contenido del ZIP. Mostrar un ejemplo estático del resultado antes de pedir cuenta. No hace falta más retórica.

Propuesta de encabezado ES: “Dale una estructura clara a tu idea de software.”

Propuesta de explicación ES: “Responde unas preguntas y descarga un ZIP con la definición de tu proyecto, un prompt para continuar, un plan paso a paso y tus archivos de apoyo. Tú decides cómo construirlo después.”

EN: “Give your software idea a clear starting point.” / “Answer a few questions to download a ZIP with your project brief, a prompt for the next step, a step-by-step plan, and your supporting files. You choose how to build it next.”

“Software” es una propuesta de posicionamiento que requiere decisión del propietario, no un hecho impuesto por esta auditoría. Si el público buscado es más amplio, mostrar ejemplos de ese público y un resultado que pruebe su utilidad. Mantener cerca una frase breve: “Prepara el inicio; no genera una aplicación terminada.”

Agregar un enlace secundario “Ver un ejemplo / View an example” con tres vistas: definición breve, fragmento del plan y lista realista de archivos. Eso ofrece una prueba comprensible sin testimonios ni cifras inventadas.

### C06 — La explicación de seguridad pública habla al desarrollador y mezcla superficies

**Verificado:** About web muestra “Renderer aislado, IPC limitado… sin interpolación de shell… firma local de auditoría”. Las mismas cadenas se pasan sin adaptación a la superficie (`src/App.tsx:157–158`, `:221–222`, `:2398–2402`). Se observaron en `copy/public-en-about.md:35–38` y `copy/public-es-about.md:35–38`. El texto sobre la orquestación de escritorio también ocupa una sección principal (`src/components/AboutExperience.tsx:86–94`).

**Inferido:** un visitante no técnico no sabe qué conducta propia debe cambiar por “IPC” ni qué promesa corresponde al navegador. Esto no demuestra que los controles citados sean falsos; sí demuestra que falta contexto y que algunas garantías se describen con vocabulario de otra superficie.

**Recomendado:** separar “Tu proyecto en esta web” de “Controles de la edición de escritorio”. Explicar el efecto para la persona y dejar los mecanismos técnicos en un desplegable claramente identificado.

Propuesta para web: “La definición, los adjuntos y el ZIP se procesan en tu navegador. El servicio de cuenta gestiona el acceso y la cuota por separado. Revisa el contenido del ZIP antes de usarlo o compartirlo.”

La advertencia existente de que no es una certificación merece conservarse (`src/components/AboutExperience.tsx:77–80`). Tampoco cambiarla por “completamente seguro”, “privacidad garantizada” o “100 % local” aplicado al servicio entero.

### C07 — El acceso acumula decisiones y repeticiones; el estado de los documentos no queda claro

**Verificado:** la pantalla de acceso combina propósito de cuenta, cuota, aceptación de términos, autorización de tratamiento, retirada, retención de 48 horas, cookies, cobertura de Google, datos compartidos y navegación. Evidencia: `src/components/account/WebAccountBoundary.tsx:775–793`, `:854–871`, `src/components/account/AccountPolicyFields.tsx:10–32`; observado en `copy/public-es-signin.md:20–45`. Los enlaces de Privacidad y Términos se repiten al final (`src/components/account/WebAccountBoundary.tsx:1033–1047`).

El producto se presenta como accreatio y el aviso dice “Términos de AEKR” (`src/components/account/AccountPolicyFields.tsx:11–20`). El documento de destino se titula “accreatio Terms of Service” y declara operador AEKR (`public/legal/terms.html:19–22`). About llama a los documentos “borradores” y avisa que sigue pendiente revisión legal (`src/App.tsx:160–161`; `src/components/AboutExperience.tsx:195–206`), mientras el resumen los llama “vigentes” (`src/components/WebProjectInformation.tsx:107–110`).

**Inferido:** no es evidente si “borrador” describe el estado de revisión interna o si el documento que se acepta está todavía por entrar en vigor. “AEKR” aparece como otra identidad sin explicar su relación con la cuenta. No se concluye que aceptar un borrador sea inválido; se señala una duda de lectura.

**Recomendado:** mantener el aviso necesario junto a la acción que lo activa; conservar los datos, finalidades, condiciones de retirada y retención. Reducir repeticiones y ordenar el resto como “Cómo accedes”, “Qué guardamos para la cuenta” y “Detalles”. Que el título del enlace coincida con el documento: “Términos de accreatio”; explicar una sola vez “Servicio operado por AEKR”, sin inventar entidad o jurisdicción.

Separar con claridad la **versión aplicable** del **estado de revisión legal**. Elegir la etiqueta exacta requiere validación del propietario y, para su efecto jurídico, asesoría legal. No recomiendo eliminar avisos para hacer más atractiva la conversión.

### C08 — El registro alterna entre conversación y jerga interna sin necesidad

**Verificado:** “Tus archivos” pasa a “Fuentes de discovery” (`src/components/creation/GuidedCreation.tsx:28–36`; `src/components/creation/GuidedAttachments.tsx:53`). En Entrega web se lee “tracking… desktop” (`src/components/creation/DeliveryStage.tsx:69–72`), y en la ayuda “mobile” (`src/components/WebProjectInformation.tsx:53–56`). Configurar roles introduce “Rol canónico”, “Mode 0”, “Mode 1”, “Iteraciones/entidad” e “Invocaciones” (`src/components/creation/TeamStage.tsx:159–162`, `:272–323`). Hay plurales mecánicos “1 participante(s)” (`src/components/creation/GuidedCreation.tsx:505–509`) pese a que `src/components/creation/SummaryDrawer.tsx:38–47` ya resuelve singular y plural correctamente.

**Inferido:** una persona entiende las preguntas iniciales y luego puede creer que necesita conocimientos de ingeniería específicos para completar un paquete de inicio. Las palabras inglesas en ES también dan sensación de traducción inacabada.

**Recomendado:** una nomenclatura por concepto. “Archivos de apoyo”, “seguimiento”, “escritorio”, “móvil”, “IA” en ES; “supporting files”, “tracking”, “desktop”, “mobile”, “AI” en EN. Mantener nombres propios y formatos de archivo. En opciones avanzadas, explicar primero el resultado y después conservar el identificador técnico: “Preparar instrucciones para herramientas externas (Mode 1)”.

La acción final observada “Ejecutar revisión seca” es especialmente poco natural en español: traduce literalmente *dry* y cambia el vocabulario justo al confirmar. Evidencia: `src/App.tsx:1742–1745` y `copy/local-fixture-confirm-es.md`. Usar “Revisar sin crear archivos” / “Review without creating files” sería consistente con lo que la casilla ya explica.

Reformular “¿Quién trabajará en tu proyecto?” como “¿Cómo quieres repartir el trabajo después?”; “Configurar agentes y roles” como “Definir roles para el plan”. Se conserva debajo la advertencia de que no se ejecutan agentes. Evidencia del texto actual: `src/components/creation/GuidedCreation.tsx:490–540`, observado en `local-fixture-team-es.md:29–43`.

La frase inglesa “take a project that is ready to continue” necesita edición idiomática (`src/components/AboutExperience.tsx:119–121`). “Leave with a clear project brief and a plan for the next step” expresa mejor la acción propuesta.

### C09 — Las condiciones importantes aparecen después de empezar o dentro de ayuda

**Verificado:** la bienvenida web anuncia una carpeta en escritorio o ZIP web (`src/components/Onboarding.tsx:63–67`), pero la FAQ dice que escritorio está congelado (`src/components/WebProjectInformation.tsx:11–14`). La cuenta y las cinco exportaciones por 24 horas se presentan en el paso 3 (`src/components/account/WebAccountBoundary.tsx:770–793`). La cobertura limitada de nuevas cuentas y otros correos se explica junto a Google (`:854–857`). Los términos completos mencionan además la audiencia Testing y sus límites (`public/legal/terms.html:26–30`).

**Inferido:** la presentación inicial puede sugerir que ambas ediciones son opciones igualmente disponibles y que cualquiera puede comenzar. “Continuar” es correcto como movimiento, pero la decisión de invertir tiempo ocurre antes de ver todas esas condiciones.

**Recomendado:** primera pantalla contextualizada para la web: “Resultado: ZIP descargable”. Debajo, una línea factual y breve: “Beta gratuita · requiere acceso admitido · hasta 5 exportaciones en 24 horas”. La explicación exacta de acceso debe coincidir con la admisión vigente; no basta con sugerir que disponer de Gmail garantiza entrada. Mantener detalles de ventana móvil de cuota y reintentos en ayuda. Presentar escritorio en un enlace con su estado real, no como alternativa implícita del CTA web.

### C10 — El tiempo no dice qué actividad está estimando

**Verificado:** “Tiempo estimado: 5–10 minutos” aparece antes de pedir cuenta y antes del creador (`src/components/Onboarding.tsx:57–60`). Esta auditoría no ha medido ese intervalo.

**Inferido:** podría interpretarse como el tiempo hasta tener el proyecto construido, o incluir una espera de acceso que el producto no controla.

**Recomendado:** “Completar la definición: unos 5–10 min, según el material que tengas” / “Project setup: about 5–10 min, depending on your starting material”. Si no existe una medición mínima, retirar la cifra y decir “Unas preguntas para preparar tu punto de partida”. No sustituirla por otra estimación inventada.

## Cambios pequeños de microcopy

Estas propuestas complementan los hallazgos; no cambian contratos ni capacidades.

| Antes | Propuesta ES / EN | Evidencia |
|---|---|---|
| “Fuentes de discovery” | “Archivos de apoyo” / “Supporting files” | `src/components/creation/GuidedAttachments.tsx:53` |
| “bytes de archivos seleccionados” | “El contenido de los archivos seleccionados” / “The contents of selected files” | `src/components/Onboarding.tsx:87–90` |
| “1 participante(s) en tu plan” | “1 participante en tu plan”; plural real al aumentar / “1 participant in your plan” | `src/components/creation/GuidedCreation.tsx:505–509` |
| “Rol canónico” | “Función en el plan” / “Role in the plan” | `src/components/creation/TeamStage.tsx:159–162` |
| “ZIP inspeccionable; el tracking separado solo está disponible en desktop” | “Revisa los archivos del ZIP antes de usarlos. El seguimiento separado está disponible en la edición de escritorio.” / “Review the files in the ZIP before using them. Separate project tracking is available in the desktop edition.” Ajustar o retirar la segunda frase según disponibilidad real. | `src/components/creation/DeliveryStage.tsx:69–72` |
| “Nada se escribe hasta que confirmes” | “No se crean archivos del proyecto hasta que confirmes” / “Project files are created only after you confirm” | `src/components/creation/DeliveryStage.tsx:50–53` |
| “Manifiesto de entrega” | “Qué incluye la entrega” / “What is included” | `src/components/creation/ReviewManifest.tsx:46–53` |
| “ToS” | “Términos” / “Terms” | `src/components/creation/ProjectHelp.tsx:30–35` |
| “Ejecutar revisión seca” / “Run dry review” | “Revisar sin crear archivos” / “Review without creating files” | `src/App.tsx:1742–1745` |
| “Reintentar una autorización aceptada…” | “Volver a descargar el mismo ZIP durante 48 horas no usa otra exportación” / “Downloading the same ZIP again within 48 hours does not use another export” — conservar las condiciones reales de la misma operación | `src/components/account/WebAccountBoundary.tsx:1125–1132` |
| “Private, free license” | “Free beta · private-use license” / “Beta gratuita · licencia para uso privado”, si representa exactamente la licencia aplicable | `src/App.tsx:152`, `:216`, `src/components/AboutExperience.tsx:123–124` |

## Qué quitar y qué agregar

**Quitar del recorrido principal:** términos internos sin explicación; plurales “(s)”; instrucción fija de OTP cuando no está habilitado; el detalle de un cliente modificado en la FAQ para usuarios; repeticiones de enlaces y afirmaciones idénticas. El detalle técnico puede seguir disponible en una sección avanzada. No retirar las advertencias de archivos, revisión, cuenta o tratamiento necesario.

**Agregar:** una declaración de público y uso; un ejemplo visible del paquete antes del acceso; resultado específico de la edición web; una frase temprana sobre acceso y cuota; contexto histórico para artículos técnicos; etiquetas coherentes de documento y operador.

**Conservar:** preguntas sencillas, tono sobrio, posibilidad de volver, revisión predeterminada, límites honestos sobre agentes y descarga, privacidad de proyectos separada del servicio de cuenta y procedencia editorial identificable. No hace falta que la marca prometa automatizar más de lo que hace.

## Secuencia recomendada de mejora

1. Corregir C01–C04. Son divergencias concretas, de bajo esfuerzo, comprobables por comparación de texto y navegación.
2. Resolver una sola frase de posicionamiento y añadir el ejemplo de resultado de C05. Probar si una persona nueva puede explicar qué recibe y qué hará después sin abrir FAQ ni iniciar sesión.
3. Revisar C06–C09 como recorrido completo ES/EN: primera pantalla → privacidad → acceso → preguntas → revisión → confirmación. Comprobar los estados habilitados y los inactivos sin convertir mocks en evidencia de producción.
4. Corregir acabado y estimaciones de C08/C10. No hace falta un rediseño visual completo para mejorar estos mensajes.

La comprobación editorial debería responder cinco preguntas antes de iniciar sesión: **para quién es, qué recibe, qué no produce, qué acceso necesita y dónde queda su trabajo**. Después, cada pantalla debería pedir una decisión reconocible sin requerir aprender la terminología interna del proyecto. Este informe propone esa dirección; no sustituye investigación con usuarios ni asesoría legal.

## Evidencia propia consultable

- Público EN: `copy/.playwright-cli/page-2026-10-21T02-10-49-739Z.yml`, `copy/public-en-welcome.png`, `copy/public-en-about.md`.
- Público ES: `copy/public-es-about.md`, `copy/public-es-faq-open.md`, `copy/public-es-locality.md`, `copy/public-es-signin.md`, `copy/public-es-signin.png`.
- Blog servido: `copy/public-blog.md`. Se juzgó lo observado, no una presunta igualdad entre seed y almacén remoto.
- Local sintético: `copy/local-review.cjs`, `copy/local-fixture-name.md`, `copy/local-fixture-phase.md`, `copy/local-fixture-idea.md`, `copy/local-fixture-boundaries.md`, `copy/local-fixture-approach.md`, `copy/local-fixture-team-en.md`, `copy/local-fixture-team-es.md`, `copy/local-fixture-delivery-es.md`, `copy/local-fixture-review-es.md`, `copy/local-fixture-confirm-es.md`.
- Extracto numerado de las fuentes principales: `copy/source-excerpts.txt`.

En esta sección, `copy/` se resuelve bajo `.local/logs/independent-review-2026-10-20/`. No se modificó código, contenido publicado, configuración, cuentas, datos externos ni documentos previos.

