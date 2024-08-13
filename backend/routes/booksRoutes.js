const express = require("express")
const router = express.Router()
const Book = require("../models/book.model")

// get all book with search option
router.get("/", async (req, res) => {
  try {
    const searchQuery = req.query.search
    let query = Book.find()

    if (searchQuery) {
      const regex = new RegExp(escapeRegex(searchQuery), "i")
      query = query.where({
        $or: [
          { title: regex },
          { author: regex },
          { genre: regex },
          { ISBN: regex }
        ]
      })
    }

    const books = await query.exec()
    res.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message })
  }
})

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

// Fetch a book by its bookID
router.get("/:bookID", async (req, res) => {
  console.log("Attempting to fetch book with ID:", req.params.bookID);
  try {
    const id = parseInt(req.params.bookID, 10);
    if (isNaN(id)) {
      return res.status(400).send("Invalid book ID: must be a number");
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
  console.log("PUT /api/books/return/:bookID", req.params.bookID);
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
    // create new book object
    const newBook = new Book({
      bookID,
      ISBN,
      title,
      genre,
      author
    })
    // store new book
    await newBook.save()
    res.status(201).json(newBook)
  } catch (error) {
    console.error("Error adding new book:", error)
    res
      .status(500)
      .json({ message: "Failed to add new book", error: error.message })
  }
})


// PUT route to update a book
router.put("/edit/:bookID", async (req, res) => {
  const bookID = parseInt(req.params.bookID);
  if (isNaN(bookID)) {
    return res.status(400).send("Invalid book ID format.");
  }
  try {
    const updateData = req.body;
    const updatedBook = await Book.findOneAndUpdate({ bookID: bookID }, updateData, { new: true });
    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }
    res.json(updatedBook);
  } catch (error) {
    console.error("Failed to update book:", error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE route to delete a book
router.delete("/delete/:bookID", async (req, res) => {
  const bookID = parseInt(req.params.bookID);
  if (isNaN(bookID)) {
    return res.status(400).send("Invalid book ID format.");
  }
  try {
    const deletedBook = await Book.findOneAndDelete({ bookID: bookID });
    if (!deletedBook) {
      return res.status(404).send("Book not found");
    }
    res.status(200).json({ message: "Book deleted successfully", bookID: bookID });
  } catch (error) {
    console.error("Failed to delete book:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router
