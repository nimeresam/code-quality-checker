const express = require("express");
const router = express.Router();

const { upload } = require("../services/files-upload");
const { checkCodeQuality } = require("../services/code-quality");

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

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  res.send({ message: "File uploaded successfully!", file: req.file });
});

module.exports = router;
