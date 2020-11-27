// const { validateInput, removeFromObject, magicLocations } = require("./utils");

// /** VALIDATING INPUT */
// ////////////////////////////////////////////////////////////////////////
// const data = {
//     type: "durban",
//     crux: "Indices",
//     color: "green",
//     title: "Indict the idiot",
//   },
//   rules = ["type", "crux", "color", "title"];

// //valid test case
// test(" Validate Input given a set a rules ", () => {
//   expect(validateInput(data, rules)).toBe("valid");
// });

// const invalidData = {
//   // type: "durban",
//   // crux: "Indices",
//   // color:"green",
//   title: "Indict the idiot",
// };

// //invalid test case
// test(" Invalidate Input given a set a rules ", () => {
//   expect(validateInput(invalidData, rules)).toEqual(["type", "crux", "color"]);
// });

// ////////////////////////////////////////////////////////////////////////
// /**  REMOVING AN ATTRIBUTE FROM AN ARRAY */

// const testObj = {
//     type: "durban",
//     crux: "Indices",
//     color: "green",
//     title: "Indict the idiot",
//   },
//   target = "type";

// test("Should remove the target attribute from an object ", () => {
//   expect(removeFromObject(testObj, target)).toEqual({
//     crux: "Indices",
//     color: "green",
//     title: "Indict the idiot",
//   });
// });

// const falseTarget = 'blue'

// test("Should return attribute not found", () => {
//     expect(removeFromObject(testObj, falseTarget)).toBe('attribute not found');
//   });

// ///////////////////////////////////////////////////////////////////////////
//         //MAGIC LOCATIONS
// const magic = [3 , 2, 5, 4] 
// const dist = [2 ,3 , 4, 2]
// let n  = 4

// test('should ', () => {
//     expect(magicLocations(magic, dist, n)).toBe(0)
// })
