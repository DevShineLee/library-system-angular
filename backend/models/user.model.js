const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Ensure this is 'username', not 'userName'
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

// 비밀번호 해싱
UserSchema.pre("save", async function(next) {
  if (!this.isModified("passwd")) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.passwd = await bcrypt.hash(this.passwd, salt)
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = mongoose.model("User", UserSchema)
