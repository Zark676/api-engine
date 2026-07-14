require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Resource = require("./models/Resource");
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use((req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
    );

    next();
});

app.get("/api/resources", async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

app.get("/api/resources/:id", async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        message: "Resource not found"
      });
    }
    res.json(resource);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

app.post("/api/resources", async (req, res) => {

  if (!req.body.name || !req.body.category) {
    return res.status(400).json({
      message: "Please include both a name and category"
    });
  }
  try {
    const resource = await Resource.create({
      name: req.body.name,
      category: req.body.category
    });
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }

});

app.put("/api/resources/:id", async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true, runValidators: true}
    );
    if (!updated) {
      return res.status(404).json({
        message: "Resource not found"
      });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

app.delete("/api/resources/:id", async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "Resource not found"
      });
    }
    res.json({
      message: "Resource deleted",
      resource: deleted
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});