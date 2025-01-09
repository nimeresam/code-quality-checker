const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/build")));
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send({ error: err.message });
  } else if (err) {
    return res.status(400).send({ error: err.message });
  }
  next();
});

// API route example
app.use(
  "/api",
  require("./routes/code.route"),
  require("./routes/health-check.route")
);

// Serve React app for other routes
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
