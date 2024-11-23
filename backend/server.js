const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Enable CORS with the specific origin
app.use(cors({
  origin: 'http://localhost:5001', // Allow requests from your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Include credentials if needed
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const resumeRoutes = require('./routes/resume');
app.use('/api/resume', resumeRoutes);

const documentRoutes = require('./routes/documents');
app.use('/api/documents', documentRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
