const mongoose = require('mongoose')
const config =  require('../../../config/config')

function conexionMongoDB() {
    let rta = mongoose.connect( config.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
} 

async function disconnectMongoDB() {
    return await mongoose.disconnect()
}

module.exports = {conexionMongoDB,disconnectMongoDB};