require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/userRoutes');

const sequelize = require("./config/pgsql.config");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);


sequelize.sync({ alter: true })
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(port, () => console.log(`App running on http://localhost:${port}`));
  })
  .catch(err => {
    console.error('Unable to synchronize the models:', err);
  });