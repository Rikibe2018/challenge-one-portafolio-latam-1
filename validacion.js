//Haz tú validación en javascript acá
const inputs = document.querySelectorAll("input");
const textareas = document.querySelectorAll("textarea");
const form = document.getElementById("form");
const button_submit = document.getElementById('button_submit');

const expresiones = {
    asunto: /^[a-zA-Z0-9\_\-]/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]+$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    mensaje: /^[a-zA-Z0-9\_\-]/,
}

const menssaje_Error = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío.",
        typeMismatch: "El campo Nombre no puede tener simbolos como (@#$%^&*,etc) ni numeros"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío.",
        typeMismatch: "El correo no es válido",
    },
    asunto: {
        valueMissing: "El campo asunto no puede estar vacío.",
    },
    mensaje: {
        valueMissing: "El campo mensaje no puede estar vacío.",
    },
};


const field_ok = {
    nombre: false,
    email: false,
    asunto: false,
    mensaje: false
}
var message = '';

function validField(field, value) {
    response_boolean = false;
    switch (field) {
        case "nombre":
            if (value.length <= 50 && value.length > 0) {
                if (expresiones.nombre.test(value)) {
                    response_boolean = true;
                    field_ok.nombre = true;
                    break;
                } else {
                    message = menssaje_Error.nombre.typeMismatch;
                    break;
                }
            } else {
                message = menssaje_Error.nombre.valueMissing;
            }
            break;
        case "email":
            if (value.length > 0) {
                if (expresiones.email.test(value)) {
                    response_boolean = true;
                    field_ok.email = true;
                    break;
                } else {
                    message = menssaje_Error.email.typeMismatch;
                    break;
                }
            } else {
                message = menssaje_Error.email.valueMissing;
            }
            break;
        case "asunto":
            if (value.length > 0) {
                if (expresiones.asunto.test(value)) {
                    response_boolean = true;
                    field_ok.asunto = true;
                    break;
                } else {
                    message = menssaje_Error.asunto.typeMismatch;
                    break;
                }
            } else {
                message = menssaje_Error.asunto.valueMissing;
            }
            break;
        case "mensaje":
            if (value.length > 0) {
                if (expresiones.mensaje.test(value)) {
                    response_boolean = true;
                    field_ok.mensaje = true;
                    break;
                } else {
                    message = menssaje_Error.mensaje.typeMismatch;
                    break;
                }
            } else {
                message = menssaje_Error.mensaje.valueMissing;
            }
            break;
    }
    return response_boolean;
}
const show_valid_ok = (field) => {
    document.querySelector(`#${field} i`).classList.add('fa-check-circle');
    document.querySelector(`#${field} i`).classList.add('formulario__validacion-estado-true');
    document.querySelector(`#${field} i`).classList.remove('fa-times-circle');
    document.querySelector(`#${field} i`).classList.remove('formulario__validacion-estado-false');
    document.querySelector(`p.formulario__mesage_error#${field}`).innerHTML = '';
    validate_button_submit();
};

const show_invalid_value = (field) => {
    document.querySelector(`#${field} i`).classList.add('fa-times-circle');
    document.querySelector(`#${field} i`).classList.add('formulario__validacion-estado-false');
    document.querySelector(`#${field} i`).classList.remove('fa-check-circle');
    document.querySelector(`#${field} i`).classList.remove('formulario__validacion-estado-true');
    document.querySelector(`p.formulario__mesage_error#${field}`).innerHTML = message;
    validate_button_submit();
};

const validForm = (e) => {
    switch (e.target.name) {
        case "nombre":
            if (validField("nombre", e.target.value)) {
                show_valid_ok('nombre');
                field_ok.nombre = true;
            } else {
                show_invalid_value('nombre');
                field_ok.nombre = false;
            }
            break;
        case "email":
            if (validField("email", e.target.value)) {
                show_valid_ok('email');
                field_ok.email = true;
            } else {
                show_invalid_value('email');
                field_ok.email = false;
            }
            break;
        case "asunto":
            if (validField("asunto", e.target.value)) {
                show_valid_ok('asunto');
                field_ok.asunto = true;
            } else {
                show_invalid_value('asunto');
                field_ok.asunto = false;
            }
            break;
        case "mensaje":
            if (validField("mensaje", e.target.value)) {
                show_valid_ok('mensaje');
                field_ok.mensaje = true;
            } else {
                show_invalid_value('mensaje');
                field_ok.mensaje = false;
            }
            break;
    }
    // validate_button_submit();
}

function validate_button_submit() {
    if (field_ok.asunto && field_ok.email && field_ok.mensaje && field_ok.nombre) {
        button_submit.removeAttribute("disabled");
    } else {
        button_submit.setAttribute('disabled', true);
    }
}


inputs.forEach((input) => {
    input.addEventListener('blur', validForm);
    input.addEventListener('keyup', validForm);

});
textareas.forEach((textarea) => {
    textarea.addEventListener('blur', validForm);
    textarea.addEventListener('keyup', validForm);

});

form.addEventListener("submit", (e) => {
    e.preventDefault();
});
