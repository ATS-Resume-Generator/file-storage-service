const mongoose = require('mongoose');
const File = require('../models/File');
const FileVersion = require('../models/FileVersion');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

// Extract metadata from a file
async function extractMetadata(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    let metadata = {};

    switch (ext) {
        case '.pdf':
            const pdfData = await pdf(fs.readFileSync(filePath));
            metadata = {
                title: pdfData.info.Title || 'Untitled',
                author: pdfData.info.Author || 'Unknown',
                pages: pdfData.numpages,
                text: pdfData.text,
            };
            break;
        case '.docx':
            const docxData = await mammoth.extractRawText({ path: filePath });
            metadata = {
                title: path.basename(filePath),
                text: docxData.value,
            };
            break;
        case '.txt':
            metadata = {
                title: path.basename(filePath),
                text: fs.readFileSync(filePath, 'utf8'),
            };
            break;
        case '.json':
            metadata = {
                title: path.basename(filePath),
                content: JSON.parse(fs.readFileSync(filePath, 'utf8')),
            };
            break;
        default:
            throw new Error('Unsupported file format');
    }

    return metadata;
}

// Save metadata to the database
async function saveMetadata(fileId, metadata) {
    const file = await File.findById(fileId);
    if (!file) {
        throw new Error('File not found');
    }

    file.metadata = metadata;
    await file.save();
}

// Get metadata for a specific file
async function getMetadata(fileId) {
    const file = await File.findById(fileId);
    if (!file) {
        throw new Error('File not found');
    }

    return file.metadata;
}

// Update metadata for a specific file
async function updateMetadata(fileId, newMetadata) {
    const file = await File.findById(fileId);
    if (!file) {
        throw new Error('File not found');
    }

    file.metadata = { ...file.metadata, ...newMetadata };
    await file.save();
}

module.exports = {
    extractMetadata,
    saveMetadata,
    getMetadata,
    updateMetadata,
};