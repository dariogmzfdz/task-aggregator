const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./MVC/routes/taskRoutes");
const port = 3000;

//Data base name = Tasks
const dbURI = "mongodb://localhost:27017/Tasks";

const app = express();
app.use(express.json());
app.use(taskRoutes);

mongoose
  .connect(dbURI)
  .then(
    (result) => app.listen(port),
    console.log("Server is running Port 3000")
  )
  .catch((err) => console.log(err));

// MIDDLEWARE & STATIC
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
