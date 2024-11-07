function GetProductos(categoria) {
    const xhr = new XMLHttpRequest(),
        $lista = document.getElementById('Productos');

    console.log(xhr);
    xhr.addEventListener('readystatechange', (e) => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('conectado');

            //Parseo el texto plano del JSON
            let json = JSON.parse(xhr.responseText);
            console.log(json)
            //Primer bucle toma cada llave de los productos
            if (json[categoria]) {
                json[categoria].forEach(p => {
                    $lista.innerHTML += `
                    <div>
                        <img src="${p.imagen}">
                        <p>${p.titulo}</p>
                        <p>$${p.precio}</p>
                    </div>`;
                });
            } else {
                $lista.innerHTML = `<p>No hay productos disponibles en esta categoría.</p>`;
            }


        } else {
            $lista.innerHTML = `
            <div class="tarjeta">
            <img src="" alt="">
            <h2>Error no se encontraron datos</h2>
            <p>${xhr.status}</p>
            <p>${xhr.statusText}</p>
            </div>`;
        }
    });

    xhr.open("GET",'../data/datos.json');

    xhr.send();
}
function BuscarProductos(cat) {
    var desde = parseInt(document.getElementById('desde').value);//Parseamos a entero el valor tomado desde el input
    var hasta = parseInt(document.getElementById('hasta').value);//Ya que los valores que se toman por defecto son string
    //var cat = document.getElementById('categoria').value;

    if (hasta == "" || Number.isNaN(hasta)) {
        hasta = 9999999999999
    }
    if (desde == "" || Number.isNaN(desde)) {
        desde = 0
    }
    const xhr = new XMLHttpRequest(),
        $lista = document.getElementById('Productos');

    xhr.addEventListener('readystatechange', (e) => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('conectado');
            console.log(desde, hasta)
            //Parseo el texto plano del JSON
            let json = JSON.parse(xhr.responseText);
            console.log(json[cat])
            $lista.innerHTML = ``;
            if (json[cat]) {
                json[cat].forEach((p) => {
                    if (desde <= p.precio && hasta >= p.precio) {
                    $lista.innerHTML += `
                    <div>
                        <img src="${p.imagen}">
                        <p>${p.titulo}</p>
                        <p>$${p.precio}</p>
                    </div>`;
                }
                });
            } else {
                $lista.innerHTML = `<p>No hay productos disponibles en esta categoría.</p>`;
            }
        } else {
            $lista.innerHTML = `
            <div class="tarjeta">
            <img src="" alt="">
            <h2>Error no se encontraron datos</h2>
            <p>${xhr.status}</p>
            <p>${xhr.statusText}</p>
            </div>`;
        }
    });

    xhr.open("GET", '../data/datos.json');

    xhr.send();
}

const expresiones = {
    nombre: /^[A-Za-z]{2,}$/,  // Nombre con solo letras y mínimo 2 caracteres
    apellido: /^[A-Za-z]+$/,    // Apellido solo con letras
    correo: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // Correo electrónico
    telefono: /^\+?[0-9]{1,4}?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/,  // Teléfono con formato internacional
    textarea: /.+/  // Asegura que textarea no esté vacío
};

let formulario = document.getElementById('formulario');
let inputs = document.querySelectorAll('#formulario input');
let textareas = document.querySelectorAll('#formulario textarea');
let botonEnviar = formulario.querySelector('button');
botonEnviar.disabled = true;  // Inicialmente deshabilitar el botón

// Función para habilitar/deshabilitar el botón de enviar
const habilitarBoton = () => {
    let formularioValido = true;

    // Verificar que todos los campos tengan la clase 'div-form-correct'
    const campos = [...inputs, ...textareas];  // Unimos inputs y textareas en un solo array
    campos.forEach(campo => {
        // Si cualquier campo no tiene la clase 'div-form-correct', deshabilitamos el botón
        if (!campo.classList.contains('div-form-correct')) {
            formularioValido = false;
        }
    });

    // Habilitar o deshabilitar el botón según la validez del formulario
    botonEnviar.disabled = !formularioValido;
};

// Función para validar cada campo
const validarFormulario = (e) => {
    const campo = e.target;  // Campo que disparó el evento
    const nombreCampo = campo.name;  // Nombre del campo (ej. "nombre", "apellido", etc.)

    // Validar el campo dependiendo de su nombre
    switch (nombreCampo) {
        case 'nombre':
            if (expresiones.nombre.test(campo.value)) {
                campo.classList.remove('div-form-incorrect');
                campo.classList.add('div-form-correct');
            } else {
                campo.classList.remove('div-form-correct');
                campo.classList.add('div-form-incorrect');
            }
            break;

        case 'apellido':
            if (expresiones.apellido.test(campo.value)) {
                campo.classList.remove('div-form-incorrect');
                campo.classList.add('div-form-correct');
            } else {
                campo.classList.remove('div-form-correct');
                campo.classList.add('div-form-incorrect');
            }
            break;

        case 'email':
            if (expresiones.correo.test(campo.value)) {
                campo.classList.remove('div-form-incorrect');
                campo.classList.add('div-form-correct');
            } else {
                campo.classList.remove('div-form-correct');
                campo.classList.add('div-form-incorrect');
            }
            break;

        case 'telefono':
            if (expresiones.telefono.test(campo.value)) {
                campo.classList.remove('div-form-incorrect');
                campo.classList.add('div-form-correct');
            } else {
                campo.classList.remove('div-form-correct');
                campo.classList.add('div-form-incorrect');
            }
            break;

        case 'consulta':
            if (expresiones.textarea.test(campo.value)) {
                campo.classList.remove('div-form-incorrect');
                campo.classList.add('div-form-correct');
            } else {
                campo.classList.remove('div-form-correct');
                campo.classList.add('div-form-incorrect');
            }
            break;

        default:
            break;
    }

    habilitarBoton();  // Verificar la validez completa del formulario después de cada cambio
};

// Agregar el evento de validación a todos los inputs y textareas
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
});

textareas.forEach((textarea) => {  // Validar todos los textareas
    textarea.addEventListener('keyup', validarFormulario);
});

// Prevenir el envío del formulario si algún campo es inválido
formulario.addEventListener('submit', (e) => {
    // Evitar el envío si el botón está deshabilitado
    if (botonEnviar.disabled) {
        e.preventDefault();  // Si el botón está deshabilitado, no se envía el formulario
        alert('Por favor, complete todos los campos correctamente');
    }
});