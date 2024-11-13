document.addEventListener('DOMContentLoaded', async function() {
    const carritoContainer = document.getElementById('carrito');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');

    async function cargarProductosCarrito() {
        carritoContainer.innerHTML = '';

        const carritoIDs = [];
        for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i);
            const idProducto = localStorage.getItem(clave);
            if (idProducto) {
                carritoIDs.push(idProducto);
            }
        }

        if (carritoIDs.length === 0) {
            carritoContainer.innerHTML = '<p>No tienes productos en el carrito.</p>';
            totalPriceElement.textContent = '$0.00';
            return;
        }

        let total = 0;

        for (let id of carritoIDs) {
            console.log(`Obteniendo producto con idproductos: ${id}`);
            try {
                const response = await fetch(`http://localhost:3000/productos/${id}`);

                if (!response.ok) {
                    console.error(`Error: No se pudo obtener el producto con idproductos ${id}`);
                    continue;
                }

                const producto = await response.json();

                const productRow = document.createElement('div');
                productRow.classList.add('cart-item', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-3');

                productRow.innerHTML = `
                    <img src="imagenes/${producto.img}" alt="${producto.nombre}" class="img-fluid" style="width: 50px; height: 50px; margin-right: 10px;">
                    <span>${producto.marca} - ${producto.nombre}</span>
                    <span>$${producto.precio.toFixed(2)}</span>
                `;
                
                carritoContainer.appendChild(productRow);
                total += producto.precio;

            } catch (error) {
                console.error(`Error al cargar el producto con idproductos ${id}:`, error);
            }
        }

        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    function finalizarCompra() {
        alert('¡Gracias por tu compra!');
        localStorage.clear();
        cargarProductosCarrito();  
    }

    checkoutButton.addEventListener('click', finalizarCompra);

    cargarProductosCarrito();
});
