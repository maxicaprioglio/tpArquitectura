const ProductosDAOFile = require('../persistencia/productosDAOfs');
const Productos = new ProductosDAOFile()
const CarritosDAOFile = require('../persistencia/carritosDAOfs');
const Carrito = new CarritosDAOFile()

const srvProducto = {
  createProductSrv: async (req, res) => {
    try {
      const prod = {producto:{
        id: Math.floor(Math.random() * 1000000000), ///hacer que no se repita
        nombre: req.body.nombre,
        precio: req.body.precio,
        foto: req.body.foto,
        descripcion: req.body.descripcion
      }}
      const id = await Productos.save(prod);
      res.redirect('/api/home/carga')
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  getProductsSrv: async (req, res) => { 
    try {
      const productos = await Productos.getAll()
      const nombre=req.user.nombre;
      //creo el carrito 
      if (!req.session.carrito){
        let carritoId = await Carrito.createCarrito()
        req.session.carrito = carritoId
      }
      let idCart=req.session.carrito;
      const foto= req.user.foto
      res.render('home',{nombre,productos, idCart, foto})
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  getProductByIdSrv: async (req, res) => {
    const idProduct = req.params.id;
    try {
      const data = await Productos.getById(idProduct);
      res.status(200).send({
        status: 200,
        data,
        message: 'product was obtained successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  updateProductByIdSrv: async (req, res) => {
    const idProduct = req.params.id;
    const product = req.body;
    try {
      await Productos.updateById(idProduct, product);
      res.status(200).send({
        status: 200,
        data: {
          id: idProduct,
        },
        message: 'product was updated successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  deleteProductByIdSrv: async (req, res) => {
    const idProduct = req.params.id;
    try {
      await Productos.deleteById(idProduct);
      res.status(200).send({
        status: 200,
        data: {
          id: idProduct
        },
        message: 'product was detele successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  }
};

module.exports = srvProducto
