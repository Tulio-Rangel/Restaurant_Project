require('dotenv').config();
require('./db');

const express = require('express');
const helmet = require('helmet');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const config = require('./config');
const swaggerOptions = require('./utils/swaggerOptions');
const registerRoute = require('./routes/register.route');
const loginRoute = require('./routes/login.route');
const usersRoute = require('./routes/users.route');
const productsRoute = require('./routes/products.route');
const ordersRoute = require('./routes/orders.route');
const paymentMethod = require('./routes/paymentMethod.route');
const { validateTokenMiddleware, errorMiddleware } = require('./middlewares/validateToken.middleware');
const activeUserMiddleware = require('./middlewares/activeUser.middleware');

const app = express();
app.use(helmet());
app.use(express.json());
const PORT = config.PORT || 3000;

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
app.use(validateTokenMiddleware);
app.use(errorMiddleware);
app.use('/register', registerRoute);
app.use('/login', loginRoute);

app.use(activeUserMiddleware);
app.use('/usuarios', usersRoute);
app.use('/productos', productsRoute);
app.use('/pedidos', ordersRoute);
app.use('/metodosDePago', paymentMethod);


app.listen(PORT, () => {
    console.log("Escuchando puerto: " + PORT);
})

module.exports = app;