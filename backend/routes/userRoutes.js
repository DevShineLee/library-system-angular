// backend/routes/userRoutes.js

const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user.model")

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body
    console.log("Received user data:", req.body) // 로그 추가
        const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send("Username already exists."); // Conflict 상태 코드 반환
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, email, password: hashedPassword }) // password 필드명 확인
    await newUser.save()
    console.log("User created successfully") // 로그 추가
    res.status(201).send("User created")
  } catch (error) {
    console.error("Error creating user:", error.message) // 에러 로그
    res.status(500).send(error.message)
  }
})

module.exports = router
