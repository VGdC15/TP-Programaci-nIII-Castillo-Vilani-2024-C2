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

//  Deberia ponerlo en esta clase?
    static CargarProductos(indiceInicial,data,direccion=null){
        if(direccion){
            document.getElementsByClassName("grid-productos").innerHTML = "";
            indicePrimerProducto = FuncionesCarga.EstablecerIndiceInicial(indicePrimerProducto,direccion);    
        }
        for(let i=indiceInicial;i<indiceInicial+12;i++){
            console.log(data[i]["img"]);
            let producto = new Producto(data[i]["img"],data[i]["marca"],data[i]["modelo"],data[i]["precio"],data[i]["tipo"],data[i]["estado"]);
            let elementoHTML = this.CrearElementoProductoGrilla(producto);
            document.getElementsByClassName("grid-productos")[0].appendChild(elementoHTML)
        }
        return indiceInicial;
    }


    // static TraerProductos(){
    //     return new Promise((resolve,reject)=>{
    //         fetch("./productos.json")
    //         .then(response => response.text())
    //         .then(jsonString => {
    //             resolve(jsonString);
    //         })
    //         .catch(error => {
    //             console.error("Error al traer los datos:", error);
    //             reject(error);
    //         });
    //     })
    // }

    static async TraerProductos(){
        try{
            const response = await fetch("./productos.json");
            const jsonString = await response.text();
            return JSON.parse(jsonString);
        }catch(error){
            console.error("Error al traer los datos:", error);
            throw error;
        }
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