$(function () {
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const board = $(".board");
  const cells = $(".cell");
  const fromSubmit = $("#from-game");
  const playerOneName = $(".player-one-name");
  const playerTwoName = $(".player-two-name");
  const playerOneRole = $(".player-one-role");
  const playerTwoRole = $(".player-two-role");
  const xValue = "x";
  const circleValue = "circle";
  let circleTurn, winner;
  let player1, player2;

  fromSubmit.on("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (
      data[`player-one-name-holder`].length >= 3 &&
      data[`player-two-name-holder`].length >= 3 &&
      data[`player-one-role-holder`] &&
      data[`player-two-role-holder`]
    ) {
      if (data[`player-one-role-holder`] !== data[`player-two-role-holder`]) {
        $(".signUp").addClass("hideBox");
        setTimeout(() => {
          $(".mainBoard").removeClass("hideBox");
        }, 1000);
        playerOneName.text(data[`player-one-name-holder`]);
        playerTwoName.text(data[`player-two-name-holder`]);
        playerOneRole.text(data[`player-one-role-holder`]);
        playerTwoRole.text(data[`player-two-role-holder`]);
        player1 = data[`player-one-name-holder`];
        player2 = data[`player-two-name-holder`];
        startGame();
      }
    }
  });

  const startGame = () => {
    circleTurn = player1;
    winner = null;
    cells.each(function () {
      $(this).removeClass(xValue);
      $(this).removeClass(circleValue);
      $(this).click(handleClick);
    });
    insertPlayerTurn();
    playerTurnHandler();
  };

  function handleClick() {
    if (
      !this.classList.contains(circleValue) &&
      !this.classList.contains(xValue)
    ) {
      const playerTurn = circleTurn ? circleValue : xValue;

      circleTurn ? this.classList.add(circleValue) : this.classList.add(xValue);
      console.log(isWin(playerTurn));
      if (isWin(playerTurn)) {
        winner = circleTurn ? player2 : player1;
        alert(`the ${winner} win the game`);

        $(".winner-holder").text(winner);
        $(".end-game-dialog").attr("open", "true");
        $(".mainBoard").addClass("hideBox");
      } else if (isDraw()) {
        alert("end Game its draw");
      } else {
        circleTurn = !circleTurn;
        insertPlayerTurn();
        playerTurnHandler();
      }
    }
  }
  function playerTurnHandler() {
    board.removeClass(xValue);
    board.removeClass(circleValue);
    circleTurn ? board.addClass(circleValue) : board.addClass(xValue);
  }

  function isWin(playerTurn) {
    const $cellElements = $(".cell");
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return $cellElements[index].classList.contains(playerTurn);
      });
    });
  }
  function isDraw() {
    const $cellElements = $(".cell");
    return (
      $cellElements.length > 0 &&
      $cellElements.toArray().every((cell) => {
        const $cell = $(cell);
        return $cell.hasClass(xValue) || $cell.hasClass(circleValue);
      })
    );
  }
  function insertPlayerTurn() {
    $(".player-turn")
      .find(".title")
      .text(`${circleTurn ? player2 : player1 || "unknown"}'s`);
  }
  function endGame() {}
});
