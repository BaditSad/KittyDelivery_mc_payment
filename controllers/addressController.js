const { sql } = require('../config/dbsql.config');
const { Address } = require('../models/dbsqlmodel');

// Functions for Address
async function getAllAddresses() {
    try {
        const result = await sql.query`SELECT * FROM Address`;
        return result.recordset.map(row => new Address(row.address_id, row.address));
    } catch (err) {
        console.error("Error fetching addresses: ", err);
        throw err;
    }
}

async function getAddresses(req, res) {
    try {
        const addresses = await getAllAddresses();
        res.json(addresses);
    } catch (err) {
        console.error("Error retrieving addresses: ", err);
        res.status(500).json({ error: "Error retrieving addresses." });
    }
}

async function createAddress(req, res) {
    const { address } = req.body;
    try {
        await sql.query`INSERT INTO Address (address) VALUES (${address})`;
        res.status(201).json({ message: "Address created successfully." });
    } catch (err) {
        console.error("Error creating address: ", err);
        res.status(500).json({ error: "Error creating address." });
    }
}

async function updateAddress(req, res) {
    const addressId = req.params.id;
    const { address } = req.body;
    try {
        await sql.query`UPDATE Address SET address = ${address} WHERE address_id = ${addressId}`;
        res.json({ message: "Address updated successfully." });
    } catch (err) {
        console.error("Error updating address: ", err);
        res.status(500).json({ error: "Error updating address." });
    }
}

async function deleteAddress(req, res) {
    const addressId = req.params.id;
    try {
        await sql.query`DELETE FROM Address WHERE address_id = ${addressId}`;
        res.json({ message: "Address deleted successfully." });
    } catch (err) {
        console.error("Error deleting address: ", err);
        res.status(500).json({ error: "Error deleting address." });
    }
}

module.exports = {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress
};
