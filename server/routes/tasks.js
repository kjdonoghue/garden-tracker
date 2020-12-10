const express = require('express')
const router = express.Router()
require('dotenv').config()
const cors = require('cors')
const connectionsString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
const db = pgp(connectionsString)
const jwt = require("jsonwebtoken")
var bcrypt = require('bcryptjs')
const authenticate = require('../authenticate')


router.post('/add-task', (req, res) => {
    let user_id = 2
    // let id = res.locals.id
    let task_name = req.body.data.task_name
    let task_description = req.body.data.task_description
    let task_date = req.body.data.task_date

    db.none('INSERT INTO tasks (user_id, task_name, task_description, task_date) VALUES($1, $2, $3, $4)', [user_id, task_name, task_description, task_date])
    .then(() => {
        res.json({success: true})
    }).catch(() => {
        res.json({success: false})
    })

})


module.exports = router