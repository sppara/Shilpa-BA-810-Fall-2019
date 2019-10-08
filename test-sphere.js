// Test the modules
// Require sphere module
const sphere = require('./sphere')

/* Example 1 for sphere: Initiate the sphere constructor */
let theSphere = new sphere(5)
// Print the answer
console.log(theSphere.calculate())
/* Example 2 for sphere: Initiating constructor without property and adding property later*/
let theSphere2 = new sphere();

// Add the radius
theSphere2.radius = 5

console.log(theSphere2)

// Calculate the Volume
let vol = theSphere2.calculate()
console.log(vol)
