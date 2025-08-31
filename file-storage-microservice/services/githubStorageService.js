const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');
const { GITHUB_TOKEN, GITHUB_REPO } = process.env;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

class GitHubStorageService {
    async uploadFile(filePath, fileName) {
        const content = fs.readFileSync(filePath, { encoding: 'base64' });
        const response = await octokit.repos.createOrUpdateFileContents({
            owner: GITHUB_REPO.owner,
            repo: GITHUB_REPO.name,
            path: fileName,
            message: `Upload ${fileName}`,
            content,
        });
        return response.data;
    }

    async getFile(fileName) {
        const response = await octokit.repos.getContent({
            owner: GITHUB_REPO.owner,
            repo: GITHUB_REPO.name,
            path: fileName,
        });
        const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
        return content;
    }

    async deleteFile(fileName) {
        const { data: { sha } } = await octokit.repos.getContent({
            owner: GITHUB_REPO.owner,
            repo: GITHUB_REPO.name,
            path: fileName,
        });
        await octokit.repos.deleteFile({
            owner: GITHUB_REPO.owner,
            repo: GITHUB_REPO.name,
            path: fileName,
            message: `Delete ${fileName}`,
            sha,
        });
    }

    async listFiles() {
        const response = await octokit.repos.getContent({
            owner: GITHUB_REPO.owner,
            repo: GITHUB_REPO.name,
            path: '',
        });
        return response.data;
    }
}

module.exports = new GitHubStorageService();