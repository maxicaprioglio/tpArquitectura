const express = require('express');
const { chequeoAutentificacion } = require('../funciones/funcAute')
const homeRouter = express.Router();
const srvProducto = require('../servicio/srvPoducto');

//routas home

homeRouter.get('/', chequeoAutentificacion, srvProducto.getProductsSrv);//ok
/*
homeRouter.get('/:id', chequeoAutentificacion, getProductById);
homeRouter.put('/:id', chequeoAutentificacion, updateProductById);

homeRouter.delete('/:id', chequeoAutentificacion, deleteProductById);
*/
module.exports = homeRouter;