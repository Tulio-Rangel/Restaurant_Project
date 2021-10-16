const express = require("express");
const router = express.Router();

const {
    getPaymentMethodsController,
    createPaymentMethodController,
    editPaymentMethodController,
    deletePaymentMethodController
} = require('../controllers/paymentMethods.controller');
const { validatePaymentMiddleware } = require('../middlewares/validateIds');
const { validatePaymentPost } = require("../middlewares/validatePosts");
const adminAuthMiddleware = require("../middlewares/adminAuth.middleware");



/**
 * @swagger
 * /metodosDePago:
 *  get:
 *      summary: Mostrar los metodos de pago
 *      tags: [Metodos de pago]
 *      description: Mostrar los metodos de pago disponibles                
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Payments'
 *          401:
 *              $ref: '#/components/responses/Unauthorized'
 *          403:
 *              $ref: '#/components/responses/Forbidden' 
 */
router.get('/', getPaymentMethodsController);

router.use(adminAuthMiddleware);

/**
 * @swagger
 * /metodosDePago:
 *  post:
 *      summary: Crea un nuevo metodo de pago (ADMIN)
 *      tags: [Metodos de pago]
 *      description: Crea un nuevo metodo de pago
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Payment'
 *                  examples:
 *                      Tarjeta credito:
 *                          value:
 *                              name: Tarjeta credito
 *                      Tarjeta debito:
 *                          value:
 *                              name: Tarjeta debito
 *      responses:
 *          201:
 *              description: Creado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Responses"
 *                      example:
 *                              code: 201
 *                              message: Metodo añadido
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
 */
router.post('/', validatePaymentPost, createPaymentMethodController);


/**
 * @swagger
 * /metodosDePago/{id}:
 *  put:
 *      summary: Editar un metodo de pago (ADMIN)
 *      tags: [Metodos de pago]
 *      description: Edita un metodo de pago
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: El id del metodo de pago
 *              schema:
 *                  type: string
 *              example:
 *                  612447618cf6e61eb44299d1
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Payment'
 *                  example:
 *                      name: Cripto
 *                      
 *      responses:
 *          200:
 *              description: Editado
 *              content:
 *                  application/json:
 *                      schema:
 *                          allOf: 
 *                              - $ref: '#/components/schemas/Payment'
 *                              - type: object
 *                                properties:
 *                                  _id:
 *                                      type: string
 *                                  __v:
 *                                      type: integer
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
router.put('/:id', validatePaymentPost, validatePaymentMiddleware, editPaymentMethodController);

/**
 * @swagger
 * /metodosDePago/{id}:
 *  delete:
 *      summary: Eliminar un metodo de pago (ADMIN)
 *      tags: [Metodos de pago]
 *      description: Eliminar un metodo de pago
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: El id del metodo de pago                
 *              schema:
 *                  type: string
 *              examples:
 *                  Eliminar metodo 1:
 *                      value: 612447618cf6e61eb44299d0                 
 *                  Eliminar metodo 2:
 *                      value: 612447618cf6e61eb44299d1                
 *      responses:
 *          200:
 *              description: Eliminado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Responses"
 *                      example:
 *                              code: 200
 *                              message: Metodo de pago eliminado
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
router.delete('/:id', validatePaymentMiddleware, deletePaymentMethodController);

/**
 * @swagger
 * components:
 *  schemas:
 *      Payment:
 *          type: object
 *          required:
 *              name
 *          properties:
 *              name:
 *                  type: string
 *      Payments:
 *          type: array
 *          items: 
 *              allOf: 
 *              - type: object
 *                properties:
 *                  _id:
 *                      type: string
 *                  __v:
 *                      type: integer
 *              - $ref: '#/components/schemas/Payment'
 */
module.exports = router;