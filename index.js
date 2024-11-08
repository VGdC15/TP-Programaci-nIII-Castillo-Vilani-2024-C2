/* 
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    if (this.checkValidity()) {
        window.location.href = "productos-listados.html";
    } else {
        this.reportValidity(); 
    }
});
*/

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    if (this.checkValidity()) {
        // Obtener el valor ingresado en el input
        const username = document.getElementById('input').value;

        // Guardar el nombre de usuario en local storage
        localStorage.setItem('username', username);

        // Redirigir a la página de productos listados
        window.location.href = "productos-listados.html";
    } else {
        this.reportValidity(); 
    }
});