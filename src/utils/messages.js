const table = [
    {
        code: 400,
        messages: [
            {
                id: 1,
                message: "No hay pedido abierto"
            },
            {
                id: 2,
                message: "Ya hay un pedido abierto"
            },
            {
                id: 3,
                message: "El pedido no esta confirmado todavia"
            },
            {
                id: 4,
                message: "Id invalido"
            },
            {
                id: 5,
                message: "El correo ya se encuentra en los registros"
            },
            {
                id: 6,
                message: "El usuario ya se encuentra en los registros"
            },
        ]
    },
    {
        code: 401,
        messages: [
            {
                id: 1,
                message: "Credenciales incorrectas"
            },
        ]
    },
    {
        code: 403,
        messages: [
            {
                id: 1,
                message: "No esta autorizado para hacer esta acción"
            },
        ]
    },
    {
        code: 404,
        messages: [
            {
                id: 1,
                message: "Usuario no encontrado"
            },
            {
                id: 2,
                message: "Producto no encontrado"
            },
            {
                id: 3,
                message: "Metodo de pago no encontrado"
            },
            {
                id: 4,
                message: "Pedido no encontrado"
            },
            {
                id: 5,
                message: "Dirección no encontrada"
            }
        ]
    },
    {
        code: 500,
        messages: [
            {
                id: 1,
                message: "Internal Server Error"
            },
        ]
    },
];

const getDefaultResponse = (res, code, id) => {
    const message = (table.find(e => e.code === code))
        .messages
        .find(e => e.id === id)
        .message
    res.status(code).json({ code, message });
}

const getDynamicResponse = (res, code, message) => {
    res.status(code).json({ code, message });
}

module.exports = { getDefaultResponse, getDynamicResponse }