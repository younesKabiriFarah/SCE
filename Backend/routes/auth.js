const express = require("express");
const router = express.Router();
const { login, register, getUser } = require("../controllers/auth");
const { registerUserValidator, loginValidator } = require("../validators/auth");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
