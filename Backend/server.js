const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

//MONGODB CONNECTION
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
let db = mongoose.connection;

//Check Database connection
db.once("open", () => {
  console.log("db is connected");
});
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/user", require("./Routes/userRoutes"));

//SERVER PORT
const port = process.env.PORT || 7200;
app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
