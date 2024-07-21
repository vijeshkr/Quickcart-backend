const userModel = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSignIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(404).json({ message: 'User not found'});
        }

        // Compare the password with hashed password in the database
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.status(400).json({ message: 'Wrong password or email'});
        }

        // Create jwt token
        const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_KEY, {expiresIn: '24h'});

        // Set token in cookie
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
            sameSite : 'None', 
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
          });

        // Response with userdata excluding password
        const { password: userPassword, ...otherData } = user.toObject();
        res.status(200).json({message: 'Login successfull', data: otherData});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = userSignIn;