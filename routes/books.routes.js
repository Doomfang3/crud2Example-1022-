const express = require('express')
const Book = require('../models/Book.model')
const router = express.Router()

/* GET books */
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find()
    res.render('books', { books })

    /* Book.find().then((books) => {
      res.render('books', { books })
    })*/
  } catch (err) {
    console.log(err)
  }
})

router.get('/new', (req, res, next) => {
  res.render('newbook', { book: { title: '', author: '', genre: [] } })
})

router.post('/', async (req, res) => {
  try {
    await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre.split(' '),
    })
    res.redirect('/books')
  } catch (error) {
    console.log(error)
  }
})

router.get('/:bookId', async (req, res) => {
  console.log(req.params.bookId)
  const book = await Book.findById(req.params.bookId)

  res.render('book', { book })
})

router.get('/update/:bookId', async (req, res) => {
  const book = await Book.findById(req.params.bookId)
  res.render('newbook', { book })
})

router.post('/update/:bookId', async (req, res) => {
  console.log(req.body)
  await Book.findByIdAndUpdate(req.params.bookId, { ...req.body, genre: req.body.genre.split(' ') }) // Exactly the same as line 25
  res.redirect(`/books/${req.params.bookId}`)
})

router.get('/delete/:bookId', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId)
    res.redirect('/books')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
