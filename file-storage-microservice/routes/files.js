const express = require('express');
const router = express.Router();
const fileStorageService = require('../services/fileStorageService');
const versioningService = require('../services/versioningService');
const metadataService = require('../services/metadataService');
const { validateFileUpload } = require('../middleware/fileValidation');
const upload = require('../middleware/upload');

// POST /files/upload - Upload files
router.post('/upload', upload.single('file'), validateFileUpload, async (req, res) => {
    try {
        const fileData = await fileStorageService.uploadFile(req.file);
        res.status(201).json(fileData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /files - List all files with pagination and filtering
router.get('/', async (req, res) => {
    try {
        const { page, limit, filter } = req.query;
        const files = await fileStorageService.listFiles(page, limit, filter);
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /files/:id - Get specific file details
router.get('/:id', async (req, res) => {
    try {
        const file = await fileStorageService.getFileDetails(req.params.id);
        res.status(200).json(file);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// GET /files/:id/download - Download file content
router.get('/:id/download', async (req, res) => {
    try {
        const fileStream = await fileStorageService.downloadFile(req.params.id);
        fileStream.pipe(res);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// DELETE /files/:id - Delete file
router.delete('/:id', async (req, res) => {
    try {
        await fileStorageService.deleteFile(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// POST /files/:id/versions - Create new file version
router.post('/:id/versions', async (req, res) => {
    try {
        const versionData = await versioningService.createVersion(req.params.id, req.body);
        res.status(201).json(versionData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /files/:id/versions - List file versions
router.get('/:id/versions', async (req, res) => {
    try {
        const versions = await versioningService.listVersions(req.params.id);
        res.status(200).json(versions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// GET /files/:id/metadata - Get file metadata
router.get('/:id/metadata', async (req, res) => {
    try {
        const metadata = await metadataService.getMetadata(req.params.id);
        res.status(200).json(metadata);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// PUT /files/:id/metadata - Update file metadata
router.put('/:id/metadata', async (req, res) => {
    try {
        const updatedMetadata = await metadataService.updateMetadata(req.params.id, req.body);
        res.status(200).json(updatedMetadata);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// GET /health - Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

module.exports = router;