const express = require('express')
const app = express();

const cors = require('cors')

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const taskRoutes = require('./routes/taskRoutes');

app.use(taskRoutes);

module.exports = app;