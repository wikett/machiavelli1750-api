import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy, addCampanya, addNoticia, updateCampanya } from './controller'
import { schema } from './model'
export Partida, { schema } from './model'

const router = new Router()
const { titulo, creador, campanyas, jugadores, noticias } = schema.tree
      
/**
 * @api {post} /partidas Create partida
 * @apiName CreatePartida
 * @apiGroup Partida
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam titulo Partida's titulo.
 * @apiParam creador Partida's creador.
 * @apiParam jugadores Partida's jugadores.
 * @apiParam noticias Partida's noticias.
 * @apiSuccess {Object} partida Partida's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Partida not found.
 * @apiError 401 master access only.
 */
router.post('/',
  //master(),
  body({ titulo, creador, jugadores, noticias }),
  create)



/**
 * @api {get} /partidas Retrieve partidas
 * @apiName RetrievePartidas
 * @apiGroup Partida
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} partidas List of partidas.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  ///master(),
  query(),
  index)

/**
 * @api {get} /partidas/:id Retrieve partida
 * @apiName RetrievePartida
 * @apiGroup Partida
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} partida Partida's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Partida not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  //master(),
  show)

/**
 * @api {put} /partidas/:id Update partida
 * @apiName UpdatePartida
 * @apiGroup Partida
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam titulo Partida's titulo.
 * @apiParam creador Partida's creador.
 * @apiParam jugadores Partida's jugadores.
 * @apiParam noticias Partida's noticias.
 * @apiSuccess {Object} partida Partida's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Partida not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  //master(),
  body({ titulo, creador, jugadores, noticias }),
  update)

router.put('/addcampanya/:id',
  addCampanya)

router.put('/addnoticia/:id',
  addNoticia)

router.put('/updatecampanya/:id',
  updateCampanya)

/**
 * @api {delete} /partidas/:id Delete partida
 * @apiName DeletePartida
 * @apiGroup Partida
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Partida not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  //master(),
  destroy)

export default router
