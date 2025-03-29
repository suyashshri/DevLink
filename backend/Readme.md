## What API's look like

### Folder & File Management (Within Projects)

// Create a folder inside a project
POST /api/projects/:projectId/folders  
Body: { name, parentFolderId }

// Upload a file to a project
POST /api/projects/:projectId/files  
Body: { file, parentFolderId }

// Get all files and folders within a project
GET /api/projects/:projectId/contents

// Get a specific file or folder details
GET /api/projects/:projectId/contents/:contentId

// Update file/folder name
PATCH /api/projects/:projectId/contents/:contentId  
Body: { name }

// Delete a file or folder
DELETE /api/projects/:projectId/contents/:contentId
