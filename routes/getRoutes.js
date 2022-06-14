const mongoose = require('mongoose')
const router = require('express').Router()
const adminModel = require('../model/admin')
const loginCheck = require('../fns/loginCheck')
const { append } = require('express/lib/response')
const categoryModel = require('../model/vehicle-category')
const entryModel = require('../model/ventry')
const outModel = require('../model/vout')
const totalModel = require('../model/totalv')

const endOfDay = require('date-fns/endOfDay')
const startOfDay = require('date-fns/startOfDay')

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
    let total = await totalModel.findById('62700395de0f2c6379f2eff9')
    let entries = await entryModel.find()
    let data = {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
    }

    entries.forEach(cat => {
        if (cat.cname.toLowerCase().includes('one') || cat.cname.includes(1)) {
            data.one += 1
        }
        else if (cat.cname.toLowerCase().includes('two') || cat.cname.includes(2)) {
            data.two += 1
        }
        else if (cat.cname.toLowerCase().includes('three') || cat.cname.includes(3)) {
            data.three += 1
        }
        else if (cat.cname.toLowerCase().includes('four') || cat.cname.includes(4)) {
            data.four += 1
        }
        else if (cat.cname.toLowerCase().includes('five') || cat.cname.includes(5)) {
            data.one += 1
        }
        else if (cat.cname.toLowerCase().includes('six') || cat.cname.includes(6)) {
            data.one += 1
        }
    })
    res.render('2-dashboardPage/dashboard', { total, entries, data })
})

router.get('/vehicle-category', loginCheck, async (req, res) => {
    let categories = await categoryModel.find()
    res.render('3-categoryPage/category', { categories })
})


router.get('/deletecat/:id', async (req, res) => {
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

router.get('/vehicle-entry', loginCheck, async (req, res) => {
    let categories = await categoryModel.find()
    res.render('4-vehicleEntry/entries', { categories })
})

router.get('/in-vehicles', loginCheck, async (req, res) => {
    let invehicles = await entryModel.find()
    res.render('5-in-vehiclesPage/invehicles', { invehicles })
})

router.get('/out-vehicle', async (req, res)=> {
    let outvehicles = await outModel.find()
    res.render('6-outVehicles/outvehicles', { outvehicles })
})

router.get('/delete-out/:id', async (req, res)=> {
    let id = req.params.id
    await outModel.findByIdAndDelete(id)
    res.redirect('/out-vehicle')
})

router.get('/report', async (req, res)=> {
    res.render('6-Report/report')
})

router.get('/report/:from/:to', async (req, res)=> {
    const from = req.params.from
    const to = req.params.to

    let data = await outModel.find({
        createdAt: {
            $gte: startOfDay(new Date(from)),
            $lte: endOfDay(new Date(to))
        }
    })
    res.send(data)
})

router.get('/total-income', async (req, res)=> {
    res.render('7-income/income')
})

router.get('/logout', async (req, res)=> {
    await adminModel.findOneAndUpdate({username: 'admin'}, {isLogin: false})
    res.redirect('/')
})
module.exports = router