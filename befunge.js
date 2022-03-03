/* 
note: At every step, I need to know two things:
1. Where am I?
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
    x: 0,
    y: 0,
    direction: ">",
    stringMode: false
  }
  
  // step four: define symbols
  function doSymbol(symbol) {
    if (state.stringMode) {
      output.push(symbol.charCodeAt())
    } else {
      switch (symbol) {
        case "+":
          const a = stack.pop();
          const b = stack.pop();
          stack.push(a + b);
          break;
        case "-":
          const a = stack.pop();
          const b = stack.pop();
          stack.push(b - a);
          break;
        case "*":
          const a = stack.pop();
          const b = stack.pop();
          stack.push(a * b);
          break;
        case "/":
          const a = stack.pop();
          const b = stack.pop();
          stack.push(b / a);
          break;
        case "%":
          const a = stack.pop();
          const b = stack.pop();
          stack.push(b % a);
          break;
        case "!":
          stack.push(+!!stack.pop());
          break;
        case "`":
          const a = stack.pop();
          const b = stack.pop();
          stack.push(b > a);
          break;
        case ">":
          state.direction = ">";
          break;
        case "<":
          state.direction = "<";
          break;
        case "^":
          state.direction = "^";
          break;
        case "v":
          state.direction = "v";
          break;
        case "?":
          state.direction = [">", "<", "^", "v"][Math.floor(Math.random() * 4)];
          break;
        case "_":
          const x = stack.pop();
          state.direction = x
            ? (state.direction = "<")
            : (state.direction = ">");
          break;
        case "|":
          const x = stack.pop();
          state.direction = x
            ? (state.direction = "^")
            : (state.direction = "v");
          break;
        case '"':
          state.stringMode = !state.stringMode
        case ":":
          stack.push(stack[stack.length ? stack.length - 1 : 0]);
          break;
        case "\\":
          const a = stack.pop();
          const b = stack.pop();
          stack.push(b);
          stack.push(a);
          break;
        case "$":
          stack.push();
          break;
        case ".":
          const x = stack.pop();
          output.push(x);
          break;
        case ",":
          const x = stack.pop();
          output.push();
          break;
        case "p":
        // TODO
        case "g":
        // TODO
        case "@":
        // TODO
        case " ":
          break;
      }
    }
  }

  // step five: define movement
  function doMove(direction) {
    switch (direction) {
      case ">":
        state.x === grid[0].length - 1 ? state.x = 0 : state.x++
      case "<":
        state.x === 0 ? state.x = grid[0].length - 1 : state.x--
      case "v":
        state.y === grid.length - 1 ? (state.y = 0) : state.y++
      case "^":
        state.y === 0 ? (state.y = grid.length - 1) : state.y--
    }

  }

  // step six: define cycle
  while(1) {
    let symbol = grid[state.x][state.y]
    if (symbol === "@") {
      return output
    } else {
      doSymbol(symbol)
      doMove(direction)
    }
  }

}

interpret(testString)