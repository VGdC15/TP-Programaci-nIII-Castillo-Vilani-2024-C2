const carritoContainer = document.getElementById('carrito');
const totalPriceElement = document.getElementById('total-price');
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

    productosCarrito.forEach(producto => {
        const productRow = document.createElement('div');
        productRow.classList.add('cart-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-3');

        productRow.innerHTML = `
            <img src="./imagenes/${producto.img}" alt="${producto.nombre}" class="img-fluid" style="width: 50px; height: 50px; margin-right: 10px;">
            <span>${producto.marca} ${producto.modelo}</span>
            <span>$${producto.precio.toFixed(2)}</span>
        `;
        
        carritoContainer.appendChild(productRow);

        total += producto.precio;
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

function finalizarCompra() {
    alert('¡Gracias por tu compra!');
    localStorage.removeItem('carrito'); 
    cargarProductosCarrito(); 
}

checkoutButton.addEventListener('click', finalizarCompra);
cargarProductosCarrito();
