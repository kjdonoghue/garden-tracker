const express = require('express')
const router = express.Router()
require('dotenv').config()
const cors = require('cors')
const connectionsString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
const db = pgp(connectionsString)
const jwt = require("jsonwebtoken")
var bcrypt = require('bcryptjs')

//Choose Garden Component - get zone and primary garden from users
router.get ('/defaults', async (req, res) => {
    let id = 2
    
    //
    let defaults = await db.any('SELECT zone, primary_garden from users WHERE id = $1', [id])
    
    res.json(defaults)

})

//Choose Garden Component - get all user gardens from gardens
router.get ('/list-gardens', async (req, res) => {
    let id = 2
    
    let gardens = await db.any('SELECT id, garden_name from gardens WHERE user_id = $1', [id])
    
    res.json(gardens)

})

//Garden Table Component - get all plants from garden plants by garden id
router.get ('/:id', async (req, res) => {
    let garden_id = req.params.id
    
    //get zone and primary garden from users
    let plants = await db.any('SELECT id, plant_name, sow_date, first_harvest, last_harvest, notes FROM garden_plants WHERE garden_id = $1', [garden_id])
    
    res.json(plants)

})

module.exports = router