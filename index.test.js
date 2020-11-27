const axios = require("axios");

const methods = {
  validate: () => {
    return axios
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
      .then((data) => data.message)
      .catch((err) => err.message);
  },
};

test("should ", () => {
  expect.assertions(1);
  return methods.validate().then(data => {
      expect(data).toEqual('valid')
  } )
});
