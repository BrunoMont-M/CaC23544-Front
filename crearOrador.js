function borrarForm() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('email').value = '';
    document.getElementById('tema').value = '';
    document.getElementById('detalles_tema').value = '';
}

function errorEmail() {
    var emailInput = document.getElementById('email');
    emailInput.style.borderColor = 'red';
    emailInput.style.color = 'red';
}

function errorNombre() {
    var nombreInput = document.getElementById('nombre');
    nombreInput.style.borderColor = 'red';
    nombreInput.style.color = 'red';
}

function errorApellido() {
    var apellidoInput = document.getElementById('apellido');
    apellidoInput.style.borderColor = 'red';
    apellidoInput.style.color = 'red';
}

function resetearInputs() {
    var emailInput = document.getElementById('email');
    var nombreInput = document.getElementById('nombre');
    var apellidoInput = document.getElementById('apellido');
    emailInput.style.borderColor = '';
    emailInput.style.color = '';
    nombreInput.style.borderColor = '';
    nombreInput.style.color = '';
    apellidoInput.style.borderColor = '';
    apellidoInput.style.color = '';
}

function validarForm() {

    var nombre;
    var apellido;
    var email;
    var expresion;
    var expresion2;
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    email = document.getElementById('email').value;

    expresion = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    expresion2 = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;


    if (nombre === "" || apellido === "" || email === "") {
        window.alert("Todos los campos son obligatorios");
        return false
    }
    if (!expresion2.test(nombre)) {
        window.alert("Por favor, ingrese solo letras en el campo de nombre");
        errorNombre();
        return false;
    }
    if (!expresion2.test(apellido)) {
        window.alert("Por favor, ingrese solo letras en el campo apellido");
        errorApellido();
        return false;
    }
    if (!expresion.test(email)) {
        window.alert("Por favor ingrese un email válido");
        errorEmail();
        return false
    }
    resetearInputs();
    return true;
}

function crearOrador() {
    if (validarForm) {
        const orador = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            email: document.getElementById("email").value,
            tema: document.getElementById("tema").value,
            detalles_tema: document.getElementById("detalles_tema").value
        };
    
        fetch(`http://localhost:8080/web-app-tpfinal-23544/api/oradores`, {
            method: "POST",
            body: JSON.stringify(orador),
        })
            .then(response => response.json())
            .then(json => {
                alert(`Alta de orador id: ${json.id}`);
            })
            .catch(err => console.log(err));
    }
}

document.getElementById("btnCrear").addEventListener('click', function() {
    if(validarForm()) {
        crearOrador();
        borrarForm();
    }
});


//// Listado

function listarOradores() {
    const respuesta = fetch(`http://localhost:8080/web-app-tpfinal-23544/api/oradores`);

    respuesta
        .then(response => response.json())
        .then(data => procesarListado(data))
        .catch(error => dibujarError(error))
}

function procesarListado(data) {

    saveOradoresInFromLocal('oradores', data);

    const listarOradores = data;
    let rows = '';
    for (let oradores of listarOradores) {
        console.log(oradores);
        rows += `
          <tr>
              <th scope="row">${oradores.id_orador}</th>
              <td>${oradores.nombre}</td>
              <td>${oradores.apellido}</td>
              <td>${oradores.email}</td>
              <td>${oradores.tema}</td>
              <td>${oradores.detalles_tema}</td>
              <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modificarModal" onclick="editar(${oradores.id_orador})">
                        Editar
                    </button>
                    <button onclick="eliminarOrador(${oradores.id_orador})" type="button" class="btn btn-danger">
                      Eliminar
                    </button>
              </td>
          </tr>
          `
    }
    document.getElementById('modalListadoOradoresBody').innerHTML = rows;
}

function dibujarError(error) {
    console.log(error);
    const alerta = `<div class="alert alert-danger" role="alert">
          ${error.toString()}
        </div>`;
    document.getElementById('msj').innerHTML = alerta;
}

document.getElementById('btnGetUsers').addEventListener('click', listarOradores);

//// Eliminar

eliminarOrador = (id_orador) => {
    if (!confirm('¿Desea eliminar al orador?')) {
        return;
    }

    fetch(`http://localhost:8080/web-app-tpfinal-23544/api/oradores?id=${id_orador}`, {
        method: "DELETE",
    })
        .then(response => response)
        .then(json => {
            alert(`Se ha eliminado el orador id: ${id_orador}`);
            listarOradores();
        })
        .catch(err => console.log(err));
}

//// Actualizar

const getOradoresFromLocal = () => {
    const oradores = localStorage.getItem('oradores')
    if (oradores) {
        return JSON.parse(oradores);
    }
    return [];
}

const getOradorSeleccionado = () => {
    const obj = localStorage.getItem('oradorBuscado');
    if (obj) {
        return JSON.parse(obj);
    }
    return null;
}

const removerOradorSeleccionado = () => {
    localStorage.getItem('oradorBuscado');
}

const saveOradoresInFromLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

const editar = (id_orador) => {
    const oradores = getOradoresFromLocal();
    const oradorBuscado = oradores.find(o => o.id_orador === id_orador);

    document.getElementById('nombreActualizar').value = oradorBuscado.nombre;
    document.getElementById('apellidoActualizar').value = oradorBuscado.apellido;
    document.getElementById('emailActualizar').value = oradorBuscado.email;
    document.getElementById('temaActualizar').value = oradorBuscado.tema;
    document.getElementById('detalles_temaActualizar').value = oradorBuscado.detalles_tema;

    saveOradoresInFromLocal('oradorBuscado', oradorBuscado);
}

const cerrarModal = () => {
    document.getElementById('btnCerrarModal').click();
}

const actualizarOrador = () => {
    const oradorSeleccionado = getOradorSeleccionado();
    if (!oradorSeleccionado) {
        return;
    }

    const nombre = document.getElementById('nombreActualizar').value;
    const apellido = document.getElementById('apellidoActualizar').value;
    const email = document.getElementById('emailActualizar').value;
    const tema = document.getElementById('temaActualizar').value;
    const detalles_tema= document.getElementById('detalles_temaActualizar').value;

    const orador = {
        nombre,
        apellido,
        email,
        tema,
        detalles_tema,
    };

    fetch(`http://localhost:8080/web-app-tpfinal-23544/api/oradores?id=${oradorSeleccionado.id_orador}`, {
        method: "PUT",
        body: JSON.stringify(orador),
    })
        .then(response => response)
        .then(json => {
            alert(`Se ha modificado el orador id:${oradorSeleccionado.id_orador}`);
            listarOradores();
            removerOradorSeleccionado();
            cerrarModal();
        })
        .catch(err => console.log(err));
}