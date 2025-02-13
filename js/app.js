
//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventsListeners();

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

function cargarEventsListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito de compras
    vaciarCarritoBtn.addEventListener('click', function () {
        articulosCarrito = [];
        limpiarHTML();
    });
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito.push(infoCurso);
    }
    carritoHTML();
}

function carritoHTML() {
    //Limpia el HTML
    limpiarHTML();
    //recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
       <td>
            <img src="${curso.imagen}" width="100">
       </td>
       <td>${curso.titulo}</td>
       <td>${curso.precio}</td>
       <td>${curso.cantidad}</td>
       <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
       </td>
       `;
        //Agregar el HTML del elemento al tbody
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    //contenedorCarrito.innerHTML = ``;
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


