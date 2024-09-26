const route = require("express").Router();
const todo = require("../app/controller/todo.controller");
const auth = require("../middleware/auth.middleware");
const todoValidator = require("../app/validator/todo.validator");

/**
 * @openapi
 * /todos:
 *  post:
 *     tags:
 *     - Todos
 *     summary: Create todo
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - description
 *                - id_project
 *              properties:
 *                description:
 *                  type: string
 *                  example: example todo
 *                id_project:
 *                  type: integer
 *                  example: 1
 *     responses:
 *      201:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
route.post("/todos", auth, todo.store);

/**
 * @openapi
 * /todos/{id_project}:
 *  get:
 *     tags:
 *     - Todos
 *     summary: Get todo
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_project
 *         required: true
 *         schema:
 *            type: integer
 *         description: id project
 *     responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: id not found
 *      500:
 *        description: Server Error
 */
route.get("/todos/:id_project", auth, todo.show);

/**
 * @openapi
 * /todos/{id}:
 *  put:
 *     tags:
 *     - Todos
 *     summary: Update todo
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: id todo
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - description
 *              properties:
 *                description:
 *                  type: string
 *                  example: example todo
 *     responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: id not found
 *      500:
 *        description: Server Error
 */
route.put("/todos/:id", auth, todo.update);

/**
 * @openapi
 * /todos/{id}:
 *  delete:
 *     tags:
 *     - Todos
 *     summary: delete todo
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: integer
 *         description: id todo
 *     responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: id not found
 *      500:
 *        description: Server Error
 */
route.delete("/todos/:id", auth, todo.destroy);

module.exports = route;
