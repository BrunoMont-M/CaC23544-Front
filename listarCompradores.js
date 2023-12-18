//// Listado

function listarCompradores() {
    const respuesta = fetch(`https://brunomont-m.github.io/CaC23544-Front/web-app-tpfinal-23544/api/compradores`);

    respuesta
        .then(response => response.json())
        .then(cdata => procesarListado(cdata))
        .catch(error => dibujarError(error))
}

function procesarListado(cdata) {

    saveCompradoresInFromLocal('compradores', cdata);

    const listarCompradores = cdata;
    let rows = '';
    for (let compradores of listarCompradores) {
        console.log(compradores);
        rows += `
          <tr>
              <th scope="row">${compradores.id_comprador}</th>
              <td>${compradores.nombre}</td>
              <td>${compradores.apellido}</td>
              <td>${compradores.email}</td>
              <td>${compradores.categoria}</td>
              <td>${compradores.cantidad}</td>
              <td>${compradores.total_precio}</td>
          </tr>
          `
    }
    document.getElementById('modalListadoCompradoresBody').innerHTML = rows;
}

function dibujarError(error) {
    console.log(error);
    const alerta = `<div class="alert alert-danger" role="alert">
          ${error.toString()}
        </div>`;
    document.getElementById('mensaje').innerHTML = alerta;
}

document.getElementById('btnGetCompradorUser').addEventListener('click', listarCompradores);


const getCompradoresFromLocal = () => {
    const compradores = localStorage.getItem('compradores')
    if (compradores) {
        return JSON.parse(compradores);
    }
    return [];
}

const getCompradorSeleccionado = () => {
    const obj = localStorage.getItem('compradorBuscado');
    if (obj) {
        return JSON.parse(obj);
    }
    return null;
}

const removerCompradorSeleccionado = () => {
    localStorage.removeItem('compradorBuscado');
}

const removerCompradorFromLocal = () => {
    localStorage.removeItem('compradores');
}

const saveCompradoresInFromLocal = (ckey, cdata) => {
    localStorage.setItem(ckey, JSON.stringify(cdata));
}