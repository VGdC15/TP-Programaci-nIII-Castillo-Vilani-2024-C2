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

    static TraerProductos(){
        fetch("./productos.json")
        .then(response => response.text())
        .then(jsonString => {
            this.Iterar(jsonString);
        })
        .catch(error => {
            console.error("Error al traer los datos:", error);
            reject(error);
        });
    }

    static Iterar(json){
        json = JSON.parse(json);
        let grilla = document.getElementsByClassName("grid-productos")[0];
        for(let productoJson of json){   
            let producto = new Producto(productoJson["img"],productoJson["marca"],productoJson["modelo"],productoJson["precio"],productoJson["tipo"],productoJson["estado"])
            let elementoHTML = this.CrearElementoProductoGrilla(producto);
            grilla.appendChild(elementoHTML);    
        }
    }

    static CrearElementoProductoGrilla(producto){
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
        btnAgregarCarrito.setAttribute("class","btn-agregar-carrito");
        btnAgregarCarrito.textContent = "Añadir al carrito";
        this.EscucharBtnAgregarProducto(btnAgregarCarrito,producto);
        div.appendChild(btnAgregarCarrito);
        return div;
    }

    static EscucharBtnAgregarProducto(btnElemento, producto){
        btnElemento.addEventListener("click",function(){     
            // Agregar al carrito 
        });
    }

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