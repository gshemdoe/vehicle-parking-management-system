const mongoose = require('mongoose')
const router = require('express').Router()
const adminModel = require('../model/admin')
const categoryModel = require('../model/vehicle-category')
const entryModel = require('../model/ventry')

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
    const desc = req.body.desc
    const cname = req.body.category

    try {
        await categoryModel.create({
            desc, cname
        })
        res.redirect('/vehicle-category')
    } catch (error) {
        console.log(error.message)
        console.log(error)
    }

})

router.post('/edit-category/:id', async (req, res)=> {
    const id = req.params.id
    const desc = req.body.desc
    const cname = req.body.category

    try {
        await categoryModel.findByIdAndUpdate(id, {desc, cname})
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
    let cname = req.body.cname
    let oname = req.body.oname
    let contact = req.body.contact

    try {
        await entryModel.create({
            regno, vname, cname, oname, contact
        })
        console.log('Vehicle added to database successfully')
        res.redirect('/vehicle-entry')
    } catch (error) {
        console.log(err.message)
        console.log(err)
    }
})

module.exports = router