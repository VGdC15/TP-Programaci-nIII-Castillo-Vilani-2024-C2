
document.getElementsByClassName("logo-nav")[0].addEventListener("click",()=>{
    //Si esta en "index.html" no deberia funcionar porque no puso su nombre todavia
    window.location.href = "./productos-listados.html";
});

// muestra el nombre de usuario almacenado, si existe
const username = localStorage.getItem('username');

if (username) {
    document.getElementById('bienvenida-usuario').textContent = `Bienvenido/a, ${username}`;
}