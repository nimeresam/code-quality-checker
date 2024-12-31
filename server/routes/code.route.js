const express = require("express");
const router = express.Router();

const { upload } = require("../services/files-upload");
const {
  checkQualityOfFile,
  checkQualityOfCode,
} = require("../services/code-quality");

router.post("/code", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res
      .status(400)
      .json({ error: "Code is required in the request body." });
  }

  try {
    const response = await checkQualityOfCode(code);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  try {
    const response = await checkQualityOfFile(req.file);
    res.send(response);
  } catch (err) {
    res.status(err.code).send(err);
  }
});

module.exports = router;
