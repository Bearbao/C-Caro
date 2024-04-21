document.addEventListener("DOMContentLoaded", function () {
  const statusElement = document.getElementById("status");
  const statusElement1 = document.getElementById("status1");

  const restartButton = document.getElementById("restart-btn");
  const startButton = document.getElementById("start-btn");

  const boardElement = document.getElementById("board");

  let dimension = 3;

  let singlePlayerMode = false;
  let squares = Array(dimension).fill(Array(dimension).fill(null));

  let xIsNext = Math.random() < 0.5;
  let theWinner = null;
  let winningLine = [];

  restartButton.addEventListener("click", restartGame);
  startButton.addEventListener("click", startGame);

  singlePlayerToggle.addEventListener("click", function () {
    toggleSinglePlayerMode();
    restartGame();
    if (singlePlayerMode && !xIsNext) {
      makeComputerMove();
    }
  });

  singlePlayerToggle.addEventListener("click", function () {
    toggleSinglePlayerMode();
    startGame();
    if (singlePlayerMode && !xIsNext) {
      makeComputerMove();
    }
  });

  function handleClick(row, col) {
    if (theWinner || squares[row][col]) {
      return;
    }

    const newSquares = squares.map((row) => [...row]);
    newSquares[row][col] = xIsNext ? "X" : "O";
    squares = newSquares;
    squares = newSquares;
    xIsNext = !xIsNext;

    const winner = calculateWinner(newSquares, row, col);
    if (winner) {
      theWinner = winner;
      winningLine = findWinningLine(newSquares, row, col, winner);
    }

    renderBoard();
    updateStatus();
    updateStatus1();

    if (singlePlayerMode && !theWinner && !xIsNext) {
      makeComputerMove();
    }
  }

  function calculateWinner(currentSquares, row, col) {
    const currentPlayer = currentSquares[row][col];

    // Check horizontally
    let count = 1;
    let leftCol = col - 1;
    while (leftCol >= 0 && currentSquares[row][leftCol] === currentPlayer) {
      count++;
      leftCol--;
    }
    let rightCol = col + 1;
    while (
      rightCol < dimension &&
      currentSquares[row][rightCol] === currentPlayer
    ) {
      count++;
      rightCol++;
    }
    if (count >= 3) {
      return currentPlayer;
    }

    count = 1;
    let topRow = row - 1;
    while (topRow >= 0 && currentSquares[topRow][col] === currentPlayer) {
      count++;
      topRow--;
    }
    let bottomRow = row + 1;
    while (
      bottomRow < dimension &&
      currentSquares[bottomRow][col] === currentPlayer
    ) {
      count++;
      bottomRow++;
    }
    if (count >= 3) {
      return currentPlayer;
    }

    count = 1;
    let topLeftRow = row - 1;
    let topLeftCol = col - 1;
    while (
      topLeftRow >= 0 &&
      topLeftCol >= 0 &&
      currentSquares[topLeftRow][topLeftCol] === currentPlayer
    ) {
      count++;
      topLeftRow--;
      topLeftCol--;
    }
    let bottomRightRow = row + 1;
    let bottomRightCol = col + 1;
    while (
      bottomRightRow < dimension &&
      bottomRightCol < dimension &&
      currentSquares[bottomRightRow][bottomRightCol] === currentPlayer
    ) {
      count++;
      bottomRightRow++;
      bottomRightCol++;
    }
    if (count >= 3) {
      return currentPlayer;
    }

    count = 1;
    let topRightRow = row - 1;
    let topRightCol = col + 1;
    while (
      topRightRow >= 0 &&
      topRightCol < dimension &&
      currentSquares[topRightRow][topRightCol] === currentPlayer
    ) {
      count++;
      topRightRow--;
      topRightCol++;
    }
    let bottomLeftRow = row + 1;
    let bottomLeftCol = col - 1;
    while (
      bottomLeftRow < dimension &&
      bottomLeftCol >= 0 &&
      currentSquares[bottomLeftRow][bottomLeftCol] === currentPlayer
    ) {
      count++;
      bottomLeftRow++;
      bottomLeftCol--;
    }
    if (count >= 3) {
      return currentPlayer;
    }

    return null;
  }

  function findWinningLine(currentSquares, row, col, winner) {
    const currentPlayer = currentSquares[row][col];
    const lines = [];

    let leftCol = col - 1;
    while (leftCol >= 0 && currentSquares[row][leftCol] === currentPlayer) {
      lines.push([row, leftCol]);
      leftCol--;
    }
    lines.push([row, col]);
    let rightCol = col + 1;
    while (
      rightCol < dimension &&
      currentSquares[row][rightCol] === currentPlayer
    ) {
      lines.push([row, rightCol]);
      rightCol++;
    }
    if (lines.length >= 3) {
      return lines;
    }

    let topRow = row - 1;
    while (topRow >= 0 && currentSquares[topRow][col] === currentPlayer) {
      lines.push([topRow, col]);
      topRow--;
    }
    lines.push([row, col]);
    let bottomRow = row + 1;
    while (
      bottomRow < dimension &&
      currentSquares[bottomRow][col] === currentPlayer
    ) {
      lines.push([bottomRow, col]);
      bottomRow++;
    }
    if (lines.length >= 3) {
      return lines;
    }

    let topLeftRow = row - 1;
    let topLeftCol = col - 1;
    while (
      topLeftRow >= 0 &&
      topLeftCol >= 0 &&
      currentSquares[topLeftRow][topLeftCol] === currentPlayer
    ) {
      lines.push([topLeftRow, topLeftCol]);
      topLeftRow--;
      topLeftCol--;
    }
    lines.push([row, col]);
    let bottomRightRow = row + 1;
    let bottomRightCol = col + 1;
    while (
      bottomRightRow < dimension &&
      bottomRightCol < dimension &&
      currentSquares[bottomRightRow][bottomRightCol] === currentPlayer
    ) {
      lines.push([bottomRightRow, bottomRightCol]);
      bottomRightRow++;
      bottomRightCol++;
    }
    if (lines.length >= 3) {
      return lines;
    }

    let topRightRow = row - 1;
    let topRightCol = col + 1;
    while (
      topRightRow >= 0 &&
      topRightCol < dimension &&
      currentSquares[topRightRow][topRightCol] === currentPlayer
    ) {
      lines.push([topRightRow, topRightCol]);
      topRightRow--;
      topRightCol++;
    }
    lines.push([row, col]);
    let bottomLeftRow = row + 1;
    let bottomLeftCol = col - 1;
    while (
      bottomLeftRow < dimension &&
      bottomLeftCol >= 0 &&
      currentSquares[bottomLeftRow][bottomLeftCol] === currentPlayer
    ) {
      lines.push([bottomLeftRow, bottomLeftCol]);
      bottomLeftRow++;
      bottomLeftCol--;
    }
    if (lines.length >= 3) {
      return lines;
    }

    return [];
  }

  function renderBoard() {
    boardElement.innerHTML = "";
    for (let row = 0; row < dimension; row++) {
      const rowElement = document.createElement("div");
      rowElement.className = "board-row";

      for (let col = 0; col < dimension; col++) {
        const value = squares[row][col];
        const isWinningSquare = winningLine.some(
          ([winRow, winCol]) => winRow === row && winCol === col
        );

        const squareButton = document.createElement("button");
        squareButton.className = "square";
        squareButton.style.backgroundColor = isWinningSquare
          ? "#85ceee"
          : "white";
        squareButton.style.color = value === "X" ? "red" : "black";
        squareButton.style.fontWeight = isWinningSquare ? "bold" : "normal";
        squareButton.textContent = value;
        squareButton.addEventListener("click", () => {
          if (!singlePlayerMode || (singlePlayerMode && xIsNext)) {
            handleClick(row, col);
          }
        });

        rowElement.appendChild(squareButton);
      }

      boardElement.appendChild(rowElement);
    }
  }

  function updateStatus() {
    if (theWinner) {
    } else {
      statusElement.textContent = ` Lượt Người Chơi: ${xIsNext ? "X" : "O"}`;
    }
  }

  function updateStatus1() {
    if (theWinner) {
      statusElement1.textContent = `Người Chơi ${theWinner} Đã Chiến thắng! Bấm Chơi Lại Để Bắt Đầu!`;
    } else {
      statusElement1.textContent = `Hãy Chiến Đấu Hết Minh!`;
    }
  }

  function restartGame() {
    squares = Array(dimension).fill(Array(dimension).fill(null));
    xIsNext = true;
    theWinner = null;
    winningLine = [];
    renderBoard();
    updateStatus();
    updateStatus1();
  }

  function startGame() {
    squares = Array(dimension).fill(Array(dimension).fill(null));
    xIsNext = true;
    theWinner = null;
    winningLine = [];
    renderBoard();
    updateStatus();
    updateStatus1();
  }

  function isWinningMove(currentSquares, player) {
    for (let row = 0; row < dimension; row++) {
      for (let col = 0; col < dimension; col++) {
        if (!currentSquares[row][col]) {
          const newSquares = currentSquares.map((row) => [...row]);
          newSquares[row][col] = player;
        }
      }
    }
    return false;
  }

  function toggleSinglePlayerMode() {
    singlePlayerMode = !singlePlayerMode;
    if (singlePlayerMode) {
      singlePlayerToggle.innerHTML = "&#x1F4BB;";
    } else {
      singlePlayerToggle.innerHTML = "&#x1F477; ";
    }
  }
  renderBoard();
  updateStatus();
});
