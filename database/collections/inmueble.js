const mongoose = require("../connect");
const Schema = require("mongoose").Schema;
var inmuebleSchema = {
  	//ID: 162789,
	//pk: 162789,
	//codigo: "UC-162789",
	agente: {type : Schema.ObjectId,ref : "agente"},//38747,
	//codigoInmobiliaria: "",
	STATUS: String,//"ENABLED",
	//idtipo: 6, ?
	tipo: String,//"Terreno",
	oferta: String,//"Venta",
	estado: String,//"NUEVO",
	//idCiudad: Number,//5090, ?
	//idTipoInmueble: 6, ?
	//idTipoOferta: 1, ?
	region: String,//"Santa Cruz",
	ubicacion: String,//"Santa Cruz de la Sierra",
	zona: String,//"Urubó",
	idZona: Number,//88,
	direccion: String,//"Condominio Cerrado Rio Sierra",
	moneda: String,//"$us",
	monedaIso: String,//"USD",
	precio: String,//"$us 173,000",
	precioIso: Number,//173000,
	descripcion: String,//"POR MOTIVO DE VIAJE A solo 3.5 kms del puete foianini (5 minutos), con la vista mas privilegiada y zona mas alta del URUBO, terreno en Condominio Rio Sierra, 100% consolidado desde el 2010. Construya el hogar de sus sueños en 1015 m2, ideal para cualquier tipo de proyecto. Precio 170$/m2 El terreno se encuentra en el centro al frente de áreas verdes. Contacto directo con propietario solo whatsapp al: 79333900",
	fecentrega: String,//"Inmediata",
	supterreno: String,//"1,016",
	servicios: String,//"Agua, electricidad, alcantarillado",
	amurallado: String,//"SI",
	anioconstruccion: Number,//null,
	desHabitacion: String,//"Privada",
	desBano: String,//"Privado",
	supconstruida: String,//"0",
	supterraza: Number,//null,
	numDormitorios: Number,//null,
	dormitorios: String,//" dorm.",
	numBanios: Number,//null,
	banios: String,//" baños",
	piso: Number,//null,
	elevador: String,//"No",
	baulera: String,//"No",
	piscina: String,//"No",
	parqueos: String,//"No",
	numParqueos: Number,//null,
	amoblado: String,//"No",
	fecpublicacion: Date,//"11/12/2017",
	latitud: String,//"-17.773087",
	longitud: String,//"-63.226963",
	bshow: Boolean,// false,
	bmipublic: Boolean,// false, 
	rating: Number,//0,
	href: String,//"https://www.ultracasas.com/bo/map/inmueble/162789/2017-08-28/terreno/venta/santa-cruz/urubó/",
	hrefPago: String,//"https://www.ultracasas.com/destacarinmueble/162789",
	hrefEdit: String,//"https://www.ultracasas.com/publicar?pk=162789",
	ogUrl: String,//"https://www.ultracasas.com/bo/page/inmueble/162789/2017-08-28/terreno/venta/santa-cruz/urubó/",
	ogTitle: String,//"Condominio Cerrado Rio Sierra",
	ogDescription: String,//"Terreno en Venta en Urubó Santa Cruz de la Sierra, POR MOTIVO DE VIAJE A solo 3.5 kms del puete foianini (5 minutos), con la vista mas privilegiada y zona mas alta del URUBO, terreno en Condominio Rio Sierra, 100% consolidado desde el 2010. Construya el hogar de sus sueños en 1015 m2, ideal para cualquier tipo de proyecto. Precio 170$/m2 El terreno se encuentra en el centro al frente de áreas verdes. Contacto directo con propietario solo whatsapp al: 79333900",
	ogPicture: String,//"https://cdn1.ultracasas.com/dyn/yastaimages/71d082c691c10498df08be300e8cf38aef57f3.jpg",
	hrefPageShort: String,//"https://www.ultracasas.com/bo/page/inmueble/162789",
	//idPlanAgente: null, ? 
	/*IIP: 1,
	PLNC: "default",
	PLN: "Gratuito",
	ICO: "fa-circle-o",
	bIsPlanElite: false,
	bIsMine: false,
	bCanSeePlan: false,
	bIsNotCompany: true,
	bIsCompanyCompanyInfo: false,
	bIsCompanyContactInfo: false,*/
	images: [{type : Schema.ObjectId,ref : "inmuebleimg"}],
	
	video: [{type : Object}],
	/*
	[
		{
			url: "https://www.youtube.com/watch?v=tI4pELD05uQ",
			key: "tI4pELD05uQ",
			poster: "https://img.youtube.com/vi/tI4pELD05uQ/0.jpg",
			title: "Video de la Propiedad"
		}
	],*/
	favoritos: Number,//0,
	//bHasNetwork: false, ? 
};
var inmueble = mongoose.model("inmueble", inmuebleSchema);
module.exports = inmueble;















	
