// El panel de administrador debe mostrar los productos disponibles con sus detalles, separados por tipo.
//(Listar todos los productos)

// El panel debe poder permitir seleccionar un producto y:
// Modificar el producto (nombre, precio, imagen).
// Desactivar el producto (baja lógica → cambiar el valor de activo a false).
// Reactivar el producto (cambiar el valor de activo a true).
// El panel debe poder permitir agregar un nuevo producto a la base de datos. (activo por defecto).
// El panel debe poseer un botón que permita descargar el listado de ventas en excel.


//      Que falta?
//  -Un cartel cuando agregas los productos
//  -Advertencias cuando ingresas datos erroneos o vacios


//Boton INICIO
document.getElementById("btn-inicio-abm").addEventListener("click",function(){
    document.getElementById("accion").remove();
    document.getElementsByClassName("opciones-principales")[0].style.visibility = "visible";
})

//Home >> Agregar
document.getElementById("btn-agregar-nuevo").addEventListener("click",function(){
    document.getElementsByClassName("opciones-principales")[0].style.visibility = "hidden"
    document.getElementsByClassName("main-abm")[0].appendChild(CrearElemento("div",{id:"accion"}));
    document.getElementById("accion").appendChild(CrearFormAgregarProducto());
    document.getElementById("div-imagenes-boton").appendChild(CrearElemento("button", { id: "btn-agregar" }, "Agregar producto"))
    CrearBtnBackHome();
})



//Home >> Modificar
document.getElementById("btn-modificar-producto").addEventListener("click",function(){
    document.getElementsByClassName("opciones-principales")[0].style.visibility = "hidden"
    document.getElementsByClassName("main-abm")[0].appendChild(CrearElemento("div",{id:"accion"}));
    let div = document.createElement("div");
    div.setAttribute("class","grid-productos");
    document.getElementById("accion").appendChild(div);
    TraerData();
})



function EscucharProducto(elementoHTML,producto){
    elementoHTML.addEventListener("click",function(){
    document.getElementById("accion").innerHTML = "";       
    document.getElementById("accion").appendChild(CrearPaginaModificar(producto));
    document.getElementById("div-imagenes-boton").appendChild(CrearElemento("button", { id: "btn-modificar" }, "Modificar producto"));
    });
    // for(let btnModificar of document.getElementsByClassName("btn-modificar")){
    //     btnModificar.addEventListener("click",function(){
    //         document.getElementById("accion").innerHTML = "";   
    //         console.log(producto["marca"]);        
    //         document.getElementById("accion").appendChild(CrearPaginaModificar(producto));
    //         document.getElementById("div-imagenes-boton").appendChild(CrearElemento("button", { id: "btn-modificar" }, "Modificar producto"));
    //         CrearBtnBackHome()
    //     })
    // }
    for(let btnActivar of document.getElementsByClassName("btn-activar")){
        btnActivar.addEventListener("click",function(event){
        })
    }
}


function CrearBtnBackHome(){
    let btn = CrearElemento("button",{class:"btn-back-home"},"Volver al inicio");
    document.getElementById("accion").appendChild(btn);
    btn.addEventListener("click",function(){
        document.getElementById("accion").remove();
        document.getElementsByClassName("opciones-principales")[0].style.visibility = "visible";
    })
}


function CrearElemento(tipo,atributos={},texto="") {
    let elemento = document.createElement(tipo);
    for (let clave in atributos) {
        elemento.setAttribute(clave, atributos[clave]);
    }
    if (texto) {
        elemento.textContent = texto;
    }
    return elemento;
}


function CrearPaginaModificar(producto){
    let pantallaModificar = CrearElemento("div",{id:"pantalla-modificar"});
    pantallaModificar.appendChild(CrearFormAgregarProducto(producto["marca"],producto["modelo"],producto["precio"],producto["descripcion"]));
    return pantallaModificar;
}

function CrearElementoProductoGrilla(producto){
    let divProducto = document.createElement("div");
    divProducto.setAttribute("class","producto");
    divProducto.appendChild(CrearOpcionesHTML(producto));
    divProducto.appendChild(CrearImagenHTML(producto["img"]));
    divProducto.appendChild(CrearTituloHTML(producto));
    divProducto.appendChild(CrearPrecioHTML(producto));

    // Creo que igual deberia escuchar el elemento aca
    return divProducto;
}

