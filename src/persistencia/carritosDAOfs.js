const { promises: fs } = require('fs'); 
const ProductosDAOFile = require('./productosDAOfs');
const Producto = new ProductosDAOFile()

class CarritosDAOFile {
  constructor() {
    this.ruta = './src/DB/carritos.json'
  }
  
  async createCarrito() {
    try {
      const docs = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
      const newCart ={
          id: Math.floor(Math.random() * 1000000000),
          timestamp: new Date(),
          productos:[]
        } 
      docs.push(newCart)
      await fs.writeFile(this.ruta, JSON.stringify(docs, null, 2))
        return newCart.id;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async buscarCarrito(idCarrito) {
    try {
      const docs = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
      const buscado = docs.find((o) => o.id == idCarrito)
        return buscado.productos;
    } catch (error) {
      throw Error(error.message);
    }
  }
  
  async addProductToCart(idCart, idProduct) {
    try {
      const docs = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
      const produBuscado = await Producto.getById(idProduct)
      const index = docs.findIndex((o) => o.id == idCart)
      if(index){
      docs[index].productos.push(produBuscado)
      await fs.writeFile(this.ruta, JSON.stringify(docs, null, 2))
        return 'se agrego el producto correctamente';
      }
      return console.log('no salio')
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteCartById(id) {
    try {
      const docs = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
      const newDocs = docs.filter((o) => o.id !== idCart)
      await fs.writeFile(this.ruta, JSON.stringify(newDocs, null, 2))
        return 'El carrito se borro con exito';
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteProductCart(idCart, idProduct) {
    try {
      const docs = JSON.parse(await fs.readFile(this.ruta, 'utf-8'))
      const index = docs.findIndex((o) => o.id == idCart)
      docs[index].productos.filter((o) => o.id !== idProduct)
      await fs.writeFile(this.ruta, JSON.stringify(docs, null, 2))
        return 'se eimino correctamentre'
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = CarritosDAOFile