const express = require('express') // import express
const app = express() // instantiate express
const PORT = process.env.PORT || 4000

app.use(express.json()) // parse requests with json data
app.use(express.urlencoded({extended:false})) // parses urlencoded data with queryString lib


//verbs

