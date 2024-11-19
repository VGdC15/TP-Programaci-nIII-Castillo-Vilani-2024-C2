import Producto from "./producto.js";
import Swal from "../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

let indicePrimerProducto = 0;

// obtenerProductos();
obtenerTodosLosProductos();
document.addEventListener("DOMContentLoaded",()=>{
    document.getElementsByClassName("btn-opcion-nav")[0].addEventListener("click",function(){
        obtenerProductos("casco");
    });
    document.getElementsByClassName("btn-opcion-nav")[1].addEventListener("click",function(){
        obtenerProductos("campera");
    });
    document.getElementById("pagina-anterior").addEventListener("click",function(){
        obtenerProductos("anterior");
    });
    document.getElementById("pagina-siguiente").addEventListener("click",function(){
        obtenerProductos("siguiente");
    });
});


async function obtenerTodosLosProductos(){
    try{
        const response = await fetch("http://localhost:3000/productos/todos");
        const resultado = await response.text();
        document.getElementsByClassName("grid-productos")[0].innerHTML = resultado;
        EscucharBtnAgregarCarrito();
    }catch(error){
        console.error("Error al traer los datos:", error);
        throw error;
    }
}

async function obtenerProductos(tipo=null,direccion=null){
    try{
        const data = await Producto.TraerProductos();
        console.log(data);
        CargarProductos(indicePrimerProducto,data,direccion);
    }catch(error){
        console.error("Error:", error);
    }
}


function EstablecerIndiceInicial(indiceInicial,direccion){
    if(direccion === "anterior"){
        indiceInicial -= 12;
    }else if (direccion === "siguiente"){
        indiceInicial += 12;
    }
    if(indiceInicial < 0){
        indiceInicial = 0;
    }
    return indiceInicial;
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

//Filtro de tipo
function CargarProductos(indiceInicial,data,direccion=null){
    document.getElementsByClassName("grid-productos")[0].innerHTML = "";
    if(direccion){
        indiceInicial = EstablecerIndiceInicial(indiceInicial,direccion);
    }
    for(let i=indiceInicial;i<indiceInicial+12;i++){
        if(i<data.length){
            CrearYUbicar(data,i);
        }
    }
    return indiceInicial;
}

function CrearYUbicar(data,i){
    let producto = new Producto(data[i]["imagen"],data[i]["marca"],data[i]["modelo"],data[i]["precio"],data[i]["tipo"],data[i]["estado"]);
    let elementoHTML = Producto.CrearElementoProductoGrilla(producto);
    document.getElementsByClassName("grid-productos")[0].appendChild(elementoHTML);
    const botonAgregar = elementoHTML.querySelector(".btnAgregarCarrito");
    Producto.EscucharBtnAgregarCarrito(botonAgregar, producto);
}
