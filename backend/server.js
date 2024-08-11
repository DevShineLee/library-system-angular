const express = require("express")
const mongoose = require("./config/database") // Adjust this path if needed
const bookRoutes = require("./routes/booksRoutes") // Ensure this matches the actual file name
const userRoutes = require("./routes/userRoutes")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/api/books", bookRoutes) // Correct route setup for books
app.use("/api/users", userRoutes) // Route setup for users

// General error handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).send("Endpoint Not Found")
})

// General error handler for server errors
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
