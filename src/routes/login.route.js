const express = require('express');
const router = express.Router();

const { validateLoginPost } = require('../middlewares/validatePosts')
const validateUserMiddleware = require('../middlewares/validateUser.middleware');
const { loginController } = require('../controllers/users.controller');

/**
 * @swagger
 * /login:
 *  post:
 *      security: []
 *      summary: Ingreso de usuario
 *      tags: [Ingreso y Registro]
 *      description: Valida si el usuario existe en los registros
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserLogin'
 *                  examples:
 *                      Admin:
 *                          value:
 *                              username: admin
 *                              password: 1234ABC
 *                      Client:
 *                          value:
 *                              username: client
 *                              password: 1234ABC 
 *                      Test1:
 *                          value:
 *                              username: test
 *                              password: 1234ABC                  
 *      responses:
 *          200:
 *              description: Usuario existe
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *          400:
 *              description: No se proporcionaron las credenciales
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Errors"
 *          404:
 *              $ref: '#/components/responses/NotFound'
 */
router.post('/', validateLoginPost, validateUserMiddleware, loginController);

/**
 * @swagger
 * components:
 *  schemas:
 *      UserLogin:
 *          type: object
 *          required:
 *              username
 *              password
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *                  format: password
*/
module.exports = router;