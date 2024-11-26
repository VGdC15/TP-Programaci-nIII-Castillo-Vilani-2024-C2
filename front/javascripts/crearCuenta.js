import Swal from "../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

document.addEventListener("DOMContentLoaded", () => {
    // Asignar evento al botón
    const crearBoton = document.getElementById("crearCuenta");
    crearBoton.addEventListener("click", crear);
});

async function crear() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar si los campos están completos
    if (!email || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, completa todos los campos.',
        });
        return;
    }

    try {
        // Enviar datos al servidor
        const response = await fetch('http://localhost:3000/usuario/crearUsuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email, 
                password 
            }),
        });

        if (response.ok) {
            const result = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Usuario creado exitosamente',
                confirmButtonColor: '#ee7410',
                showConfirmButton: true,
            }).then(() => {
                window.location.href = "../html/loginAdm.html"; 
            });
        } else {
            const error = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error al crear usuario',
                text: error.error || 'No se pudo crear el usuario.',
            });
        }

    } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Usuario ya registrado.', 'error');
    }
}