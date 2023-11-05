const mongoose = require('mongoose')
const monogoURI = process.env.MONGOURI

const connectToMongo = ()=>{
    mongoose.connect(monogoURI)
}

module.exports = connectToMongo;