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

//get tasks based on parameters - start, end, complete (false) or active(true)
router.get('/display', async (req, res) => {
    let user_id = 2
    // let id = res.locals.id
    let start_date = req.query.start_date
    let end_date = req.query.end_date
    let complete = req.query.complete    

    let tasks = await db.any('SELECT * FROM tasks WHERE user_id = $1 AND task_date BETWEEN $2 AND $3 AND complete = $4', [user_id, start_date, end_date, complete])

    res.json(tasks)

})

//add a task
router.post('/add-task', (req, res) => {
    let user_id = 2
    // let id = res.locals.id
    let task_name = req.body.data.task_name
    let task_description = req.body.data.task_description
    let task_date = req.body.data.task_date
    let complete = false

    db.none('INSERT INTO tasks (user_id, task_name, task_description, task_date, complete) VALUES($1, $2, $3, $4, $5)', [user_id, task_name, task_description, task_date, complete])
    .then(() => {
        res.json({success: true})
    }).catch(() => {
        res.json({success: false})
    })

})

//delete by task number
router.delete('/', (req, res) => {
    let id = parseInt(req.params.id)
        
    db.none('DELETE FROM tasks WHERE id=$1', [id])
    .then(() => {
        res.json({success: true})
    }).catch(() => {
        res.json({success: false})
    })
})


module.exports = router