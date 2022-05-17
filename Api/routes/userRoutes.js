const express = require('express')
const { updateUser,  deleteUser, getOneUser, getAllUser } = require('../controllers/userController')
const {  verifyUser, verifyAdmin, isAuthenticatedUser } = require('../middlewares/authenticated')


const router = express.Router()


router.route('/updateuser/:id' ).put( verifyUser, updateUser)
router.route('/deleteuser/:id' ).delete( verifyUser, deleteUser)
router.route('/getsingleuser/:id' ).get(verifyUser, getOneUser)
router.route('/getall' ).get( verifyAdmin, getAllUser)


module.exports = router