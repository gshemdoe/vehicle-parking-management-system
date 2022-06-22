const mongoose = require('mongoose')
const router = require('express').Router()
const adminModel = require('../model/admin')
const categoryModel = require('../model/vehicle-category')
const entryModel = require('../model/ventry')
const totalModel = require('../model/totalv')
const outModel = require('../model/vout')

router.post('/login', async (req, res, next)=> {
    try {
        const username = req.body.user
        const password = req.body.pass

        let admin = await adminModel.findOne({ username, password})
        if(admin) {
            await admin.updateOne({isLogin: true})
            res.redirect('/dashboard')
        }
        else {
            res.render('invalidLogin/invalid')
        }

    } catch (error) {
        console.log(error.message)
    }
})

router.post('/category', async (req, res)=> {
    const price = req.body.price
    const cname = req.body.category

    try {
        await categoryModel.create({
            price, cname
        })
        res.redirect('/vehicle-category')
    } catch (error) {
        console.log(error.message)
        console.log(error)
    }

})

router.post('/edit-category/:id', async (req, res)=> {
    const id = req.params.id
    const price = req.body.price
    const cname = req.body.category

    try {
        if(price.length > 0 && cname.length < 1) {
            await categoryModel.findByIdAndUpdate(id, {price})
        }
        else if(price.length < 1 && cname.length > 0) {
            await categoryModel.findByIdAndUpdate(id, {cname})
        } else {
            await categoryModel.findByIdAndUpdate(id, {price, cname})
        }
        res.redirect('/vehicle-category')
    } catch (error) {
        console.log(error.message)
        console.log(error)
        res.send(error.message)
    }

})

router.post('/vehicle-entry', async (req, res)=> {
    let regno = req.body.regno
    let vname = req.body.vname
    let rawCname = req.body.cname
    let cname = rawCname.split('- ')[0]
    let oname = req.body.oname
    let contact = req.body.contact
    let price = Number(rawCname.split(' - ')[1])

    try {
        let number = Math.floor((10000 + Math.random() * 90000))
        let pnum = `P${number}`
        await entryModel.create({
            regno, vname, cname, oname, contact, pnum, price, status: 'in'
        })
        await totalModel.findByIdAndUpdate('62700395de0f2c6379f2eff9', {$inc: {total: 1}})
        console.log('Vehicle added to database successfully')
        res.redirect('/in-vehicles')
    } catch (error) {
        console.log(error.message)
        console.log(error)
    }
})

router.post('/vehicle-out/:id', async (req, res) => {
    let id = req.params.id
    let remark = req.body.remark
    let pesa = req.body.pesa

    try {
        let vehicle = await entryModel.findById(id)
        let doc = {
            regno: vehicle.regno,
            vname: vehicle.vname,
            cname: vehicle.cname,
            oname: vehicle.oname,
            contact: vehicle.contact,
            pnum: vehicle.pnum,
            inCreated: vehicle.createdAt,
            remark,
            pesa: Number(pesa)
        }

        await outModel.create(doc)
        await entryModel.findByIdAndUpdate(id, {status: 'out'})
        console.log('doc updated from in to out')
        res.sendStatus(200)
    } catch (error) {
        console.log(error.message)
    }

})

module.exports = router