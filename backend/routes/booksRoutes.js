const express = require("express")
const router = express.Router()
const Book = require("../models/book.model")

// get all books
// http://localhost:3000/api/books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Fetch a book by its bookID
router.get("/:bookID", async (req, res) => {
  console.log("Attempting to fetch book with ID:", req.params.bookID);
  try {
    const id = parseInt(req.params.bookID, 10); // Convert bookID from string to number
    if (isNaN(id)) {
      return res.status(400).send("Invalid book ID"); // Send an error if conversion fails
    }
    const book = await Book.findOne({ bookID: id });
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router
