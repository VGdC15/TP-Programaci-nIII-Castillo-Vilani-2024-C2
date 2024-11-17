
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    if (this.checkValidity()) {
        const username = document.getElementById('input').value;

        localStorage.setItem('username', username);

        // window.location.href = "productos-listados.html";
        window.location.href = "../html/productos-listados.html";
    } else {
        this.reportValidity(); 
    }
});

