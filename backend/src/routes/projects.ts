router.post("/projects", async (req, res) => {
  const { name, description, visibility } = req.body;
  const project = await prisma.project.create({
    data: { name, description, visibility, ownerId: req.user.id },
  });
  res.status(201).json(project);
});

router.get("/projects", async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { ownerId: req.user.id },
  });
  res.json(projects);
});

router.get("/projects/:projectId", async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.projectId },
  });
  res.json(project);
});

router.delete("/projects/:projectId", async (req, res) => {
  await prisma.project.delete({ where: { id: req.params.projectId } });
  res.status(204).send();
});

router.post("/projects/:projectId/repositories", async (req, res) => {
  const repo = await prisma.repository.create({
    data: { name: req.body.name, projectId: req.params.projectId },
  });
  res.status(201).json(repo);
});

router.get("/projects/:projectId/repositories", async (req, res) => {
  const repos = await prisma.repository.findMany({
    where: { projectId: req.params.projectId },
  });
  res.json(repos);
});
