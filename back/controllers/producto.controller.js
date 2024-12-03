const ProductoSequelize = require("../entity/producto.entity.js");

async function TraerEspecifico(producto,indice,direccion){
    try{
      const indiceNuevo = CalcularIndice(indice,direccion);
      const resultado = await ProductoSequelize.findAll({
        where: { estado : true, tipo : producto},
        raw: true,
        offset:indiceNuevo,
        limit: 4
      });
      return resultado;
    }catch{
      return false;
    }
}
  
  
function CalcularIndice(indiceActual,direccion){
      let indiceNuevo = undefined;
      if(direccion === "siguiente"){
          console.log("siguiente");
          indiceNuevo = parseInt(indiceActual,"10") + 4;
      }else if(direccion === "anterior"){
        if((parseInt(indiceActual) - 4) < 0){
          indiceNuevo = 0;  
        }else{
          indiceNuevo = parseInt(indiceActual,"10") - 4;
        }
      }else if(direccion == false){
        indiceNuevo = parseInt(indiceActual,"10");
      }
      return indiceNuevo;
}

module.exports.CalcularIndice = CalcularIndice; 
module.exports.TraerEspecifico = TraerEspecifico; 

