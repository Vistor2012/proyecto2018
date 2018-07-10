const mongoose = require("../connect");
var inmuebleimgSchema = {
	//pk: 2252111,
	name : String,
	physicalpath : String,
	relativepath : String
	/*medium: "https://cdn1.ultracasas.com/dyn/yastaimages/77a832153ea9f2127a8ec331b8d321b172e522",
	medium_height: 308,
	medium_width: 200,
	small: "https://cdn1.ultracasas.com/dyn/yastaimages/713252e77e97226013a0cb2fa24531a1025502",
	small_height: 70,
	small_width: 70,
	height_100: "https://cdn1.ultracasas.com/dyn/yastaimages/77ba72d59221e1b7b85665a1a5b3ced2a205f2",
	height_100_height: 100,
	height_100_width: 63,
	height_300: "https://cdn2.ultracasas.com/dyn/yastaimages/7d6682c5229161186582df066c7a2867b0a6a2",
	height_300_height: 300,
	height_300_width: 196,
	width_400: "https://cdn2.ultracasas.com/dyn/yastaimages/73020245b261522005fd40fd24de8ef115b192",
	width_400_height: 616,
	width_400_width: 400,
	real: "https://cdn2.ultracasas.com/dyn/yastaimages/7ebe22246635cb99eb421380ae62d281520532",
	real_height: 1080,
	real_width: 700*/
	//por el momento solo asi
};
var inmuebleimg = mongoose.model("inmuebleimg", inmuebleimgSchema);
module.exports = inmuebleimg;
