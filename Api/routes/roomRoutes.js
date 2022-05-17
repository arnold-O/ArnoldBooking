const express = require('express')
const { createRooms, updateRoom, deleteRoom, getOneRoom, getAllRoom } = require('../controllers/roomControllers')


const router = express.Router()


router.route('/createroom/:id').post(createRooms)
router.route('/updateroom/:id').put(updateRoom)
router.route('/deleteroom/:id/:hotelid').delete(deleteRoom)
router.route('/singleroom/:id').get(getOneRoom)
router.route('/allroom').get(getAllRoom)



module.exports = router