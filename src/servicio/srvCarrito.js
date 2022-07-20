const ProductosDAOFile = require('../persistencia/productosDAOfs');
const Producto = new ProductosDAOFile()
const CarritosDAOFile = require('../persistencia/carritosDAOfs');
const Carrito = new CarritosDAOFile

const srvCarrito = {
    mostrarCarroSrv: async (req, res) => {
        try {
            const data = await Carrito.buscarCarrito(req.session.carrito)
            const productos = data;
            const nombre = req.user.nombre;
            const foto = req.user.foto;
            let idCart = req.session.carrito;          
            res.render('carrito', {nombre, foto, idCart, productos })
        } catch (error) {
            res.status(500).send({
            status: 500,
            messages: error.message,
            });
        }
    }

}

module.exports = srvCarrito 
