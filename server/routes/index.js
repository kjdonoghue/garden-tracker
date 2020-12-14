const express = require('express')
const router = express.Router()
const IndexController = require('../controllers/indexController')
const indexController = new IndexController

//register new user
router.post('/register', indexController.registerUser)

//login exiting user
router.post('/login', indexController.loginUser)

//login as guest
router.post('/guestlogin', indexController.loginGuest)


module.exports = router