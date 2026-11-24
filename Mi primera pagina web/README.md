# Mi primera página web — Registro de Eventos (Web U4.1)

Aplicación web estática enfocada en eventos automotrices, actualizada en la unidad **Web U4.1** con validación del lado del cliente y manejo dinámico del DOM sin recargar la página ni realizar envíos de red.

## Operación implementada

- **Vista principal de la operación:** `evento.html`
- **Lógica de validación y DOM:** `evento.js`
- **Descripción:** Formulario de registro de asistencia a eventos (`#form-registro-evento`) con atributo `novalidate`. Valida cuatro reglas de negocio (longitud mínima del nombre, rango de edad entera entre 18 y 99 años, catálogo de eventos permitidos y catálogo de ubicaciones permitidas), muestra mensajes puntuales junto a cada campo con atributos de accesibilidad (`aria-describedby`, `aria-invalid`, `role="status"`), limpia errores al corregir mediante el evento `input` y presenta el resumen JSON de los datos válidos dentro de `<pre id="resumen-json">`.

## Cómo abrir la pantalla

1. Clona o descarga el repositorio en tu equipo.
2. Abre la carpeta del proyecto (`Mi primera pagina web`).
3. Abre el archivo `evento.html` en un navegador web moderno (por ejemplo, Microsoft Edge o Google Chrome).
4. _(Opcional)_ Presiona `F12` para abrir las herramientas de desarrollo (DevTools) y verificar en las pestañas **Consola** y **Red** que no existan errores ni peticiones salientes al enviar el formulario.

## Estructura del proyecto

- `index.html` — Página de inicio.
- `evento.html` — Vista con el formulario de registro al evento y áreas de estado/resumen JSON.
- `evento.js` — Script encargado de leer los datos, validar reglas, gestionar errores en el DOM y construir el JSON.
- `multimedia.html` — Galería multimedia.
- `css/estilos.css` — Hoja de estilos del sitio.
- `README.md` — Documentación de la operación, ejecución y diagnóstico del servidor.

## Estado del servidor

**C** — Todavía no existe servidor, base de datos ni ruta backend implementada para esta operación. Actualmente los datos permanecen únicamente en el navegador y se preparan en formato JSON para su futura integración mediante `POST /api/eventos/registros` en Web U4.2.
