const express = require('express')
const router = express.Router()
require('dotenv').config()
const connectionsString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
const db = pgp(connectionsString)
const IndexController = require('../controllers/indexController')
const indexController = new IndexController


router.post('/register', indexController.registerUser)
router.post('/login', indexController.loginUser)


module.exports = router