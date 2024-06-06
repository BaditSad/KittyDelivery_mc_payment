const { sql } = require('../config/dbsql.config');
const { Restaurant } = require('../models/dbsqlmodel');

// Functions for Restaurant
async function getAllRestaurants() {
    try {
        const result = await sql.query`SELECT * FROM Restaurants`;
        return result.recordset.map(row => new Restaurant(row.restaurant_id, row.telephone, row.address, row.user_id, row.restaurant_name));
    } catch (err) {
        console.error("Error fetching restaurants: ", err);
        throw err;
    }
}

async function getRestaurants(req, res) {
    try {
        const restaurants = await getAllRestaurants();
        res.json(restaurants);
    } catch (err) {
        console.error("Error retrieving restaurants: ", err);
        res.status(500).json({ error: "Error retrieving restaurants." });
    }
}

async function createRestaurant(req, res) {
    const { telephone, address, user_id, restaurant_name } = req.body;
    try {
        await sql.query`INSERT INTO Restaurants (telephone, address, user_id, restaurant_name) VALUES (${telephone}, ${address}, ${user_id}, ${restaurant_name})`;
        res.status(201).json({ message: "Restaurant created successfully." });
    } catch (err) {
        console.error("Error creating restaurant: ", err);
        res.status(500).json({ error: "Error creating restaurant." });
    }
}

async function updateRestaurant(req, res) {
    const restaurantId = req.params.id;
    const { telephone, address, user_id, restaurant_name } = req.body;
    try {
        await sql.query`UPDATE Restaurants SET telephone = ${telephone}, address = ${address}, user_id = ${user_id}, restaurant_name = ${restaurant_name} WHERE restaurant_id = ${restaurantId}`;
        res.json({ message: "Restaurant updated successfully." });
    } catch (err) {
        console.error("Error updating restaurant: ", err);
        res.status(500).json({ error: "Error updating restaurant." });
    }
}

async function deleteRestaurant(req, res) {
    const restaurantId = req.params.id;
    try {
        await sql.query`DELETE FROM Restaurants WHERE restaurant_id = ${restaurantId}`;
        res.json({ message: "Restaurant deleted successfully." });
    } catch (err) {
        console.error("Error deleting restaurant: ", err);
        res.status(500).json({ error: "Error deleting restaurant." });
    }
}

module.exports = {
    getRestaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};
