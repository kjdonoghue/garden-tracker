const express = require('express')
const router = express.Router()
const GardenController = require('../controllers/gardenController')
const gardenController = new GardenController

// require('dotenv').config()

// const connectionsString = process.env.CONNECTION_STRING
// const pgp = require("pg-promise")()
// const db = pgp(connectionsString)
// const jwt = require("jsonwebtoken")
// var bcrypt = require('bcryptjs')
// const authenticate = require('../authenticate')


//Choose Garden Component - get all user gardens from gardens db
router.get('/list-gardens', gardenController.fetchAllUserGardens)

//save new garden name
router.post('/new-garden', gardenController.saveNewGarden)

//save new plant information
router.post('/save-new', gardenController.saveNewPlant)

//save edited plant information from /plant/:id
router.post('/save-edit', gardenController.saveEditedPlantInfo)

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
router.get('/plant/:id', gardenController.fetchPlantDetails)

//Garden Table Component - get all plants from garden plants by garden id
router.get('/:id', gardenController.fetchPlantsForTable)
    
module.exports = router