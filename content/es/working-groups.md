# io.js Grupos de Trabajo

Los Grupos de Trabajo (GT) de io.js son proyectos autónomos creados por el
[Comité Técnico (CT)](https://github.com/iojs/io.js/blob/v1.x/GOVERNANCE.md#technical-committee).

Los Grupos de Trabajo pueden formarse en cualquier momento pero deben de ser ratificados por el CT.
Una vez formados, el trabajo definido en la carta del Grupo de Trabajo es responsabilidad del Grupo de Trabajo en lugar del CT.

Es importante que los GT no se formen prematuramente. Los grupos de trabajo no son formados para *comenzar* una serie de tareas si no más bien una vez el trabajo que se está llevando a cabo y los colaboradores piensan que sería beneficioso un proyecto autónomo.

Si el trabajo definido en la carta del Grupo de Trabajo se completa, el grupo debe disolverse y la responsabilidad de gobernación es absorbida de nuevo por el CT.

## Grupos de Trabajo actuales

* [Website](#website)
* [Streams](#streams)
* [Build](#build)
* [Tracing](#tracing)
* [i18n](#i18n)
* [Evangelism](#evangelism)
* [Roadmap](#roadmap)
* [Docker](#docker)
* [Iniciar un Grupo de Trabajo](#starting-a-wg)
* [Bootstrap Governance](#bootstrap-governance)

### [Website](https://github.com/iojs/website)

El propósito del grupo de trabajo del website es el de construir y mantener un sitio público para el proyecto de `io.js`.

Sus responsabilidades son:
* Desarrollar y mantener un sistema automatizado para `iojs.org`.
* Asegurarse de que el sitio se actualiza regularmente con cambios hechos en `io.js`, tales como publicaciones y nuevas funciones.
* Acoger y habilitar una comunidad de traductores.

### [Streams](https://github.com/iojs/readable-stream)

El GT Streams está dedicado a dar soporte y mejorar la API de Streams como es
usada en io.js y el sistema npm. Buscamos crear una API capaz de componerse que resuelva el problema presentado por multiples ocurrencias de un evento a lo largo del tiempo de una forma humana y con poca complejidad. Las mejoras en la API vendrán determinadas por las necesidades del ecosistema; interoperabilidad y compatibilidad con otras soluciones y versiones anteriores es de vital importancia. Nuestras responsabilidades incluyen:

* Hacer frente a los stream issues en el io.js issue tracker.
* Autoría y edición de la documentación de streams perteneciente al proyecto io.js.
* Revisar cambios a las subclases de streams subclasses pertenecientes al proyecto io.js.
* Redireccionar cambios de streams desde el proyecto io.js project a éste.
* Asistir en la implementación de proveedores de streams dentro de io.js.
* Recomendar que versiones de readable-stream han de ser incluidas en io.js.
* Proveer mensajes acerca del futuro de streams para dar a la comunidad avisando a la comunidad de los cambios.

### [Build](https://github.com/iojs/build)

El propósito del Grupo de Trabajo build es el de crear y mantener una infraestructura automatizada.

Sus responsabilidades son:
* Producir paquetes para todas las plataformas objetivo.
* Realizar tests.
* Realizar tests de rendimiento y comparaciones.
* Crear y gestionar build-containers.

### [Tracing](https://github.com/iojs/tracing-wg)

El propósito del Grupo de Trabajo tracing es el de aumentar la transparencia del software escrito en io.js.

Sus responsabilidades son:
* Colaborar con V8 para integrarse con `trace_event`.
* Mantenimiento e iteración de AsyncWrap.
* Mantenimiento y mejoras al soporte del sistema de tracing (DTrace, LTTng, etc.)
* Documentación de las técnicas de tracing y debugging.
* Hospedar un ecosistema de tracing y debugging.

### i18n

Los Grupos de Trabajo i18n llevan a cabo más que las traducciones. Son los puntos finales de los miembros de la comunidad para colaborar con su lenguaje elegido.

Cada equipo está organizado alrededor de un lenguaje común. Cada comunidad puede luego producir múltiples localizaciones recurso de varios proyectos.

Sus responsabilidades son:
* Traducciones de cualquiera de los materiales io.js que ellos crean relevantes para su comunidad.
* Revisar procesos teniendo traducciones actualizadas y con alta calidad.
* Redes sociales en su lenguaje.
* Promoción de conferenciantes de io.js para reuniones y conferencias en su lenguaje.

Cada comunidad de lenguaje mantiene sus afiliados.

* [iojs-ar - Árabe (اللغة العربية)](http://github.com/iojs/iojs-ar)
* [iojs-bg - Bulgara (български език)](http://github.com/iojs/iojs-bg)
* [iojs-bn - Bengalí (বাংলা)](http://github.com/iojs/iojs-bn)
* [iojs-cn - China (中文)](http://github.com/iojs/iojs-cn)
* [iojs-cs - Checa (Český Jazyk)](http://github.com/iojs/iojs-cs)
* [iojs-da - Danesa (Dansk)](http://github.com/iojs/iojs-da)
* [iojs-de - Alemana (Deutsch)](http://github.com/iojs/iojs-de)
* [iojs-el - Griega (Ελληνικά)](http://github.com/iojs/iojs-el)
* [iojs-es - Española (Español)](http://github.com/iojs/iojs-es)
* [iojs-fa - Persa (فارسی)](http://github.com/iojs/iojs-fa)
* [iojs-fi - Finesa (Suomi)](http://github.com/iojs/iojs-fi)
* [iojs-fr - Francesa (Français)](http://github.com/iojs/iojs-fr)
* [iojs-he - Hebrea (עברית)](http://github.com/iojs/iojs-he)
* [iojs-hi - Hindi (फिजी बात)](http://github.com/iojs/iojs-hi)
* [iojs-hu - Húngara (Magyar)](http://github.com/iojs/iojs-hu)
* [iojs-id - Indonesia (Bahasa Indonesia)](http://github.com/iojs/iojs-id)
* [iojs-it - Italiana (Italiano)](http://github.com/iojs/iojs-it)
* [iojs-ja - Japonesa (日本語)](http://github.com/iojs/iojs-ja)
* [iojs-ka - Georgiana (ქართული)](http://github.com/iojs/iojs-ka)
* [iojs-ko - Coreana (조선말)](http://github.com/iojs/iojs-ko)
* [iojs-mk - Macedonia (Mакедонски)](http://github.com/iojs/iojs-mk)
* [iojs-ms - Malaya (بهاس ملايو)](http://github.com/iojs/iojs-ms)
* [iojs-nl - Holandesa (Nederlands)](http://github.com/iojs/iojs-nl)
* [iojs-no - Noruega (Norsk)](http://github.com/iojs/iojs-no)
* [iojs-pl - Polaca (Język Polski)](http://github.com/iojs/iojs-pl)
* [iojs-pt - Portuguesa (Português)](http://github.com/iojs/iojs-pt)
* [iojs-ro - Rumana (Română)](http://github.com/iojs/iojs-ro)
* [iojs-ru - Rusa (Русский)](http://github.com/iojs/iojs-ru)
* [iojs-sv - Sueca (Svenska)](http://github.com/iojs/iojs-sv)
* [iojs-ta - Tamil (தமிழ்)](http://github.com/iojs/iojs-ta)
* [iojs-tr - Turca (Türkçe)](http://github.com/iojs/iojs-tr)
* [iojs-tw - Taiwanesa (Hō-ló)](http://github.com/iojs/iojs-tw)
* [iojs-uk - Ucraniana (Українська)](http://github.com/iojs/iojs-uk)
* [iojs-vi - Vietnamita (Tiếng Việtnam)](http://github.com/iojs/iojs-vi)


### [Evangelism](https://github.com/iojs/evangelism)

El grupo de trabajo evangelism promueve los logros de io.js y hace saber a la comunidad como pueden involucrarse.

Sus responsabilidades:
* Mensajería del proyecto.
* Redes sociales oficiales del proyecto.
* Promocionar conferenciantes para reuniones y conferencias.
* Promocionar eventos de la comunidad.
* Publicar actualizaciones regular y otro contenido promocional.


### [Roadmap](https://github.com/iojs/roadmap)

El Grupo de Trabajo roadmap es responsable de mantener el alcance de la comunidad de los usuarios y traducir sus preocupaciones en un plan de acción para io.js.

El documento [ROADMAP](./ROADMAP.md) final aún es propiedad de CT y requiere
la misma aprobación para cambios como cualquier otro activo del proyecto.

Sus responsabilidades son:
* Atrae y concentra las necesidades de la comunidad y su feedback.
* Buscar o potencialmente crear herramientas que permitan una participación más amplia.
* Crear Pull Requests con los cambios relevantes a [Roadmap.md](./ROADMAP.md)


### [Docker](https://github.com/iojs/docker-iojs)

El propósito del grupo de trabajo Docker es el de construir, mantener, y mejorar las imágenes oficiales de Docker para el proyecto `io.js`.

Sus responsabilidades son:
* Mantener las imágenes oficiales de Docker actualizadas en línea con las nuevas publicaciones de `io.js`.
* Decidir e implementar mejoras y/o correcciones en las imágenes.
* Mantener y mejorar la documentación de las imágenes.


## Establecer un nuevo GT

Un Grupo de Trabajo es establecido a través de definir una carta que puede ser ratificada por el CT. Siendo esta carta una *declaración de propósitos*, una *lista de responsabilidades* y una *lista de miembros iniciales*.

Un grupo de trabajo necesita 3 miembros iniciales. Estos deben de ser individuos que ya estén llevando a cabo el trabajo descrito en la carta.

La lista de responsabilidades debe ser específica. Una vez establecida, estas responsabilidades ya no son gobernadas por el CT y por lo tanto no deben de ser amplias o subjectivas. El único recurso que el CT tiene sobre el grupo de trabajo es el de revocar por completo la carta y tomar el trabajo previo llevado a cabo por el grupo de trabajo ellos mismos.

Si las responsabilidades descritas en la carta están siendo llevadas a cabo por otro GT entonces la carta deberá de ser ratificada adicionalmente por este GT.

Puedes presentar la carta del GT para ratificación enviando una Pull Request Pull Request a este documento, añadiéndose a la lista de Grupos de Trabajo. Una vez ratificada la lista de miembros debe de ser mantenida en el README del Grupo de Trabajo.

## Bootstrap Governance

Una vez el CT ratifica una carta el GT hereda la siguiente documentación de gobierno, contribución, conducta y una LICENCIA MIT. El GT es libre de cambiar estos documentos bajo sus propio proceso de gobierno de aquí el término "bootstrap."

### *[introducir nombre del GT]* Grupo de Trabajo

El *[introducir nombre del GT]* de io.js esta gobernado en conjunto por un Grupo de Trabajo (GT) que es responsable de guiar los pasos del proyecto.

El GT tiene decisión final sobre el este proyecto incluyendo:

* Dirección técnica
* Gobierno del proyecto y procesos (incluyendo esta política)
* Política de contribución
* Alojamiento del repositorio en GitHub
* Código de conducta
* Mantener una lista de colaboradores adicionales

Para una lista de los miembros actuales del GT, véase el proyecto
[README.md](./README.md#current-project-team-members).

### Colaboradores

El repositorio de GitHub de *[introducir nombre del GT]* es mantenido por el GT y Colaboradores adicionales los cuales serán añadidos por el GT de forma continua.

Individuos haciendo contribuciones significantes e importantes se convierten en  Colaboradores y se les da commit-access al proyecto. Estos individuos son identificados por el GT y son añadidos como Colaboradores discutido durante la reunión semanal.

_Nota:_ si haces una contribución significante y valiosa y no eres considerado para commit-access escribe un issue o contacta directamente a un miembro del GT y será llevado a consideración en la siguiente reunión del GT.

Modificaciones a los contenidos de *[insert WG repo]* son hechas de forma colaborativa. Cualquiera con una cuenta en GitHub puede proponer una modificación a través de pull request y será considerada por los Colaboradores del proyecto. Todas las pull request deben de ser revisadas y aceptadas por un colaborador con la suficiente destreza quién está en posición de tomar total responsabilidad del cambio. En el caso de que una pull request es propuesta por un Colaborador existente, se requiere que un Colaborador adicional firme la propuesta. Consenso debe ser buscado si más Colaboradores participan y hay un desacuerdo alrededor de una modificación en particular. Véase _Proceso de Búsqueda de Consenso_ abajo para más detalle en el modelo de consenso usado para gobernar.

Los Colaboradores pueden optar a elevar modificaciones significativas o controvertidas, o modificaciones que no han encontrado consenso al GT para discurso añadiendo la etiqueta ***WG-agenda*** a la pull
request o issue. El GT debe de servir como arbitro final cuando se requiera.

Para lista actualizada de de los Colaboradores, véase el proyecto
[README.md](./README.md#current-project-team-members).

### Membresía del GT

Los sitios en el GT no están limitados temporalmente. No hay tamaño fijo del GT. Sin embargo, el objetivo esperado está entre 6 y 12, para asegurar una cobertura de las areas de conocimiento importantes, balanceado con la habilidad para tomar decisiones de forma eficiente.

No hay un conjunto específico de requerimientos o calificaciones la membresía del GT más allá de estas reglas.

El GT puede añadir miembros adicionales al GT por consenso unánime.

Un miembro del GT puede ser eliminado del GT por resignación voluntaria, o por consenso unánime de toda la lista de miembros del GT.

Cambios en la membresía del GT deben de ser puestos en la agenda, y pueden ser sugeridos como cualquier otro item de esta (véase "Reuniones del GT" más abajo).

Si una adición o supresión es propuesta durante una reunión, y el GT no ha asistido al completo, entonces la adición o supresión se añade a la agenda de la reunión siguiente. Esto es debido a que todos a los miembros se le da la oportunidad de participar en todas las decisiones de membresía. Si un miembro del GT no está disponible para atender a la reunión cuando es planeada una decisión de membresía, entonces su consentimiento es asumido.

No más de 1/3 de los miembros del GT han de estar afiliados al mismo empleador.  Si una adición o supresión o resignación de un miembro del GT, o un cambio de empleo de un miembro del GT, crea una situación donde más 1/3 de la membresía del GT comparte un empleador, entonces la situación debe ser remediada inmediatamente con la resignación o supresión de uno o más miembros del GT afiliados con el empleador(es) más representado(s).

### Reuniones del GT

Los GT se reúnen semanalmente en un Google Hangout On Air. Un moderador designado aprobado por el GT lleva a cabo la reunión. Cada reunión debe ser publicada en YouTube.

Se añaden items a la agenda del GT que sean considerados contenciosos o sean modificaciones en el gobierno, política de contribución, membresía del GT, o proceso de publicación.

La intención de la agenda no es la de aprobar o revisar todos los parches; lo que ha de ocurrir de forma continua en GitHub y ha de ser llevada a cabo por un grupo más grande de Colaboradores.

Cualquier miembro de la comunidad o colaborador puede preguntar si algo puede ser añadido a la agenda de la siguiente reunión abriendo un GitHub Issue. Cualquier colaborador, miembro de GT o moderador puede añadir un item a la agenda añadiendo la etiqueta **Agenda del GT** al issue.

Con anterioridad a cada reunión del GT el moderador compartirá la Agenda con los miembros del GT. Los miembros del GT pueden añadir tantos items como deseen al principio de cada reunión. El moderador y el GT no pueden vetar o suprimir items.

El GT puede invitar personas o representantes a ciertos proyectos para participar en capacidad de no votante.

El moderador es responsable de resumir la discusión de cada item en la agenda y enviar una pull request después de la reunión.

### Proceso de Búsqueda de Consenso

El GT sigue un proceso de [Búsqueda de Consenso](http://es.wikipedia.org/wiki/Decisi%C3%B3n_por_consenso)
a la hora de tomar decisiones.

Cuando un item en la agenda aparece para alcanzar consenso el moderador preguntará "¿Alguien objeta?" como llamada final para disentir del consenso.

Si un item en la agenda no alcanza consenso un miembro del GT puede hacer una llamada voto o a cerrar el voto para llevar este asunto a la mesa en la siguiente reunión. La llamada a voto debe de ser secundada por la mayoría del GT o de lo contrario la discusión continuará. Mayoría simple gana.

Nótese que cambios en la membresía del GT requieren de un consenso unánime. Véase "Reuniones del GT" más arriba.

### Certificado del desarrollador de Origen 1.0

Contribuyendo a este proyecto, yo certifico que:

* (a) La contribución fue creada en su todo o en parte por mi y que tengo el derecho de presentarla bajo una licencia de código indicada en el archivo; o
* (b) La contribución está basada en un trabajo previo que, en el mejor de mi conocimiento, está cubierto bajo una licencia de código abierto apropiada y que yo tengo el derecho bajo esta licencia a presentar el trabajo con modificaciones, ya sea creado en su totalidad o en parte por mi bajo la misma licencia de código abierto (a menos que me esté permitido el presentarlo bajo una licencia diferente), como está indicado en el archivo; o
* (c) La contribución me fue provista por otra persona que certifica (a), (b) or (c) y yo no la he modificado.


### Código de Conducta

Este Código de Conducta está adaptado de [Rust's wonderful
CoC](https://github.com/rust-lang/rust/wiki/Note-development-policy#conduct).

* Estamos comprometidos a dar un amable, seguro y bienvenido ambiente para todos, indistintamente del género, orientación sexual, discapacidad, origen étnico, religión o característica personal similar.
* Por favor, evite el uso de apodos abiertamente sexuales u otros apodos que
  pudieran menoscabar un ambiente amigable, seguro y acogedor para
  todos.
* Por favor, sea amable y cortés. No hay necesidad en ser malo o grosero.
* Respete que la gente tiene diferencias de opinión y que cada
  diseño o elección tiene su contrapartida y numerosos costes. Rara vez hay una respuesta correcta.
* Por favor, mantenga la crítica no estructurada al mínimo. Si usted tiene una sólida idea que quieren experimentar, haga un fork y comprébelo.
* Se le excluirá de interacción alguna si insulta, degrada o acosa. Ese comportamiento no es bienvenido. Se interpreta como "Acoso" el que se incluye en la definición del [Código Ciudadano
  Conducta] (http://citizencodeofconduct.org/); si no está claro para usted de lo que podría incluirse en ese concepto, por favor, lea su definición. En particular, no toleramos un comportamiento que excluye a las personas en los grupos socialmente marginados.
* El acoso privado también es inaceptable. Sin importar quien sea, si
  usted siente que ha sido o está siendo acosado o se le ha hecho sentir incómodo por un miembro de la comunidad, por favor póngase en contacto con uno de los operadores del canal o cualquier de los miembros del CT inmediatamente acompañándolo de una captura (registro, foto, correo electrónico) de el acoso si es posible. Si usted es un contribuyente regular o
  un recién llegado, nos preocuparemos en hacer en esta comunidad un lugar seguro para usted y le guardaremos espalda.
* Del mismo modo cualquier spam, trolling, flaming, hostigamiento u otro
  el comportamiento relacionado con el robo de atención no es bienvenido.
* Evítese el uso de los pronombres personales en los comentarios de código o
  documentación. No hay necesidad de hacer frente a las personas al explicar
  código (por ejemplo, "Cuando el desarrollador")
