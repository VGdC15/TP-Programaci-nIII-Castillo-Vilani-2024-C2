import Producto from "./producto.js";
import Swal from "../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";
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
    // //Enviar imagen
    const resultado = await InsertarImagen();
    if(resultado){
        try{
            const {ruta} = await resultado.json();
            const producto = {
                marca: event.target.marca.value,
                modelo: event.target.modelo.value,
                precio: event.target.precio.value,
                tipo: event.target.tipo.value,
                imagen: ruta,
                descripcion: event.target.descripcion.value,
            };
            const resultadoProducto = await InsertarNuevoProducto(producto);
            if(resultadoProducto){
                Swal.fire('Producto cargado exitosamente.');    
            }else{
                Swal.fire('Error', 'Error al cargar el producto.', 'error');
            }
        }catch(err){
            console.log(err);
        }
    }else{
        Swal.fire('Error', 'Error al cargar el producto.', 'error');
    }
}



async function InsertarImagen(){
    try{
        const formData = new FormData();
        const imagen = document.getElementById("input-agregar-imagenes").files[0];
        formData.append("imagen",imagen); 
        const resultado = await fetch("http://localhost:3000/admin/carga",{
            method:"POST",
            body:formData
        });
        return resultado;
    }catch(err){
        console.log(err);
        return false;
    }
}

async function InsertarFormModProducto(idProducto){
    const response = await fetch("http://localhost:3000/admin/modificar-producto",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:idProducto}),
    });
    
    if(response.ok){
        const form = await response.text();
        document.getElementById("accion").style.visibility = "visible";
        document.getElementById("accion").innerHTML = form;
        document.getElementsByClassName("form-agregar-producto")[0].addEventListener("submit",(event)=>{
            EscuhcarBtnFormMod(event,idProducto);
        });
    }else{
        Swal.fire('Error', 'Verifique los datos ingresados o intente más tarde.', 'error');
    }
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
    if(!response.ok){
        Swal.fire('Error', 'Verifique los datos ingresados o intente más tarde.', 'error');
    }
}

async function InsertarNuevoProducto(producto){
    const response = await fetch("http://localhost:3000/admin/nuevo-producto",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({marca:producto.marca,modelo:producto.modelo,precio:producto.precio,tipo:producto.tipo,imagen:producto.imagen,descripcion:producto.descripcion}),
    });
    if(response.status !== 500 && response.status !== 400){
        return true;
    }else{
        return false;
    }
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
    }else if(!resultado.ok){
        Swal.fire('Error', 'Verifique los datos ingresados o intente más tarde.', 'error');
    }
}


async function CargarProductosAsync(){
    await LimpiarDivAccion();
    await ObtenerTodosLosProductos();
    EscucharBtnModProducto();
}