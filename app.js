const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./MVC/routes/taskRoutes");
const port = 3000;
const dbURI = "mongodb://localhost:27017/Tasks";

const app = express();
app.use(express.json());
app.use(taskRoutes);

//* listen to server only after connected properly to db. For that reason is placed as result promise
mongoose
  .connect(dbURI)
  .then(
    (result) => app.listen(port),
    console.log("Server is running Port 3000")
  )
  .catch((err) => console.log(err));

// MIDDLEWARE & STATIC
//* Make files public to the browser - static(html, css, js)
app.use(express.static("public"));
//* takes all url encode data, then pass it to an object that  we can use in the request(req) object
app.use(express.urlencoded({ extended: true }));
//* Allows server to indicate (domain, scheme, or port)
app.use(cors());
