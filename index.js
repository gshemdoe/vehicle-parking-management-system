const express = require('express')
const mongoose = require('mongoose')
const getRoutes = require('./routes/getRoutes')
const postRoutes = require('./routes/postRoutes')

require('dotenv').config()

const app = express()
mongoose.connect(process.env.mongo)
.then(()=> console.log('✔ Umeunganishwa na database kikamilifu'))
.catch((err)=> console.log(err.message))

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(getRoutes)
app.use(postRoutes)


app.listen(process.env.PORT || 3000, ()=> console.log('✔ System imeunganishwa na port 3000,'))