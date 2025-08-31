const multer = require('multer');
const path = require('path');
const { storageConfig } = require('../config/storage');

// Set up storage engine using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageConfig.uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|docx|txt|json/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Error: File type not allowed!'));
  }
};

// Initialize upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: storageConfig.fileSizeLimit },
  fileFilter: fileFilter
}).single('file'); // Expecting a single file upload with the field name 'file'

// Export the upload middleware
module.exports = upload;