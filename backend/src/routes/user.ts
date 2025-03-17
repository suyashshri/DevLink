import { Router } from "express";
import projectRouter from "./projects";

const router = Router();

router.use("/projects", projectRouter);

export default router;
