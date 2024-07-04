const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// User registration controller
const userSignUp = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists
        const user = await userModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: 'User with this email alredy exist' })
        }

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create new user
        newUser = new userModel({
            name,
            email,
            role: 'GENERAL',
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = userSignUp;