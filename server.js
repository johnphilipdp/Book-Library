if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')


const mongoose = require('mongoose')

const indexRouter =   require('./routes/index')

app.set('view engine', 'ejs')
// views directory
app.set('views', __dirname + '/views')
// layouts directory
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
// public files/static files
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (err) => {console.log(err)})
db.on('open', () => { console.log('Connected to Mongoose Database') })


app.use('/', indexRouter)

app.listen(process.env.PORT || 8000)