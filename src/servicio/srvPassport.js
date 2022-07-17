const LocalStrategy = require('passport-local').Strategy
const UsuariosDAOFile = require('../persistencia/usuarioDAOfs')
const Usuario = new UsuariosDAOFile()
const { isValidPassword , createHash } = require('../funciones/funcBcrypt')

const setUpPassport = (passport) => {
    
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });


    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, username, password, done) => {
                const existe = await Usuario.buscarUsuario(username)
                if (existe) {
                    return done(null, false)
                } else {
                const usuarioExistente = {nombre: req.body.nombre, email: username, password: createHash(password),direccion: req.body.direccion, edad: req.body.edad, telefono: req.body.telefono}
                const data = await Usuario.createUsuario(usuarioExistente)
                const user= { email: data.email } 
                done(null, user )
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy( async (username, password, done) => {
            const existe = await Usuario.buscarUsuario(username)
            if (!existe) {
                return done(null, false)
            }

            if (!isValidPassword(existe, password)){
                return done(null, false)
            } 
            const user = {nombre:existe.nombre,email:existe.email,foto:existe.foto}
                return done(null, user)
        })
    )
}
   
module.exports = setUpPassport