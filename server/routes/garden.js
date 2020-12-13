const express = require('express')
const router = express.Router()
const GardenController = require('../controllers/gardenController')
const gardenController = new GardenController

//set primary garden
router.post('/set-primary', gardenController.setPrimaryGarden)

//Choose Garden Component - get all user gardens from gardens db
router.get('/list-gardens', gardenController.fetchAllUserGardens)

//save new garden name
router.post('/new-garden', gardenController.saveNewGarden)

//save new plant information
router.post('/save-new', gardenController.saveNewPlant)

//save edited plant information from /plant/:id
router.post('/save-edit', gardenController.saveEditedPlantInfo)

//delete garden from /garden/:id
router.delete('/delete-garden/:id/', gardenController.deleteUserGarden)

//delete plant from /plant/:id
router.delete('/delete-plant/:id/', gardenController.deletePlant)

//Plant Detail (from Garden Table Component) - get plant details from garden plants by plant id
router.get('/plant/:id', gardenController.fetchPlantDetails)

//Garden Table Component - get all plants from garden plants by garden id
router.get('/:id', gardenController.fetchPlantsForTable)
    
module.exports = router