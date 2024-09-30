const { check, validationResult } = require("express-validator");

const login = [
  check("email").not().isEmpty().withMessage("email can not be empty!"),

  check("password").not().isEmpty().withMessage("password can not be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

const register = [
  check("name").not().isEmpty().withMessage("name can not be empty!"),

  check("email").not().isEmpty().withMessage("email can not be empty!"),

  check("email").isEmail().withMessage("format email is not valid!"),

  check("phone_number").not().isEmpty().withMessage("phone_number can not be empty!"),

  check("phone_number").isLength({ min: 10, max: 14 }).withMessage("phone_number min 10 and max 14 character"),

  check("password").not().isEmpty().withMessage("password can not be empty!"),

  check("password").isLength({ min: 6 }).withMessage("password min 6 character"),

  check("confirm_password").not().isEmpty().withMessage("confirm_password can not be empty!")
    .custom((value, { req }) => {
      if(value !== req.body.password) {
        throw new Error("confirm_password does not match password");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

module.exports = {
  login,
  register,
};
