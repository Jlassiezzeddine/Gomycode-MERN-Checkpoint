const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

//MONGODB CONNECTION
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;
//Check Database connection
db.once("open", () => {
  console.log("db is connected");
});

//ROUTES
app.use("/home", require("./Routes/home"));

//SERVER PORT
const port = process.env.PORT || 7200;
app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
