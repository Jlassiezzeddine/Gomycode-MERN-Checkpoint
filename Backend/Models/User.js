const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);
