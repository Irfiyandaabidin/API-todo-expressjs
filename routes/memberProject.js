const route = require("express").Router();
const member = require("../app/controller/member.controller");
const auth = require("../middleware/auth.middleware");

/**
 * @openapi
 * /member:
 *  post:
 *     tags:
 *     - Member Project
 *     summary: Invite user to project
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id_project
 *              - email
 *            properties:
 *              id_project:
 *               type: string
 *               format: uuid
 *               example: 5d21f264-3985-4e4c-b44e-a7d38af0014f
 *              email:
 *               type: string
 *               example: admin@example.test
 *     responses:
 *      201:
 *        description: Success
 *      403:
 *        description: User Can Not Access
 *      404:
 *        description: Not Found
 *      409:
 *        description: User is member
 *      500:
 *        description: Server Error
 */
route.post("/member", auth, member.store);

/**
 * @openapi
 * /member/{id_project}:
 *  get:
 *     tags:
 *     - Member Project
 *     summary: Get all member project
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - in:  path
 *         name: id_project
 *         required: true
 *         schema:
 *            type: string
 *            format: uuid
 *         description: id project
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
route.get("/member/:id_project", auth, member.show);

/**
 * @openapi
 * /member/{id_project}:
 *  delete:
 *     tags:
 *     - Member Project
 *     summary: leave project
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_project
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
route.delete("/member/:id_project", auth, member.destroy);

module.exports = route;
