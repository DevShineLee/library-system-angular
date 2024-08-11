const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user.model")

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body
    console.log("Received user data:", req.body) // Log the incoming user data for debugging

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      console.log("Username already exists:", username) // Log the conflict for debugging
      return res.status(409).json({ message: "Username already exists" }) // Return a JSON response for consistency
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()

    console.log("User created successfully", newUser) // Log the success message along with the user info for debugging
    res.status(201).json({ message: "User created" }) // Send a JSON response on success
  } catch (error) {
    console.error("Error creating user:", error) // Log the error for debugging
    res.status(500).json({ error: error.message }) // Send a JSON error message
  }
})

module.exports = router
