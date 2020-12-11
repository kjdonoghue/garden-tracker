const express = require('express')
const router = express.Router()
require('dotenv').config()
// const cors = require('cors')
const connectionsString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
const db = pgp(connectionsString)
const jwt = require("jsonwebtoken")
var bcrypt = require('bcryptjs')
const authenticate = require('../authenticate')

//Choose Garden Component - get all user gardens from gardens db
router.get ('/list-gardens', authenticate, async (req, res) => {
    let id = parseInt(res.locals.id)
    
    let gardens = await db.any('SELECT id, garden_name from gardens WHERE user_id = $1', [id])
    
    if (gardens) {
        res.json(gardens)
    } else {
        res.json({message: "Your request could not be processed"})
    }

})

//save new garden name
router.post('/new-garden', authenticate, (req, res) => {
    let user_id = res.locals.id
    let garden_name = req.body.data.garden_name

    db.none('INSERT INTO gardens (user_id, garden_name) VALUES ($1, $2)', [user_id, garden_name])
    .then(() => {
        res.json({success: true})
    }).catch(() => {
        res.json({success: false})
    })

})

//save new plant information
router.post('/save-new', (req, res) => {
    let user_id = parseInt(res.locals.id)
    let garden_id = req.body.data.garden_id
    let plant_name = req.body.data.plant_name
    let plant_family = req.body.data.plant_family
    let company = req.body.data.company
    let type = req.body.data.type
    let zone = req.body.data.zone

    if (type == "seed" || type == "set") {
        createSeedStartingTask(user_id, zone, plant_name, plant_family)
    }
    
    db.none('INSERT INTO garden_plants (garden_id, plant_name, plant_family, company, type) VALUES ($1, $2, $3, $4, $5)', [garden_id, plant_name, plant_family, company, type])
    .then(() => {
        res.json({success: true})
    }).catch(() => {
        res.json({success: false})
    })
})

async function createSeedStartingTask(user_id, zone, plant_name, plant_family) {
    let last_frost = await db.any('SELECT last_frost FROM zones where zone_name=$1', [zone])

    if (plant_family == "winter squash" || plant_family == "beets" || plant_family == "carrots" ) {
        console.log("1")

    } else if (plant_family == "greens" || plant_family == "potatoes" ) {

        console.log("2")
    } else if (plant_family == "broccoli" || plant_family == "leeks") {
        console.log("3")

    } else if (plant_family == "peppers" || plant_family == "tomatoes" || plant_family == "eggplant" ) {
        console.log("4")

    } else if (plant_family == "cabbage" || plant_family == "cauliflower" || plant_family == "celery") {
        console.log("5")
    } else {

        console.log("else")
    }

}

//save edited plant information from /plant/:id
router.post('/save-edit', (req, res) => {
    let id = parseInt(req.body.data.id)
    let plant_name = req.body.data.plant_name
    let plant_family = req.body.data.plant_family
    let planting_date = req.body.data.planting_date
    let first_harvest = req.body.data.first_harvest
    let last_harvest = req.body.data.last_harvest
    let notes = req.body.data.notes
    let company = req.body.data.company
    let type = req.body.data.type

    
    db.none('UPDATE garden_plants SET plant_name=$1, plant_family=$2, planting_date=$3, first_harvest=$4, last_harvest=$5, notes=$6, company=$7, type=$8 WHERE id=$9', [plant_name, plant_family, planting_date, first_harvest, last_harvest, notes, company, type, id])
    .then(() => {
        res.json({success: true})
    }).catch(() => {
        res.json({success: false})
    })
    
})

//delete garden from /garden/:id
router.delete('/delete-garden/:id/', (req, res) => {
    
    let id = parseInt(req.params.id)
        
    db.none("DELETE FROM gardens WHERE id=$1", [id])
    .then(() => {
        res.json({success: true})
    }).catch(() => {
        res.json({success: false})
    })
})


//delete plant from /plant/:id
router.delete('/delete-plant/:id/', (req, res) => {
    
    let id = parseInt(req.params.id)
        
    db.none("DELETE FROM garden_plants WHERE id=$1", [id])
    .then(() => {
        res.json({success: true})
    }).catch(() => {
        res.json({success: false})
    })
})

//Plant Detail (from Garden Table Component) - get plant details from garden plants by plant id
router.get ('/plant/:id', async (req, res) => {
    let plant_id = parseInt(req.params.id)
    
    //get zone and primary garden from users
    let plantDetails = await db.any('SELECT id, plant_name, plant_family, planting_date, first_harvest, last_harvest, notes, company, type FROM garden_plants WHERE id = $1', [plant_id])
    
    res.json(plantDetails)

})


//Garden Table Component - get all plants from garden plants by garden id
router.get ('/:id', async (req, res) => {
    let garden_id = req.params.id
    
    //get zone and primary garden from users
    let plants = await db.any('SELECT id, plant_name, planting_date, first_harvest, last_harvest, notes, type FROM garden_plants WHERE garden_id = $1', [garden_id])    
    res.json(plants)

})

module.exports = router