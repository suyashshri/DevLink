import { Router } from "express";
import { CreateProjectType } from "../utils/types";
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

router.get("/:projectId", requireAuth(), async (req, res) => {});

router.delete("/:projectId", requireAuth(), async (req, res) => {});

export default router;
