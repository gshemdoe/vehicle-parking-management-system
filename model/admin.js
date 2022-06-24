const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    fname: {
        type: String,
        default: 'George Mariki',
        required:true
    },
    username: {
        type: String,
        default: 'admin',
        required:true
    },
    contact: {
        type: String,
        default: '0745685079',
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
}, { timestamps: true, strict: false })

const model = mongoose.model('adminModel', adminSchema)
module.exports = model