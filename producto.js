
import Swal from "./node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

export default class Producto{
    #img;
    #marca;
    #modelo;
    #precio;
    #tipo;
    #estado;
    #descripcion;

    constructor(img,marca,modelo,precio,tipo,estado,descripcion=null){
        this.#img = img;
        this.#marca = marca;
        this.#modelo = modelo;
        this.#precio = precio;
        this.#tipo= tipo;
        this.#estado = estado;
        this.#descripcion = descripcion;   
    }

    static async TraerProductos(){
        try{
            const response = await fetch("http://localhost:3000/productos");
            console.log(response);
            const jsonString = await response.text();
            return JSON.parse(jsonString);
        }catch(error){
            console.error("Error al traer los datos:", error);
            throw error;
        }
    }
    
    static CrearElementoProductoGrilla(producto){
        console.log("Creando elemento para:", producto.#modelo);
        
        let divProducto = document.createElement("div");
        divProducto.setAttribute("class","producto");
        divProducto.appendChild(this.CrearOpcionesHTML(producto));
        divProducto.appendChild(this.CrearImagenHTML(producto.#img));
        divProducto.appendChild(this.CrearTituloHTML(producto));
        divProducto.appendChild(this.CrearPrecioHTML(producto));
        return divProducto;
    }

    static CrearOpcionesHTML(producto){
        let div = document.createElement("div");
        div.setAttribute("class","opciones");
        let btnAgregarCarrito = document.createElement("button");
        btnAgregarCarrito.setAttribute("class","btnAgregarCarrito");
        btnAgregarCarrito.textContent = "Añadir al carrito";
        this.EscucharBtnAgregarCarrito(btnAgregarCarrito,producto); 
        div.appendChild(btnAgregarCarrito);
        return div;
    }


    static EscucharBtnAgregarCarrito(button, producto) {
        button.addEventListener("click", () => {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
            const productoExistente = carrito.some(p => p.modelo === producto.#modelo && p.marca === producto.#marca);
    
            if (carrito.length === 0) {
                carrito.push({
                    img: producto.#img,
                    marca: producto.#marca,
                    modelo: producto.#modelo,
                    precio: producto.#precio,
                    tipo: producto.#tipo,
                    estado: producto.#estado,
                    descripcion: producto.#descripcion
                });
                localStorage.setItem("carrito", JSON.stringify(carrito));
                Swal.fire("Producto agregado al carrito");

            } else if (productoExistente) {
                Swal.fire("Este producto ya está en tu carrito.");
            }
        });
    }
    
    
    
    
    
    
    
    
    

/*
    static EscucharBtnAgregarCarrito(button, idproductos) {
        button.addEventListener("click", () => {
            if (idproductos != null) {
                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                
                carrito.push(idproductos);

                // Guarda el carrito actualizado en el LocalStorage
                localStorage.setItem("carrito", JSON.stringify(carrito));
                Swal.fire("Producto agregado al carrito");
            } else {
                console.error("Error: id del producto es nulo");
            }
        });
    }
*/

    static CrearImagenHTML(url){        
        let imagen = document.createElement("img");
        imagen.setAttribute("class","img-producto");
        imagen.setAttribute("src","./imagenes/"+url);
        return imagen;
    }

    static CrearTituloHTML(producto){
        let pTitulo = document.createElement("p");
        pTitulo.textContent = `${producto.#marca} ${producto.#modelo}`;
        return pTitulo;
    }

    static CrearPrecioHTML(producto){
        let div = document.createElement("div");
        div.setAttribute("class","precio");
        let p = document.createElement("p");
        p.textContent = producto.#precio;
        div.appendChild(p);
        return div;
    }
}


    
    