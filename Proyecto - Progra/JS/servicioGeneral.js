let url = "http://localhost:3000/api";

const registrarCliente = async(cliente, endPoint) => {
    let ur1 = url + endPoint;
    await axios({
        method: "POST",
        url: ur1,
        data: cliente,
    });
};

const obtenerLista = async(endPoint) => {
    let listaDatos = [];
    let ur1 = url + endPoint;
    await axios({
        method: "GET",
        url: ur1,
    }).then((response) => {
        listaDatos = response.data.lista;
    });
    return listaDatos;
};

const actualizarCliente = async(id, cobro, endPoint) => {
    let ur1 = url + endPoint + id;
    await axios({
        method: "PATCH",
        url: ur1,
        data: cobro,
    });
};

const eliminarClient = async(id, endPoint) => {
    let ur1 = url + endPoint + id;
    await axios({
        method: "DELETE",
        url: ur1,
    });
};