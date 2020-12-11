const express = require('express')
const router = express.Router()
const IndexController = require('../controllers/indexController')
const indexController = new IndexController


router.post('/register', indexController.registerUser)
router.post('/login', indexController.loginUser)

module.exports = router