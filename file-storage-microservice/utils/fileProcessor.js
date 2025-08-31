const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

// Function to validate file integrity
const validateFileIntegrity = (filePath) => {
    try {
        const stats = fs.statSync(filePath);
        return stats.isFile() && stats.size > 0;
    } catch (error) {
        return false;
    }
};

// Function to get file metadata
const getFileMetadata = (filePath) => {
    const stats = fs.statSync(filePath);
    return {
        size: stats.size,
        createdAt: stats.birthtime,
        updatedAt: stats.mtime,
        mimeType: mime.lookup(filePath) || 'application/octet-stream',
    };
};

// Function to check if the file type is allowed
const isFileTypeAllowed = (filePath, allowedTypes) => {
    const mimeType = mime.lookup(filePath);
    return allowedTypes.includes(mimeType);
};

// Function to read a file and return its content
const readFileContent = (filePath) => {
    return fs.readFileSync(filePath, 'utf-8');
};

// Function to write content to a file
const writeFileContent = (filePath, content) => {
    fs.writeFileSync(filePath, content);
};

// Function to delete a file
const deleteFile = (filePath) => {
    fs.unlinkSync(filePath);
};

// Exporting utility functions
module.exports = {
    validateFileIntegrity,
    getFileMetadata,
    isFileTypeAllowed,
    readFileContent,
    writeFileContent,
    deleteFile,
};