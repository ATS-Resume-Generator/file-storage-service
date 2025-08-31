const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const compressFile = (filePath) => {
    return new Promise((resolve, reject) => {
        const fileContents = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(`${filePath}.gz`);
        const zip = zlib.createGzip();

        fileContents
            .pipe(zip)
            .pipe(writeStream)
            .on('finish', () => resolve(`${filePath}.gz`))
            .on('error', (err) => reject(err));
    });
};

const decompressFile = (compressedFilePath) => {
    return new Promise((resolve, reject) => {
        const fileContents = fs.createReadStream(compressedFilePath);
        const writeStream = fs.createWriteStream(compressedFilePath.replace('.gz', ''));
        const unzip = zlib.createGunzip();

        fileContents
            .pipe(unzip)
            .pipe(writeStream)
            .on('finish', () => resolve(compressedFilePath.replace('.gz', '')))
            .on('error', (err) => reject(err));
    });
};

const getCompressedFileSize = (filePath) => {
    const stats = fs.statSync(filePath);
    return stats.size;
};

module.exports = {
    compressFile,
    decompressFile,
    getCompressedFileSize,
};