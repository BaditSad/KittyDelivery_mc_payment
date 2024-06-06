const { sql } = require('../config/dbsql.config');
const { ApiKey } = require('../models/dbsqlmodel');

// Functions for ApiKey
async function getAllApiKeys() {
    try {
        const result = await sql.query`SELECT * FROM Api_Keys`;
        return result.recordset.map(row => new ApiKey(row.api_key_id, row.user_id, row.api_key, row.permissions, row.expiration_date));
    } catch (err) {
        console.error("Error fetching api keys: ", err);
        throw err;
    }
}

async function getApiKeys(req, res) {
    try {
        const apiKeys = await getAllApiKeys();
        res.json(apiKeys);
    } catch (err) {
        console.error("Error retrieving api keys: ", err);
        res.status(500).json({ error: "Error retrieving api keys." });
    }
}

async function createApiKey(req, res) {
    const { user_id, api_key, permissions, expiration_date } = req.body;
    try {
        await sql.query`INSERT INTO Api_Keys (user_id, api_key, permissions, expiration_date) VALUES (${user_id}, ${api_key}, ${permissions}, ${expiration_date})`;
        res.status(201).json({ message: "API key created successfully." });
    } catch (err) {
        console.error("Error creating api key: ", err);
        res.status(500).json({ error: "Error creating api key." });
    }
}

async function updateApiKey(req, res) {
    const apiKeyId = req.params.id;
    const { user_id, api_key, permissions, expiration_date } = req.body;
    try {
        await sql.query`UPDATE Api_Keys SET user_id = ${user_id}, api_key = ${api_key}, permissions = ${permissions}, expiration_date = ${expiration_date} WHERE api_key_id = ${apiKeyId}`;
        res.json({ message: "API key updated successfully." });
    } catch (err) {
        console.error("Error updating api key: ", err);
        res.status(500).json({ error: "Error updating api key." });
    }
}

async function deleteApiKey(req, res) {
    const apiKeyId = req.params.id;
    try {
        await sql.query`DELETE FROM Api_Keys WHERE api_key_id = ${apiKeyId}`;
        res.json({ message: "API key deleted successfully." });
    } catch (err) {
        console.error("Error deleting api key: ", err);
        res.status(500).json({ error: "Error deleting api key." });
    }
}

module.exports = {
    getApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey
};
