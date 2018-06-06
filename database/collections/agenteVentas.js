const mongoose = require("../connect");
var agenteSchema = {
  	//pk: 38747,por el momento solo id
	name: String,//"Rodrigo",
	lastname: String,//"Solis",
	phone: String,//null,
	phoneFiltered: String,//"",
	phoneFilteredComplete: String,//"",
	phone2: String,//null,
	phone2Filtered: String,// "",
	phone2FilteredComplete: String,// "",
	movil: String,//"591-79333900",
	movilFiltered: String,//"79333900",
	movil2: String,//null,
	movil2Filtered: String,// "",
	email: String,//"solis_rodrigo@hotmail.com",
	ciudad: String,//"Cochabamba - Cochabamba",
	foto: String,//"https://cdn1.ultracasas.com/app/images/userLogin2.png",
	phoneFirst4Digits: String,//"7933"

};
var agente = mongoose.model("agente", agenteSchema);
module.exports = agente;