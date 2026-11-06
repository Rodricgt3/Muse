# Muse ♡

Sitio estático para GitHub Pages con Firebase Authentication (Google) y Firestore. La configuración de `muse-7d4d2` ya está integrada. No usa Analytics ni envía eventos de seguimiento.

## Activar Firebase paso a paso

La configuración web no permite administrar tu proyecto desde este chat. Completa estos pasos en la consola:

1. Abre https://console.firebase.google.com/project/muse-7d4d2/overview .
2. Ve a **Compilación → Authentication → Comenzar → Método de acceso → Google**. Actívalo, selecciona el correo de asistencia y guarda.
3. En **Authentication → Configuración → Dominios autorizados**, añade `localhost` para probar y el dominio de tu web, por ejemplo `tuusuario.github.io` (sin ruta ni https).
4. Ve a **Firestore Database → Crear base de datos**. Usa la base `(default)` y el modo producción. Selecciona la región que corresponda a tu proyecto.
5. Abre **Firestore → Reglas**, reemplaza el contenido por el archivo `firestore.rules` de este repositorio y pulsa **Publicar**. No uses reglas públicas de prueba.
6. En **Firestore → Datos**, crea la colección `settings`, documento `team`. Añade un campo **uids** de tipo **array**. Puedes dejar el array vacío mientras los cuatro inician sesión por primera vez.
7. Abre la web con Live Server (VS Code → extensión Live Server → clic derecho en `index.html` → Open with Live Server). Pulsa **Iniciar sesión** y usa Google.
8. Cada administrador debe entrar en **Mi espacio** y copiar su **UID**. También aparece en **Authentication → Usuarios**.
9. Edita `settings/team`: añade los cuatro UID como elementos de texto del array `uids`. Solo se permiten hasta cuatro administradores. Nadie puede modificar esta lista desde la web; los cambios se hacen en la consola.
10. Cierra sesión y vuelve a entrar. Abre **Acceso al equipo**, al final de la página. Introduce banco, titular, CLABE y concepto; selecciona **Aceptar solicitudes** y guarda. Esto crea `settings/public` y `settings/payment`.

Hasta completar la configuración, los paquetes permanecen cerrados. Si Firebase muestra un error, la web no registra solicitudes de forma local ni simula que se enviaron.

## Flujo de uso

1. El alumno inicia sesión con Google, elige un plan y envía sus temas y horarios.
2. El equipo entra al panel y acepta o rechaza la solicitud. Al aceptar, se copia la información bancaria a esa solicitud privada.
3. El alumno pulsa **Actualizar** en Mi espacio y consulta los datos para transferir.
4. Registra la referencia. El equipo comprueba la transferencia en el banco antes de pulsar **Confirmar pago**.
5. Las sesiones se coordinan manualmente por correo. La web no manda correos automáticos.

El panel pausa nuevas solicitudes y nuevas aprobaciones. Los cupos ya aprobados pueden completar su pago. El control de carga es manual, no hay contador automático de plazas ni renovaciones automáticas. Una referencia no demuestra un pago. Cada aprobación registra el UID del administrador. Las vistas muestran hasta 100 solicitudes sin actualización automática; pulsa Actualizar para consultar cambios.

## Seguridad y datos

- Cada alumno consulta únicamente sus solicitudes. Los cuatro UID autorizados acceden al panel.
- Firestore valida propietario, precios, fechas y transiciones. El usuario no puede aprobar su pago ni cambiar importes desde el navegador.
- Los datos bancarios de configuración son privados; solo se copian a una solicitud cuando se aprueba. Cambiar el banco no cambia los datos de solicitudes aprobadas anteriormente.
- No se usan datos del prototipo anterior almacenados en el navegador.
- La configuración Firebase web es pública por diseño. No añadas claves de servicio o contraseñas al repositorio.
- Antes de captar datos reales, define y publica tu aviso de privacidad y prueba las reglas en tu proyecto.

## Publicar en GitHub Pages

1. Sube los archivos a la rama `main` de GitHub.
2. Abre **Settings → Pages → Source → GitHub Actions**.
3. En **Actions → Publish Muse**, ejecuta el workflow si no se inicia automáticamente.
4. El enlace aparecerá en **Settings → Pages**. Añade ese dominio a Authentication como indica el paso 3.

Se publican solo HTML, CSS, JavaScript e imágenes. Las reglas de Firestore se publican por separado desde la consola. Si tienes Firebase CLI configurado, también puedes usar `firebase deploy --only firestore:rules --project muse-7d4d2`.

## Precios

Los precios propuestos son $149 MXN por sesión y $499 MXN al mes. Para cambiarlos hay que actualizar tanto `plans` en `app.js` como los importes permitidos en `firestore.rules`, y volver a publicar ambos. Las solicitudes existentes conservan su precio original.

## Verificación

Se verificó sintaxis JavaScript y se añadieron reglas con acceso restringido. La activación real de Google, las reglas desplegadas y los permisos necesitan comprobarse en Firebase; no se han desplegado desde este entorno. Prueba con dos alumnos distintos que no puedan consultar solicitudes ajenas y con una cuenta fuera del equipo que no pueda aprobarlas. Prueba también rechazos, pausa, pago en revisión y corrección de referencia.

Muse ofrece tutorías independientes; los alumnos realizan sus propias actividades y evaluaciones. No solicitar contraseñas de Cambridge o ALEKS.
