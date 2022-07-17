const CarritosDAOFile = require('../persistencia/CarritosDAOfs')
const Carrito = new CarritosDAOFile()

const conectIo = (io) => {
    io.on('connection', socket => {
        console.log('Nuevo cliente conectado!')
    
        // agregar al carrito
    
        socket.on('agregarProducto', async valor => {
            await Carrito.addProductToCart(valor.idCart, valor.idProd)
        })
  
        // eliminar del carrito
    
        socket.on('eliminarProductos', async valor => {
            await Carrito.deleteProductCart(valor.idCart, valor.idProd)
        })
  
        // comprar Productos
        socket.on('comprarProductos', async valor => {
            console.log('entro')
            
            // armo los productos
            const cart = Carrito.buscarCarrito(valor.idCart)
            // mandar mail
            const usuarioExistente = {nombre: req.user.nombre, email: req.user.username, direccion: req.user.direccion, edad: req.user.edad, telefono: req.user.telefono }
            const mailOptions = { 
                from: 'Servidor Node.js',
                to: process.env.TEST_MAIL,
                subject: 'Nuevo Registro',
                html: `nuevo pedido de NOMBRE:${usuarioExistente.nombre}, EMAIL:${usuarioExistente.email},fecha de nacimiento:${usuarioExistente.edad}, direccion: ${usuarioExistente.direccion}, telefono: ${usuarioExistente.telefono}. Pedido:${cart}`
            }
            await transporter.sendMail(mailOptions)
      
            // mandar whatsapp al cliente
            try {
                const message = await client.messages.create({
                    body: 'Su pedido ha sido recibido exitosamente y se encuentra en proceso.!',
                    from: 'whatsapp:+1 415 523 8886',
                    to: `whatsapp:+${usuarioExistente.telefono}`
            })
            console.log(message)
            } catch (error) {
                console.log(error)
            }
            // se deberia guardar en una base de datos pedidos
            //mas adelante
            // crear uno nuevo y asignar
            let carritoId = await Carrito.createCarrito()
                req.session.carrito = carritoId
        })
    })
}

module.exports = conectIo