const { check, validationResult } = require("express-validator");

const store = [
  check("description").not().isEmpty().withMessage("description can not be empty!"),
  check("description").isString().withMessage("description must be string!"),

  check("id_project").not().isEmpty().withMessage("id_project can not be empty!"),
  check("id_project").isInt().withMessage("id_project must be integer!"),
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

const update = [
  check("description").optional().isString().withMessage("description must be string!"),
  check("description").notEmpty().withMessage(" string!"),

  check("is_completed").optional().isBoolean().withMessage("is_completed must be boolean!"),

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
  store,
  update
}
