const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();

// Middleware
app.use(express.json());

// Serve static files from React
app.use(express.static(path.join(__dirname, "../client/build")));

// API route example
app.use("/api", require("./routes/code.route"));

// Serve React app for other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
