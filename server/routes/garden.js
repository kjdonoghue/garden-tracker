const express = require('express')
const router = express.Router()
require('dotenv').config()
const cors = require('cors')
const connectionsString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
const db = pgp(connectionsString)
const jwt = require("jsonwebtoken")
var bcrypt = require('bcryptjs')

router.get ('/defaults', async (req, res) => {
    let id = 2
    
    //get zone and primary garden from users
    let defaults = await db.any('SELECT zone, primary_garden from users WHERE id = $1', [id])
    
    res.json(defaults)

})




module.exports = router