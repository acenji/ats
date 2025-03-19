const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
//require('dotenv').config({ path: '../.env' }); // Explicitly load .env from project root
require('dotenv').config({ path: './.env.local' }); // This will load .env from the backend directory

console.log("Loaded API Key:", process.env.OPENAI_API_KEY); // Debug the loaded API key

const app = express();

// Enable CORS with the specific origin
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Include credentials if needed
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const resumeRoutes = require('./routes/resume');
app.use('/api/resume', resumeRoutes);

const documentRoutes = require('./routes/documents'); // Include document routes (with /match)
app.use('/api/documents', documentRoutes);

const jobRoutes = require('./routes/job'); // Include job routes
app.use('/api/job', jobRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
