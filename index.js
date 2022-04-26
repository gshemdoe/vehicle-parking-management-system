const express = require('express')
const mongoose = require('mongoose')
const getRoutes = require('./routes/getRoutes')
const postRoutes = require('./routes/postRoutes')

const app = express()
mongoose.connect('mongodb://localhost/vehicle-parking')
.then(()=> console.log('✔ Umeunganishwa na database kikamilifu'))
.catch((err)=> console.log(err.message))

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(getRoutes)
app.use(postRoutes)


app.listen(3000, ()=> console.log('✔ System imeunganishwa na port 3000'))