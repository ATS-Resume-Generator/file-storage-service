const express = require('express');
const router = express.Router();
const versioningService = require('../services/versioningService');
const { validateVersion } = require('../middleware/fileValidation');

// Create a new file version
router.post('/:id/versions', validateVersion, async (req, res) => {
    try {
        const fileId = req.params.id;
        const versionData = req.body;
        const newVersion = await versioningService.createVersion(fileId, versionData);
        res.status(201).json(newVersion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// List all versions of a specific file
router.get('/:id/versions', async (req, res) => {
    try {
        const fileId = req.params.id;
        const versions = await versioningService.getVersions(fileId);
        res.status(200).json(versions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;