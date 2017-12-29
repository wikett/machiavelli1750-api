import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Partida } from '.'

const app = () => express(apiRoot, routes)

let partida

beforeEach(async () => {
  partida = await Partida.create({})
})

test('POST /partidas 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, titulo: 'test', creador: 'test', jugadores: 'test', noticias: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.titulo).toEqual('test')
  expect(body.creador).toEqual('test')
  expect(body.jugadores).toEqual('test')
  expect(body.noticias).toEqual('test')
})

test('POST /partidas 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /partidas 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /partidas 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /partidas/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${partida.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(partida.id)
})

test('GET /partidas/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${partida.id}`)
  expect(status).toBe(401)
})

test('GET /partidas/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /partidas/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${partida.id}`)
    .send({ access_token: masterKey, titulo: 'test', creador: 'test', jugadores: 'test', noticias: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(partida.id)
  expect(body.titulo).toEqual('test')
  expect(body.creador).toEqual('test')
  expect(body.jugadores).toEqual('test')
  expect(body.noticias).toEqual('test')
})

test('PUT /partidas/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${partida.id}`)
  expect(status).toBe(401)
})

test('PUT /partidas/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, titulo: 'test', creador: 'test', jugadores: 'test', noticias: 'test' })
  expect(status).toBe(404)
})

test('DELETE /partidas/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${partida.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /partidas/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${partida.id}`)
  expect(status).toBe(401)
})

test('DELETE /partidas/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
