import Swal from "../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

// Si todavia no ingreso su nombre lo redirige al inicio devuelta
const nombre = localStorage.getItem("username");
if(nombre == undefined){
    window.location.href = "./index.html"
}

localStorage.setItem("indice",0);
localStorage.setItem("vista","todos");

ObtenerProductos();

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementsByClassName("btn-opcion-nav")[0].addEventListener("click",function(){
        localStorage.setItem("vista","cascos");
        ObtenerProductoEspecifico("cascos");
        
    });
    document.getElementsByClassName("btn-opcion-nav")[1].addEventListener("click",function(){
        localStorage.setItem("vista","camperas");
        ObtenerProductoEspecifico("camperas");
    });
    document.getElementById("pagina-anterior").addEventListener("click",async function(){
        CambiarPagina("anterior");
    });
    document.getElementById("pagina-siguiente").addEventListener("click",async function(){
        CambiarPagina("siguiente");
    });
});



async function CambiarPagina(direccion){
    await ObtenerProductos(direccion);
}

async function SetIndice(direccion){
    const indiceActual = localStorage.getItem("indice");
    if(direccion === "siguiente"){
        localStorage.setItem("indice",(parseInt(indiceActual,"10") + 4));
    }else if(direccion === "anterior"){
        if(indiceActual - 4 < 0){
            localStorage.setItem("indice",0);
        }else{
            localStorage.setItem("indice",(parseInt(indiceActual,"10") - 4));        
        }
    }
}

async function ObtenerProductoEspecifico(producto){
    try{
        const indice = localStorage.getItem("indice");
        const response = await fetch(`http://localhost:3000/productos/${producto}?indice=${indice}`);
        if(response.status === 500){
            Swal.fire("Error al conectarse con el servidor");
        }
        if(response.status === 201){
            const resultado = await response.text();
            document.getElementsByClassName("grid-productos")[0].innerHTML = resultado;
            EscucharBtnAgregarCarrito();
        }
    }catch(error){
        console.error("Error al traer los datos:", error);
        throw error;
    }
}

async function ObtenerProductos(direccion=0){
    try{
        const indice = localStorage.getItem("indice");
        const vista = localStorage.getItem("vista");
        const response = await fetch(`http://localhost:3000/productos/${vista}?indice=${indice}&direccion=${direccion}`);
        if(response.status === 500){
            Swal.fire("Error al conectarse con el servidor");
        }
        if(response.status === 201){
            const resultado = await response.text();
            if(resultado !== ""){
                document.getElementsByClassName("grid-productos")[0].innerHTML = resultado;
                EscucharBtnAgregarCarrito();
                SetIndice(direccion);
            }
        }
        if(response.status === 100){

        }
    }catch(error){
        console.error("Error al traer los datos:", error);
        throw error;
    }
}


function EscucharBtnAgregarCarrito(){
    let productos = document.getElementsByClassName("producto");
    let botones = document.getElementsByClassName("BtnAgregarCarrito");

    for(let i=0;i<productos.length;i++){
        botones[i].addEventListener("click", () => {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            const existeProducto = carrito.some(item => item.modelo === productos[i].getAttribute("data-modelo"));
        
            if (!existeProducto) {
                carrito.push({
                    id:productos[i].getAttribute("data-id"),
                    img: productos[i].getAttribute("data-imagen"),
                    marca: productos[i].getAttribute("data-marca"),
                    modelo: productos[i].getAttribute("data-modelo"),
                    precio: Number(productos[i].getAttribute("data-precio")),
                    tipo: productos[i].getAttribute("data-tipo"),
                    estado: productos[i].getAttribute("data-estado"),
                    descripcion: productos[i].getAttribute("data-descripcion")
                });
        
                localStorage.setItem("carrito", JSON.stringify(carrito));
                Swal.fire("Producto agregado al carrito");
            } 
        });
    }
}

