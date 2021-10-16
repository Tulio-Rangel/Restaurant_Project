const express = require('express');
const router = express.Router();

const {
    getUserOrdersController,
    createOrderController,
    editOrderController,
    deleteProductOrderController,
    confirmOrderController,
    getTotalOrdersController,
    editStatusOrderController
} = require('../controllers/orders.controller');
const {
    validateOpenOrder,
    validateOrderToConfirm,
    validateIsConfirmOrder,
    validateOrderMiddleware,
    validatePaymentMiddleware,
    validateAddressMiddleware
} = require('../middlewares/validateIds');
const adminAuthMiddleware = require('../middlewares/adminAuth.middleware');
const validateOrderProducts = require('../middlewares/validateOrderProducts.middleware');
const { validateOrderPost, validateOrderEditPost } = require('../middlewares/validatePosts')

/**
 * @swagger
 * /pedidos/historialPedidos:
 *  get:
 *      summary: Mostrar los pedidos (CLIENT)
 *      tags: [Pedidos]
 *      description: Mostrar los pedidos del usuario             
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Orders'
 *          400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Errors"
 *          401:
 *              $ref: '#/components/responses/Unauthorized'
 */
router.get('/historialPedidos', getUserOrdersController);

/**
 * @swagger
 * /pedidos/crearPedido:
 *  post:
 *      summary: Crear un nuevo pedido 
 *      tags: [Pedidos]
 *      description: Crea un nuevo pedido
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductsInfo'
 *                  examples:
 *                      Pedido 1:
 *                          value:
 *                              {
 *                                  addressId: 61315d605c5e18183491a5a4,
 *                                  paymentMethodId: 612447618cf6e61eb44299d0,
 *                                  products: 
 *                                  [
 *                                      {
 *                                          id: 612447608cf6e61eb44299c5,
 *                                          quantity: 2
 *                                      },
 *                                      {
 *                                          id: 612447608cf6e61eb44299c6,
 *                                          quantity: 1
 *                                      }
 *                                  ]
 *                              }
 *                      Pedido 2:
 *                          value:
 *                              {
 *                                  addressId: 61315d605c5e18183491a5a4,
 *                                  paymentMethodId: 612447618cf6e61eb44299d1,
 *                                  products: 
 *                                  [
 *                                      {
 *                                          id: 612447608cf6e61eb44299c8,
 *                                          quantity: 4
 *                                      },
 *                                      {
 *                                          id: 612447608cf6e61eb44299c7,
 *                                          quantity: 2
 *                                      },
 *                                      {
 *                                          id: 612447608cf6e61eb44299c9,
 *                                          quantity: 1
 *                                      }
 *                                  ]
 *                              }
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
 *                              message: Orden Creada
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
router.post('/crearPedido', validateOpenOrder, validateAddressMiddleware, validateOrderPost, validatePaymentMiddleware, validateOrderProducts, createOrderController);

/**
 * @swagger
 * /pedidos/editarPedido:
 *  put:
 *      summary: Editar la orden
 *      tags: [Pedidos]
 *      description: Se puede editar la direccion, la cantidad de productos o añadir nuevos productos y se puede seleccionar el medio de pago
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductsInfo'
 *                  examples:
 *                      Edicion de pedido 1:
 *                          value:
 *                              {
 *                                  addressId: 613160245c5e18183491a5bd,
 *                                  products: 
 *                                  [
 *                                      {
 *                                          id: 612447608cf6e61eb44299c5,
 *                                          quantity: 3
 *                                      },
 *                                      {
 *                                          id: 612447608cf6e61eb44299c6,
 *                                          quantity: 1
 *                                      },
 *                                      {
 *                                          id: 612447608cf6e61eb44299c8,
 *                                          quantity: 1
 *                                      }
 *                                  ]
 *                              }
 *                      Edicion de pedido 2:
 *                          value:
 *                              {
 *                                  addressId: 61315d605c5e18183491a5a4,
 *                                  paymentMethodId: 612447618cf6e61eb44299d1,
 *                                  products: 
 *                                  [
 *                                      {
 *                                          id: 612447608cf6e61eb44299c6,
 *                                          quantity: 2
 *                                      },
 *                                      {
 *                                          id: 612447608cf6e61eb44299c7,
 *                                          quantity: 1
 *                                      },
 *                                      {
 *                                          id: 612447608cf6e61eb44299c5,
 *                                          quantity: 2
 *                                      }
 *                                  ]
 *                              }
 *                      Cambiar a Paypal:
 *                          value:
 *                              paymentMethodId: 612447618cf6e61eb44299d1
 *                      Cambiar a Efectivo:
 *                          value:
 *                              paymentMethodId: 612447618cf6e61eb44299d0
 *      responses:
 *          200:
 *              description: Pedido editado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Order'
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
router.put('/editarPedido', validateOrderToConfirm, validateAddressMiddleware, validateOrderEditPost, validatePaymentMiddleware, validateOrderProducts, editOrderController);

/**
 * @swagger
 * /pedidos/eliminarProductosPedido:
 *  delete:
 *      summary: Eliminar productos del pedido
 *      tags: [Pedidos]
 *      description: Eliminar productos del pedido
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          products:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                  examples:
 *                      Eliminar productos 1:
 *                          value:
 *                              {
 *                                  products: [
 *                                      {id: 612447608cf6e61eb44299c6},
 *                                      {id: 612447608cf6e61eb44299c7}
 *                                  ]
 *                              }
 *                      Eliminar productos 2:
 *                          value:
 *                              {
 *                                  products: [
 *                                      {id: 612447608cf6e61eb44299c5},
 *                                      {id: 612447608cf6e61eb44299c6}
 *                                  ]
 *                              }
 *      responses:
 *          200:
 *              description: Pedido editado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Order'
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
router.delete('/eliminarProductosPedido', validateOrderToConfirm, deleteProductOrderController);

/**
 * @swagger
 * /pedidos/confirmacion:
 *  put:
 *      summary: Confirmar el estado del pedido abierto
 *      tags: [Pedidos]
 *      description: Confirmar el estado del pedido abierto
 *      responses:
 *          200:
 *              description: Pedido confirmado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Responses"
 *                      example:
 *                              code: 200
 *                              message: Pedido confirmado 
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
router.put('/confirmacion', validateOrderToConfirm, confirmOrderController);

router.use(adminAuthMiddleware);

/**
 * @swagger
 * /pedidos/totalPedidos:
 *  get:
 *      summary: Mostrar los pedidos (ADMIN)
 *      tags: [Pedidos]
 *      description: Mostrar todos los pedidos creados             
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Orders'
 *          401:
 *              $ref: '#/components/responses/Unauthorized'
 *          400:
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Errors"
 *          403:
 *              $ref: '#/components/responses/Forbidden'  
 * 
 */
