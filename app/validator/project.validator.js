const { check, validationResult } = require("express-validator");

const store = [
  check("name").not().isEmpty().withMessage("name can not be empty!"),

  check("name").isString().withMessage("name must be string!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if(!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  }
]


module.exports = {
  store
}
