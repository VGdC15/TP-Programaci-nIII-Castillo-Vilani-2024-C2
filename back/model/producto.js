class Producto{
    id;
    marca;
    modelo;
    precio;
    descripcion;
    imagen;
    tipo;
    estado;

    constructor(marca,modelo,precio,descripcion,imagen,tipo,estado,id=null){
        if(id){this.id = id};
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.tipo = tipo;
        this.estado = estado;
    }
}

module.exports = Producto;