const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
        unique: true,
    },
    size: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    metadata: {
        type: Object,
        default: {},
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    versions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FileVersion',
    }],
});

const File = mongoose.model('File', fileSchema);

module.exports = File;