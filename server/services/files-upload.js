const multer = require("multer");
const path = require("path");

// Local Imports
const { getUniqueName, mbToBytes, getFullDirPath } = require("./utils");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, getFullDirPath(process.env.UPLOADS_DIR)); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const isValidType = (file) => {
  const invalidTypes = /jpeg|jpg|png|gif/;
  const isInvalidExt = invalidTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isInvalidType = invalidTypes.test(file.mimetype);

  return !(isInvalidExt || isInvalidType);
};

console.log(__dirname);
const upload = multer({
  storage: storage,
  limits: { fileSize: mbToBytes(process.env.MAX_FILE_SIZE_MB) },
  fileFilter: (req, file, cb) => {
    if (isValidType(file)) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  },
});

module.exports = {
  upload,
};
