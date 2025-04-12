const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./uploads")); // go one level up to match backend structure
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // get correct extension
    const name = file.originalname
      .replace(/\s+/g, "-")  // replace spaces
      .replace(/[()]/g, "")  // remove parentheses
      .split(".")[0];        // remove extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

exports.upload = multer({ storage });