router.get('/totalPedidos', getTotalOrdersController);

/**
 * @swagger
 * /pedidos/{id}:
 *  put:
 *      summary: Editar el estado de un pedido (ADMIN)
 *      tags: [Pedidos]
 *      description: Edita el estado de un pedido
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: El id del pedido
 *              schema:
 *                  type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          status
 *                      properties:
 *                          status:
 *                              type: string
 *                  examples:
 *                      En preparación:
 *                          value:
 *                              status: En preparación
 *                      Enviado:
 *                          value:
 *                              status: Enviado
 *                      Entregado:
 *                          value:
 *                              status: Entregado
 *                                       
 *      responses:
 *          200:
 *              description: Editado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Responses"
 *                      example:
 *                              code: 200
 *                              message: Estado actualizado 
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
router.put('/:id', validateOrderMiddleware, validateIsConfirmOrder, editStatusOrderController);

/**
 * @swagger
 * components:
 *  schemas:
 *      Order:
 *          type: object
 *          required:
 *              status
 *              products
 *              address
 *              paymentMethod
 *              total
 *              userData
 *              fullName
 *              userPhone
 *              id
 *          properties:
 *              status:
 *                  type: string
 *              products:
 *                  type: array
 *                  items:
 *                      allOf:
 *                          - $ref: '#/components/schemas/Product'
 *                          - type: object
 *                            properties:
 *                              _id:
 *                                  type: string
 *                              quantity:
 *                                  type: integer
 *                              total:
 *                                  type: number
 *              address:
 *                  type: string
 *              paymentMethod:
 *                  type: string
 *              total:
 *                  type: number
 *              userData:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string                  
 *                      fullName:
 *                          type: string                  
 *                      phone:
 *                          type: integer                  
 *              _id:
 *                  type: string    
 *      Orders:
 *          type: array
 *          items:
 *              $ref: '#/components/schemas/Order'   
 *      ProductsInfo:
 *          type: object
 *          required:
 *              products
 *          properties:
 *              products:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                          quantity:
 *                              type: integer  
 *      EditOrder:
 *          type: object
 *          properties:
 *              paymentMethodId:
 *                  type: integer
 *              addressId:
 *                  type: string
 *              products:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                          quantity:
 *                              type: integer  
 */
module.exports = router;
