const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true, unique: true },
  lastName: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  phone: { type: Number },
});

module.exports = mongoose.model('User', userSchema)