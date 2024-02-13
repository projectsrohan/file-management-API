require('dotenv').config();
const express = require('express');
const fileRoutes = require('./src/routes/fileRoutes');
const errorHandler = require('./src/utils/errorHandlers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use('/api/files', fileRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});