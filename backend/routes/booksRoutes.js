const express = require("express")
const router = express.Router()
const Book = require("../models/book.model")

// http://localhost:3000/api/books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
