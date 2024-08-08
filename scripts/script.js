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
  const restartGame = $(".restart-btn");
  const pOneName = $(".player-one-name");
  const pTwoName = $(".player-two-name");
  const pOneRole = $(".player-one-role");
  const pTwoRole = $(".player-two-role");
  const xValue = "x";
  const circleValue = "circle";
  let playerTurn, winner;
  let firstPlayer, secondPlayer;
  let firstRole, secondRole;

  const startGame = () => {
    playerTurn = firstRole;
    winner = null;
    cells.each(function () {
      $(this).removeClass(xValue);
      $(this).removeClass(circleValue);
      $(this).click(handleClick);
    });
    insertPlayerTurn();
    playerTurnHandler();
  };

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
        $(".signUp").fadeOut(500, function () {
          $(".mainBoard").fadeIn(500);
        });

        firstRole = data[`player-one-role-holder`];
        secondRole = data[`player-two-role-holder`];

        firstPlayer = data[`player-one-name-holder`];
        secondPlayer = data[`player-two-name-holder`];

        pOneName.text(firstPlayer);
        pTwoName.text(secondPlayer);
        pOneRole.text(firstRole === "x" ? "X" : "O");
        pTwoRole.text(secondRole === "circle" ? "O" : "X");

        startGame();
        setTimeout(() => {
          event.target.reset();
        }, 1000);
      }
    }
  });

  function handleClick() {
    if (
      !this.classList.contains(circleValue) &&
      !this.classList.contains(xValue)
    ) {
      this.classList.add(playerTurn);
      // check win
      if (isWin(playerTurn)) {
        winner = playerTurn === firstRole ? firstPlayer : secondPlayer;
        $(".mainBoard").fadeOut(1000, function () {
          $(".winner-holder").text(winner);
          $(".end-game-modal")[0].showModal();
        });
      } else if (isDraw()) {
        // check draw
        $(".mainBoard").fadeOut(1000, function () {
          $(".end-game-modal h4").replaceWith(`<h4> It is a Draw </h4>`);
          $(".end-game-modal span").replaceWith(
            `<span>Try Play again 👀 </span>`
          );
          $(".end-game-modal")[0].showModal();
        });
      } else {
        // change turn
        playerTurn = playerTurn === firstRole ? secondRole : firstRole;

        insertPlayerTurn();
        playerTurnHandler();
      }
    }
  }
  function playerTurnHandler() {
    board.removeClass(xValue);
    board.removeClass(circleValue);
    board.addClass(playerTurn);
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
    const playerName = playerTurn === firstRole ? firstPlayer : secondPlayer;
    $(".player-turn")
      .find(".title")
      .text(`${playerName || "unknown"}'s`);
  }
  restartGame.click(function () {
    $(".end-game-modal")[0].close();
    $(".signUp").fadeIn(500);
    playerTurn, winner;
    firstPlayer, secondPlayer;
    firstRole, secondRole;
  });
});
