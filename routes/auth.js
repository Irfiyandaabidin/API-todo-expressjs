const express = require("express");

const router = express.Router();

const AuthController = require("../app/controller/auth.controller");
const AuthValidator = require("../app/validator/auth.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

const csurf = require("csurf");
const csrfProtection = csurf({ cookie: true });

/**
 * @openapi
 * /csrf-token:
 *  get:
 *     tags:
 *     - Auth
 *     summary: Generate CSRF Token
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
router.get('/csrf-token', csrfProtection, AuthMiddleware, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

/**
 * @openapi
 * /login:
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *               type: string
 *               example: irfi@example.com
 *              password:
 *               type: string
 *               example: secret
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/login", AuthValidator.login, AuthController.login);

/**
 * @openapi
 * /register:
 *  post:
 *     tags:
 *     - Auth
 *     summary: Register
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *              - phone_number
 *            properties:
 *              name:
 *               type: string
 *               example: John Doe
 *              email:
 *               type: string
 *               example: admin@example.com
 *              password:
 *               type: string
 *               example: password
 *              phone_number:
 *               type: string
 *               example: 08888888899
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/register", AuthValidator.register, AuthController.register);

module.exports = router;
