import { Partida } from '.'

let partida

beforeEach(async () => {
  partida = await Partida.create({ titulo: 'test', creador: 'test', jugadores: 'test', noticias: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = partida.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(partida.id)
    expect(view.titulo).toBe(partida.titulo)
    expect(view.creador).toBe(partida.creador)
    expect(view.jugadores).toBe(partida.jugadores)
    expect(view.noticias).toBe(partida.noticias)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = partida.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(partida.id)
    expect(view.titulo).toBe(partida.titulo)
    expect(view.creador).toBe(partida.creador)
    expect(view.jugadores).toBe(partida.jugadores)
    expect(view.noticias).toBe(partida.noticias)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
