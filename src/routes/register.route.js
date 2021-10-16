const express = require("express");
const router = express.Router();

const { registerController } = require('../controllers/users.controller')
const { validateRegisterPost } = require("../middlewares/validatePosts");
const validateUserDataMiddleware = require("../middlewares/validateUserData.middleware");

/**
 * @swagger
 * /register:
 *  post:
 *      security: []
 *      summary: Crear un nuevo usuario
 *      tags: [Ingreso y Registro]
 *      description: Crea un usuario
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *                  examples:
 *                      Prueba 1:
 *                          value:    
 *                              username: test
 *                              fullName: test 1
 *                              email: test@test.com
 *                              phone: 1234567
 *                              address: test abc
 *                              password: 1234ABC
 *                      Prueba 2:
 *                          value:    
 *                              username: test2
 *                              fullName: test 2
 *                              email: test2@test.com
 *                              phone: 1234567
 *                              address: test abc
 *                              password: 1234ABC
 *                      
 *      responses:
 *          201:
 *              description: Creado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Responses"
 *                      example:
 *                              code: 201
 *                              message: Usuario registrado
 *          400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Errors"
 */
router.post('/', validateRegisterPost, validateUserDataMiddleware, registerController);

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              username
 *              fullName
 *              email
 *              phone
 *              address
 *              password
 *          properties:
 *              username:
 *                  type: string
 *              fullName:
 *                  type: string
 *              email:
 *                  type: string
 *              phone:
 *                  type: integer
 *              address:
 *                  type: string
 *              password:
 *                  type: string
 *                  format: password
*/
module.exports = router;