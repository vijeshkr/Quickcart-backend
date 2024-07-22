const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = 3500 || process.env.PORT;
dotenv.config();
const app = express();
const connectDB = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const { uploadFiles } = require('./controller/product/uploadProduct');


// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Middlewares
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'quickcart-frontend-hpxyme49p-vijesh-krs-projects.vercel.app',
    'https://quickcart-frontend.vercel.app'],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Serve uploaded files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Router set
app.use('/api', router);
// Upload files
app.post('/api/upload', upload.array('files'), uploadFiles);

// When server is connected to database then run the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
