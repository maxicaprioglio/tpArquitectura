const LocalStrategy = require('passport-local').Strategy
const UsuariosDAOFile = require('../persistencia/usuarioDAOfs')
const Usuario = new UsuariosDAOFile()
const { isValidPassword , createHash } = require('../funciones/funcBcrypt')

const setUpPassport = (passport) => {

    passport.serializeUser((usuario, done) => {
        console.log(usuario.email + 'serializado')
        done(null, usuario.email)
    })
      
    passport.deserializeUser(async(nombre, done) => {
        const usuarioDz = await Usuario.buscarUsuario(nombre)
        console.log(JSON.stringify(usuarioDz) + 'desserializado')
        done(null, usuarioDz)
    })   

    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, username, password, done) => {
            console.log('entro signup')
            const existe = await Usuario.buscarUsuario(username)
  
            if (existe) {
              return done(null, false)
            } else {  
            const usuarioExistente = {nombre: req.body.nombre, email: username, password: createHash(password),direccion: req.body.direccion, edad: req.body.edad, telefono: req.body.telefono , foto: 'perfil.jpg' }
            await Usuario.createUsuario(usuarioExistente)
          
              console.log(usuarioExistente)
              done(null, { nombre: username })
            }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy(async (username, password, done) => {
          console.log('entro')
          const existe = await Usuario.buscarUsuario(username) 

        console.log(existe)
        if (!existe) {
           return done(null, false)
        } else {
            if (!isValidPassword(existe, password)){
                return done(null, false)
            } 
        return done(null, existe)
        }
        })
      )
}
   
module.exports = setUpPassport