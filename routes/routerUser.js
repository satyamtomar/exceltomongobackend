const express = require("express");
const { uploadFile,getData } = require("../controllers/userController");
const router = express.Router();

const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var uploads = multer({ storage: storage });

router.post("/upload", uploads.single("xlsx"), uploadFile);
router.get("/getData",getData);

module.exports = router;
