const cuerpoTabla = document.querySelector("#tablaClientes tbody");
let listaClientes = [];

const inicializarListas = async() => {
    listaClientes = await obtenerLista("/obtener-clientes");
    mostrarClientes();
};

const mostrarClientes = async() => {
    cuerpoTabla.innerHTML = "";
    listaClientes.forEach((cliente) => {
        let fila = cuerpoTabla.insertRow();
        fila.setAttribute("id", cliente._id);
        fila.insertCell().innerText = cliente.nombre;
        fila.insertCell().innerText = cliente.apellido;
        fila.insertCell().innerText = cliente.email;
        fila.insertCell().innerText = cliente.mensualidad;
        fila.insertCell().innerText = cliente.montoAdeudado;
        fila.insertCell().innerHTML = `<button onclick="cobrarCliente()">Cobrar</button>`;
        fila.insertCell().innerHTML = `<button onclick="eliminarCliente()">Eliminar</button>`;
    });
};

function cobrarCliente() {
    var rowId = event.target.parentNode.parentNode.id;
    var data = document.getElementById(rowId);
    var mensualidad = parseFloat(data.cells.item(3).innerText);
    var montoAdeudado = parseFloat(data.cells.item(4).innerText);
    let cobro;
    if (montoAdeudado == 0) {
        data.innerHTML += `<div id="dialog" title="No hay deuda">
    <p>No hay deuda por cobrar</p></div>`;
        $(function() {
            $("#dialog").dialog();
        });
    } else {
        if (mensualidad > montoAdeudado) {
            cobro = mensualidad - montoAdeudado;
            let contenido = { mensualidad: cobro, montoAdeudado: 0 };
            actualizarCliente(rowId, contenido, "/actualizar-cliente/");
            data.innerHTML += `<div id="dialog" title="Cobro con exito">
    <p>Se realizo el cobro</p></div>`;
            $(function() {
                $("#dialog").dialog();
            });
            setInterval("location.reload()", 5000);
        } else {
            data.cells.item(4).style.background = "red";
            data.innerHTML += `<div id="dialog" title="Error al cobrar">
    <p>No hay suficientes fondos para efectuar el cobro</p></div>`;
            $(function() {
                $("#dialog").dialog();
            });
        }
    }
}

const eliminarCliente = () => {
    var rowId = event.target.parentNode.parentNode.id;
    var data = document.getElementById(rowId);
    var montoAdeudado = parseFloat(data.cells.item(4).innerText);
    if (montoAdeudado == 0) {
        eliminarClient(rowId, "/eliminar-cliente/");
        data.innerHTML += `<div id="dialog" title="Eliminando">
    <p>El cliente seleccionado a sido eliminado</p></div>`;
        $(function() {
            $("#dialog").dialog();
        });
        setInterval("location.reload()", 5000);
    } else {
        data.innerHTML += `<div id="dialog" title="Error">
    <p>No se ha eliminado el cliente porque le debe a la empresa</p></div>`;
        $(function() {
            $("#dialog").dialog();
        });
        setInterval("location.reload()", 5000);
    }
};

function refrescar() {
    location.reload();
}

inicializarListas();