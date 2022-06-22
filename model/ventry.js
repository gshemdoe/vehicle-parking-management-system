const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entrySchema = new Schema({
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
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true, strict: false })

const model = mongoose.model('entryModel', entrySchema)
module.exports = model