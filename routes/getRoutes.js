const mongoose = require('mongoose')
const router = require('express').Router()
const adminModel = require('../model/admin')
const loginCheck = require('../fns/loginCheck')
const { append } = require('express/lib/response')
const categoryModel = require('../model/vehicle-category')
const entryModel = require('../model/ventry')
const outModel = require('../model/vout')
const totalModel = require('../model/totalv')

const { startOfYesterday, endOfYesterday, startOfDay, endOfDay, startOfWeek, endOfWeek, endOfISOWeek, startOfISOWeek, startOfMonth, endOfMonth } = require('date-fns')

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
    let ldate = new Date()
    ldate.setDate(ldate.getDate() - 7)

    let entries = await entryModel.find({status: 'in'})
    let outs = await outModel.find()

    let parkedThisMonth = await entryModel.find({
        createdAt: {
            $gte: startOfMonth(new Date()),
            $lte: endOfMonth(new Date())
        }
    })

    let parkedToday = await entryModel.find({
        createdAt: {
            $gte: startOfDay(new Date()),
            $lte: endOfDay(new Date())
        }
    })

    let parkedThisWeek = await entryModel.find({
        createdAt: {
            $gte: startOfISOWeek(new Date()),
            $lte: endOfISOWeek(new Date())
        }
    })


    let parkedLastWeek = await entryModel.find({
        createdAt: {
            $gte: startOfISOWeek(new Date(ldate)),
            $lte: endOfISOWeek(new Date(ldate))
        }
    })

    res.render('2-dashboardPage/dashboard', { total, entries, outs, parkedThisWeek, parkedLastWeek, parkedThisMonth, parkedToday })
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
    let invehicles = await entryModel.find({ status: 'in'})
    let categories = await categoryModel.find()
    res.render('5-in-vehiclesPage/invehicles', { invehicles, categories })
})

router.get('/out-vehicle', loginCheck, async (req, res)=> {
    let outvehicles = await outModel.find()
    res.render('6-outVehicles/outvehicles', { outvehicles })
})

router.get('/delete-out/:id', async (req, res)=> {
    let id = req.params.id
    await outModel.findByIdAndDelete(id)
    res.redirect('/out-vehicle')
})

router.get('/report', loginCheck, async (req, res)=> {
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

router.get('/total-income', loginCheck, async (req, res)=> {
    let kiasiChote = 0
    let kiasiChaLeo = 0
    let kiasoChaJana = 0

    let docs = await outModel.find()

    let today = await outModel.find({
        createdAt: {
            $gte: startOfDay(new Date()),
            $lte: endOfDay(new Date())
        }
    })

    let yesterday = await outModel.find({
        createdAt: {
            $gte: startOfYesterday(new Date()),
            $lte: endOfYesterday(new Date())
        }
    })

    docs.forEach(doc => {
        kiasiChote+=doc.pesa
    })
    today.forEach(doc => {
        kiasiChaLeo+=doc.pesa
    })
    yesterday.forEach(doc => {
        kiasoChaJana+=doc.pesa
    })
    res.render('7-income/income', { mapato: {
        leo: kiasiChaLeo,
        jana: kiasoChaJana,
        zote: kiasiChote,
        leoAss: (kiasiChaLeo/150000)*100,
        janaAss: (kiasoChaJana/150000)*100,
        zoteAss: (kiasiChote/5000000)*100
    } })
})

router.get('/account', loginCheck, async (req, res)=> {
    res.render('8-account/account')
})

router.get('/logout', async (req, res)=> {
    await adminModel.findOneAndUpdate({username: 'admin'}, {isLogin: false})
    res.redirect('/')
})
module.exports = router