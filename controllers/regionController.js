const { sql } = require('../config/dbsql.config');
const { Region } = require('../models/dbsqlmodel');

// Functions for Region
async function getAllRegions() {
    try {
        const result = await sql.query`SELECT * FROM Regions`;
        return result.recordset.map(row => new Region(row.id, row.name));
    } catch (err) {
        console.error("Error fetching regions: ", err);
        throw err;
    }
}

async function getRegions(req, res) {
    try {
        const regions = await getAllRegions();
        res.json(regions);
    } catch (err) {
        console.error("Error retrieving regions: ", err);
        res.status(500).json({ error: "Error retrieving regions." });
    }
}

async function createRegion(req, res) {
    const { name } = req.body;
    try {
        await sql.query`INSERT INTO Regions (name) VALUES (${name})`;
        res.status(201).json({ message: "Region created successfully." });
    } catch (err) {
        console.error("Error creating region: ", err);
        res.status(500).json({ error: "Error creating region." });
    }
}

async function updateRegion(req, res) {
    const regionId = req.params.id;
    const { name } = req.body;
    try {
        await sql.query`UPDATE Regions SET name = ${name} WHERE id = ${regionId}`;
        res.json({ message: "Region updated successfully." });
    } catch (err) {
        console.error("Error updating region: ", err);
        res.status(500).json({ error: "Error updating region." });
    }
}

async function deleteRegion(req, res) {
    const regionId = req.params.id;
    try {
        await sql.query`DELETE FROM Regions WHERE id = ${regionId}`;
        res.json({ message: "Region deleted successfully." });
    } catch (err) {
        console.error("Error deleting region: ", err);
        res.status(500).json({ error: "Error deleting region." });
    }
}

module.exports = {
    getRegions,
    createRegion,
    updateRegion,
    deleteRegion
};
