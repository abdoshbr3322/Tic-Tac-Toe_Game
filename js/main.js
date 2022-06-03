let boxs = Array.from(document.querySelectorAll(".game .box"));
let restart = document.querySelector(".game .restart");
let turn = document.querySelector(".game .turn");
let message = document.querySelector(".message");
const X_WINNER = document.querySelector(".game .x-wins div:last-child");
const O_WINNER = document.querySelector(".game .o-wins div:last-child");
const required = document.querySelector(".game .req div:last-child");

let xIcon = document.createElement("i");
xIcon.className = `fa-solid fa-xmark`;
let oIcon = document.createElement("i");
oIcon.className = `fa-solid fa-o`;

boxs.forEach((box) => {
  box.addEventListener("click", boxClicked);
});

function boxClicked(e) {
  let box = e.currentTarget;
  if (box.classList.contains("disabled")) {
    return 0;
  } else if (box.dataset.val === "o") {
    box.classList.add("disabled");
    box.classList.add("o-marked");
    box.dataset.win = "o";
    box.appendChild(oIcon.cloneNode(true));
    changeAll("x");
  } else if (box.dataset.val === "x") {
    box.classList.add("disabled");
    box.classList.add("x-marked");
    box.dataset.win = "x";
    box.appendChild(xIcon.cloneNode(true));
    changeAll("o");
  }
  checkGameWin();
}

function changeAll(mark) {
  boxs.forEach((box) => box.setAttribute("data-val", mark));
}

function checkGameWin() {
  let rowIndex = 1;
  for (let i = 0; i < boxs.length; i += 3) {
    let rowWin = { index: `row${rowIndex}`, times: 0 };
    for (let g = i; g <= i + 2; g += 2) {
      if (
        boxs[g].innerHTML === boxs[i + 1].innerHTML &&
        boxs[g].innerHTML !== ""
      ) {
        rowWin.times++;
      }
    }
    rowIndex++;
    if (rowWin.times === 2) {
      rowWin.winner = boxs[i].dataset.win;
      gameWon(rowWin);
      return;
    }
  }
  let colIndex = 1;
  for (let i = 0; i < 3; i++) {
    let colWin = { index: `col${colIndex}`, times: 0 };
    for (let g = i; g <= boxs.length; g += 6) {
      if (
        boxs[g].innerHTML === boxs[i + 3].innerHTML &&
        boxs[g].innerHTML !== ""
      ) {
        colWin.times++;
      }
    }
    colIndex++;
    if (colWin.times === 2) {
      colWin.winner = boxs[i].dataset.win;
      gameWon(colWin);
      return;
    }
  }
  let diagOneWin = { index: "diag1", times: 0 };
  for (let i = 0; i < boxs.length; i += 8) {
    if (boxs[i].innerHTML === boxs[4].innerHTML && boxs[i].innerHTML !== "") {
      diagOneWin.times++;
    }
  }
  if (diagOneWin.times === 2) {
    diagOneWin.winner = boxs[0].dataset.win;
    gameWon(diagOneWin);
    return;
  }
  let diagTwoWin = { index: "diag2", times: 0 };
  for (let i = 2; i < 7; i += 4) {
    if (boxs[i].innerHTML === boxs[4].innerHTML && boxs[4].innerHTML !== "") {
      diagTwoWin.times++;
    }
  }
  if (diagTwoWin.times === 2) {
    diagTwoWin.winner = boxs[2].dataset.win;
    gameWon(diagTwoWin);
    return;
  }
}

function gameWon(winnerInfo) {
  let winner = winnerInfo.winner;
  if (X_WINNER.innerHTMl == required.innerHTML) {
    gameFinished("x");
    return;
  } else if (O_WINNER.innerHTMl == required.innerHTML) {
    gameFinished("o");
    return;
  } else if (winner === "x") {
    X_WINNER.innerHTML++;
  } else if (winner === "o") {
    O_WINNER.innerHTML++;
  }
  let countDown = 3;
  message.innerHTML = `The Game Will Restart In ${countDown}`;
  let counter = setInterval(() => {
    countDown--;
    message.innerHTML = `The Game Will Restart In ${countDown}`;
    if (countDown === 0) {
      message.innerHTML = "";
      restartGame();
      clearInterval(counter);
    }
  }, 1000);
}

function gameFinished(winner) {
  let div = document.createElement("div");
  div.className = "won-message";
  let text = document.createTextNode(
    `Congratulations ${winner.toUpperCase()} Player You Won`
  );
  div.appendChild(text);
  div.append(document.createElement("hr"));
  let restartMessage = document.createElement("div");
  let countDown = 3;
  restartMessage.textContent = `The Game Will Restart In ${countDown}`;
  let counter = setInterval(() => {
    countDown--;
    restartMessage.textContent = `The Game Will Restart In ${countDown}`;
    if (countDown === 0) {
      restartGame(true);
      clearInterval(counter);
    }
  }, 1000);
  div.appendChild(restartMessage);
  document.body.appendChild(div);
}

restart.onclick = restartGame;
turn.onclick = function () {
  restartGame(true);
};
function restartGame(finished) {
  boxs.forEach((box) => {
    box.innerHTML = "";
    box.className = "box";
  });
  if (finished === true) {
    X_WINNER.innerHTML = 0;
    O_WINNER.innerHTML = 0;
    let wonMessage = document.querySelector(".won-message");
    wonMessage ? wonMessage.remove() : null;
  }
}
