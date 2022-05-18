Nombre postulante: Nahuel Fanego Paz

Link a la app en producción: https://nafapaz.github.io/KimcheDevChallenge/

"La tabla que contiene la información correspondiente a la asistencia diaria de un niño en un colegio tiene 90 millones de filas. Todas las tablas del sistema existen en la misma BDD en MySQL. La lógica del backend que actualiza la información correspondiente al pasar la asistencia tiene un tiempo de servicio p95 de 10 segundos. El equipo está interesado en bajar este tiempo para mejorar la experiencia del usuario (y porque nos gusta pensar en Kimche como un Ferrari). ¿Qué propondrías para enfrentar el problema? Esta pregunta es abierta, no hay respuestas malas. Puedes proponer arquitectura, tecnologías, diseño, etc."

En principio trataria de dividir la base de datos para que las queries sean mas rapidas y no sea tanto el 'volumen' de los registros; asi mismo tambien creo q se podria 'archivar'/'eliminar' datos que no sean necesarios o sean muy antiguos.
