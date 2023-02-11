const { check } = require('express-validator/check');

const { validateResults } = require('../utils/handleValidator')

const validatorCreatProduct = [
    check("name").exists().notEmpty(),
    check("category").exists().notEmpty(),
    check("city").exists().notEmpty(),
    check("description").exists().notEmpty(),
    check("image").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)  
    }
];

module.exports = {
    validatorCreatProduct
};