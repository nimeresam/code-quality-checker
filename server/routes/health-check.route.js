const express = require("express");
const router = express.Router();

// Local Imports
const { name, version } = require("../../package.json");

router.get("/ping", async (req, res) => {
  res.json({
    name,
    version,
    message: "pong!",
  });
});

module.exports = router;
