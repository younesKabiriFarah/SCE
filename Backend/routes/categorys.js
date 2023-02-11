const express = require("express");
const router = express.Router();
const { getCategorys, getCitys } = require("../controllers/categorys");

router.get("/", getCategorys);
router.get("/citys", getCitys);

module.exports = router;
