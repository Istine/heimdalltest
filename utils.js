// function for validating input
const validateInput = (data = {}, rules = []) => {
    if (Object.keys(data).length === 0 || rules.length === 0) {
        return 'missing input fields' // rules pr the data is missing
    }

    const missingElements = [] // missing elements
    const valid = [] // validity check

    //loop through all rules and compare with requets body.
    rules.forEach((rule, index) => {
        if (data[rule] === undefined) {
            missingElements.push(rule)
        }
        else {
            valid.push(rule)
        }
    })

    // check if there are missing rules
    if (missingElements.length > 0) {
        return missingElements
    }

    return 'valid'
}

//function to remove an item form object
const removeFromObject = (data = {}, item = '') => {

    //validate input fields
    if (!data || item == '') {
        return 'Missing input fields'
    }

    //check if item exists in object
    if (data[item] === undefined) {
        return 'attribute not found.'
    }

    //loop through object keys and check for the one that are not equal to the target string
    const new_data = Object.keys(data).reduce((object, next) => {
        if (item !== next) {
            object[next] = data[next]
        }
        return object
    }, {})

    return new_data
}


// function to find the lowest possible point to start anf complete a journey
// magicalBars - magic available for the journey
// locations - all distance needed to be travelled
// n number of magical sources

const magicLocations = (magicBars = [], locations = [], n) => {
    let len = n - 1
    let result, temp, secondTemp, index = 0, jIndex = 0
    while (index < len) {
        for (let i = index, j = jIndex; i <= len || j <= len; i++, j++) {
            result = i == index ? magicBars[i] : result
            temp = result
            secondTemp = j + 1 <= len ? magicBars[j + 1] : 0
            result = temp - locations[i] + secondTemp
        }
        if (result > -1) {
            return index
        }

        if(index == len - 1) {
            return -1
        }
        index++
        jIndex++
    }
}


module.exports = {
    validateInput,
    magicLocations,
    removeFromObject,
}