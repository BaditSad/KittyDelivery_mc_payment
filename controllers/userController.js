const { sql } = require('../config/dbsql.config');

// Function to get a user by ID
async function getUserById(req, res) {
    const userId = req.params.id;
    try {
        const result = await sql.query`SELECT * FROM Users WHERE user_id = ${userId}`;
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error("Error fetching user: ", err);
        res.status(500).json({ error: "Error fetching user." });
    }
}

// Function to get all users
async function getAllUsers() {
    try {
        const result = await sql.query`SELECT * FROM Users`;
        return result.recordset;
    } catch (err) {
        console.error("Error fetching users: ", err);
        throw err;
    }
}

async function getUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        console.error("Error retrieving users: ", err);
        res.status(500).json({ error: "Error retrieving users." });
    }
}

async function createUser(req, res) {
    const { email, role, password, account_status, user_name, telephone, address } = req.body;
    try {
        await sql.query`INSERT INTO Users (email, role, password, account_status, user_name, telephone, address) VALUES (${email}, ${role}, ${password}, ${account_status}, ${user_name}, ${telephone}, ${address})`;
        res.status(201).json({ message: "User created successfully." });
    } catch (err) {
        console.error("Error creating user: ", err);
        res.status(500).json({ error: "Error creating user." });
    }
}

async function updateUser(req, res) {
    const userId = req.params.id;
    const { email, role, account_status, user_name, telephone, address, newPassword, oldPassword } = req.body;
    try {
        const result = await sql.query`SELECT password FROM Users WHERE user_id = ${userId}`;
        const user = result.recordset[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== oldPassword) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({ message: 'New password must be different from the old password' });
        }
        
        await sql.query`UPDATE Users SET email = ${email}, role = ${role}, password = ${newPassword}, account_status = ${account_status}, user_name = ${user_name}, telephone = ${telephone}, address = ${address} WHERE user_id = ${userId}`;
        res.json({ message: "User updated successfully." });
    } catch (err) {
        console.error("Error updating user: ", err);
        res.status(500).json({ error: "Error updating user." });
    }
}

async function deleteUser(req, res) {
    const userId = req.params.id;
    try {
        await sql.query`DELETE FROM Users WHERE user_id = ${userId}`;
        res.json({ message: "User deleted successfully." });
    } catch (err) {
        console.error("Error deleting user: ", err);
        res.status(500).json({ error: "Error deleting user." });
    }
}

module.exports = {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser
};
