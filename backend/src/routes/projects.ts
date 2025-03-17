import { Router } from "express";
import { CreateProjectType } from "../utils/types";

const router = Router();

router.post("/", (req, res) => {
  const data = CreateProjectType.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({
      message: "Incorrect inputs",
    });
  }

  const { name, description, visibility } = data.data;
});

router.get("/", () => {});

router.get("/:projectId", () => {});

router.delete("/:projectId", () => {});

export default router;
