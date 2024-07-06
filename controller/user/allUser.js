const userModel = require('../../models/userModel');

const allUsers = async (req,res) => {
    try {
        console.log('userid all',req.userId);

        const allUsers = await userModel.find();

        // Destructure password and other info
        const safeUsers = allUsers.map(user => {
            const { password, ...safeUser } = user.toObject();
            return safeUser;
        });

        res.status(200).json({message: 'All users data', data: safeUsers});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = allUsers;