const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

// Upload file with categorization
exports.uploadFile = async(req, res, next) => {
    try {
        const { category } = req.params;

        if (!req.file) {
            throw new Error('Please upload a file');
        }

        const filename = req.file.originalname;
        const filePath = path.join('uploads', category, filename);

        if (!fs.existsSync(path.join('uploads', category))) {
            fs.mkdirSync(path.join('uploads', category), { recursive: true });
        }

        // Ensure we are accessing the file buffer
        if (!req.file.buffer) {
            logger.error('File buffer is missing');
            throw new Error('File buffer is missing');
        }

        // Write file buffer to disk
        fs.writeFileSync(filePath, req.file.buffer);
        logger.info('File uploaded successfully');
        res.json({ message: 'File uploaded successfully', filePath });
    } catch (error) {
        logger.error(`Error uploading file: ${error.message}`);
        next(error);
    }
};


// List files
exports.listFiles = async(req, res, next) => {
    try {
        const categories = fs.readdirSync('uploads');
        const files = {};

        categories.forEach(category => {
            const categoryFiles = fs.readdirSync(path.join('uploads', category));
            files[category] = categoryFiles;
        });

        res.json({ files });
    } catch (error) {
        logger.error(`Error showing file list: ${error.message}`);
        next(error);
    }
};

// Delete file
exports.deleteFile = async(req, res, next) => {
    try {
        const { category, filename } = req.params;
        const filePath = path.join('uploads', category, filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            logger.info('File deleted successfully');
            res.json({ message: 'File deleted successfully' });
        } else {
            logger.info('File not found');
            res.status(404).json({ message: 'File not found' });
        }
    } catch (error) {
        logger.error(`Error showing file list: ${error.message}`);
        next(error);
    }
};

// Search files
exports.searchFiles = async(req, res, next) => {
    try {
        const { query } = req.query;
        const searchResults = [];

        // Search files in each category
        const categories = fs.readdirSync('uploads');
        categories.forEach(category => {
            const categoryFiles = fs.readdirSync(path.join('uploads', category));
            categoryFiles.forEach(filename => {
                const filePath = path.join('uploads', category, filename);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                if (filename.includes(query) || fileContent.includes(query)) {
                    searchResults.push({ category, filename, filePath });
                }
            });
        });

        res.json({ results: searchResults });
    } catch (error) {
        logger.error(`Error searching files: ${error.message}`);
        next(error);
    }
};