const { check } = require("express-validator/check");
const { validateResults } = require("../utils/handleValidator");

const registerUserValidator = [
  check("name").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
  check("age").exists().notEmpty().isNumeric({ min: 18, max: 100 }),
  check("password").exists().notEmpty().isLength({ min: 3, max: 30 }),
  check("role").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const loginValidator = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 30 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
module.exports = {
  registerUserValidator,
  loginValidator,
};
