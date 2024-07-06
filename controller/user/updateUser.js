const userModel = require('../../models/userModel');

const updateUser = async (req, res) => {
    try {
        // Current user
        const currentUser = req.userId;

        const { userId, email, name, role} = req.body;

        const updateFields = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role }),
        };

        // Fetch current user details from database
        const user = await userModel.findById(currentUser);

        console.log("user.role", user.role);

        // Update user data
        const updateUser = await userModel.findByIdAndUpdate(userId, updateFields);

        res.status(200).json({message : 'User Updated', data: updateUser})

    } catch (error) {
        res.status(400).json({message : error.message || 'Server error'})
    }
}

module.exports = updateUser;