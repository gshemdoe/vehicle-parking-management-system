const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    cname: {
        type: String,
        required:true
    },
    desc: {
        type: String,
        required: false
    }
}, { timestamps: true })

const model = mongoose.model('categoryModel', categorySchema)
module.exports = model