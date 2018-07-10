var express = require('express');
var multer = require('multer');
var router = express.Router();
//var _ = require("underscore");

var Agente = require("../../../database/collections/agenteVentas");
var Img = require("../../../database/collections/img");
var Mapa = require("../../../database/collections/mapa");
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
//probando
router.post("/inmuebles", (req, res) => {
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

        var inmuebleimgData = new Inmuebleimg(inmuebleimg);
        inmuebleimgData.save().catch( (error) => {
          //content-type
          res.status(400).json({error : error});
        });
      }
      var inmueble = {
        precio : req.body.precio,
        descripcion : req.body.descripcion,
        servicios : req.body.servicios,
        superficie : req.body.superficie,
        tipo_operacion : req.body.tipo_operacion,
        direccion : req.body.direccion,
        lat : req.body.lat,
        lon : req.body.lon
      };
      var inmuebleData = new Inmueble(inmueble);
      inmuebleData.save().then((doc)=>{
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


//subir imagen
router.post(/inmuebleimg\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({
        "msn" : "No se ha podido subir la imagen"
      });
    } else {
      var ruta = req.file.path.substr(6, req.file.path.length);
      console.log(ruta);
      var img = {
        id_inmueble: id,
        name : req.file.originalname,
        physicalpath: req.file.path,
        relativepath: "http://localhost:7777" + ruta
      };
      var imgData = new Img(img);
      imgData.save().then( (infoimg) => {
        //content-type
        //Update User IMG
        var home = {
          gallery: new Array()
        }
        Inmueble.findOne({_id:id}).exec( (err, docs) =>{
          //console.log(docs);
          var data = docs.gallery;
          var aux = new  Array();
          if (data.length == 1 && data[0] == "") {
            home.gallery.push("/api/v1.0/inmuebles/" + infoimg._id)
          } else {
            aux.push("/api/v1.0/inmuebleimg/" + infoimg._id);
            data = data.concat(aux);
            home.gallery = data;
          }
          Inmueble.findOneAndUpdate({_id : id}, home, (err, params) => {
              if (err) {
                res.status(500).json({
                  "msn" : "error en la actualizacion del usuario"
                });
                return;
              }
              res.status(200).json(
                req.file
              );
              return;
          });
        });
      });
    }
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
Inmueble.find({}).exec( (error,docs) =>{
  res.status(200).json(docs);

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

//ruta para insertae el mapa
/*router.post(/mapa\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  if(req.body.lat_u == "" && req.body.lon_u == ""){
    res.status(400).json({
      "msn": "formato incorrecto"
    });
    return;
  }
  var mapa = {
    lon_u : req.body.lon_u,
    lat_u : req.body.lat_u
  };
  var mapaData = new Mapa(mapa);
  mapaData.save().then((rr) => {
    var mp = {
      ubicacion = new Array()
    }
    Inmueble.finOne({_id:id}).exec( (err, docs) => {
      var dt = docs.ubicacion;
      var aux = new Array();
      if(dt.length == 1 && dt [0] == "") {
          mp.ubicacion.push("/api/v1.0/mapa")
      }
      else {
          aux.push("/api/v1.0/mapa");
          dt = dt.concat(aux);
          mp.ubicacion = dt;
      }
      Inmueble.findOneAndUpdate({_id : id}, mp, (err, params) => {
      if (err) {
        res.status(500).json({
          "msn" : "error"
        });
        return;
      }
      res.status(200).json(req.file);
      return;
      });
    });
    res.status(200).json({
      "id" : rr._id,
      "msn" : "mapa registrado exitosamente"
    });
  });
});*/


module.exports = router;
