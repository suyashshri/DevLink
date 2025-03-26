import { Router } from "express";
import {
  extractRepoDetails,
  getLatestCommit,
  validateGitHubRepo,
} from "../utils/githubAuth";

const router = Router();

router.post("/validate-repo", async (req, res) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) {
      res.status(400).json({ error: "Repository URL is required" });
      return;
    }

    const { owner, repo } = extractRepoDetails(repoUrl);
    const isValid = await validateGitHubRepo(owner, repo);

    if (!isValid) {
      res.status(404).json({ error: "Repository not found or private" });
      return;
    }
    res.json({ message: "Valid repository", owner, repo });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
});

router.post("/latest-commit", async (req, res) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) {
      res.status(400).json({ error: "Repository URL is required" });
      return;
    }

    const pattern =
      /^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)(?:\.git)?(?:\/)?$/;
    const match = repoUrl.match(pattern);
    if (!match) {
      res.status(400).json({ error: "Invalid GitHub URL" });
      return;
    }

    const { owner, repo } = { owner: match[1], repo: match[2] };
    const latestCommit = await getLatestCommit(owner, repo);

    res.json(latestCommit);
  } catch (error) {
    res.status(500).json({ error: error });
    return;
  }
});

export default router;
