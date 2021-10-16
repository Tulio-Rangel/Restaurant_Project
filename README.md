# API Deliah Resto

Esta es la API con el cual el Restaurante DALIAH RESTO, podrá manejar los pedidos, productos y usuarios de su restaurante, teniendo un aplicación con datos persistente con la ayuda de tecnologías como NodeJs y MongoDB

## Recursos

- Node.js
- Express.js
- MongoDB
- Redis
- JWT
- Swagger
- MomentJs
- Bcrypt
- Helmet
- Joi
- Dotenv

## Información Antes de Empezar

#### Se debe tener instalado en el computador lo siguiente:

- MongoDB

- Redis

- NodeJs

#### Atención
El archivo **.env** que se encuentra en el paquete enviado debe ser colocado en la raiz del proyecto para el correcto funcionamiento de la aplicación.

Los puertos por defecto usados en el proyecto y que se encuentran en el **.env** son los siguientes, si se tienen otras configuraciones por favor cambiar los datos dentro del archivo **.env**:

- MongoDB: 27017

- Redis: 6379  



## Instalación

#### 1. Clonar el proyecto
```
git clone https://gitlab.com/jaiportela/api-delilah.git
```
#### 2. Instalar las dependencias
```
npm install
```
#### 3. Correr el servidor
```
npm run start
```
o
```
npm run dev
```
#### 4. Correr el test de registro de usuarios
```
npm test
```
## Documentación

La documentación puede ser accedida desde: [Documentación](http://localhost:3000/api-docs)

## A tener en cuenta

La base de datos se llena con unos datos semilla, en donde se llenan los productos, los usuarios por defecto y los metodos de pago.

Los ejemplos en las ordenes se pueden usar para el usuario cliente, para otras pruebas con otros usuarios, los ids de las direcciones se deben de cambiar.

El test se encuentra en la carpeta tests dentro de src.

En la sección métodos de pago, el endpoint **get Métodos de Pago** se encuentra abierto tanto para clientes como para los administradores, ya que estos dos son los que deben de tener la posibilidad de ver los métodos pago, no solo los administradores. 

## Credenciales

|username|token|
|-|-|
|admin| eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjMwNjk5ODY2fQ.oPeebf-K49hCgyds5R0KsJMIxGtPV0tBgWL664SP8ok|
|client|eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNsaWVudCIsImlhdCI6MTYzMDcwMDA3NH0.gbyVnQWlLkIXrv11eQ0eov67gQ6pVTLn9Zd-h_nELV0|

**\* Autorizarse en Swagger con token**
