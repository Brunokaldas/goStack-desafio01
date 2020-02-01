const { Router } = require("express");

const routes = Router();

var projects = [];

routes.use((req, res, next) => {
  console.count("Número de requisições");

  return next();
});

function checkProjectExist(req, res, next) {
  const { id } = req.params;
  const project = projects.find(element => element.id == id);
  if (!project) {
    return res.status(400).json({ error: "Project does not exist" });
  }
  return next();
}

//Requisição para cadastro de projeto
routes.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

//Requisição para listagem de projetos
routes.get("/projects", (req, res) => {
  return res.json(projects);
});

routes.put("/projects/:id", checkProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(element => element.id == id);
  project.title = title;

  return res.json(project);
});

routes.delete("/projects/:id", checkProjectExist, (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex(element => element.id == id);
  projects.splice(index, 1);

  res.send("foi deletado.");
});

routes.post("/projects/:id/tasks", checkProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(element => element.id == id);

  project.tasks.push(title);
  return res.json(project);
});

module.exports = routes;
