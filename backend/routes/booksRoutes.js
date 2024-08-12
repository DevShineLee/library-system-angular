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


// PUT route to borrow a book
router.put("/borrow/:bookID", async (req, res) => {
  console.log("Borrow request received for bookID:", req.params.bookID)
  console.log("Request body:", req.body)
  try {
    const bookID = parseInt(req.params.bookID, 10);
    if (isNaN(bookID)) {
      return res.status(400).send("Invalid book ID format.");
    }
    const { userID } = req.body;
    if (!userID) {
      return res.status(400).send("User ID is required.");
    }
    const book = await Book.findOneAndUpdate(
      { bookID, isBorrowed: false },
      { $set: { isBorrowed: true, userID: userID } },
      { new: true }
    );
    if (!book) {
      return res.status(404).send("Book not found or already borrowed.");
    }
    res.json(book);
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({ message: error.message });
  }
});


// PUT route to return a book
router.put("/return/:bookID", async (req, res) => {
  console.log("PUT /api/books/return/:bookID", req.params.bookID); // 로그 추가
    console.log("Request body:", req.body)
  try {
    const bookID = parseInt(req.params.bookID, 10);
    const { userID } = req.body;
    const book = await Book.findOneAndUpdate(
      { bookID, isBorrowed: true, userID: userID },
      { $set: { isBorrowed: false, userID: null } },
      { new: true }
    );
    if (!book) {
      return res.status(404).send("Book not found or not borrowed by this user.");
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/add", async (req, res) => {
  try {
    const { bookID, ISBN, title, genre, author } = req.body
    // 새 책 객체 생성
    const newBook = new Book({
      bookID,
      ISBN,
      title,
      genre,
      author
    })
    // DB에 새 책 저장
    await newBook.save()
    res.status(201).json(newBook)
  } catch (error) {
    console.error("Error adding new book:", error)
    res
      .status(500)
      .json({ message: "Failed to add new book", error: error.message })
  }
})


module.exports = router
