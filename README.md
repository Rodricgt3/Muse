# Muse ♡

Interfaz ligera de tutorías de inglés y matemáticas. HTML, CSS y JavaScript, sin dependencias ni compilación. Diseño adaptable a móvil con la mascota original.

## Probar paso a paso

1. Abre la carpeta con VS Code e instala la extensión **Live Server**.
2. Haz clic derecho en `index.html` → **Open with Live Server**.
3. Selecciona un plan y envía una solicitud con datos ficticios.
4. Al final de la página, pulsa **Acceso al equipo**. Configura datos bancarios ficticios y acepta el cupo.
5. Abre **Mi espacio**, registra una referencia ficticia y vuelve al panel para confirmar el pago.

Es una demostración: los datos se guardan solo en el navegador. No hay cuentas, correos automáticos, pagos reales ni sincronización entre dispositivos. El panel está abierto para revisar el diseño. No introducir información real.

## Publicar en GitHub Pages

1. Sube los archivos a la rama `main` de tu repositorio.
2. En GitHub, entra en **Settings → Pages**.
3. En **Source**, selecciona **GitHub Actions**.
4. En **Actions → Publish Muse**, espera a que termine o pulsa **Run workflow**.
5. El enlace aparecerá en **Settings → Pages**.

El workflow publica únicamente HTML, CSS, JavaScript e imágenes.

## Editar precios

En el inicio de `app.js`, cambia `price` en cada plan. Los $149 por sesión y $499 al mes son propuestas en MXN, pendientes de confirmar. La mascota está en `assets/muse.png`.

## Firebase: integración pendiente

Esta versión permite probar la UX; todavía no es una plataforma multiusuario. Antes de recibir clientes:

1. Crear un proyecto en Firebase Console y registrar una aplicación web.
2. Activar Authentication con Google y autorizar el dominio de GitHub Pages.
3. Crear Firestore. Mantener las reglas cerradas hasta implementar y verificar el backend.
4. Registrar exactamente cuatro UID de administradores desde la consola, sin permitir al cliente modificar permisos.
5. Implementar funciones de servidor para validar precios, reservar cupos con transacciones y controlar estados. Registrar qué administrador acepta o rechaza cada solicitud.
6. Reemplazar `localStorage` por autenticación, lecturas privadas de Firestore y llamadas a las funciones. Cada cliente debe ver solo sus solicitudes.
7. Mostrar los datos bancarios únicamente al dueño de un cupo aprobado. Nunca guardarlos como configuración pública.
8. Probar reglas de acceso con emuladores y añadir aviso de privacidad antes de recopilar datos reales.

Estados: `pending → approved → reviewing → active`; `pending → rejected`; `reviewing → approved` si hay que corregir la referencia. El equipo verifica el pago en su banco: escribir una referencia no demuestra que se pagó.

No incluir claves privadas ni cuentas de servicio en el sitio. No solicitar contraseñas de Cambridge o ALEKS. Muse ofrece acompañamiento educativo independiente; el estudiante realiza sus propias actividades.
