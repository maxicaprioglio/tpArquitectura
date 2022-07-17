const { promises: fs } = require('fs'); 

class UsuariosDAOFile {
  constructor() {
    this.ruta = './src/DB/usuarios.json'
  }

  async createUsuario(usuario) {
    try {
      const docs = await this.getAll()
      const nuevoUsuario = {
        id: Math.random()*100000,
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password,
        direccion: usuario.direccion,
        edad: usuario.edad,
        telefono: usuario.telefono,
        foto: 'perfil.jpg'
      }
      docs.push(nuevoUsuario)
      await fs.writeFile(this.ruta, JSON.stringify(docs, null, 2))
        return docs;
    } catch (error) {
      console.log(error)
    }
  }

  async buscarUsuario(email) {
    try {
      const docs = await this.getAll()
      const buscado = docs.find((o) => o.email == email)
        return buscado
    } catch (error) {
      console.log(error)
    }
  }

  async getAll() {
    try {
      const resultado = await fs.readFile(this.ruta, 'utf-8')
      return JSON.parse(resultado)
    } catch (error) {
      console.log(error)
    }
  }

  async agregarFoto(nombreFoto, email) {
    const docs = await this.getAll()
    const index = docs.findIndex((o) => o.email == email)

    let doc = null
    if (index == -1) {
      doc = { code: 401, msg: 'DNI no encontrado' }
    } else {
      docs[index].foto = nombreFoto
      try {
        await fs.writeFile(this.ruta, JSON.stringify(docs, null, 2))
        return doc
      } catch (error) {
        console.log(error)
      }
    }
  }

}

module.exports = UsuariosDAOFile
