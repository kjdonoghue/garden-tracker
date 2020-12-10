const express = require('express')
const app = express()
const PORT = 8080
require('dotenv').config()
const cors = require('cors')
const connectionsString = process.env.CONNECTION_STRING
const pgp = require('pg-promise')()
const db = pgp(connectionsString)
const indexRouter = require('./routes/index')
const gardenRouter = require('./routes/garden')
const tasksRouter = require('./routes/tasks')
const guidesRouter = require('./routes/guides')

app.use(express.json())
app.use(cors())

app.use('/', indexRouter)
app.use('/garden', gardenRouter)
app.use('/tasks', tasksRouter)
app.use('/guides', guidesRouter)


app.listen(PORT, () => {
    console.log('The server is running...')
})