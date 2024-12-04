import Swal from "../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

localStorage.setItem("indice",0);
localStorage.setItem("vista","todos");

//Boton INICIO
document.getElementById("btn-inicio-abm").addEventListener("click",function(){
    document.getElementById("accion").innerHTML = "";
    document.getElementById("accion").style.visibility = "hidden";
    document.getElementsByClassName("opciones-principales")[0].style.visibility = "visible";
})

//Home >> Agregar
document.getElementById("btn-agregar-nuevo").addEventListener("click",function(){
    document.getElementsByClassName("opciones-principales")[0].style.visibility = "hidden";
    InsertarFormNuevoProducto();
})


//Home >> Modificar
document.getElementById("btn-modificar-producto").addEventListener("click",async function(){
    document.getElementsByClassName("opciones-principales")[0].style.visibility = "hidden"; 
    document.getElementById("accion").style.visibility = "visible"; 
    await ObtenerProductos();
    await CrearBotones();       

    document.getElementById("pagina-anterior").addEventListener("click",async function(){
        await ObtenerProductos("anterior");       
    });

    document.getElementById("pagina-siguiente").addEventListener("click",async function(){
        await ObtenerProductos("siguiente");       
    });
})

// Asignar evento al botón de cierre
document.addEventListener("click", function (event) {
    if (event.target && event.target.id === "btn-cerrar-formulario") {
        cerrarFormulario();
    }
});

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

async function CrearBotones(){
    const div = document.createElement("div");
    div.setAttribute("class","selector-paginas");
    const btnAnt = document.createElement("button");
    btnAnt.setAttribute("id","pagina-anterior");
    btnAnt.textContent = "ANTERIOR";
    const btnSig = document.createElement("button");
    btnSig.setAttribute("id","pagina-siguiente");
    btnSig.textContent = "SIGUIENTE";
    div.appendChild(btnAnt);
    div.appendChild(btnSig);
    document.getElementById("accion").appendChild(div);
}


async function ObtenerProductos(direccion = 0){
    try{
        const indice = localStorage.getItem("indice");
        const response = await fetch(`http://localhost:3000/admin/productos?indice=${indice}&direccion=${direccion}`);
        if(response.status === 500){
            Swal.fire("Error al conectarse con el servidor");
        }
        if(response.status === 201){
            const resultado = await response.text();
            if(resultado !== ""){
                await LimpiarGridProductos();
                const gridProductos = await CrearGridProductos();
                gridProductos.innerHTML = resultado;
                document.getElementById("accion").insertBefore(gridProductos,document.getElementsByClassName("selector-paginas")[0]);
                SetIndice(direccion);
                EscucharBtnModProducto();
            }
        }
    }catch(error){
        Swal.fire("Error","No se pudo conectar con el servidor, intente mas tarde");
        console.error("Error al traer los datos:", error);
        throw error;
    }
}

function cerrarFormulario() {
    const formulario = document.querySelector('.form-agregar-producto');
    if (formulario) {
        formulario.style.display = 'none';
    }
    window.location.href = "./abm-admin.html";
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

async function EscuhcarBtnFormMod(event, id) {
    event.preventDefault();

    const producto = {
        id: id,
        marca: event.target.marca.value,
        modelo: event.target.modelo.value,
        precio: event.target.precio.value,
        tipo: event.target.tipo.value,
        descripcion: event.target.descripcion.value,
    };

    try {
        await EnviarProductoActualizado(producto);
        await Swal.fire({
            title: 'Producto modificado',
            text: 'El producto ha sido modificado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
        });
       
    } catch (error) {
        console.error('Error al modificar el producto:', error);
        await Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al modificar el producto. Inténtalo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }

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
    
    if (response.ok) {
        const result = await response.json();
        Swal.fire({
            icon: 'success',
            title: 'El producto ha sido modficiado',
            confirmButtonColor: '#ee7410',
            showConfirmButton: true,
        });
    } else {
        const error = await response.json();
        Swal.fire({
            icon: 'error',
            title: 'Error al modificar el producto',
            text: error.error || 'No se pudo modificar el producto',
        });
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


async function LimpiarGridProductos(){
    try{
        const grid = document.getElementsByClassName("grid-productos")[0];
        grid.innerHTML = "";
        return grid;
    }catch{
        return false;
    }
}

async function CrearGridProductos(){
    let grid = await LimpiarGridProductos();
    if (grid == false){
        grid = document.createElement("div");
        grid.setAttribute("class","grid-productos");
    }
    return grid;
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
            estado:parseInt(producto.getAttribute("data-estado"))  
        })
    });
    if(resultado.status === 200){
        await ObtenerProductos();
    }else if(!resultado.ok){
        Swal.fire('Error', 'Verifique los datos ingresados o intente más tarde.', 'error');
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const btnPdfVentas = document.getElementById("btn-pdf-ventas");
  
    btnPdfVentas.addEventListener("click", descargarExcel);
});
  
async function descargarExcel() {
    try {
        const response = await fetch('http://localhost:3000/admin/excel', {
            method: 'GET'
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Ventas_Riders_Edge.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            await Swal.fire({
            title: 'Descarga exitosa',
            text: 'El archivo Excel se ha descargado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
            });
        } else {
            throw new Error('Error en la descarga');
        }
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
        await Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al descargar el archivo. Inténtalo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}
  

  
  
