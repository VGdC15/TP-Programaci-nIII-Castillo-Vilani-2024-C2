import Swal from "../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('email').value = "";
    document.getElementById('password').value= "";
    // Asigna evento al botón
    const ingresarBoton = document.getElementById("Ingresar");
    ingresarBoton.addEventListener("click", ingresar);

    const autocompletarBoton = document.getElementById("Autocompletar");
    autocompletarBoton.addEventListener("click", autocompletar);
});

function autocompletar() {
    document.getElementById('email').value = "vero@gmail.com";
    document.getElementById('password').value= "Vero12345";

}

async function ingresar() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Valida si los campos están completos
    if (!email || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos.',
        });
        return;
    }

        // envío de datos al servidor
        const response = await fetch('http://localhost:3000/usuario/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email, 
                password 
            }),
        });
        
        const result = await response.json();
        
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Ingreso exitoso',
                confirmButtonColor: '#ee7410',
                showConfirmButton: true
            }).then(() => {
                window.location.href = "../html/abm-admin.html"; 
            });
        }else{
            if(result.message === undefined){
                Swal.fire({icon:"error",
                    title:"Error",
                    text:result.error}
                );
            }else{
                Swal.fire({icon:"error",
                    title:"Error",
                    text:result.message}
                );
            }
        }   
}








