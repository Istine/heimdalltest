const express = require('express') // import express
const app = express() // instantiate express
const PORT = process.env.PORT || 4000
const { validateInput, removeFromObject, magicLocations } = require('./utils')

// import swagger dependencies
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

//swagger comfig
const swaggerOptions = {
    definition: {
        openapi:"3.0.0",
        info: {
            title: "Heimdall Test API DOC",
            version: "1.0.0",
            description: "An documentation of how to use the API"
        }
    },
    apis: ["index.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions) // pass in options to swaggerJsDoc

//middleware
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use(express.json()) // parse requests with json data

/**
 * @swagger
 * definitions:
 *  Data:
 *   type: object
 *   properties:
 *    data:
 *     type: object
 *     description: The list of attributes to be traversed
 *     example: {"type" : "durban","crux" : "Indices", "color":"green", "title":"Indict the idiot"}
 *    target:
 *     type: string
 *     description: The target variable to be removed
 *     example: type
 *  FormData:
 *   type: object
 *   properties:
 *    formData:
 *     type: object
 *     description: The list of input fields
 *     example: {"type" : "durban","crux" : "Indices", "color":"green", "title":"Indict the idiot"}
 *    rules:
 *     type: array
 *     description: The rules for validating the input
 *     example: ["type", "crux", "color", "title"]
 *  Magic:
 *   type: object
 *   properties:
 *    magical_sources:
 *     type: array
 *     description: Magical sources for carpet to fly
 *     example: [3,2,5,4]
 *    dist:
 *     type: array
 *     description: distance to cover with flying carpet
 *     example: [2,3,4,2]
 *    n:
 *     type: integer
 *     description: number of magical sources (n - 1)
 *     example: 4  
 */

app.use(express.urlencoded({ extended: false })) // parses urlencoded data with queryString lib


app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) // listening on vailable port 

//verbs
//validate input

/**
 * @swagger
 *
 * /validate:
 *   post:
 *     summary: Validate input
 *     description: This is an endpoint for validating input fields
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/FormData'
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: input to be validated
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       data:
 *         description: missing fields or 'valid' for success
 */

app.post('/validate', (req, res) => {
    const response = validateInput(req.body.data.formData, req.body.data.rules)
    return res.status(200).json({
        success: true,
        data: response || ['empty response']
    })
})

//remove from object

/**
 * @swagger
 *
 * /remove-from-object:
 *   post:
 *     summary: Removes attribute from the object
 *     description: endpoint to remove an attribute from an object
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Data'
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: object containing required fields
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       data:
 *         description: The new object or 'attribute not found'
 */
app.post('/remove-from-object', (req, res) => {
    const response = removeFromObject(req.body.data.data, req.body.data.target)
    return res.status(200).json({
        success: true,
        data: response || ['empty response']
    })
})

//find magic location

/**
 * @swagger
 *
 * /magic-locations:
 *   post:
 *     summary: Find lowest index from a list of magical sources needed to traverse through multiple locations
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Magic'
 *     description: endpoint for find the lowest index for covering a given number of locations and magic sources
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: object containing required fields
 *         in: body
 *         required: true
 *         type: object
 *     responses:
 *       data:
 *         description: returns the index of the lowest point or -1 if the solution is not feasible
 */
app.post('/magic-locations', (req, res) => {
    const { magic_sources, locations, number_of_magic_sources } = req.body.magic
    const response = magicLocations(magic_sources, locations, number_of_magic_sources)
    return res.status(200).json({
        success: true,
        data: response || ['empty response']
    })
})
