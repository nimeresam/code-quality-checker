const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Serve static files from React
app.use(express.static(path.join(__dirname, "../client/build")));

// API route example
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Serve React app for other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);