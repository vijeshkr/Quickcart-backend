const userLogout = async (req, res) => {
    try {
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite : 'None', 
        }
        res.clearCookie('accessToken',tokenOption);

        res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : 'Server error'})
    }
}

module.exports = userLogout;