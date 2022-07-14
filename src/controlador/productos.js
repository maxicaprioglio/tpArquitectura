const Productos = require('../contenedor/productos');
const Producto = new Productos();
const Carrito = require('../contenedor/carritos');
const carrito = new Carrito()


module.exports = {
  createProduct: async (req, res) => {
    try {
      const prod = {producto:{
        id: Math.floor(Math.random() * 1000000000), ///hacer que no se repita
        nombre: req.body.nombre,
        precio: req.body.precio,
        foto: req.body.foto,
        descripcion: req.body.descripcion
      }}
      const id = await Producto.save(prod);
      res.redirect('/api/home/carga')
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  getProducts: async (req, res) => { 
    try {
      const productos = await Producto.getAll()
      const nombre=req.user.nombre;
      //creo el carrito 
      if (!req.session.carrito){
        let carritoId = await carrito.createCarrito()
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
  getProductById: async (req, res) => {
    const idProduct = req.params.id;
    try {
      const data = await Producto.getById(idProduct);
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
  updateProductById: async (req, res) => {
    const idProduct = req.params.id;
    const product = req.body;
    try {
      await Producto.updateById(idProduct, product);
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
  deleteProductById: async (req, res) => {
    const idProduct = req.params.id;
    try {
      await Producto.deleteById(idProduct);
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