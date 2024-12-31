const express = require("express");
const router = express.Router();

// Local Imports
const { name, version } = require("../../package.json");

router.post("/ping", async (req, res) => {
  res.json({
    name,
    version,
    message: "pong!",
  });
});

module.exports = router;
