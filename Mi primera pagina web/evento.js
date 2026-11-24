const formulario = document.getElementById("form-registro-evento");
const estadoGeneral = document.getElementById("estado-general");
const resumenJson = document.getElementById("resumen-json");

const EVENTOS_PERMITIDOS = [
    "Expo de Autos",
    "Arrancones 1/4 de milla",
    "Competicion SPL"
];

const UBICACIONES_PERMITIDAS = [
    "Ixtlayork",
    "Jiquiyork",
    "Toluca"
];

const camposError = {
    nombre: document.getElementById("error-nombre"),
    email: document.getElementById("error-email"),
    edad: document.getElementById("error-edad"),
    evento: document.getElementById("error-evento"),
    ubicacion: document.getElementById("error-ubicacion")
};

function leerDatos(form) {
    const datos = Object.fromEntries(new FormData(form));
    const edadTexto = (datos.edad ?? "").toString().trim();

    return {
        nombre: (datos.nombre || "").trim(),
        email: (datos.email || "").trim(),
        edad: edadTexto === "" ? NaN : Number(edadTexto),
        genero: (datos.genero || "").trim(),
        evento: (datos.evento || "").trim(),
        ubicacion: (datos.ubicacion || "").trim()
    };
}

function validarDatos(datos) {
    const errores = {};

    // 1. Longitud mínima del nombre
    if (datos.nombre.length < 3) {
        errores.nombre = "Escribe un nombre de al menos 3 caracteres.";
    }

    // Validación básica de correo para el formulario (no cuenta como regla del proyecto por sí sola)
    if (!datos.email || !datos.email.includes("@") || !datos.email.includes(".")) {
        errores.email = "Escribe un correo electrónico con formato válido (ejemplo: usuario@correo.com).";
    }

    // 2. Rango de edad (entero entre 18 y 99)
    if (!Number.isInteger(datos.edad) || datos.edad < 18 || datos.edad > 99) {
        errores.edad = "Escribe una edad válida como número entero entre 18 y 99.";
    }

    // 3. Catálogo de eventos permitido
    if (!EVENTOS_PERMITIDOS.includes(datos.evento)) {
        errores.evento = "Selecciona un evento válido: Expo de Autos, Arrancones 1/4 de milla o Competicion SPL.";
    }

    // 4. Catálogo de ubicaciones permitido
    if (!UBICACIONES_PERMITIDAS.includes(datos.ubicacion)) {
        errores.ubicacion = "Elige o escribe una ubicación permitida: Ixtlayork, Jiquiyork o Toluca.";
    }

    return errores;
}

function establecerEstadoCampo(campo, mensajeError) {
    const elementoError = camposError[campo];
    if (!elementoError) return;

    elementoError.textContent = mensajeError || "";

    const control = formulario ? formulario.elements[campo] : null;
    if (!control) return;

    if (mensajeError) {
        if (typeof control.setAttribute === "function") {
            control.setAttribute("aria-invalid", "true");
        }
    } else {
        if (typeof control.removeAttribute === "function") {
            control.removeAttribute("aria-invalid");
        }
    }
}

function mostrarResultado(datos, errores) {
    const camposConError = Object.keys(errores);

    for (const campo of Object.keys(camposError)) {
        establecerEstadoCampo(campo, errores[campo] || "");
    }

    if (camposConError.length > 0) {
        estadoGeneral.textContent = "Revisa los campos marcados antes de continuar.";
        resumenJson.textContent = "";
        return;
    }

    estadoGeneral.textContent = "Datos válidos. Resumen JSON listo para Web U4.2.";
    resumenJson.textContent = JSON.stringify(
        {
            nombre: datos.nombre,
            email: datos.email,
            edad: datos.edad,
            genero: datos.genero || null,
            evento: datos.evento,
            ubicacion: datos.ubicacion
        },
        null,
        2
    );
}

function limpiarErrorAlEscribir(evento) {
    const nombreCampo = evento.target.name;
    if (nombreCampo && Object.prototype.hasOwnProperty.call(camposError, nombreCampo)) {
        establecerEstadoCampo(nombreCampo, "");
    }
}

function manejarEnvio(evento) {
    evento.preventDefault();
    const datos = leerDatos(formulario);
    const errores = validarDatos(datos);
    mostrarResultado(datos, errores);
}

if (formulario && !formulario.dataset.listenerRegistrado) {
    formulario.dataset.listenerRegistrado = "true";
    formulario.addEventListener("submit", manejarEnvio);
    formulario.addEventListener("input", limpiarErrorAlEscribir);
    formulario.addEventListener("change", limpiarErrorAlEscribir);
}