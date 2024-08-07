const express = require("express")
const mongoose = require("./config/database") // get mongoose config
const bookRoutes = require("./routes/books")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// usr route
app.use("/api", bookRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
