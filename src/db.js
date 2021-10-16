const mongoose = require('mongoose');
const config = require('./config');
const seed = require('./utils/seed');


(async function () {
    await mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Conectado a la base de datos");
    await seed();
})()