let miMenu = document.getElementById("options_select");
        miMenu.value= "option0";

        let estudianteCard = document.getElementById("estudiante");
        estudianteCard.addEventListener("click", function(){
        document.getElementById('options_select').value = "option1";
        });

        let traineeCard = document.getElementById("trainee");
        traineeCard.addEventListener("click", function(){
        document.getElementById('options_select').value = "option2";
        });

        let juniorCard = document.getElementById("junior");
        juniorCard.addEventListener("click", function(){
        document.getElementById('options_select').value = "option3";
        });

const cantTicketInput = document.getElementById('cantTicket');
const optionsSelect = document.getElementById('options_select');
const resumenElement = document.getElementById('resumen');
const alertTotalElement = document.getElementById('alertTotal');

const optionValues = {
    'option1': 0.2,
    'option2': 0.5,
    'option3': 0.85
};

function obtenerRes() {
    const cantidad = parseFloat(cantTicketInput.value);
    const options = optionsSelect.value;

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

function mostrarResumen(total) {
    resumenElement.innerHTML = total;
    alertTotalElement.removeAttribute('hidden');
}

function borrarForm() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('email').value = '';
    document.getElementById('cantTicket').value = '';
    document.getElementById('options_select').value = 'option0';
    document.getElementById('resumen').setAttribute('hidden', true);
}

function validarForm() {

    var nombre;
    var apellido; 
    var email;
    var expresion;
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    email = document.getElementById('email').value;

    expresion= /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if ( nombre === "" || apellido === "" || email === "" ) { 
        window.alert("Todos los campos son obligatorios");
        return false
    }
    else if (!expresion.test(email.value)){ 
        window.alert("Por favor ingrese un email válido");
        return false
    }
}