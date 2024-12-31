const multer = require("multer");

// Local Imports
const { getUniqueName, mbToBytes } = require("./utils");

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOADS_DIR); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, getUniqueName(file.originalname));
  },
});

const isValidType = (fileType) => {
  const invalidTypes = /jpeg|jpg|png|gif/;

  return !invalidTypes.test(fileType);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: mbToBytes(process.env.MAX_FILE_SIZE_MB) },
  fileFilter: (req, file, cb) => {
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = isValidType(file.mimetype);
    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  },
});

module.exports = {
  upload,
};
