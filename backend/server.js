const express = require("express")
const mongoose = require("./config/database")
const bookRoutes = require("./routes/booksRoutes")
const userRoutes = require("./routes/userRoutes")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/api/books", bookRoutes) // Book routes
app.use("/api/users", userRoutes) // User routes

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
