const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const File = require('../models/File');
const { uploadFileToGitHub } = require('./githubStorageService');
const { extractMetadata } = require('./metadataService');
const { compressFile } = require('../utils/compressionHelper');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILE_UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const metadata = await extractMetadata(file.path);
    const newFile = new File({
      name: file.originalname,
      path: file.path,
      size: file.size,
      type: file.mimetype,
      metadata,
    });

    await newFile.save();
    await uploadFileToGitHub(newFile);
    await compressFile(file.path);

    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const files = await File.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const totalFiles = await File.countDocuments();

    res.status(200).json({
      files,
      totalPages: Math.ceil(totalFiles / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving files', error });
  }
};

const getFileDetails = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving file details', error });
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    await fs.remove(file.path);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file', error });
  }
};

module.exports = {
  uploadFile,
  getAllFiles,
  getFileDetails,
  deleteFile,
};