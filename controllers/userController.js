const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Function to get a user by ID
async function getUserById(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error("Error fetching user: ", err);
        res.status(500).json({ error: "Error fetching user." });
    }
}

// Function to get all users
async function getAllUsers(req, res) {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users: ", err);
        res.status(500).json({ error: "Error fetching users." });
    }
}

// Function to create a new user
async function createUser(req, res) {
    const { user_email, user_role, user_password, user_account_status, user_name, user_telephone, user_address } = req.body;
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(user_password, 10);

        const newUser = await User.create({
            user_email,
            user_role,
            user_password: hashedPassword,
            user_account_status,
            user_name,
            user_telephone,
            user_address
        });
        res.status(201).json({ message: "User created successfully.", user: newUser });
    } catch (err) {
        console.error("Error creating user: ", err);
        res.status(500).json({ error: "Error creating user." });
    }
}

// Function to update an existing user
async function updateUser(req, res) {
    const userId = req.params.id;
    const { user_email, user_role, user_account_status, user_name, user_telephone, user_address, newPassword, oldPassword } = req.body;
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatches = await bcrypt.compare(oldPassword, user.user_password);
        if (!passwordMatches) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({ message: 'New password must be different from the old password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({
            user_email,
            user_role,
            user_password: hashedPassword,
            user_account_status,
            user_name,
            user_telephone,
            user_address
        });
        res.json({ message: "User updated successfully." });
    } catch (err) {
        console.error("Error updating user: ", err);
        res.status(500).json({ error: "Error updating user." });
    }
}

// Function to soft delete a user (update account status to indicate deactivation)
async function deleteUser(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({ user_account_status: 'Inactive' });
        res.json({ message: "User account deactivated successfully." });
    } catch (err) {
        console.error("Error deactivating user: ", err);
        res.status(500).json({ error: "Error deactivating user." });
    }
}

module.exports = {
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
