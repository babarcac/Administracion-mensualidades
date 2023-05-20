const inputNombre = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const inputCorreo = document.querySelector("#correo");
const inputMensualidad = document.querySelector("#mensualidad");
const inputMontoAdeudado = document.querySelector("#montoAdeudado");
const btnAgregar = document.querySelector("#agregar");
const form = document.getElementById("form0");

const validar = () => {
    let error = false;
    if (inputNombre.value == "") {
        inputNombre.classList.add("input-error");
        error = true;
    } else {
        inputNombre.classList.remove("input-error");
    }
    if (inputApellido.value == "") {
        inputApellido.classList.add("input-error");
        error = true;
    } else {
        inputApellido.classList.remove("input-error");
    }
    if (inputCorreo.value == "") {
        inputCorreo.classList.add("input-error");
        error = true;
    } else {
        inputCorreo.classList.remove("input-error");
    }
    if (inputMensualidad.value == "" || inputMensualidad.value == 0) {
        inputMensualidad.classList.add("input-error");
        error = true;
    } else {
        inputMensualidad.classList.remove("input-error");
    }
    if (inputMontoAdeudado.value == "" || inputMontoAdeudado.value == 0) {
        inputMontoAdeudado.classList.add("input-error");
        error = true;
    } else {
        inputMontoAdeudado.classList.remove("input-error");
    }

    if (error) {
        form.innerHTML += `<div id="dialog" title="Informacion incorrecta">
    <p>Error al registrar el cliente</p></div>`;
    } else {
        let cliente = {
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            email: inputCorreo.value,
            mensualidad: inputMensualidad.value,
            montoAdeudado: inputMontoAdeudado.value,
        };
        registrarCliente(cliente, "/registrar-cliente");
        form.innerHTML += `<div id="dialog" title="Exito">
    <p>Se a registrado correctamente</p></div>`;
    }
    $(function() {
        $("#dialog").dialog();
    });
    setInterval("location.reload()", 3000);
};

btnAgregar.addEventListener("click", validar);