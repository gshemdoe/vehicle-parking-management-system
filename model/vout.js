const mongoose = require('mongoose')
const Schema = mongoose.Schema

const outSchema = new Schema({
    regno: {
        type: String,
        required: true
    },
    vname: {
        type: String,
        required: true
    },
    cname: {
        type: String,
        required: false
    },
    oname: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    pnum: {
        type: String,
        required: true
    },
    inCreated: {
        type: Date,
        required: true
    },
    remark: {
        type: String,
        required: false,
        default: 'null'
    },
    pesa: {
        type: Number,
        required: true
    }
}, { timestamps: true, strict: false })

const model = mongoose.model('outModel', outSchema)
module.exports = model