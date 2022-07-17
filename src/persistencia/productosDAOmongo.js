const { conexionMongoDB , disconnectMongoDB } = require('../modal/conexion/mongo/mongodb');
const schemaProducto = require('../modal/modalProductos');

class ProductosDAOmongo {

  async save(producto) {
    try {
      await conexionMongoDB()
      const data = await schemaProducto.create(producto)
      await disconnectMongoDB()
      const productos = data.producto
        return productos
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getById(id) {
    try {
      await conexionMongoDB()
      const data = await schemaProducto.find({"producto.id":id})
      await disconnectMongoDB()
        return data[0].producto
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getAll() {
    try {
      await conexionMongoDB()
      const data = await schemaProducto.find()
      await disconnectMongoDB()
      const productos = []
      data.forEach(e=>{
        productos.push(e.producto)
      })
        return productos;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async updateById(id, newProduct) {
    try {
      await conexionMongoDB()
      const data = await schemaProducto.findOneAndUpdate({"producto.id":Number(id)}, {"producto.nombre":newProduct.nombre,"producto.precio":newProduct.precio,"producto.foto":newProduct.foto,"producto.descripcion":newProduct.descripcion});
      await disconnectMongoDB()
      return 'se modifico el producto correctamente';
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteById(id) {
    try {      
      await conexionMongoDB()
      const data = await schemaProducto.findOneAndDelete({"producto.id":Number(id)});
      await disconnectMongoDB()
      return 'Product was deleted successfully';
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteAll() {
    try {
      await conexionMongoDB()
      const data = await schemaProducto.deleteMany();
      disconnectMongoDB()
      return 'Se borraron todos los productos';
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = ProductosDAOmongo;