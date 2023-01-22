let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
    //added player moves to my choices array
    choices: ["button1", "button2", "button3", "button4"]
};

function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;

    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                //only excepts click if length of currentgame > 0, 
                //so we know we have a game in progress.
                // only allows click if turn is not in progress
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute("id");
                    game.lastButton = move;
                    game.playerMoves.push(move);
                    lightsOn(move);
                    playerTurn();
                }
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

//add turn function empties playmoves and generates random 1/4 button choice.
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function showTurns() {
    //its changed to true because turns have started
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(function () {
        //setting the interval turning the lights on
        lightsOn(game.currentGame[game.turnNumber]);
        //incrementing turn number
        game.turnNumber++;
        //if turn number is equal or over the length of our
        //current game array the sequence is finished and we 
        //can clear our interval
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            //because our turns have now finished
            game.turnInProgress = false;
        }
        //turning the lights off
    }, 800);
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(function () {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };