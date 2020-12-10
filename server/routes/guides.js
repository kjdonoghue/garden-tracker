const express = require('express')
const router = express.Router()
require('dotenv').config()
const cors = require('cors')
const connectionsString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
const db = pgp(connectionsString)


router.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id)
    
    let guide = await db.any('SELECT * FROM vegetables WHERE id = $1', [id])
    
    res.json(guide)
})




module.exports = router