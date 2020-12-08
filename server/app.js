const express = require('express')
const app = express()
const PORT = 8080
require('dotenv').config()
const cors = require('cors')
const connectionsString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
const db = pgp(connectionsString)
const indexRouter = require("./routes/index")

app.use(express.json())
app.use(cors())

app.use('/', indexRouter)


app.listen(PORT, () => {
    console.log("The server is running...")
})