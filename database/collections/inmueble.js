const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var inmuebleSchema = {
	precio: String,//"$us 173,000",
	descripcion: String,//"POR MOTIVO DE VIAJE A solo 3.5 kms del puete foianini (5 minutos), con la vista mas privilegiada y zona mas alta del URUBO, terreno en Condominio Rio Sierra, 100% consolidado desde el 2010. Construya el hogar de sus sueños en 1015 m2, ideal para cualquier tipo de proyecto. Precio 170$/m2 El terreno se encuentra en el centro al frente de áreas verdes. Contacto directo con propietario solo whatsapp al: 79333900",
	servicios: String,//"Agua, electricidad, alcantarillado",
	superficie: String,//metros cuadrados
	tipo_operacion : String,//venta - alquiler o anticretico,
	direccion : String, //en que parte de la ciudad se encuentra
	lat : String, //latitud
	lon : String //longitud

};
var inmueble = mongoose.model("inmueble", inmuebleSchema);
module.exports = inmueble;
