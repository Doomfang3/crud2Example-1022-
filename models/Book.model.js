const { Schema, model } = require('mongoose')

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
  },
})

const Book = model('book', BookSchema)

module.exports = Book
