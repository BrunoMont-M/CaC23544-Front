let miMenu = document.getElementById("categoria");
miMenu.value = "option0";

let estudianteCard = document.getElementById("estudiante");
estudianteCard.addEventListener("click", function () {
    document.getElementById('categoria').value = "estudiante";
});

let traineeCard = document.getElementById("trainee");
traineeCard.addEventListener("click", function () {
    document.getElementById('categoria').value = "trainee";
});

let juniorCard = document.getElementById("junior");
juniorCard.addEventListener("click", function () {
    document.getElementById('categoria').value = "junior";
});


////////////////////////////////// VERSION CORTA //////////////////////////////////
const cantidadInput = document.getElementById('cantidad');
const optionsSelect = document.getElementById('categoria');
const total_precioElement = document.getElementById('total_precio');
const alertTotalElement = document.getElementById('alertTotal');

const optionValues = {
    'estudiante': 0.2,
    'trainee': 0.5,
    'junior': 0.85
};

function obtenerRes() {
    const cantidad = parseFloat(cantidadInput.value);
    const options = categoria.value;

    if (cantidad > 0) {
        if (options in optionValues) {
            const optionValue = optionValues[options];
            const precioTotal = 200 * cantidad;
            mostrarResumen(precioTotal * optionValue);
        } else {
            alert('Debe seleccionar una categoría');
        }
    } else {
        alert('La cantidad de tickets debe ser mayor que 0');
    }

}

function borrarForm() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('email').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('categoria').value = 'option0';
    document.getElementById('total_precio').setAttribute('hidden', true);
}

function errorEmail() {
    var emailInput = document.getElementById('email');
    emailInput.style.borderColor = 'red';
    emailInput.style.color = 'red';
    ocultarRes();
}

function errorNombre() {
    var nombreInput = document.getElementById('nombre');
    nombreInput.style.borderColor = 'red';
    nombreInput.style.color = 'red';
    ocultarRes();
}

function errorApellido() {
    var apellidoInput = document.getElementById('apellido');
    apellidoInput.style.borderColor = 'red';
    apellidoInput.style.color = 'red';
    ocultarRes();
}

function ocultarRes() {
    document.getElementById('total_precio').setAttribute('hidden', true);
}

function mostrarResumen(total) {
    document.getElementById('total_precio').innerHTML = total;
    document.getElementById('total_precio').removeAttribute('hidden');
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
        ocultarRes();
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
    obtenerRes();
    return true;
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

//////////////////////////////////// Funciones de tp final //////////////////////////////////////////

//// Crear

function crearComprador() {
    if (validarForm) {
        const comprador = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            email: document.getElementById("email").value,
            cantidad: document.getElementById("cantidad").value,
            categoria: document.getElementById("categoria").value,
            total_precio: document.getElementById("total_precio").innerHTML
        };
    
        fetch(`http://localhost:8080/web-app-tpfinal-23544/api/compradores`, {
            method: "POST",
            body: JSON.stringify(comprador),
        })
            .then(response => response.json())
            .then(json => {
                alert(`Alta de comprador id: ${json.id}`);
            })
            .catch(err => console.log(err));
    }
}

document.getElementById("btnCrear").addEventListener('click', function() {
    if(validarForm()) {
        borrarForm();
    }
});