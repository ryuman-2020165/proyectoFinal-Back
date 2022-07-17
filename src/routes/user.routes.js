'use strict'

const express = require('express');
const userController = require('../controllers/user.controller');
const api = express.Router();
const mdAuth = require('../services/authenticated'); 

const connectMultiparty = require('connect-multiparty');
const upload = connectMultiparty({ uploadDir: './uploads/users' });

//FUNCIÓN PÚBLICA
api.get('/pruebaUser', userController.prueba);
//FUNCIONES PRIVADAS
//CLIENT
api.post('/register', userController.register);
api.post('/login', userController.login);
api.put('/update/:id', mdAuth.ensureAuth, userController.update);
api.delete('/delete/:id', mdAuth.ensureAuth, userController.delete);

//FUNCIONES PRIVADAS
//ADMIN
api.post('/saveUser', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.saveUser);
api.put('/updateUser/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.updateUser);
api.delete('/deleteUser/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.deleteUser); 


//IMAGENES 
//* Usuarios registrados
api.post('/uploadImage', [mdAuth.ensureAuth, upload], userController.uploadImage);

api.get('/getImage/:fileName', upload, userController.getImageUser);


module.exports = api;