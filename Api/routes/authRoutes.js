const express = require('express')
const { createUSer, loginUser } = require('../controllers/authControllers')



const router = express.Router()

router.route('/createuser').post(createUSer)

router.route('/loginuser').post(loginUser)




module.exports = router