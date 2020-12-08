const express = require('express')
const router = express.Router()
require('dotenv').config()
const cors = require('cors')
const connectionsString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
const db = pgp(connectionsString)
const jwt = require("jsonwebtoken")
var bcrypt = require('bcryptjs')

router.use(cors())

router.post('/register', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let zip = req.body.zip

    //need to add checks to see if user name exists & all fields are filled out

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          db.none('INSERT INTO users (username, password, zip) VALUES ($1, $2, $3)', [username, hash, zip]
        ).then(() => {
            res.json({success: true})
        })
     })
    })

})


router.post('/login', (req, res) => {
    
})


module.exports = router