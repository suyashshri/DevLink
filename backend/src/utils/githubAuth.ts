import axios from "axios";

export function extractRepoDetails(repoUrl: string) {
  const pattern =
    /^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)(?:\.git)?(?:\/)?$/;
  const match = repoUrl.match(pattern);
  if (!match) {
    console.log("Invalid Github Url");
    throw new Error("Invalid GitHub URL");
  }
  return { owner: match[1], repo: match[2] };
}

export async function validateGitHubRepo(owner: string, repo: string) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export async function getLatestCommit(owner: string, repo: string) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`
    );
    if (!response.data.length) throw new Error("No commits found");
    const latestCommit = response.data[0];
    return {
      sha: latestCommit.sha,
      message: latestCommit.commit.message,
      author: latestCommit.commit.author.name,
      date: latestCommit.commit.author.date,
    };
  } catch (error) {
    console.log("Error getting latest commit", error);
    throw new Error("Error fetching latest commit");
  }
}
