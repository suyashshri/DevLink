function extractRepoDetails(repoUrl: string) {
  const pattern =
    /^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)(?:\.git)?(?:\/)?$/;
  const match = repoUrl.match(pattern);
  if (!match) {
    console.log("Invalid Github Url");
    throw new Error("Invalid GitHub URL");
  }
  return { owner: match[1], repo: match[2] };
}
