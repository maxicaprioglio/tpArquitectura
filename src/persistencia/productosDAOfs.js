const { promises: fs } = require('fs'); 

class ProductosDAOFile {
  constructor() {
    this.ruta = './src/DB/productos.json'
  }

  async getById(id) {
    try {
      const docs = await this.getAll()
      const buscado = docs.find((o) => o.id == id)
      return buscado
    } catch (error) {
      console.log(error)
    }
  }

  async getAll() {
    try {
      const docs = await fs.readFile(this.ruta, 'utf-8')
      return JSON.parse(docs)
    } catch (error) {
      console.log(error)
    }
  }

  async save(obj) {
    try {
      const docs = await this.getAll()
      docs.push(obj)
      await fs.writeFile(this.ruta, JSON.stringify(docs, null, 2))
        return docs
    } catch (error) {
      console.log(error)
    }
  }

  async updateById(id, elem) {
    const docs = await this.getAll()
    const index = docs.findIndex((o) => o.id == id)

    let doc = null
    if (index == -1) {
      doc = { code: 401, msg: 'DNI no encontrado' }
    } else {
      docs[index] = elem
      doc = elem
      try {
        await fs.writeFile(this.ruta, JSON.stringify(docs, null, 2))
        return doc
      } catch (error) {
        console.log(error)
      }
    }
  }

  async deleteById(id) {
    const docs = await this.getAll()
    const index = docs.findIndex((o) => o.id == id)

    let doc = null
    if (index == -1) {
      doc = { code: 401, msg: 'DNI no encontrado' }
    } else {
      doc = docs.splice(index, 1)

      try {
        await fs.writeFile(this.ruta, JSON.stringify(docs, null, 2))
        return doc
      } catch (error) {
        console.log(error)
      }
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ProductosDAOFile
