const express = require('express')
const app = express()
const cors = require('cors')
const connectToMongo = require('./db')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path')
connectToMongo()
app.use(cors())
app.use( express.json() );
app.use(fileUpload())
app.use(bodyParser.json());

app.use('/auth',require('./routes/auth.js'))
app.use('/general',require('./routes/general.js'))



app.listen(5000)