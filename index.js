const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = 3500 || process.env.PORT;
dotenv.config();
const app = express();
const connectDB = require('./config/db');
const router = require('./routes');


// Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

// Router set
app.use('/api',router);

// When server is connected to database then run the server
connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`Server is running on port ${PORT}`);
    });
});
