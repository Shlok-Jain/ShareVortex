const mongoose = require('mongoose')
require('dotenv').config()
const monogoURI = process.env.MONGOURI

const connectToMongo = ()=>{
    mongoose.connect(monogoURI)
}

module.exports = connectToMongo;