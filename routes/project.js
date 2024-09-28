const router = require("express").Router();

const projectController = require("../app/controller/project.controller");
const AuthMiddleware = require("../middleware/auth.middleware");
const projectValidator = require("../app/validator/project.validator");

/**
 * @openapi
 * /project:
 *  post:
 *     tags:
 *     - Project
 *     summary: Create project
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *                  example: example project
 *     responses:
 *      201:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
 router.post("/project", AuthMiddleware, projectValidator.store, projectController.store);

/**
 * @openapi
 * /project:
 *  get:
 *     tags:
 *     - Project
 *     summary: Get all project user
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - in:  query
 *         name: page
 *         schema:
 *            type: string
 *         description: filter page project
 *       - in:  query
 *         name: pageSize
 *         schema:
 *            type: string
 *         description: filter page size project
 *       - in:  query
 *         name: search
 *         schema:
 *            type: string
 *         description: search project in todo or name project
 *       - in:  query
 *         name: name
 *         schema:
 *            type: string
 *            enum: [asc, desc]
 *         description: sort project name ascending or descending
 *       - in:  query
 *         name: complete
 *         schema:
 *            type: string
 *            enum: [true, false]
 *         description: search project complete or not complete
 *     responses:
 *      200:
 *        description: Success
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
router.get("/project", AuthMiddleware, projectController.index);

/**
 * @openapi
 * /project/{id}:
 *  get:
 *     tags:
 *     - Project
 *     summary: Get project
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: string
 *            format: uuid
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
router.get("/project/:id", AuthMiddleware, projectController.show);

/**
 * @openapi
 * /project/{id}:
 *  delete:
 *     tags:
 *     - Project
 *     summary: delete project
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: string
 *            format: uuid
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
router.delete("/project/:id", AuthMiddleware, projectController.destroy);

/**
 * @openapi
 * /project/{id}:
 *  put:
 *     tags:
 *     - Project
 *     summary: Update project
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *            type: string
 *            format: uuid
 *         description: id project
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *                  example: example project
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
router.put("/project/:id", AuthMiddleware, projectController.update);

module.exports = router;
