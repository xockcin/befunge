const testString = ">987v>.v\nv456<  :\n>321 ^ _@";

function interpret(code) {
  // step one: turn string into 2d array
  const lines = code.split("\n")
  const grid = lines.map(line => line.split(""))
  
}

interpret(testString)