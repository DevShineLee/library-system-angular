const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const secretKey = "your_secret_key"

// create user endpoint
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

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: "1h"
    }) // Adjust secret and options as needed

    res.json({ message: "Login successful", token: token })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
})


module.exports = router
