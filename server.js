const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDatabase } = require('./config/dbsql.config'); // Include the SQL Server configuration


// Route imports
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = PORT || 3002;

app.use(cors());

// Connect to the SQL Server database
connectToDatabase();

// Use routes
app.use('/users', userRoutes);

app.listen(port, () => console.log(`User microservice running on http://localhost:${port}`));
