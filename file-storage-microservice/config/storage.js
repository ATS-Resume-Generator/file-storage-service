const path = require('path');

const storageConfig = {
    storagePath: path.join(__dirname, '../uploads'), // Directory for storing uploaded files
    maxFileSize: 10 * 1024 * 1024, // Maximum file size (10 MB)
    allowedFileTypes: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/json'], // Supported file types
    compression: {
        enabled: true, // Enable compression for storage optimization
        level: 6 // Compression level (1-9)
    },
    backup: {
        enabled: true, // Enable automatic backup
        backupPath: path.join(__dirname, '../backups') // Directory for storing backups
    },
    cleanup: {
        enabled: true, // Enable temporary file cleanup
        interval: '1h' // Cleanup interval
    }
};

module.exports = storageConfig;