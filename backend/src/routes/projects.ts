import { Router } from "express";
import {
  CreateFolderType,
  CreateProjectType,
  UpdateFolderType,
} from "../utils/types";
import { prisma } from "../utils/db";
import { getAuth, requireAuth } from "@clerk/express";
import { putObject } from "../utils/preSignedUrl";

const router = Router();

router.post("/", requireAuth(), async (req, res) => {
  const data = CreateProjectType.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({
      message: "Incorrect inputs",
    });
    return;
  }
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(403).json({
      message: "Unauthorized, Please login first",
    });
    return;
  }
  const parsedData = data.data;
  try {
    const newProject = await prisma.project.create({
      data: {
        name: parsedData?.name,
        description: parsedData?.description,
        visibility: parsedData?.visibility,
        ownerId: userId,
      },
    });

    res.status(201).json({
      projectId: newProject.id,
      projectName: newProject.name,
      projectOwnerId: newProject.ownerId,
    });
  } catch (error) {
    console.log("Error in creating new project", error);
  }
});

router.get("/", requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(403).json({
        message: "Unauthorized, Please login first",
      });
      return;
    }
    const allProjects = await prisma.project.findMany({
      where: {
        id: userId,
      },
    });

    res.status(201).json({
      projects: allProjects,
    });
  } catch (error) {
    console.log("Error in getting all projects", error);
  }
});

router.get("/:projectId", requireAuth(), async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    res.status(400).json({
      message: "Incorrect ProjectId",
    });
    return;
  }
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(403).json({
        message: "Unauthorized, Please login first",
      });
      return;
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });
    res.status(201).json({
      project,
    });
  } catch (error) {
    console.log(`Error in getting project ${projectId}`, error);
  }
});

// router.put("/:projectId", requireAuth(), async (req, res)=>{

// })

router.delete("/:projectId", requireAuth(), async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    res.status(400).json({
      message: "Incorrect ProjectId",
    });
    return;
  }
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(403).json({
        message: "Unauthorized, Please login first",
      });
      return;
    }

    await prisma.project.delete({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });
    res.status(201).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log(`Error in deleting project ${projectId}`, error);
  }
});

//Manage Folders

router.get("/:projectId/pre-signed-url", requireAuth(), async (req, res) => {
  const { projectId } = req.params;
  const { fileName, fileType, folderId } = req.query;
  if (!projectId || !fileName || !fileType) {
    res.status(400).json({
      error: "ProjectId is required",
    });
    return;
  }
  if (typeof fileName !== "string" || typeof fileType !== "string") {
    throw new Error("fileName and folderId must be strings");
  }
  try {
    const s3Key = `uploads/${projectId}/${
      folderId ? folderId + "/" : ""
    }${fileName}`;
    const uploadUrl = await putObject(s3Key, fileType);
    res.json({ uploadUrl, filePath: s3Key });
  } catch (error) {
    res.status(500).json({ error: "Error generating pre-signed URL" });
  }
});

router.post("/:projectId/folders", requireAuth(), async (req, res) => {
  const { projectId } = req.params;
  const data = CreateFolderType.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({
      message: "Incorrect inputs",
    });
    return;
  }
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(403).json({
      message: "Unauthorized, Please login first",
    });
    return;
  }
  const parsedData = data.data;
  try {
    const newFolder = await prisma.folder.create({
      data: {
        name: parsedData.name,
        projectId,
        parentFolderId: parsedData.parentFolderId || null,
      },
    });
    res.status(201).json(newFolder);
  } catch (error) {
    console.log("Error in creating new Folder", error);
  }
});

router.get("/:projectId/folders", requireAuth(), async (req, res) => {
  const { projectId } = req.params;

  const { userId } = getAuth(req);
  if (!userId) {
    res.status(403).json({
      message: "Unauthorized, Please login first",
    });
    return;
  }
  try {
    const allFolders = await prisma.folder.findMany({
      where: {
        projectId,
      },
      include: { subFolders: true },
    });
    res.status(201).json(allFolders);
  } catch (error) {
    console.log("Error in fetching Folders", error);
  }
});

