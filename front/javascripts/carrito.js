import Swal from "../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

const carritoContainer = document.getElementById('carrito');
const totalPriceElement = document.getElementById('totalPrice');
const checkoutButton = document.getElementById('checkout-button');


function cargarProductosCarrito() {
    const productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoContainer.innerHTML = '';

    if (productosCarrito.length === 0) {
        carritoContainer.innerHTML = '<p>No tienes productos en el carrito.</p>';
        totalPriceElement.textContent = '$0.00';
        return; 
    }

    let total = 0;

    productosCarrito.forEach((producto, index) => {
        const productRow = document.createElement('div');
        productRow.classList.add('cart-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-3');

        productRow.innerHTML = `
            <img src="../../back/public/images/productos/${producto.img}" alt="${producto.nombre}" class="img-fluid" style="width: 50px; height: 50px; margin-right: 10px;">
            <span>${producto.marca} ${producto.modelo}</span>
            <span>$${producto.precio.toFixed(2)}</span>
            <div class="d-flex align-items-center">
                <input 
                    type="number" 
                    class="product-quantity" 
                    data-index="${index}" 
                    min="1" 
                    value="${producto.cantidad || 1}" 
                    style="width: 60px; text-align: center; margin-right: 10px;">
                <button 
                    class="delete-product btn btn-sm" 
                    data-index="${index}" 
                    style="color: red; background: none; border: none;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        carritoContainer.appendChild(productRow);

        total += producto.precio * (producto.cantidad || 1);
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;

    // actualizar cantidades
    const cantidades = document.querySelectorAll('.product-quantity');
    cantidades.forEach(input => {
        input.addEventListener('change', (e) => actualizarCantidad(e.target));
    });

    // eliminar productos
    const botonBorrar = document.querySelectorAll('.delete-product');
    botonBorrar.forEach(button => {
        button.addEventListener('click', (e) => eliminarProducto(e.target));
    });

    // Agregar enlace para más productos
    const cartSummary = document.getElementById('cart-summary');
    const addMoreLink = document.getElementById('add-more-link');
    
    if (!addMoreLink) {
        const newLink = document.createElement('a');
        newLink.id = 'add-more-link';
        newLink.href = 'productos-listados.html'; 
        newLink.textContent = 'Agregar más productos al carrito';
        newLink.style.display = 'block';
        newLink.style.marginTop = '15px';
        newLink.style.textAlign = 'center';
        cartSummary.appendChild(newLink);
    }
}

function actualizarCantidad(input) {
    const productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = parseInt(input.getAttribute('data-index'));
    const nuevaCantidad = parseInt(input.value);

    if (nuevaCantidad >= 1) {
        productosCarrito[index].cantidad = nuevaCantidad;
        localStorage.setItem('carrito', JSON.stringify(productosCarrito));
        cargarProductosCarrito(); 
    } else {
        Swal.fire('La cantidad debe ser al menos 1');
        input.value = productosCarrito[index].cantidad || 1;
    }
}

function eliminarProducto(button) {
    const productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = parseInt(button.getAttribute('data-index'));

    Swal.fire({
        title: '¿Estás segura/o?',
        text: 'Este producto será eliminado del carrito.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ee7410',
        cancelButtonColor: '#5E17EB',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // elimina producto si se confirma
            productosCarrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(productosCarrito));
            cargarProductosCarrito(); 
            Swal.fire('Eliminado', 'El producto ha sido eliminado del carrito.', 'success');
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Asignar evento al botón
    const checkoutButton = document.getElementById("checkout-button");
    checkoutButton.addEventListener("click", finalizarCompra);
});

async function finalizarCompra() {
    const productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nombreUsuario = localStorage.getItem('username');

    if (productosCarrito.length === 0) {
        Swal.fire('El carrito está vacío.', 'Agrega productos para continuar.', 'info');
        return;
    }

    // Confirmación antes de proceder
    const result = await Swal.fire({
        title: '¿Desea confirmar la compra?',
        text: 'Estás a un paso de finalizar la operación.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ee7410',
        cancelButtonColor: '#5E17EB',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
        // Envío de datos al servidor
        const response = await fetch('http://localhost:3000/ticket/finalizar-compra', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nombreComprador:nombreUsuario,
                productos: productosCarrito 
            })
        });

        if (response.ok) {
            const data = await response.json()
            localStorage.setItem('idVenta', data.idVenta);

            Swal.fire({
                title: '¡Compra realizada!',
                text: 'Redirigiendo al ticket de compra...',
                icon: 'success',
                confirmButtonColor: '#ee7410',
                showConfirmButton: true
            }).then(() => {
                window.location.href = "ticket.html"; // Redirige al ticket
            });

            localStorage.removeItem('carrito'); 
            localStorage.removeItem("idVenta");
            cargarProductosCarrito(); 
        } else {
            Swal.fire('Error', 'Hubo un problema al procesar tu compra.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudo conectar con el servidor. Intenta más tarde.', 'error');
    }
}

cargarProductosCarrito();
