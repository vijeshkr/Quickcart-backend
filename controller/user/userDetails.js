const userModel = require('../../models/userModel');

// Function to fetch user details
const userDetails = async (req, res) => {
    try {
        console.log('User id :', req.userId);

        // Fetch the user details from the database using user id
        const user = await userModel.findById(req.userId);

        // If the user not found respond with a 404 status code
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        
        const { password: userPassword, ...otherData} = user.toObject();

        // Respond with user data and success message
       return res.status(200).json({message: 'User details', data: otherData});


    } catch (error) {
        // Handle errors that occur during the database operations
       return res.status(400).json({message: error.message});
    }
}

module.exports = userDetails;