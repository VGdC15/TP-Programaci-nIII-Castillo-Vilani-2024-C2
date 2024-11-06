
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    if (this.checkValidity()) {
        window.location.href = "productos-listados.html";
    } else {
        this.reportValidity();
    }
});

