require('dotenv').config(); // Charger les variables d'environnement à partir de .env

const notificationsRouter = require("./controllers/NotificationController");
const ordersRouter = require("./controllers/OrderController");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDatabase } = require('./config/dbsql.config'); // Include the SQL Server configuration

// Route imports
const userRoutes = require('./routes/userRoutes');
/*const restaurantRoutes = require('./routes/restaurantRoutes');
const apiKeyRoutes = require('./routes/apiKeyRoutes');
const addressRoutes = require('./routes/addressRoutes');
const regionRoutes = require('./routes/regionRoutes');
const cityRoutes = require('./routes/cityRoutes');
const neighborhoodRoutes = require('./routes/neighborhoodRoutes');*/

const app = express();
const port = process.env.PORT || 3002;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/kittydelivery";

app.use("/api", notificationsRouter);
app.use(cors());

const db = require("./models");
db.mongoose
  .connect(mongoURI, {

  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Connect to the SQL Server database
connectToDatabase();

// Use routes
app.use('/users', userRoutes);
/*app.use('/rest', restaurantRoutes);
app.use('/apiKeys', apiKeyRoutes);
app.use('/addresses', addressRoutes);
app.use('/regions', regionRoutes);
app.use('/cities', cityRoutes);
app.use('/neighborhoods', neighborhoodRoutes);*/

//Ici on envoie les infos vers le front

app.use("/api", ordersRouter);

app.listen(port, () => console.log(`app running on http://localhost:${port}`));
