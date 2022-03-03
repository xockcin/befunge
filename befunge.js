/* 
note: At every step, I need to know two things:
1. What do I do?
2. Which direction am I going?

*/

const testString = ">987v>.v\nv456<  :\n>321 ^ _@";

function interpret(code) {
  // step one: turn string into 2d array
  const grid = code.split("\n").map(line => line.split(""))

  // step two: define stack
  const stack = []
  const output = []

  // step three: define state
  const state = {
    location: [0,0],
    direction: grid[0][0]
  }
  

  // 

}

interpret(testString)