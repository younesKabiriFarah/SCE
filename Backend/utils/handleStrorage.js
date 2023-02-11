const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const parhStorage = `${__dirname}/../storage`;
    cb(null, parhStorage);
  },
  filename: function (req, file, cb) {
    //shift(): guarda el primer valor vlor
    //pop(): guarda el ultimo valor
    const ext = file.originalname.split(".").pop();
    const name = `file-${Date.now()}.${ext}`;
    cb(null, name);
  },
});
const uploadMiddleware = multer({ storage });
module.exports = uploadMiddleware;
