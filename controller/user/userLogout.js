const userLogout = async (req, res) => {
    try {
        res.clearCookie('accessToken');

        res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : 'Server error'})
    }
}

module.exports = userLogout;