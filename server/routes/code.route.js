const express = require("express");
const router = express.Router();
const { checkCodeQuality } = require("../services/code-quality");

// Example POST endpoint
router.post("/code", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res
      .status(400)
      .json({ error: "Code is required in the request body." });
  }

  try {
    const response = await checkCodeQuality(code);
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
