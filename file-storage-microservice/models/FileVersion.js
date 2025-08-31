const mongoose = require('mongoose');

const fileVersionSchema = new mongoose.Schema({
    fileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'File'
    },
    versionNumber: {
        type: Number,
        required: true
    },
    content: {
        type: Buffer,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    metadata: {
        type: Object,
        default: {}
    }
});

const FileVersion = mongoose.model('FileVersion', fileVersionSchema);

module.exports = FileVersion;