const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStrorage");
const { createImage, getImage, getImages } = require("../controllers/storage");

router.get("/", getImages);
router.get("/:id", getImage);
router.post("/", uploadMiddleware.single("myfile"), createImage);

module.exports = router;
