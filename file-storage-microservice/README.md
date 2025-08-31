# File Storage Microservice

This project is a Node.js microservice for file storage and management. It provides a REST API built with Express.js, allowing users to upload, manage, and retrieve files with support for versioning and metadata extraction.

## Features

- **File Upload**: Upload files such as PDFs, DOCX, TXT, and JSON.
- **File Management**: List, retrieve, and delete files.
- **Versioning**: Create and manage versions of files.
- **Metadata Handling**: Extract and store metadata for uploaded files.
- **File Type Validation**: Ensure uploaded files meet specified criteria.
- **Health Check**: Endpoint to check the health of the service.
- **Error Handling**: Comprehensive error handling middleware.
- **Docker Support**: Containerization for easy deployment.

## API Endpoints

### File Management

- **POST /files/upload**: Upload files.
- **GET /files**: List all files with pagination and filtering.
- **GET /files/:id**: Get specific file details.
- **GET /files/:id/download**: Download file content.
- **DELETE /files/:id**: Delete a file.
- **POST /files/:id/versions**: Create a new file version.
- **GET /files/:id/versions**: List file versions.
- **GET /files/:id/metadata**: Get file metadata.
- **PUT /files/:id/metadata**: Update file metadata.

### Health Check

- **GET /health**: Check the health of the service.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd file-storage-microservice
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the root directory and add your configuration settings, such as database connection strings.

4. **Run the application**:
   ```
   npm start
   ```

5. **Access the API**:
   The API will be available at `http://localhost:3000`.

## Docker

To build and run the application in a Docker container, use the following commands:

1. **Build the Docker image**:
   ```
   docker build -t file-storage-microservice .
   ```

2. **Run the Docker container**:
   ```
   docker run -p 3000:3000 file-storage-microservice
   ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.