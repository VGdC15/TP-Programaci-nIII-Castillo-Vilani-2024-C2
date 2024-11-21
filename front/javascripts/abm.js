import Producto from "./producto.js";

// Guardar el indice por el cual empezar a cargar en el localstorage
// Traer solo la cantidad que yo quiera
// El boton de anterior, resta la cantidad que yo muestro en la pagina hasta que alcance el cero
// El boton de siguiente suma la cantidad siempre y cuando haya mas productos (Como lo hago sin que se queje la db?)


//Boton INICIO
document.getElementById("btn-inicio-abm").addEventListener("click",function(){
    document.getElementById("accion").innerHTML = "";
    document.getElementById("accion").style.visibility = "hidden";
    document.getElementsByClassName("opciones-principales")[0].style.visibility = "visible";
})

//Home >> Agregar
document.getElementById("btn-agregar-nuevo").addEventListener("click",function(){
    document.getElementsByClassName("opciones-principales")[0].style.visibility = "hidden"
    InsertarFormNuevoProducto();
})


//Home >> Modificar
document.getElementById("btn-modificar-producto").addEventListener("click",function(){
    document.getElementsByClassName("opciones-principales")[0].style.visibility = "hidden" 
    CargarProductosAsync();
})


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
    console.log(indiceInicial);
    for(let i=indiceInicial;i<indiceInicial+12;i++){
        if(i<data.length){
            let producto = new Producto(data[i]["img"],data[i]["marca"],data[i]["modelo"],data[i]["precio"],data[i]["tipo"],data[i]["estado"]);
            let elementoHTML = Producto.CrearElementoProductoGrilla(producto);
            document.getElementsByClassName("grid-productos")[0].appendChild(elementoHTML)
        }
    }
    return indiceInicial;
}




async function InsertarFormNuevoProducto(){
    const response = await fetch("http://localhost:3000/admin/form-producto");
    const form = await response.text();
    document.getElementById("accion").style.visibility = "visible";
    document.getElementById("accion").innerHTML = form;
    
    document.getElementsByClassName("form-agregar-producto")[0].addEventListener("submit",EscucharBtnFormNuevo);
}

async function EscucharBtnFormNuevo(event){
    event.preventDefault();
    
    //Enviar imagen
    const formData = new FormData();
    const imagen = document.getElementById("input-agregar-imagenes").files[0];
    formData.append("imagen",imagen); 
    const resultado = await fetch("http://localhost:3000/admin/carga",{
            method:"POST",
            body:formData
    });
    
    //CargarProducto
    const ruta = await resultado.json();
    const producto = {
        marca: event.target.marca.value,
        modelo: event.target.modelo.value,
        precio: event.target.precio.value,
        tipo: event.target.tipo.value,
        imagen: ruta.ruta,
        descripcion: event.target.descripcion.value,
    };
    
    InsertarNuevoProducto(producto);
    event.target.reset();
}


async function InsertarFormModProducto(idProducto){
    const response = await fetch("http://localhost:3000/admin/modificar-producto",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:idProducto}),
    });
    const form = await response.text();
    document.getElementById("accion").style.visibility = "visible";
    document.getElementById("accion").innerHTML = form;
    document.getElementsByClassName("form-agregar-producto")[0].addEventListener("submit",(event)=>{
        EscuhcarBtnFormMod(event,idProducto);
    });
}


async function EscuhcarBtnFormMod(event,id){
    event.preventDefault();
    const producto = {
        id:id,
        marca: event.target.marca.value,
        modelo: event.target.modelo.value,
        precio: event.target.precio.value,
        tipo: event.target.tipo.value,
        descripcion: event.target.descripcion.value,
    };
    EnviarProductoActualizado(producto);
    event.target.reset();
}

async function EnviarProductoActualizado(producto){
    const response = await fetch("http://localhost:3000/admin/modificar",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:producto.id,marca:producto.marca,modelo:producto.modelo,precio:producto.precio,tipo:producto.tipo,descripcion:producto.descripcion,}),
    });
}

async function InsertarNuevoProducto(producto){
    const response = await fetch("http://localhost:3000/admin/nuevo-producto",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({marca:producto.marca,modelo:producto.modelo,precio:producto.precio,tipo:producto.tipo,imagen:producto.imagen,descripcion:producto.descripcion,}),
    });
}

async function LimpiarDivAccion(){
    document.getElementById("accion").innerHTML = "";
}

