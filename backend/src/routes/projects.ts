import { Router } from "express";
import {
  CreateFolderType,
  CreateProjectType,
  UpdateFolderType,
} from "../utils/types";
import { prisma } from "../utils/db";
import { getAuth, requireAuth } from "@clerk/express";

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

//Manage Files and Folders

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

export default router;
