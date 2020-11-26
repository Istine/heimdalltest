const express = require('express') // import express
const app = express() // instantiate express
const PORT = process.env.PORT || 4000
const { validateInput, removeFromObject, magicLocations } = require('./utils')

app.use(express.json()) // parse requests with json data
app.use(express.urlencoded({extended:false})) // parses urlencoded data with queryString lib


app.listen(PORT,() => console.log(`Listening on port ${PORT}`)) // listening on vailable port 

//verbs
//validate input
app.post('/validate', (req, res) => {
    const response = validateInput(req.body)
    return res.status(200).json({
        success:true,
        data:response || ['empty response']
    })
})

//remove from object
app.post('/remove-from-object', (req, res) => {
    const response = removeFromObject(req.body.data, req.body.target)
    return res.status(200).json({
        success:true,
        data:response || ['empty response']
    })
})

//find magic location
app.post('/magic-locations', (req, res) => {
    const { magic_sources, locations, number_of_magic_sources } = req.body
    const response = magicLocations(magic_sources, locations,number_of_magic_sources)
    return res.status(200).json({
        success:true,
        data:response || ['empty response']
    })
})

app.get('/test', (req, res) => {
    res.send('Test')
})