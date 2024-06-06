const { sql } = require('../config/dbsql.config');
const { Neighborhood } = require('../models/dbsqlmodel');

// Functions for Neighborhood
async function getAllNeighborhoods() {
    try {
        const result = await sql.query`SELECT * FROM Neighborhoods`;
        return result.recordset.map(row => new Neighborhood(row.id, row.name, row.city_id));
    } catch (err) {
        console.error("Error fetching neighborhoods: ", err);
        throw err;
    }
}

async function getNeighborhoods(req, res) {
    try {
        const neighborhoods = await getAllNeighborhoods();
        res.json(neighborhoods);
    } catch (err) {
        console.error("Error retrieving neighborhoods: ", err);
        res.status(500).json({ error: "Error retrieving neighborhoods." });
    }
}

async function createNeighborhood(req, res) {
    const { name, city_id } = req.body;
    try {
        await sql.query`INSERT INTO Neighborhoods (name, city_id) VALUES (${name}, ${city_id})`;
        res.status(201).json({ message: "Neighborhood created successfully." });
    } catch (err) {
        console.error("Error creating neighborhood: ", err);
        res.status(500).json({ error: "Error creating neighborhood." });
    }
}

async function updateNeighborhood(req, res) {
    const neighborhoodId = req.params.id;
    const { name, city_id } = req.body;
    try {
        await sql.query`UPDATE Neighborhoods SET name = ${name}, city_id = ${city_id} WHERE id = ${neighborhoodId}`;
        res.json({ message: "Neighborhood updated successfully." });
    } catch (err) {
        console.error("Error updating neighborhood: ", err);
        res.status(500).json({ error: "Error updating neighborhood." });
    }
}

async function deleteNeighborhood(req, res) {
    const neighborhoodId = req.params.id;
    try {
        await sql.query`DELETE FROM Neighborhoods WHERE id = ${neighborhoodId}`;
        res.json({ message: "Neighborhood deleted successfully." });
    } catch (err) {
        console.error("Error deleting neighborhood: ", err);
        res.status(500).json({ error: "Error deleting neighborhood." });
    }
}

module.exports = {
    getNeighborhoods,
    createNeighborhood,
    updateNeighborhood,
    deleteNeighborhood
};
