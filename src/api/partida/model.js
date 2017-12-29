import mongoose, { Schema } from 'mongoose'

const partidaSchema = new Schema({
  titulo: {
    type: String
  },
  creador: {
    type: String
  },
  jugadores: [
      {
        email: String,
        reino: Number
      }
    ],
  campanyas: [
      {
        titulo: String,
        anyo: Number,
        fase: String,
        imagen: String,
        descripcion: String,
        dateStamp: {type: Date, default: Date.now}
      }
  ],
  noticias: [
      {
        fechaNoticia: {type: Date, default: Date.now},
        titulo: String,
        contenido: String, 
        imagenNoticia: String
      }
  ]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

partidaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      titulo: this.titulo,
      creador: this.creador,
      campanyas: this.campanyas,
      jugadores: this.jugadores,
      noticias: this.noticias,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Partida', partidaSchema)

export const schema = model.schema
export default model
