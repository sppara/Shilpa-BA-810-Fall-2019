// Test the modules
// Require cone module
const cone = require('./cone')

/* Example 1 for cone: Initiate the cone constructor */
let theCone = new cone(5,4)
// Print the answer
console.log(theCone.calculate())

/* Example 2 for cone: Initiating constructor without property and adding property later*/
let theCone2 = new cone();
// Add the height
theCone2.height = 30;

// Add the radius
theCone2.radius = 5

// Calculate the Volume
let vol = theCone2.calculate()
console.log(vol)
