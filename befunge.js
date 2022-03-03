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
          let a = stack.pop();
          let b = stack.pop();
          stack.push(a + b);
          break;
        case "-":
          let c = stack.pop();
          let d = stack.pop();
          stack.push(d - c);
          break;
        case "*":
          let e = stack.pop();
          let f = stack.pop();
          stack.push(e * f);
          break;
        case "/":
          let g = stack.pop();
          let h = stack.pop();
          stack.push(h / g);
          break;
        case "%":
          let i = stack.pop();
          let j = stack.pop();
          stack.push(j % i);
          break;
        case "!":
          stack.push(+!!stack.pop());
          break;
        case "`":
          let k = stack.pop();
          let l = stack.pop();
          stack.push(l > k);
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
          let m = stack.pop();
          state.direction = m
            ? (state.direction = "<")
            : (state.direction = ">");
          break;
        case "|":
          let n = stack.pop();
          state.direction = n
            ? (state.direction = "^")
            : (state.direction = "v");
          break;
        case '"':
          state.stringMode = !state.stringMode
          break
        case ":":
          stack.push(stack[stack.length ? stack.length - 1 : 0]);
          break;
        case "\\":
          let o = stack.pop();
          let p = stack.pop();
          stack.push(p);
          stack.push(o);
          break;
        case "$":
          stack.push();
          break;
        case ".":
          let q = stack.pop();
          output.push(q);
          break;
        case ",":
          let r = stack.pop();
          output.push(String.fromCharCode(r));
          break;
        case "p":
        // TODO
        case "g":
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