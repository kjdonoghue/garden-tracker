const express = require('express')
const app = express()
const PORT = 8080
const cors = require('cors')
const indexRouter = require('./routes/index')
const gardenRouter = require('./routes/garden')
const guidesRouter = require('./routes/guides')
const authenticate = require('./authenticate')

require('dotenv').config()
const connectionsString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
global.db = pgp(connectionsString)

app.use(express.json())
app.use(cors())

app.use('/', indexRouter)
app.use('/garden', authenticate, gardenRouter)
app.use('/guides', guidesRouter)


app.listen(PORT, () => {
    console.log('The server is running...')
})