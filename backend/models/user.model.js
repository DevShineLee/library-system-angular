const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  passwd: { type: String, required: true },
  email: { type: String, required: true }
})

// method to compare passwords
UserSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", UserSchema)

module.exports = User
