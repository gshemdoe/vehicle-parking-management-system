const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    username: {
        type: String,
        default: 'admin',
        required:true
    },
    email: {
        type: String,
        required: true,
        default: 'shemdoe5654@gmail.com'
    },
    password: {
        type: String,
        required: true,
        default: 'pass123'
    },
    isLogin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const model = mongoose.model('adminModel', adminSchema)
module.exports = model