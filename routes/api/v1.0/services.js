var express = require('express');
var multer = require('multer');
var router = express.Router();
//var _ = require("underscore");

var Agente = require("../../../database/collections/agenteVentas");
var Img = require("../../../database/collections/img");

var Inmueble = require("../../../database/collections/inmueble");
var Inmuebleimg = require("../../../database/collections/inmuebleimg");
var Vecindario = require("../../../database/collections/vecindario");

//Definimos donde se guardara la imagen avatar
var storage = multer.diskStorage({
  destination: "./public/avatars",
  filename: function (req, file, cb) {
    cb(null, file.originalname/* + "-" + Date.now() + ".jpg"*/);
  }
});
//funcion que nos permitira guardar la imagen y ademas guardar sus datos en la colleccion
var upload = multer({
  storage: storage
}).single("img");//en este caso una sola imagen en el campo img del formulario


//Creacion de agentes
router.post("/agenteVentas", (req, res) => {
  upload(req, res, (err) => {
    //aqui deberian ir los controles de campos
    if (err) {
      res.status(500).json({
        "msn" : "No se ha podido subir la imagen"
      }).end();
    } else {
      var rutaFoto = '';
      if (req.file != undefined) {
        var ruta = req.file.path.substr(6, req.file.path.length);
        rutaFoto = "http://localhost:7777" + ruta;
        var img = {
          name : req.file.originalname,
          physicalpath: req.file.path,
          relativepath: rutaFoto
        };

        var imgData = new Img(img);
        imgData.save().catch( (error) => {
          //content-type
          res.status(400).json({error : error});
        });
      }
      var movil = req.body.movil;
      var movilF = movil.substr(4, movil.length);//591- 72933481
      var movilF4 = movil.substr(4,4);//7293 3481
      var agente = {
        name : req.body.name,
        phone : req.body.phone,
        phone2 : req.body.phone2,
        movil : movil,
        movilFiltered : movilF,
        email : req.body.email,
        ciudad : req.body.ciudad,
        phoneFirst4Digits : movilF4,
        foto : rutaFoto
      }
      var agenteData = new Agente(agente);
      agenteData.save().then((doc)=>{
        res.status(200).json({
          msn : "Registro existoso",
          id : doc._id
          });//devolvemos el dcoumento creado
      }).catch((error)=>{
        res.status(400).json({error : error});//aqui el error
      });

    }
  });
});
//ruta para insertar un nuevo inmueble
router.post("/inmuebles", (req, res) => {
  //se obviaron los controles alv
  var inmueble = {
    agente :  req.body.agente,
    STATUS :  req.body.STATUS,
    tipo  :  req.body.tipo,
    oferta : req.body.oferta,
    estado : req.body.estado
  };
  var inmuebleData = new Inmueble(inmueble);
  inmuebleData.save().then( () => {
    res.status(200).json({
      "msn" : "inmueble Registrado con exito "
    });
  }).catch(err => {
    //console.log(err);
    res.status(500).json({
      error : err
    });
  });
});
router.get("/img", (req, res, next) => {
  Img.find({}).exec( (error, docs) => {
    //console.log(docs)
    res.status(200).json(docs);
  })
});
router.get("/agenteVentas", (req, res, next) => {
  Agente.find({}).exec( (error, docs) => {
    //console.log(docs)
    res.status(200).json(docs);
  })
});
router.get("/inmuebles", (req, res, next) => {
  //aqui utilizamos populate() para poblar el parametro "inmueble" con toda la info acerca del mismo
  Inmueble.find({}).populate("agente").populate("inmuebleimg").exec( (error, docs) => {
    //checkeamos hay error de algun tipo
    if (error) {
      //devolvemos el error;
      res.status(400).json({error : error});return;
    }else{
      res.status(200).json(

        docs.map(doc => {
          return {
            status : 'OK',
            oProperty : {

              STATUS : doc.STATUS,
              tipo : doc.tipo,
              oferta : doc.oferta,
              estado : doc.estado,
            },
            oContact : doc.agente
          }
        })
      );
    }
  })

});
//ruta para actualizar un anuncio segun los campos que se reciban
router.patch(/inmuebles\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var inmuebles = {};
  //aqui cargamos todos los campos recibidos en este caso latitud y longitud
  for (var i = 0; i < keys.length; i++) {
    inmuebles[keys[i]] = req.body[keys[i]];
  }
  //Hacemos la actualizacion
  Inmueble.updateOne({_id: id}, inmuebles, (err, doc) => {
      if(err || doc.n==0) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      //devolvemos el documento actualizado
      res.status(200).json(doc);
      return;

  });
});

module.exports = router;
