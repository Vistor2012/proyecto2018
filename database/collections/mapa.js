const mongoose = require("../connect");
const mon = require("mongoose");
var Schema = mon.Schema;
var mapaSchema = new Schema({
  lat_u : Number,
  lon_u : Number
});
var mapa = mongoose.model("mapa", mapaSchema);
module.exports = mapa;
