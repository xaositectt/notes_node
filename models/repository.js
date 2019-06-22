const Note = require('./note')

const notes = []

const create = async (key, title, body) => {
  notes[key] = new Note(key, title, body)

  return notes(key)
}

const get = async (key) => {
  if (notes[key]) {
    return notes[key]
  } else {
    throw new Error(`Note with key ${key} does not exist in the repository.`)
  }
}

const destroy = async (key) => {
  if (notes[key]) {
    delete notes[key]
  } else {
    throw new Error(`Note with key ${key} does not exist in the repository.`)
  }
}

const keys = async () => Object.keys(notes)

const count = async () => notes.length

module.exports = {
  create,
  update: create,
  get,
  destroy,
  keys,
  count
}
