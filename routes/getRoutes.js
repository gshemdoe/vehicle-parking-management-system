const mongoose = require('mongoose')
const router = require('express').Router()
const adminModel = require('../model/admin')
const loginCheck = require('../fns/loginCheck')
const { append } = require('express/lib/response')
const categoryModel = require('../model/vehicle-category')

//Create Admin
router.get('/create', (req, res) => {
    adminModel.create({
        username: 'admin',
        email: 'shemdoe5654@gmail.com',
        password: 'pass123'
    }).then(() => res.send('Admin created successfully'))
})

router.get('/', async (req, res) => {
    try {
        let user = await adminModel.findOne({ username: 'admin' })
        if (user.isLogin == false) {
            res.render('1-loginPage/login')
        } else {
            res.redirect('/dashboard')
        }

    } catch (error) {
        console.log(error.message)
    }
})


router.get('/recovery', async (req, res, next) => {
    try {
        res.render('forgetPage/forget')
    } catch (error) {
        console.log(error.message)
    }
})

router.get('/dashboard', loginCheck, async (req, res) => {
    res.render('2-dashboardPage/dashboard')
})

router.get('/vehicle-category', loginCheck, async (req, res)=> {
    let categories = await categoryModel.find()
    res.render('3-categoryPage/category', {categories})
})


router.get('/deletecat/:id', async (req, res)=> {
    const id = req.params.id

    try {
        await categoryModel.findByIdAndDelete(id)
        res.redirect('/vehicle-category')
    } catch (error) {
        console.log(error.message)
        console.log(error)
        res.send(error.message)
    }
})

router.get('/vehicle-entry', loginCheck, async(req, res)=> {
    let categories = await categoryModel.find()
    res.render('4-vehicleEntry/entries', {categories})
})

module.exports = router