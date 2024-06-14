const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./config/pgsql.config'); // Importez votre configuration Sequelize
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

// Connect to the database
connectToDatabase();

// Use routes
app.use('/users', userRoutes);

app.listen(port, () => console.log(`User microservice running on http://localhost:${port}`));
