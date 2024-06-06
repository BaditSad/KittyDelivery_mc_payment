const { sql } = require('../config/dbsql.config');
const { City } = require('../models/dbsqlmodel');

// Functions for City
async function getAllCities() {
    try {
        const result = await sql.query`SELECT * FROM Cities`;
        return result.recordset.map(row => new City(row.id, row.name, row.region_id));
    } catch (err) {
        console.error("Error fetching cities: ", err);
        throw err;
    }
}

async function getCities(req, res) {
    try {
        const cities = await getAllCities();
        res.json(cities);
    } catch (err) {
        console.error("Error retrieving cities: ", err);
        res.status(500).json({ error: "Error retrieving cities." });
    }
}

async function createCity(req, res) {
    const { name, region_id } = req.body;
    try {
        await sql.query`INSERT INTO Cities (name, region_id) VALUES (${name}, ${region_id})`;
        res.status(201).json({ message: "City created successfully." });
    } catch (err) {
        console.error("Error creating city: ", err);
        res.status(500).json({ error: "Error creating city." });
    }
}

async function updateCity(req, res) {
    const cityId = req.params.id;
    const { name, region_id } = req.body;
    try {
        await sql.query`UPDATE Cities SET name = ${name}, region_id = ${region_id} WHERE id = ${cityId}`;
        res.json({ message: "City updated successfully." });
    } catch (err) {
        console.error("Error updating city: ", err);
        res.status(500).json({ error: "Error updating city." });
    }
}

async function deleteCity(req, res) {
    const cityId = req.params.id;
    try {
        await sql.query`DELETE FROM Cities WHERE id = ${cityId}`;
        res.json({ message: "City deleted successfully." });
    } catch (err) {
        console.error("Error deleting city: ", err);
        res.status(500).json({ error: "Error deleting city." });
    }
}

module.exports = {
    getCities,
    createCity,
    updateCity,
    deleteCity
};
