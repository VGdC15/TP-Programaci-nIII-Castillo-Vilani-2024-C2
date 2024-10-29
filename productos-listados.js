import Producto from "./producto.js";

let indicePrimerProducto = 0;

obtenerProductos();

document.getElementById("pagina-anterior").addEventListener("click",function(){
    obtenerProductos("anterior");
});
document.getElementById("pagina-siguiente").addEventListener("click",function(){
    obtenerProductos("siguiente");
    console.log("siguiente");
});



async function obtenerProductos(direccion=null){
    try{
        const data = await Producto.TraerProductos();
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


function CargarProductos(indiceInicial,data,direccion=null){
    if(direccion){
        document.getElementsByClassName("grid-productos")[0].innerHTML = "";
        indiceInicial = EstablecerIndiceInicial(indiceInicial,direccion);    
    }
    for(let i=indiceInicial;i<indiceInicial+12;i++){
        if(i<data.length){
            let producto = new Producto(data[i]["img"],data[i]["marca"],data[i]["modelo"],data[i]["precio"],data[i]["tipo"],data[i]["estado"]);
            let elementoHTML = Producto.CrearElementoProductoGrilla(producto);
            document.getElementsByClassName("grid-productos")[0].appendChild(elementoHTML)
        }
    }
    return indiceInicial;
}