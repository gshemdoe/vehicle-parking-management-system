const adminModel = require('../model/admin')

module.exports = async (req, res, next) => {
        adminModel.findOne({ username: 'admin' })
        .then(user=> {
            if(user.isLogin == false) {
                res.redirect('/')
            } else {
                next()
            }
        })
}