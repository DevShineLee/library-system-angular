const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  bookID: { type: Number, required: true },
  ISBN: { type: String, required: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  author: { type: String, required: true },
  userID: { type: String, ref: "User" },
  isBorrowed: { type: Boolean, default: false }
})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book
