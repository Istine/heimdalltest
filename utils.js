// function for validating input
const validateInput = (data = {}, rules = []) => {
    if(!data || rules.length === 0) {
        return 'missing input fields' // rules pr the data is missing
    }

    const missingElements = [] // missing elements
    const valid = [] // validity check

    //loop through all rules and compare with requets body.
    rules.forEach((rule, index) => {
        if(data[rule] == undefined) {
            missingElements.push(rule)
        }
        else {
            valid.push(rule)
        }
    })

    // check if there are missing rules
    if(missingElements.length > 0) {
        return missingElements
    }

    return 'valid'
}


//function to remove an item form object
const removeFromObject = (data = {}, item = '') => {
    
    //validate input fields
    if(!data || item == '') {
        return 'Missing input fields'
    }

    //check if item exists in object
    if(data[item] === undefined) {
        return 'attribute not found.'
    }

    //loop through object keys and check for the one that are not equal to the target string
    const new_data = Object.keys(data).reduce((object, next) => {
        if(item !== next) {
            object[next] = data[next]
        }
        return object
    }, {})

    return new_data
}