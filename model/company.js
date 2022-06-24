const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    coname: {
        type: String,
        default: 'Mocu Group 31 Vehicle Park',
        required:true
    },
    address: {
        type: String,
        default: '25103 Rau Moshi Kilimanjaro, Tanzania',
        required:true
    },
    website: {
        type: String,
        default: 'www.group-no-31.com',
        required:true
    },
    coemail: {
        type: String,
        required: true,
        default: 'group.no.31@gmail.com'
    },
    dtarget: {
        type: Number,
        required: true,
        default: 150000
    },
    mtarget: {
        type: Number,
        required: true,
        default: 3000000
    }
}, { timestamps: true, strict: false })

const model = mongoose.model('companyModel', companySchema)
module.exports = model