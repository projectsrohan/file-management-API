const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const upload = require('../utils/upload');

// File upload route with category parameter
router.post('/:category', upload.single('file'), fileController.uploadFile);

// Get files route
router.get('/', fileController.listFiles);

// Delete file route
router.delete('/:category/:filename', fileController.deleteFile);

// Search files route
router.get('/search', fileController.searchFiles);

module.exports = router;