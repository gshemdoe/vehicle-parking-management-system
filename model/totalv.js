const mongoose = require('mongoose')
const Schema = mongoose.Schema

const totalSchema = new Schema({
    total: {
        type: Number,
        required:true
    }
}, { timestamps: true })

const model = mongoose.model('totalModel', totalSchema)
module.exports = model