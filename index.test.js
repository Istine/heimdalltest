const { validateInput, removeFromObject, magicLocations } = require('./utils')
const mockAxios = require("./axios");

const methods = {
  validate: async () => {
    return await mockAxios
      .post(
        "http://localhost:4000/validate",
        {
          data: {
            formData: {
              type: "durban",
              crux: "Indices",
              color: "green",
              title: "Indict the idiot",
            },
            rules: ["type", "crux", "color", "title"],
          },
        },

        {
          headers: { "content-type": "application/json" },
        }
      )
      .then((data) => data)
      .catch((err) => err.message);
  },

  inValidate: async () => {
    return await mockAxios
      .post(
        "http://localhost:4000/validate",
        {
          data: {
            formData: {
              crux: "Indices",
              color: "green",
              title: "Indict the idiot",
            },
            rules: ["type", "crux", "color", "title"],
          },
        },

        {
          headers: { "content-type": "application/json" },
        }
      )
      .then((data) => data)
      .catch((err) => err.message);
  },

  validRemoveFromObject: async () => {
    return await mockAxios
      .post(
        "http://localhost:4000/validate",
        {
          data: {
            data: {
              type:"durban",
              crux: "Indices",
              color: "green",
              title: "Indict the idiot",
            },
            target: 'type',
          },
        },

        {
          headers: { "content-type": "application/json" },
        }
      )
      .then((data) => data)
      .catch((err) => err.message);
  },

  inValidRemoveFromObject: async () => {
    return await mockAxios
      .post(
        "http://localhost:4000/validate",
        {
          data: {
            data: {
              type:"durban",
              crux: "Indices",
              color: "green",
              title: "Indict the idiot",
            },
            target: 'wrongValue',
          },
        },

        {
          headers: { "content-type": "application/json" },
        }
      )
      .then((data) => data)
      .catch((err) => err.message);
  },

  magicLocate: async () => {
    return await mockAxios
      .post(
        "http://localhost:4000/validate",
        {
          magic: {
            "magical_sources": [
              3,
              2,
              5,
              4
            ],
            locations: [
              2,
              3,
              4,
              2
            ],
            number_of_magic_sources: 4
          }
        },

        {
          headers: { "content-type": "application/json" },
        }
      )
      .then((data) => data)
      .catch((err) => err.message);
  },
};



test(" Should validate input with given rules ", async () => {
  mockAxios.post.mockImplementationOnce((url, body, config) => {
    const { data: { formData, rules } } = body
        const response = validateInput(formData, rules)
        if(response === 'missing input fields') {
            return Promise.resolve({
                message:response
            })
        }

        if(response === 'valid') {
            return Promise.resolve({
                message: response
            })
        }
        else {
            return Promise.resolve({
                data: response
            })
        }
  })

  const data = await methods.validate()
   expect(data.message).toBe('valid')
})

test(" Should Invalidate input with given rules ", async () => {
  mockAxios.post.mockImplementationOnce((url, body, config) => {
    const { data: { formData, rules } } = body
        const response = validateInput(formData, rules)
        if(response === 'missing input fields') {
            return Promise.resolve({
                message:response
            })
        }

        if(response === 'valid') {
            return Promise.resolve({
                message: response
            })
        }
        else {
            return Promise.resolve({
                data: response
            })
        }
  })

  const data = await methods.inValidate()
   expect(data.data).toEqual(['type'])
})


test(" Should remove property from object ", async () => {
  mockAxios.post.mockImplementationOnce((url, body, config) => {
    const { data: { data, target } } = body
        const response = removeFromObject(data, target)
        if(response === 'Missing input fields') {
            return Promise.resolve({
                message:response
            })
        }

        if(response === undefined) {
            return Promise.resolve({
                message: response
            })
        }
        else {
            return Promise.resolve({
                data: response
            })
        }
  })

  const data = await methods.validRemoveFromObject()
   expect(data.data).toEqual({
    crux: "Indices",
    color: "green",
    title: "Indict the idiot",
   })
})

test(" Should not remove property from object ", async () => {
  mockAxios.post.mockImplementationOnce((url, body, config) => {
    const { data: { data, target } } = body
        const response = removeFromObject(data, target)
        if(response === 'Missing input fields') {
            return Promise.resolve({
                message:response
            })
        }
        if(response == 'attribute not found') {
            return Promise.resolve({
                message: response
            })
        }
        else {
            return Promise.resolve({
                data: response
            })
        }
  })

  const data = await methods.inValidRemoveFromObject()
   expect(data.message).toBe('attribute not found')
})


test(" Should return the lowest index or -1 for magic sources ", async () => {
  mockAxios.post.mockImplementationOnce((url, body, config) => {
    const { magic: { magical_sources, locations, number_of_magic_sources} } = body
        const response = magicLocations(magical_sources, locations, number_of_magic_sources)
        if(response === 'Missing input fields') {
            return Promise.resolve({
                response:response
            })
        }
        if(response == 'attribute not found') {
            return Promise.resolve({
                message: response
            })
        }
        else {
            return Promise.resolve({
                response: response
            })
        }
  })

  const data = await methods.magicLocate()
   expect(data.response).toBe(0)
})