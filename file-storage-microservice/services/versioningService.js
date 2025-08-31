const FileVersion = require('../models/FileVersion');
const File = require('../models/File');

class VersioningService {
    async createVersion(fileId, versionData) {
        const file = await File.findById(fileId);
        if (!file) {
            throw new Error('File not found');
        }

        const newVersion = new FileVersion({
            fileId: fileId,
            versionData: versionData,
            createdAt: new Date(),
        });

        await newVersion.save();
        return newVersion;
    }

    async getVersions(fileId) {
        const versions = await FileVersion.find({ fileId: fileId }).sort({ createdAt: -1 });
        return versions;
    }

    async getVersion(fileId, versionId) {
        const version = await FileVersion.findOne({ fileId: fileId, _id: versionId });
        if (!version) {
            throw new Error('Version not found');
        }
        return version;
    }
}

module.exports = new VersioningService();