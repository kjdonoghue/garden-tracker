const express = require('express')
const router = express.Router()
const GuidesController = require('../controllers/guidesController')
const guidesController = new GuidesController

//fetch guide by selected veggie id provided in guides component
router.get('/:id', guidesController.fetchGuides)

//get zone information by user provided zone in zone component
router.get('/zone-information/:id', guidesController.fetchZoneInformation)

module.exports = router