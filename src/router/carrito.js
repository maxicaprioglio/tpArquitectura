const express = require('express');
const cartRouter = express.Router();
const { chequeoAutentificacion } = require('../funciones/funcAute')
const srvCarrito = require('../servicio/srvCarrito')

cartRouter.get('/', chequeoAutentificacion, srvCarrito.mostrarCarroSrv)

module.exports = cartRouter;