async function ObtenerTodosLosProductos(){
    try{
        const response = await fetch("http://localhost:3000/admin/productos/todos");
        const resultado = await response.text();
        let divGrid = document.createElement("div");
        divGrid.setAttribute("class","grid-productos");
        divGrid.innerHTML = resultado;
        document.getElementById("accion").appendChild(divGrid);
        document.getElementById("accion").style.visibility = "visible";       
    }catch(error){
        console.error("Error al traer los datos:", error);
        throw error;
    }
}


function EscucharBtnModProducto(){
    let productos = document.getElementsByClassName("producto");
    let botonesMod = document.getElementsByClassName("btn-modificar");
    let botonesAct = document.getElementsByClassName("btn-activar");
    
    for(let i=0;i<productos.length;i++){
        
        botonesAct[i].addEventListener("click",async()=>{
            EscucharBtnEstado(productos[i]);
        });
        
        botonesMod[i].addEventListener("click", () => {
            InsertarFormModProducto(productos[i].getAttribute("data-id"));
        });
    }
}


async function EscucharBtnEstado(producto){
    const resultado = await fetch("http://localhost:3000/admin/cambiar-estado",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            id:producto.getAttribute("data-id"),
            estado:producto.getAttribute("data-estado")  
        })
    });
    if(resultado.status === 200){
        CargarProductosAsync();
    }
}


async function CargarProductosAsync(){
    await LimpiarDivAccion();
    await ObtenerTodosLosProductos();
    EscucharBtnModProducto();
}


// function CrearElemento(tipo,atributos={},texto="") {
//     let elemento = document.createElement(tipo);
//     for (let clave in atributos) {
//         elemento.setAttribute(clave, atributos[clave]);
//     }
//     if (texto) {
//         elemento.textContent = texto;
//     }
//     return elemento;
// }

// async function CargarFormulario() {
//     try {
//       const response = await fetch('./form-agregar.html'); // Ruta al archivo HTML
//       if (!response.ok) throw new Error('Error al  el formulario');
//       const contenidoHTML = await response.text();
//       document.getElementById('accion').innerHTML = contenidoHTML;
//     } catch (error) {
//       console.error("Error al cargar el formulario:", error);
//     }
// }

// function CrearBotones(){
//     let div = document.createElement("div");
//     div.setAttribute("class","selector-paginas");
//     let btnAnterior = document.createElement("button");
//     let btnSiguiente = document.createElement("button")
//     btnAnterior.setAttribute("id","pagina-anterior");
//     btnSiguiente.setAttribute("id","pagina-siguiente");
//     div.appendChild(btnAnterior);
//     div.appendChild(btnSiguiente);
//     document.getElementById("accion").appendChild(div);
// }

// async function obtenerProductos(indicePrimerProducto=0,direccion=null){
//     try{
//         const data = await Producto.TraerProductos();
//         CargarProductos(indicePrimerProducto,data,direccion);
//     }catch(error){
//         console.error("Error:", error);
//     }
// }
// function CrearPaginaModificar(producto){
//     let pantallaModificar = CrearElemento("div",{id:"pantalla-modificar"});
//     pantallaModificar.appendChild(CrearFormAgregarProducto(producto["marca"],producto["modelo"],producto["precio"],producto["descripcion"]));
//     return pantallaModificar;
// }

// function CrearElementoProductoGrilla(producto){
//     let divProducto = document.createElement("div");
//     divProducto.setAttribute("class","producto");
//     divProducto.appendChild(CrearOpcionesHTML(producto));
//     divProducto.appendChild(CrearImagenHTML(producto["img"]));
//     divProducto.appendChild(CrearTituloHTML(producto));
//     divProducto.appendChild(CrearPrecioHTML(producto));
//     return divProducto;
// }

// function CrearPrecioHTML(producto){
//     let div = document.createElement("div");
//     div.setAttribute("class","precio");
//     let p = document.createElement("p");
//     p.textContent = producto["precio"];
//     div.appendChild(p);
//     return div;
// }

// function CrearTituloHTML(producto){
//     let pTitulo = document.createElement("p");
//     pTitulo.textContent = `${producto["marca"]} ${producto["modelo"]}`;
//     return pTitulo;
// }

