// backend/routes/userRoutes.js
const express = require("express")
const router = express.Router()
const User = require("../models/user.model") // MongoDB User 모델

// POST /api/users - 새 사용자 등록
router.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10) // 비밀번호 암호화
    const newUser = new User({ username, email, passwd: hashedPassword })
    await newUser.save()
    res.status(201).send("User created")
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
