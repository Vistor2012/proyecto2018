var express = require('express');
var multer = require('multer');
var router = express.Router();
//var _ = require("underscore");

var Agente = require("../../../database/collections/agenteVentas");
var Img = require("../../../database/collections/img");

let Inmueble = require("../../../database/collections/inmueble");
let Inmuebleimg = require("../../../database/collections/inmuebleimg");
let Vecindario = require("../../../database/collections/vecindario");

//Definimos donde se guardara la imagen avatar
var storage = multer.diskStorage({
  destination: "./public/avatars",
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".jpg");
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
        lastname : req.body.lastname,
        movil : movil,
        movilFiltered : movilF,
        email : req.body.email,
        ciudad : req.body.ciudad,
        phoneFirst4Digits : movilF4,
        foto : rutaFoto
      }
      var agenteData = new Agente(agente);
      agenteData.save().then((doc)=>{
        res.status(200).json(doc);//devolvemos el dcoumento creado
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
//crear recipe
router.post("/recipes", (req, res) => {
  //Ejemplo de validacion
  if (req.body.name == "" && req.body.descripcion == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  //console.log(req.body.ingredients);return;
  var recipe = {
    name : req.body.name,
    descripcion : req.body.descripcion,
    ingredients : req.body.ingredients//array
  };
  //5af9bf6f b25a66 19c8 03e7db
  var recipeData = new Recipe(recipe);

  recipeData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "recipe Registrado con exito "
    });
  });
});

//crear ingredients
router.post("/ingredients", (req, res) => {
  //Ejemplo de validacion
  if (req.body.name == "" && req.body.kcal == "" && req.body.peso == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  //console.log(req.body.ingredients);return;
  var ingredient = {
    name : req.body.name,
    kcal : req.body.kcal,
    peso : req.body.peso
  };

  var ingredientData = new Ingredient(ingredient);

  ingredientData.save().then( () => {
    //content-type
    res.status(200).json({
      "msn" : "Ingrediente Registrado con exito "
    });
  });
});
//leer todos recipes
router.get("/recipes", (req, res, next) => {
  Recipe.find({}).exec( (error, docs) => {
    console.log(docs)
    res.status(200).json(docs);
  })
});
//leer ingredients
router.get("/ingredients", (req, res, next) => {
  Ingredient.find({}).exec( (error, docs) => {
    //console.log(docs[0]._id)
    res.status(200).json(docs);
  })
});


// Leer solo un ingredient
router.get(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Ingredient.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el ingrediente"
    });
  })
});
//leer solo una receta
router.get(/recipes\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  console.log(url.split("/"))
  Recipe.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe la Receta"
    });
  })
});
//eliminar  receta
router.delete(/recipes\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Recipe.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});
//eliminar  ingrediente
router.delete(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Ingredient.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});

//actualizar campos que se envian de la receta (keys)
router.patch(/recipes\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var recipe = {};
  for (var i = 0; i < keys.length; i++) {
    recipe[keys[i]] = req.body[keys[i]];
  }
  //console.log(recipe);
  Recipe.findOneAndUpdate({_id: id}, recipe, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});
//actualizar campos que se envian del ingrediente (keys)
router.patch(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var ingredient = {};
  for (var i = 0; i < keys.length; i++) {
    ingredient[keys[i]] = req.body[keys[i]];
  }
  //console.log(ingredient);
  Ingredient.findOneAndUpdate({_id: id}, ingredient, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});
//actualizar todos los campos de una receta
router.put(/recipes\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['name', 'descripcion', 'ingredients'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hacer uso del metodo patch si desea editar solo un fragmentode la informacion"
    });
    return;
  }

  var recipe = {
    name : req.body.name,
    descripcion : req.body.descripcion,
    ingredients : req.body.ingredients
  };
  Recipe.findOneAndUpdate({_id: id}, recipe, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});

//actualizar todos los campos de un ingrediente
router.put(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['name', 'kcal', 'peso'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Existe un error en el formato de envio puede hacer uso del metodo patch si desea editar solo un fragmentode la informacion"
    });
    return;
  }

  var ingredient = {
    name : req.body.name,
    kcal : req.body.kcal,
    peso : req.body.peso
  };
  Ingredient.findOneAndUpdate({_id: id}, ingredient, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error no se pudo actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});


module.exports = router;
