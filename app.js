const express = require("express")
const bodyParser = require("body-parser")
const ussdRoute = require("./ussdRoute")
const app = express()
const port = 3005
app.listen(port, ()=> console.log(`Running on localhost:${port}`))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use("/", ussdRoute)
