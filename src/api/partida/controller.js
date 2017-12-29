import { success, notFound } from '../../services/response/'
import { Partida } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Partida.create(body)
    .then((partida) => partida.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Partida.find(query, select, cursor)
    .then((partidas) => partidas.map((partida) => partida.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Partida.findById(params.id)
    .then(notFound(res))
    .then((partida) => partida ? partida.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Partida.findById(params.id)
    .then(notFound(res))
    .then((partida) => partida ? Object.assign(partida, body).save() : null)
    .then((partida) => partida ? partida.view(true) : null)
    .then(success(res))
    .catch(next)

export const addCampanya = ( req, res, next) =>
{
  var newCampanya = req.body;
  //var id = req.body.idTimeline;
  console.log("update: "+req.params.id)
  console.log('add campanya...: '+JSON.stringify(newCampanya));
  
  Partida.findOneAndUpdate({_id: req.params.id},{$push: {"campanyas": newCampanya}}, function(errorCampanya, campanyaObject){
    if(errorCampanya)
    {
      return res.status(500).send(errorCampanya);
    }
    else
    {
        return res.status(200).json(campanyaObject);
    }
  })
}

export const updateCampanya = (req, res, next) =>
{
  let newCampanya = {};

  console.log('updateCampanya..');
  if(req.body.titulo !== "undefined")
     newCampanya.titulo = req.body.titulo;
  if(req.body.imagen !== "undefined")
     newCampanya.imagen = req.body.imagen;
  if(req.body.anyo !== "undefined")
     newCampanya.anyo = req.body.anyo;
   if(req.body.descripcion !== "undefined")
     newCampanya.descripcion = req.body.descripcion;



  console.log("update: "+req.params.id)
  console.log('add campanya...: '+JSON.stringify(newCampanya));

 Partida.update({"campanyas._id": req.params.id},{$set: {"campanyas.$.imagen": newCampanya.imagen, "campanyas.$.titulo": newCampanya.titulo, "campanyas.$.anyo": newCampanya.anyo, "campanyas.$.descripcion": newCampanya.descripcion}}, function(errorCampanya, campanyaObject){
  //Partida.findOneAndUpdate({"campanyas._id": req.params.id}, {$set: {"campanyas": newCampanya}}, function(errorCampanya, campanyaObject){
          if(errorCampanya)
          {
            return res.status(500).send(errorCampanya);
          }
          else{
            return res.status(200).json(campanyaObject);
          }
        });
}

export const addNoticia = ( req, res, next) =>
{
  var newNoticia = req.body;
  //var id = req.body.idTimeline;
  console.log("update: "+req.params.id)
  console.log('add noticia...: '+JSON.stringify(newNoticia));
  
  Partida.findOneAndUpdate({_id: req.params.id},{$push: {"noticias": newNoticia}}, function(errorNoticia, noticiaObject){
    if(errorNoticia)
    {
      return res.status(500).send(errorNoticia);
    }
    else
    {
        return res.status(200).json(noticiaObject);
    }
  })
}

export const destroy = ({ params }, res, next) =>
  Partida.findById(params.id)
    .then(notFound(res))
    .then((partida) => partida ? partida.remove() : null)
    .then(success(res, 204))
    .catch(next)
