const express = require('express')
const { createHotel, updateHotel, deleteHotel, getAllHotel, getOneHotel } = require('../controllers/hotelControllers')
const { verifyAdmin } = require('../middlewares/authenticated')


const router = express.Router()

router.route('/createhotel').post(verifyAdmin, createHotel)

router.route('/updatehotel/:id').put(verifyAdmin, updateHotel)

router.route('/deletehotel/:id').delete(verifyAdmin, deleteHotel)


router.route('/allhotel').get(getAllHotel)

router.route('/singlehotel/:id').get(getOneHotel)

module.exports = router