const argon2 = require('argon2');
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
        const hashedPassword = await argon2.hash(user_password);

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

        const passwordMatches = await argon2.verify(user.user_password, oldPassword);
        if (!passwordMatches) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({ message: 'New password must be different from the old password' });
        }

        const hashedPassword = await argon2.hash(newPassword);
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

// Function to logout a user
async function logoutUser(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update({ user_token_access: null });
        res.json({ message: "User logged out successfully." });
    } catch (err) {
        console.error("Error logging out user: ", err);
        res.status(500).json({ error: "Error logging out user." });
    }
}

async function deleteUser(req, res) {
    const userId = req.params.id;
    const { password } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatches = await argon2.verify(user.user_password, password);
        if (!passwordMatches) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }

        await user.update({ 
            user_account_status: 'Inactive',
            user_token_access: null,
            user_token_refresh: null
        });
        res.json({ message: "User account deactivated and tokens removed successfully." });
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
    logoutUser,
    deleteUser
};
