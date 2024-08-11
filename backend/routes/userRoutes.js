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
    console.log("Attempting login for:", username) // Debug: log the username attempt

    const user = await User.findOne({ username })
    if (!user) {
      console.log("User not found:", username) // Debug: log when user is not found
      return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log("Invalid credentials for:", username) // Debug: log failed password match
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      secretKey,
      {
        expiresIn: "1h"
      }
    )

    // Debug: log the complete response object
    const loginResponse = {
      message: "Login successful",
      token: token,
      username: user.username
    }
    console.log("Login response:", loginResponse)

    res.json(loginResponse)
  } catch (error) {
    console.error("Login error for user:", username, error) // Debug: log errors more comprehensively
    res.status(500).json({ message: "Server error" })
  }
})


module.exports = router
