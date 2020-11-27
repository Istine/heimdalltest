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
 *     properties:
 *      data:
 *       type: object
 *       description: The list of attributes to be traversed
 *       example: {"type" : "durban","crux" : "Indices", "color":"green", "title":"Indict the idiot"}
 *      target:
 *       type: string
 *       description: The target variable to be removed
 *       example: type
 *  ResData:
 *   type: object
 *   properties:
 *    data:
 *     type: object
 *     description: The new list after removing the attribute or 'attribute not found'
 *     example: {"crux" : "Indices", "color":"green", "title":"Indict the idiot"}
 *  ResDataTwo:
 *   type: object
 *   properties:
 *    message:
 *     type: string
 *     description: this is the return message when the attribute was not found
 *     example: attribute not found 
 *  FormData:
 *   type: object
 *   properties:
 *    data:
 *     type: object
 *     properties:
 *      formData:
 *       type: object
 *       description: The list of input fields
 *       example: {"type" : "durban","crux" : "Indices", "color":"green", "title":"Indict the idiot"}
 *      rules:
 *       type: array
 *       description: The rules for validating the input
 *       example: ["type", "crux", "color", "title"]
 *  ResFormData:
 *   type: object
 *   properties:
 *    missing_fields:
 *     type: array
 *     description: Bad request response for missing fields
 *     example: ["type", "crux", "color", "title"]
 *  ResFormDataTwo:
 *   type: object
 *   properties:
 *    message:
 *     type: string
 *     description: The rules for satisfied
 *     example: valid
 *  Magic:
 *   type: object
 *   properties:
 *    magic:
 *     type: object
 *     properties:
 *      magical_sources:
 *       type: array
 *       description: Magical sources for carpet to fly
 *       example: [3,2,5,4]
 *      locations:
 *       type: array
 *       description: distance to cover with flying carpet
 *       example: [2,3,4,2]
 *      number_of_magic_sources:
 *       type: integer
 *       description: number of magical sources (n - 1)
 *       example: 4
 *  ResMagic:
 *   type: object
 *   properties:
 *    response:
 *     type: integer
 *     description: The index of the starting point that satisfies the solution
 *     example: 0
 *  ResMagicTwo:
 *   type: object
 *   properties:
 *    response:
 *     type: integer
 *     description: The solution does not exist
 *     example: -1     
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
 *       '400':
 *         description: missing fields
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/definitions/ResFormData'
 *       '200':
 *         description: The action was sucessfully
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/definitions/ResFormDataTwo' 
 */

app.post('/validate', (req, res) => {
    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message:"Please fill in required fields"
        })
    }
    const response = validateInput(req.body.data.formData, req.body.data.rules)
    if(response !== 'valid') {
        return res.status(400).json({
            missing_fields:response
        })    
    }
    return res.status(200).json({
        message: response || ['empty response']
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
 *       '400':
 *         description: attribute not found
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/definitions/ResDataTwo'
 *       '200':
 *         description: The new object
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/definitions/ResData'
 */
app.post('/remove-from-object', (req, res) => {

    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message:"Please fill in required fields"
        })
    }

    const response = removeFromObject(req.body.data.data, req.body.data.target)

    if(response === 'attribute not found') {
        return res.status(400).json({
            message:response
        })    
    }
    
    return res.status(200).json({
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
 *       '200':
 *         description: returns the lowest index of the magical starting points that satisfies the solution
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ResMagic'
 *       '400':
 *         description: The solution does not exist and it returns -1
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ResMagicTwo'  
 */
app.post('/magic-locations', (req, res) => {

    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message:"Please fill in required fields"
        })
    }

    const { magic_sources, locations, number_of_magic_sources } = req.body.magic
    const response = magicLocations(magic_sources, locations, number_of_magic_sources)

    return res.status(200).json({
        response: response || ['empty response']
    })
})
