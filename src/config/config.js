const parseArgs = require('minimist')
const args = parseArgs(process.argv.slice(2))
require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 8080,
    HOST: args.host || '127.0.0.1' ,
    NODE_ENV: args.node_env || 'development',
    MODO: args.modo || 'CLUSTER',
    URL: process.env.URLMONGO
    
}