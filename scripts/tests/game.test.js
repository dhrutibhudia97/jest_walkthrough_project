/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

//test to display alert if player makes wrong move.
//catch when alert happens and divert into empty function
jest.spyOn(window, "alert").mockImplementation(() => { });

//same for every HTML file you want to load into DOM
beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("pre-game", () => {
    test("clicking buttons before newGame should fail", () => {
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    //test if turn number key exists in game.
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("turnInProgress key value is false", () => {
        expect("turnInProgress" in game).toBe(true);
    });
});

//function to reset game score
describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });

    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });

    test ("should add 1 move to the computers game array", () => {
        expect(game.currentGame.length).toBe(1);
    })

});

//beforeEach runs before each test is run to reset the state each time.
describe("gameplay works correctly", () => {
    beforeEach (() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });

    // reset the game state after each test.
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });

    //should be 1 element in current game array
    //creates test to addTurn to check that there are 2 elements
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });

    //check to see if button is lighted up
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        //expected that buttons class list contains the light class.
        expect(button.classList).toContain("light");
    });
    test("should toggle turnInProgress to true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    //adding one turn and pushing into playerMoves array before calling playerTurn
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("clicking during computer sequence should fail", () => {
        showTurns();
        //reset game.lasbutton key so its empty
        game.lastButton = "";
        document.getElementById("button2").click();
        //contents of last button shouldnt be changed after we clear it if clicks are disabled.
        expect(game.lastButton).toEqual("");
    });
});

