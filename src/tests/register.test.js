const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const User = require('../models/user.model')
chai.should();
chai.use(chaiHttp);

describe('Test para registro de usuario', () => {
    it('POST /register exitoso', (done) => {
        const newUser = {
            username: "TestMocha",
            fullName: "Test de Mocha",
            email: "testMocha@mocha.com",
            phone: 3001239876,
            address: "Direccion prueba",
            password: "prueba123",
        }
        chai.request(app)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('POST /register falla por email', (done) => {
        const newUser = {
            username: "TestMocha",
            fullName: "Test de Mocha",
            email: "testMocha",
            phone: 3001239876,
            address: "Direccion prueba",
            password: "prueba123",
        }
        chai.request(app)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    it('POST /register usuario ya existe', (done) => {
        const newUser = {
            username: "admin",
            fullName: "Test de Mocha",
            email: "admin@admin.com",
            phone: 3001239876,
            address: "Direccion prueba",
            password: "prueba123",
        }
        chai.request(app)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
    after(async () => {
        await User.deleteOne({ email: 'testMocha@mocha.com' });
    });
});