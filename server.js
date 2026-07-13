const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use((req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
    );

    next();
});


let resources = [
  {
    id: 1,
    name: "Notebook",
    category: "School"
  },
  {
    id: 2,
    name: "Laptop",
    category: "Electronics"
  }
];
let nextId = 3;

app.get("/api/resources", (req, res) => {
  res.json(resources);
});

app.get("/api/resources/:id", (req, res) => {
  const id = Number(req.params.id);
  const resource = resources.find(item => item.id === id);

  if (!resource) {
    return res.status(404).json({
      message: "Resource not found"
    });
  }
  res.json(resource);
});

app.post("/api/resources", (req, res) => {
  const newResource = {
    id: nextId++,
    ...req.body
  };
  resources.push(newResource);
  res.status(201).json(newResource);
});

app.put("/api/resources/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = resources.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Resource not found"
    });
  }
  resources[index] = {
    id,
    ...req.body
  };
  res.json(resources[index]);
});

app.delete("/api/resources/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = resources.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Resource not found"
    });
  }
  const deleted = resources.splice(index, 1);
  res.json({
    message: "Resource deleted",
    resource: deleted[0]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});