// backend/server.js

const express = require("express")
const mongoose = require("./config/database") // get mongoose config
const bookRoutes = require("./routes/booksRoutes")
const userRoutes = require("./routes/userRoutes")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// use routes
app.use("/api/books", bookRoutes) // book route
app.use("/api/users", userRoutes) // user route

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
