const express = require('express')
const router = express.Router()
const IndexController = require('../controllers/indexController')
const indexController = new IndexController

//register new user
router.post('/register', indexController.registerUser)

//login exiting user
router.post('/login', indexController.loginUser)


module.exports = router