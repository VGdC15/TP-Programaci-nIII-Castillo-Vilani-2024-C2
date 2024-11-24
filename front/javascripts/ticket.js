async function hacerTicket() {
    const productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const response = await fetch('http://localhost:3000/ticket/finalizar-compra', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productos: productosCarrito })
});

document.getElementById("formTicket").innerHTML= await response.text();

}

hacerTicket();