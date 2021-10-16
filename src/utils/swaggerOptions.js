const config = require('../config');
const PORT = config.PORT || 3000;
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "DELILAH API",
            description: "API para el restaurante DELILAH",
            version: "0.3.0"
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: "Local server"
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            responses: {
                NotFound: {
                    description: "El recurso especificado no se encuentra",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/Errors'
                            }
                        }
                    }
                },
                Unauthorized: {
                    description: "No esta autorizado",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/Errors'
                            }
                        }
                    }
                },
                Forbidden: {
                    description: "No tiene los permisos para realizar esta acción",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/Errors'
                            }
                        }
                    }
                }

            },
            schemas: {
                "Responses": {
                    type: "object",
                    required: [
                        "code",
                        "message"
                    ],
                    properties: {
                        "code": {
                            type: "integer"
                        },
                        "message": {
                            type: "string"
                        },
                    }
                },
                "Errors": {
                    type: "object",
                    required: [
                        "code",
                        "message"
                    ],
                    properties: {
                        "code": {
                            type: "integer"
                        },
                        "message": {
                            type: "string"
                        },
                    }
                }
            }
        },
        tags: [
            {
                name: "Ingreso y Registro",
                description: "Sección de ingreso y registro de usuarios"
            },
            {
                name: "Usuarios",
                description: "Sección de usuarios"
            },
            {
                name: "Productos",
                description: "Sección de productos"
            },
            {
                name: "Metodos de pago",
                description: "Sección de metodos de pago"
            },
            {
                name: "Pedidos",
                description: "Sección de pedidos"
            }
        ],
        security: [
            {
                bearerAuth: []
            }
        ],

    },
    apis: ["./src/routes/*.js"]
}

module.exports = swaggerOptions;