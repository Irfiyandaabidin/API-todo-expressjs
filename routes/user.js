const express = require("express");

const router = express.Router();

const UserController = require("../app/controller/user.controller");
const UserValidator = require("../app/validator/user.validator");
const AuthMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/image.middleware");

/**
 * @openapi
 * /user/profile:
 *  get:
 *     tags:
 *     - User
 *     summary: Get profile user
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/user/profile", AuthMiddleware, UserController.profile);

/**
 * @openapi
 * /user:
 *  get:
 *     tags:
 *     - User
 *     summary: Get all user
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *            type: string
 *         description: search user with email or name
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/user", AuthMiddleware, UserController.index);

/**
 * @openapi
 * /user:
 *  post:
 *     tags:
 *     - User
 *     summary: Add User
 *     security:
 *	     - bearerAuth: []
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
 *            properties:
 *              name:
 *               type: string
 *              email:
 *               type: string
 *              password:
 *               type: string
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/user", AuthMiddleware, UserValidator.store, UserController.store);

/**
 * @openapi
 * /user/{id}:
 *  get:
 *     tags:
 *     - User
 *     summary: Get user
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the user
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/user/:id", AuthMiddleware, UserController.show);

/**
 * @openapi
 * /user/{id}:
 *  put:
 *     tags:
 *     - User
 *     summary: Update User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the user
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              profile:
 *                type: string
 *                format: binary
 *                description: The profile image file
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.put("/user/:id", AuthMiddleware, upload.single("profile"), UserValidator.update, UserController.update);

/**
 * @openapi
 * /user/{id}:
 *  delete:
 *     tags:
 *     - User
 *     summary: Delete user
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the user
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/user/:id", AuthMiddleware, UserController.destroy);

module.exports = router;
