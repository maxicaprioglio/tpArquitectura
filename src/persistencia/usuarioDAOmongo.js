const { conexionMongoDB , disconnectMongoDB } = require('../modal/conexion/mongo/mongodb');
const schemaUsuario = require('../modal/modalUsuarios');

class UsuarioDAOmongo {

    async createUsuario(usuario) {
        try {
          await conexionMongoDB();
          const data = await schemaUsuario.create({
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
            direccion: usuario.direccion,
            edad: usuario.edad,
            telefono: usuario.telefono,
            foto: 'perfil.jpg'
          });
          await disconnectMongoDB();
          return data;
        } catch (error) {
          throw Error(error.message);
        }
    }

    async buscarUsuario(email) {
        try {
          await conexionMongoDB()
          const data = await schemaUsuario.find({email:email})
          await disconnectMongoDB();
            return data[0];
        } catch (error) {
          throw Error(error.message);
      }
    }

    //ponerle la foto que es al usuario

    async agregarFoto(nombreFoto,email){
      try {
        await conexionMongoDB()
          await schemaUsuario.findOneAndUpdate({email:email}, {foto:nombreFoto})
        await disconnectMongoDB();
          return;
      } catch (error) {
        throw Error(error.message);
      }
    }

}

module.exports = UsuarioDAOmongo;