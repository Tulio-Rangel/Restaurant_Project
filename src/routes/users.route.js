const express = require("express");
const router = express.Router();

const {
    getAddressesController,
    createAddressController,
    editAddressController,
    deleteAddressController,
    changeStatusAccountController,
    getAccountsStatusController
} = require('../controllers/users.controller');
const adminAuthMiddleware = require('../middlewares/adminAuth.middleware');
const { validateUserId, validateAddressMiddleware } = require('../middlewares/validateIds')

/**
 * @swagger
 * /usuarios/direcciones:
 *  get:
 *      summary: Mostrar las direcciones de un usuario
 *      tags: [Usuarios]
 *      description: Mostrar las direcciones de un usuario              
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Addresses'
 *          401:
 *              $ref: '#/components/responses/Unauthorized'
 */
router.get('/direcciones', getAddressesController)

/**
 * @swagger
 * /usuarios/direcciones:
 *  post:
 *      summary: Crear una nueva dirección
 *      tags: [Usuarios]
 *      description: Crear una nueva dirección
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *                  examples:
 *                      Dirección 1:
 *                          value:
 *                              address: Calle 21D#12C-50
 *                      Dirección 2:
 *                          value:
 *                              address: Calle 121D#23C-20
 *      responses:
 *          201:
 *              description: Creado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Responses"
 *                      example:
 *                              code: 201
 *                              message: Direccion añadida
 *                     
 *          400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Errors"
 *          401:
 *              $ref: '#/components/responses/Unauthorized' 
 */
router.post('/direcciones', createAddressController);

/**
 * @swagger
 *  /usuarios/direcciones/{id}:
 *  put:
 *      summary: Editar una dirección
 *      tags: [Usuarios]
 *      description: Edita una dirección
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: El id de la direccion
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          address:
 *                              type: string
 *                  examples:
 *                      Cambio 1:
 *                          value:
 *                              address: Calle 24#71C-12
 *                      Cambio 2:
 *                          value:
 *                              address: Calle 54#21C-13                     
 *      responses:
 *          200:
 *              description: Editado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Address'
 *          400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Errors"
 *          401:
 *              $ref: '#/components/responses/Unauthorized'
 *          404:
 *              $ref: '#/components/responses/NotFound'
 */
router.put('/direcciones/:id', validateAddressMiddleware, editAddressController);

/**
 * @swagger
 * /usuarios/direcciones/{id}:
 *  delete:
 *      summary: Eliminar una dirección
 *      tags: [Usuarios]
 *      description: Eliminar  una dirección
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: El id del producto                   
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Eliminado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Responses"
 *                      example:
 *                              code: 200
 *                              message: Dirección eliminada
 *          400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Errors"
 *          401:
 *              $ref: '#/components/responses/Unauthorized'
 *          403:
 *              $ref: '#/components/responses/Forbidden'  
 *          404:
 *              $ref: '#/components/responses/NotFound'
 */
router.delete('/direcciones/:id', validateAddressMiddleware, deleteAddressController)

router.use(adminAuthMiddleware);

/**
 * @swagger
 * /usuarios/estadoCuenta:
 *  get:
 *      summary: Mostrar las cuentas y sus estados (ADMIN)
 *      tags: [Usuarios]
 *      description: Mostrar las cuentas y sus estados             
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                              username:
 *                                  type: string
 *                              isActive:
 *                                  type: boolean
 *          401:
 *              $ref: '#/components/responses/Unauthorized'
 */
router.get('/estadoCuenta', getAccountsStatusController)

/**
 * @swagger
 *  /usuarios/estadoCuenta/{id}:
 *  put:
 *      summary: Activar o desactivar una cuenta (ADMIN)
 *      tags: [Usuarios]
 *      description: Activar o desactivar una cuenta
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: El id del usuario
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: boolean
 *                  examples:
 *                      Activar:
 *                          value:
 *                              status: true
 *                      Desactivar:
 *                          value:
 *                              status: false                    
 *      responses:
 *          200:
 *              description: Editado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Responses'
 *                      example:
 *                              code: 200
 *                              message: Se cambio el estado de la cuenta del usuario
 *          400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Errors"
 *          401:
 *              $ref: '#/components/responses/Unauthorized'
 *          404:
 *              $ref: '#/components/responses/NotFound'
 */
router.put('/estadoCuenta/:id', validateUserId, changeStatusAccountController);

/**
 * @swagger
 * components:
 *  schemas:
 *      Address:
 *          type: object
 *          required:
 *              _id
 *              address
 *          properties:
 *              _id:
 *                  type: string
 *              address:
 *                  type: string
 *                     
 *      Addresses:
 *          type: array
 *          items: 
 *              $ref: '#/components/schemas/Address'
 */
module.exports = router;