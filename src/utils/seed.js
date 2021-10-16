const User = require("../models/user.model");
const PaymentMethod = require("../models/paymentMethod.model")
const Product = require("../models/product.model");

const _createUsers = async () => {
    const newAdmin = new User({
        _id: "612447608cf6e61eb44299c1",
        username: "admin",
        fullName: "admin",
        email: "admin@admin.com",
        phone: 1234567,
        password: "$2b$10$0i/bNgS3Y6ZFuoS4ZDynLuIcK1QSpfEEkVWzkvn6mKS/5U1rR5Ot6",
        isAdmin: true,
    });
    const newUser = new User(
        {
            _id: "6126535d32017640703861dd",
            username: "client",
            fullName: "client",
            email: "client@client.com",
            phone: 7654321,
            password: "$2b$10$0i/bNgS3Y6ZFuoS4ZDynLuIcK1QSpfEEkVWzkvn6mKS/5U1rR5Ot6",
            isAdmin: false,
        },
    );
    newUser.addresses.push({
        _id: "61315d605c5e18183491a5a4",
        address: "Direccion prueba User"
    });
    newUser.addresses.push({
        _id: "613160245c5e18183491a5bd",
        address: "Calle 21D#12C-50"
    });
    newAdmin.addresses.push({
        _id: "61315d605c5e18183491a5a4",
        address: "Direccion prueba"
    });
    await newAdmin.save();
    await newUser.save();
}

const _createProducts = async () => {
    const products = [
        {
            _id: "612447608cf6e61eb44299c5",
            name: 'Bagel de Salmón',
            price: 425,
        },
        {
            _id: "612447608cf6e61eb44299c6",
            name: 'Hamburguesa clásica',
            price: 350,
        },
        {
            _id: "612447608cf6e61eb44299c7",
            name: 'Sándwiche veggie',
            price: 310,
        },
        {
            _id: "612447608cf6e61eb44299c8",
            name: 'Ensalada veggie',
            price: 340,
        },
        {
            _id: "612447608cf6e61eb44299c9",
            name: 'Focaccia',
            price: 300,
        }
    ];
    await Product.create(products);
}

const _createPayments = async () => {
    const payments = [
        {
            _id: "612447618cf6e61eb44299d0",
            name: "Efectivo",
        },
        {
            _id: "612447618cf6e61eb44299d1",
            name: "Paypal",
        }
    ];
    await PaymentMethod.create(payments);
}

module.exports = async () => {
    const validateUsers = await User.exists({});
    if (!validateUsers) await _createUsers();
    const validateProducts = await Product.exists({});
    if (!validateProducts) await _createProducts();
    const validatePayments = await PaymentMethod.exists({});
    if (!validatePayments) await _createPayments();
}