// function CrearOpcionesHTML(producto){
//     let div = document.createElement("div");
//     div.setAttribute("class","opciones");
//     let btnMod = document.createElement("button");
//     btnMod.setAttribute("class","btn-modificar");
//     btnMod.textContent = "Modificar";
//     EscucharBtnModProducto(btnMod,producto);
//     let btnAct = document.createElement("button");
//     btnAct.setAttribute("class","btn-activar");
//     if(producto["estado"]==="activado"){
//         btnAct.textContent = "Desactivar";
//     }else{
//         btnAct.textContent = "Activar";
//     }
//     div.appendChild(btnMod);
//     div.appendChild(btnAct);
//     return div;
// }

// function EscucharBtnModProducto(btnElemento, producto){
//     btnElemento.addEventListener("click",function(){
//         document.getElementById("accion").innerHTML = "";       
//         document.getElementById("accion").appendChild(CrearPaginaModificar(producto));
//         document.getElementById("div-imagenes-boton").appendChild(CrearElemento("button", { id: "btn-modificar" }, "Modificar producto"));
//     });
// }

// function CrearImagenHTML(url){        
//     let imagen = document.createElement("img");
//     imagen.setAttribute("class","img-producto");
//     imagen.setAttribute("src","./imagenes/"+url);
//     return imagen;
// }


// function CrearFormAgregarProducto(marca=null,modelo=null,precio=null,descripcion=null) {
//     let form = CrearElemento("form", { class: "form-agregar-producto" });
//     let divInputs = CrearElemento("div",{id:"div-inputs-texto"});
//     let divImagenesBoton = CrearElemento("div",{id:"div-imagenes-boton"})

//     let divInputMarca = CrearElemento("div",{class:"div-input"});
//     divInputMarca.appendChild(CrearElemento("label", { for: "input-agregar-marca" }, "Marca:"));
//     let inputMarca = CrearElemento("input", { id: "input-agregar-marca"});
//     inputMarca.value = marca;
//     divInputMarca.appendChild(inputMarca);
        
//     let divInputModelo = CrearElemento("div",{class:"div-input"});
//     divInputModelo.appendChild(CrearElemento("label", { for: "input-agregar-modelo" }, "Modelo:"));
//     let inputModelo = CrearElemento("input", { id: "input-agregar-modelo"});
//     inputModelo.value = modelo
//     divInputModelo.appendChild(inputModelo);
  
//     let divInputPrecio = CrearElemento("div",{class:"div-input"});
//     divInputPrecio.appendChild(CrearElemento("label", { for: "input-agregar-precio" }, "Precio:"));
//     let inputPrecio = CrearElemento("input", { id: "input-agregar-precio"});
//     inputPrecio.value = precio;
//     divInputPrecio.appendChild(inputPrecio);
    
//     let divDescripcion = CrearElemento("div",{id:"div-descripcion"});
//     divDescripcion.appendChild(CrearElemento("label", { for: "input-agregar-descripcion" }, "Descripcion"));
//     let inputDescripcion = CrearElemento("textarea", { id: "input-agregar-descripcion",rows:"4",cols:"50"});
//     inputDescripcion.value = descripcion;
//     divDescripcion.appendChild(inputDescripcion);
    
//     divInputs.appendChild(divInputMarca);
//     divInputs.appendChild(divInputModelo);
//     divInputs.appendChild(divInputPrecio);
//     divInputs.appendChild(divDescripcion);
    
//     let divImagenes = CrearElemento("div",{class:"div-imagenes"});
//     divImagenesBoton.appendChild(divImagenes);
//     divImagenes.appendChild(CrearElemento("label", { for: "input-agregar-imagenes" }, "Imágenes:"));
//     divImagenes.appendChild(CrearElemento("input", { type: "file", id: "input-agregar-imagenes", name: "imagenes-producto", accept: "image/*", multiple: true }));
    
//     form.appendChild(divInputs);
//     form.appendChild(divImagenesBoton);    
//     return form;
// }

// function TraerData(){
//     fetch("./productos.json")
//     .then(response => response.text())
//     .then(jsonString => {
//         Iterar(jsonString);
//     })
//     .catch(error => {
//         console.error("Error al traer los datos:", error);
//         reject(error);
//     });
// }

// function Iterar(json){
//     json = JSON.parse(json);
//     let grilla = document.getElementsByClassName("grid-productos")[0];
        
//     for(let producto of json){   
//         let elementoHTML = CrearElementoProductoGrilla(producto);
//         grilla.appendChild(elementoHTML);    
//     }
// }