router.get("/:projectId/folders/:folderId", requireAuth(), async (req, res) => {
  const { projectId, folderId } = req.params;

  const { userId } = getAuth(req);
  if (!userId) {
    res.status(403).json({
      message: "Unauthorized, Please login first",
    });
    return;
  }
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId, projectId },
      include: { subFolders: true, files: true },
    });

    if (!folder) {
      res.status(404).json({ error: "Folder not found" });
      return;
    }

    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ error: "Error fetching folder" });
  }
});

router.patch(
  "/:projectId/folders/:folderId",
  requireAuth(),
  async (req, res) => {
    const { projectId, folderId } = req.params;
    const data = UpdateFolderType.safeParse(req.body);
    if (!data.success) {
      res.status(400).json({
        message: "Incorrect inputs",
      });
      return;
    }
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(403).json({
        message: "Unauthorized, Please login first",
      });
      return;
    }
    const parsedData = data.data;
    try {
      const updatedFolder = await prisma.folder.update({
        where: { id: folderId, projectId },
        data: { name: parsedData.name },
      });
      res.status(201).json(updatedFolder);
    } catch (error) {
      res.status(500).json({ error: "Error updating folder name" });
    }
  }
);

router.delete(
  "/:projectId/folders/:folderId",
  requireAuth(),
  async (req, res) => {
    const { folderId } = req.params;
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(403).json({
        message: "Unauthorized, Please login first",
      });
      return;
    }

    try {
      await prisma.folder.delete({ where: { id: folderId } });
      res.json({ message: "Folder deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting folder" });
    }
  }
);

//Manage Files

router.post("/:projectId/files", requireAuth(), async (req, res) => {
  const { projectId } = req.params;
  const data = req.body;
  if (!data.success) {
    res.status(400).json({
      message: "Incorrect inputs",
    });
    return;
  }
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(403).json({
      message: "Unauthorized, Please login first",
    });
    return;
  }
  const parsedData = data.data;

  try {
    const file = await prisma.file.create({
      data: {
        name: parsedData.name,
        pathS3Url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${parsedData.filePath}`,
        projectId,
        parentFolderId: parsedData.folderId,
      },
    });

    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: "Error saving file metadata" });
  }
});

//File locking
router.patch(
  "/:projectId/files/:fileId/lock",
  requireAuth(),
  async (req, res) => {
    const { projectId, fileId } = req.params;
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(403).json({
        message: "Unauthorized, Please login first",
      });
      return;
    }
    try {
      const file = await prisma.file.findFirst({
        where: {
          id: fileId,
          projectId,
        },
      });
      if (!file) {
        res.status(400).json({
          message: "Unable to update the file",
        });
        return;
      }
      if (file.isLocked && file.lockedById !== userId) {
        res.status(403).json({
          success: false,
          message: "File is already locked by another user",
          lockedBy: file.lockedById,
        });
        return;
      }
      await prisma.file.update({
        where: {
          id: fileId,
          projectId,
        },
        data: {
          isLocked: true,
          lockedById: userId,
          updatedAt: new Date(),
        },
      });

      res.status(201).json({
        success: true,
        message: "File locked successfully",
        lockedBy: userId,
      });
    } catch (error) {
      console.log("Error locking file:", error);
      res.status(500).json({ error: "Error locking file" });
      return;
    }
  }
);

router.patch(
  "/:projectId/files/:fileId/unlock",
  requireAuth(),
  async (req, res) => {
    const { projectId, fileId } = req.params;
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(403).json({
        message: "Unauthorized, Please login first",
      });
      return;
    }
    try {
      const file = await prisma.file.findFirst({
        where: {
          id: fileId,
          projectId,
        },
      });
      if (!file) {
        res.status(400).json({
          message: "Unable to update the file",
        });
        return;
      }
      if (file.lockedById !== userId) {
        res.status(403).json({
          success: false,
          message: "You do not have permission to unlock this file",
        });
        return;
      }
      await prisma.file.update({
        where: {
          id: fileId,
          projectId,
        },
        data: {
          isLocked: false,
          lockedById: null,
        },
      });

      res.status(201).json({
        success: true,
        message: "File unlocked successfully",
      });
    } catch (error) {
      console.log("Error unlocking file:", error);
      res.status(500).json({ error: "Error locking file" });
    }
  }
);

export default router;
