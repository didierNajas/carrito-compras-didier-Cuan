// 🛒 Sistema de Carrito de Compras

// Datos del carrito
let carrito = [];

// Elementos del DOM
const botonesAgregar = document.querySelectorAll('.btn-agregar');
const listaCarrito = document.getElementById('lista-carrito');
const totalElement = document.getElementById('total');
const badge = document.getElementById('badge');
const btnVaciar = document.getElementById('btn-vaciar');
const msgVacio = document.getElementById('msg-vacio');

// ✅ Evento: Agregar al carrito
botonesAgregar.forEach(boton =>
    {
    boton.addEventListener('click', agregarProducto);
});

function agregarProducto(event)
{
    const nombre = event.target.dataset.nombre;
    const precio = parseInt(event.target.dataset.precio);

    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente)
        {
        productoExistente.cantidad++;
    }
    else
        {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
}

// ✅ Función: Actualizar carrito (renderizar, total, badge)
function actualizarCarrito()
{
    renderizarCarrito();
    calcularTotal();
    actualizarBadge();
}

// ✅ Función: Renderizar items del carrito
function renderizarCarrito()
{
    listaCarrito.innerHTML = '';

    if (carrito.length === 0)
        {
        listaCarrito.appendChild(msgVacio);
        return;
    }

    carrito.forEach((producto, index) =>
        {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <div class="d-flex justify-content-between w-100 align-items-center">
                <div>
                    <strong>${producto.nombre}</strong><br>
                    <small>$${producto.precio.toLocaleString()} x${producto.cantidad}</small>
                </div>
                <button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">✖</button>
            </div>
        `;
        listaCarrito.appendChild(li);
    });

    // Agregar eventos a botones eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => 
        {
        btn.addEventListener('click', eliminarProducto);
    });
}

// Función: Eliminar producto del carrito
function eliminarProducto(event) 
{
    const index = event.target.dataset.index;
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función: Calcular y mostrar total
function calcularTotal()
{
    const total = carrito.reduce((suma, producto) =>
        {
        return suma + (producto.precio * producto.cantidad);
    }, 0);

    totalElement.textContent = `$${total.toLocaleString()}`;
}

// Función: Actualizar badge
function actualizarBadge()
{
    const cantidadTotal = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
    badge.textContent = cantidadTotal;
}

// Evento: Vaciar carrito
btnVaciar.addEventListener('click', () =>
    {
    carrito = [];
    actualizarCarrito();
});