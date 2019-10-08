// Test the modules
// Require sphere module
const sphere = require('./sphere')
// Require cone module
const cone = require('./cone')
// Require the modelShapes module

// Require Model Shapes module to get the total volumes of object
const modelShapes = require('./model-shapes')

// New Cone with height = 5 and radius = 4
let theCone = new cone(10,5)

// New Sphere with radius = 5
let theSphere = new sphere(8)


// Get the  volume of newCone and newSphere
let total_volumes = modelShapes([theCone, theSphere])

// print it out
console.log(total_volumes)