function CrearPrecioHTML(producto){
    let div = document.createElement("div");
    div.setAttribute("class","precio");
    let p = document.createElement("p");
    p.textContent = producto["precio"];
    div.appendChild(p);
    return div;
}

function CrearTituloHTML(producto){
    let pTitulo = document.createElement("p");
    pTitulo.textContent = `${producto["marca"]} ${producto["modelo"]}`;
    return pTitulo;
}

function CrearOpcionesHTML(producto){
    let div = document.createElement("div");
    div.setAttribute("class","opciones");
    let btnMod = document.createElement("button");
    btnMod.setAttribute("class","btn-modificar");
    btnMod.textContent = "Modificar";
    let btnAct = document.createElement("button");
    btnAct.setAttribute("class","btn-activar");
    if(producto["estado"]==="activado"){
        btnAct.textContent = "Desactivar";
    }else{
        btnAct.textContent = "Activar";
    }
    div.appendChild(btnMod);
    div.appendChild(btnAct);
    return div;
}

function CrearImagenHTML(url){        
    let imagen = document.createElement("img");
    imagen.setAttribute("class","img-producto");
    imagen.setAttribute("src","./imagenes/"+url);
    return imagen;
}


function CrearFormAgregarProducto(marca=null,modelo=null,precio=null,descripcion=null) {
    let form = CrearElemento("form", { class: "form-agregar-producto" });
    let divInputs = CrearElemento("div",{id:"div-inputs-texto"});
    let divImagenesBoton = CrearElemento("div",{id:"div-imagenes-boton"})

    let divInputMarca = CrearElemento("div",{class:"div-input"});
    divInputMarca.appendChild(CrearElemento("label", { for: "input-agregar-marca" }, "Marca:"));
    let inputMarca = CrearElemento("input", { id: "input-agregar-marca"});
    inputMarca.value = marca;
    divInputMarca.appendChild(inputMarca);
        
    let divInputModelo = CrearElemento("div",{class:"div-input"});
    divInputModelo.appendChild(CrearElemento("label", { for: "input-agregar-modelo" }, "Modelo:"));
    let inputModelo = CrearElemento("input", { id: "input-agregar-modelo"});
    inputModelo.value = modelo
    divInputModelo.appendChild(inputModelo);
  
    let divInputPrecio = CrearElemento("div",{class:"div-input"});
    divInputPrecio.appendChild(CrearElemento("label", { for: "input-agregar-precio" }, "Precio:"));
    let inputPrecio = CrearElemento("input", { id: "input-agregar-precio"});
    inputPrecio.value = precio;
    divInputPrecio.appendChild(inputPrecio);
    
    let divDescripcion = CrearElemento("div",{id:"div-descripcion"});
    divDescripcion.appendChild(CrearElemento("label", { for: "input-agregar-descripcion" }, "Descripcion"));
    let inputDescripcion = CrearElemento("textarea", { id: "input-agregar-descripcion",rows:"4",cols:"50"});
    inputDescripcion.value = descripcion;
    divDescripcion.appendChild(inputDescripcion);
    
    divInputs.appendChild(divInputMarca);
    divInputs.appendChild(divInputModelo);
    divInputs.appendChild(divInputPrecio);
    divInputs.appendChild(divDescripcion);
    
    let divImagenes = CrearElemento("div",{class:"div-imagenes"});
    divImagenesBoton.appendChild(divImagenes);
    divImagenes.appendChild(CrearElemento("label", { for: "input-agregar-imagenes" }, "Imágenes:"));
    divImagenes.appendChild(CrearElemento("input", { type: "file", id: "input-agregar-imagenes", name: "imagenes-producto", accept: "image/*", multiple: true }));
    
    form.appendChild(divInputs);
    form.appendChild(divImagenesBoton);    
    return form;
}

function TraerData(){
    fetch("./productos.json")
    .then(response => response.text())
    .then(jsonString => {
        Iterar(jsonString);
    })
    .catch(error => {
        console.error("Error al traer los datos:", error);
        reject(error);
    });
}

function Iterar(json){
    json = JSON.parse(json);
    let grilla = document.getElementsByClassName("grid-productos")[0];
        
    for(let producto of json){   
        let elementoHTML = CrearElementoProductoGrilla(producto);
        EscucharProducto(elementoHTML,producto);
        grilla.appendChild(elementoHTML);    
    }
}