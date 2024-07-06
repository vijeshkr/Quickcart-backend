const jwt = require('jsonwebtoken');

// Middleware function to authenticate jwt token
const authToken = async (req, res, next) => {
    try {
        // Retrieve token from cookeis
        const token = req.cookies?.accessToken;

        console.log('Token', token);

        // If no token found return an error response
        if(!token){
            return res.status(401).json({message: 'Please login'});
        }

        // Verify the token using secret key
        jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(err, decoded) => {
            if(err){
                console.log('Token verification failed',err);
                return res.status(403).json({message: 'Invalid token'});
            }
            console.log('Decoded token',decoded);

            // Attach the user id to the request object
            req.userId = decoded?.id;
            

            next();
        })
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = authToken;