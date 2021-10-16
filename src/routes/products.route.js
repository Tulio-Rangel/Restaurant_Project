const express = require("express");
const router = express.Router();

const {
    getProductsController,
    createProductController,
    editProductController,
    deleteProductController
} = require('../controllers/products.controller');
const cacheRedis = require('../middlewares/cache')
const adminAuthMiddleware = require("../middlewares/adminAuth.middleware");
const { validateProductMiddleware } = require('../middlewares/validateIds');
const { validateProductPost } = require("../middlewares/validatePosts");


/**
 * @swagger
 * /productos:
 *  get:
 *      summary: Mostrar los productos
 *      tags: [Productos]
 *      description: Mostrar los productos disponibles                
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Products'
 *          401:
 *              $ref: '#/components/responses/Unauthorized'
 */
router.get("/", cacheRedis, getProductsController);

router.use(adminAuthMiddleware);

/**
 * @swagger
 * /productos:
 *  post:
 *      summary: Crear un nuevo producto (ADMIN)
 *      tags: [Productos]
 *      description: Crea un producto
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *                  examples:
 *                      Producto 1:
 *                          value:
 *                              name: Pizza
 *                              price: 200
 *                      Producto 2:
 *                          value:
 *                              name: Jugo naturales
 *                              price: 60
 *      responses:
 *          201:
 *              description: Creado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Responses"
 *                      example:
 *                              code: 201
 *                              message: Producto añadido
 *                     
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
router.post("/", validateProductPost, createProductController);

/**
 * @swagger
 * /productos/{id}:
 *  put:
 *      summary: Editar un producto (ADMIN)
 *      tags: [Productos]
 *      description: Edita un producto
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: El id del producto
 *              schema:
 *                  type: string
 *              examples:
 *                  Cambio 1:
 *                      value:
 *                          612447608cf6e61eb44299c5
 *                  Cambio 2:
 *                      value:
 *                          612447608cf6e61eb44299c9
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *                  examples:
 *                      Cambio 1:
 *                          value:
 *                              name: Bagel de Salmón
 *                              price: 600
 *                      Cambio 2:
 *                          value:
 *                              name: Focaccia Grande
 *                              price: 300                      
 *      responses:
 *          200:
 *              description: Editado
 *              content:
 *                  application/json:
 *                      schema:
 *                          allOf: 
 *                              - $ref: '#/components/schemas/Product'
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
router.put("/:id", validateProductPost, validateProductMiddleware, editProductController);

/**
 * @swagger
 * /productos/{id}:
 *  delete:
 *      summary: Eliminar un producto (ADMIN)
 *      tags: [Productos]
 *      description: Eliminar un producto
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: El id del producto                   
 *              schema:
 *                  type: string
 *              examples:
 *                  Eliminar producto 1:
 *                      value:
 *                          612447608cf6e61eb44299c5
 *      responses:
 *          200:
 *              description: Eliminado
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Responses"
 *                      example:
 *                              code: 200
 *                              message: Producto eliminado
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
router.delete("/:id", validateProductMiddleware, deleteProductController)

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          required:
 *              name
 *              price
 *          properties:
 *              name:
 *                  type: string
 *              price:
 *                  type: number
 *                     
 *      Products:
 *          type: array
 *          items: 
 *              allOf: 
 *              - type: object
 *                properties:
 *                  _id:
 *                      type: string
 *                  __v:
 *                      type: integer
 *              - $ref: '#/components/schemas/Product'
 */
module.exports = router;