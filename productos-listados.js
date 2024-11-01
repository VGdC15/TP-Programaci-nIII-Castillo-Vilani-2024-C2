import Producto from "./producto.js";

let indicePrimerProducto = 0;

obtenerProductos();

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



async function obtenerProductos(tipo=null,direccion=null){
    try{
        const data = await Producto.TraerProductos();
        CargarProductos(indicePrimerProducto,data,tipo,direccion);
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

//Poner filtro de tipo
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
    let producto = new Producto(data[i]["img"],data[i]["marca"],data[i]["modelo"],data[i]["precio"],data[i]["tipo"],data[i]["estado"]);
    let elementoHTML = Producto.CrearElementoProductoGrilla(producto);
    document.getElementsByClassName("grid-productos")[0].appendChild(elementoHTML);
}