const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const config = require('./config/config')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

/*----------- Server -----------*/
if (config.MODO == 'CLUSTER' && cluster.isPrimary){
  console.log(`Master ${process.pid} is running`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker) => {
    cluster.fork()
    console.log(`worker ${worker.process.pid} died`)
  })
} else {


/*----------- app -----------*/
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

/*----socket-----*/

const conectIo = require('./servicio/srvSocket')
conectIo(io)

  /*----------- Session -----------*/
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(
  session({
    secret: '1234567890!@#$%^&*()',
    cookie:{
      httpOnly: false,
      secure:false,
      maxAge: 600000
    },
    rolling:true,
    resave: true,
    saveUninitialized: true,
  })
)

/*----------- Passport -----------*/
const passport = require('passport')

app.use(passport.initialize())
app.use(passport.session())

const setupPassport = require('./servicio/srvPassport')

setupPassport(passport)

  /*----------- Motor de plantillas -----------*/
const hbs = require('express-handlebars')

app.set('views', './src/views')

app.engine(
   '.hbs',
    hbs.engine({
      defaultLayout: 'main',
      layoutsDir: './src/views/layouts',
      partialsDir: './src/views/partials',
      extname: '.hbs',
    })
)
app.set('view engine', '.hbs')

  /*----------- Rutas -----------*/
  const loginRouter = require('./router/login')
  const homeRouter = require('./router/home')
  const cartRouter = require('./router/carrito')
  const perfilRouter = require('./router/perfil')
  
  app.use('/api', loginRouter);
  app.use('/api/home', homeRouter);
  app.use('/api/carrito', cartRouter)
  app.use('/api/perfil', perfilRouter);
  const {chequeoAuteExistente } = require('./funciones/funcAute')

  app.use('/', chequeoAuteExistente,(req, res) => {
    try {
        res.render('bienvenido')
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  })

/*-------server-----*/
const numCPUs = require('os').cpus().length

const connectedServer = httpServer.listen(config.PORT, () => {
  console.log(`servidor levantado en PORT:${config.PORT} y numero de processo:${numCPUs}`)
})

connectedServer.on('error', error => console.log(`Error en servidor ${error}`))

}