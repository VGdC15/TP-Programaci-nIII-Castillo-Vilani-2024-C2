document.addEventListener('DOMContentLoaded', function() {
    const carritoContainer = document.getElementById('carrito');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');
    
    function cargarProductosCarrito() {
        const productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];
        carritoContainer.innerHTML = '';

        // Verifica si el carrito está vacío
        if (productosCarrito.length === 0) {
            carritoContainer.innerHTML = '<p>No tienes productos en el carrito.</p>';
            totalPriceElement.textContent = '$0.00';
            return;
        }

        let total = 0;

        // agrega productos al contenedor
        productosCarrito.forEach(producto => {
            // Crea elementos para cada producto
            const productRow = document.createElement('div');
            productRow.classList.add('cart-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-3');

            // Producto y precio
            productRow.innerHTML = `
                <span>${producto.nombre}</span>
                <span>$${producto.precio.toFixed(2)}</span>
            `;
            carritoContainer.appendChild(productRow);

            total += producto.precio;
        });

        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    function finalizarCompra() {
        alert('¡Gracias por tu compra!');
        localStorage.removeItem('productosCarrito'); 
        cargarProductosCarrito();  
    }

    checkoutButton.addEventListener('click', finalizarCompra);

    cargarProductosCarrito();
});

