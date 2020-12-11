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

router.post('/register', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let zone = req.body.zone

    // check to ensure username does not already exist
    const user = await db.any('SELECT username from users WHERE username = $1', [username])
    
    if (user.length > 0) {
        //user already exists            
        res.json({message: "This username already exists"})
    } else  {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
            db.none('INSERT INTO users (username, password, zone) VALUES ($1, $2, $3)', [username, hash, zone]
            ).then(() => {
                res.json({success: true})
            })
        })
        })
    }

})


router.post('/login', async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    //check to see if user is in db
    const user = await db.any('SELECT id, username, password, zone from users WHERE username = $1', [username])

    if (user.length == 0) {
        //no user found
        res.json({message: "user is not found"})
    } else  {
        user.map(user => {
        bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                const token = jwt.sign({id: user.id}, process.env.JWT_CODE)
                res.json({token: token, zone: user.zone})                        
            } else {
                //username is correct & password is wrong
                res.json({message: "password is not valid"})
            }
        }) 
        }) 
    }
})

module.exports = router