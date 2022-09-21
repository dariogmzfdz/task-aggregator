const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const port = 3000;

dotenv.config();

const taskRoutes = require("./MVC/routes/taskRoutes");
const userRoutes = require("./MVC/routes/userRoutes");

//Data base name = Tasks
const dbURI = "mongodb://localhost:27017/Tasks";

const app = express();
app.use(express.json());
app.use(taskRoutes);
app.use(userRoutes);

mongoose
  .connect(dbURI)
  .then(
    (result) => app.listen(port),
    console.log(`Server is running Port http://localhost:${port}`)
  )
  .catch((err) => console.log(err));

// MIDDLEWARE & STATIC
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
