/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;//x (seven horizontal columns)
let HEIGHT = 6;//y (six vertical rows)

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

//6 arrays in the board array (each array represents height or y), each array has 7 elements (each element represents width or x)


//function to make dynamic board in the form of array of arrays
//iterate over every y in board, create an array of x, and push it into board
function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
  return board;
}

/** makeHtmlBoard function: make HTML table and row of column tops on the index.html page */

function makeHtmlBoard() {
  //select the board element in the index.html
  let board = document.querySelector("#board");

  //create table row element and set id of column-top where the players click on divisions
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  //handleClick function given below on click column-top, 
  //drops the corresponding colored ball into the column

  //headCell = top rown where the players click
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td"); 
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  //create table rows 
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

//function to find an empty spot for the dropped ball in the column
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}


function placeInTable(y, x) {
  let piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);

  //y and x location for the empty spot
  let spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */
function endGame(msg) {
  alert("Game Over!");
}

/** handleClick: handle click of column top to play piece */

function handleClick(event) {
  // get x from ID of clicked cell
  let x = +event.target.id;
  //alert(x); working, returning x value

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;

//Update HTML table in the function below
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board.every(row => row.every(cell => cell))) {
    return endGame("Tie!");
  }

  // switch players
  //ternary oprator: substitute for if else statement
  currPlayer = currPlayer === 1 ? 2 : 1;
}




/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }


  //iterate over x and y
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      //horizontal row
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //vertical row
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //diagonal to right
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //diagonal to left
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();


