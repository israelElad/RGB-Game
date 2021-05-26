var numOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

/*
    In order to avoid name collisions and keep the code more structured,
    we should insert every function into an appropriate object.
    I won't do it here(to save time), but here's an example:
    instead of:
    init();
    function init() {
        setupModeButtonsClick();
        setupSquaresClick();
        reset();
    }
    we do this:
*/
var game={};
game.init=function(){
    setupModeButtonsClick();
    setupSquaresClick();
    reset();
}
game.init();


function setupModeButtonsClick(){
    //mode buttons event listeners
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            //when clicked- remove "selected" from all buttons and only add to this button
            for (let j = 0; j < modeButtons.length; j++) {
                modeButtons[j].classList.remove("selected");
            }
            this.classList.add("selected");
            // ternary operator
            this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
            reset();
        })
    }
}

function setupSquaresClick(){
    //click event listeners for the squares
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            //grab clicked square's color
            var clickedColor = this.style.background;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeSquaresColors(clickedColor);
                h1.style.background = clickedColor;
            }
            else {
                //makes the clicked square disappear by changings it's color to the body's background color.
                this.style.background = window.getComputedStyle(document.body).background;
                messageDisplay.textContent = "Try again!"
            }
        })
    }
}

function reset() {
    //generate new colors
    colors = generateRandomColors(numOfSquares);
    //pick random color from the array
    pickedColor = pickColor();
    //change colorDisplay to match picked color 
    colorDisplay.textContent = pickedColor;
    //change resetButton back to new colors button
    resetButton.textContent = "New Colors"
    //reset messageDisplay
    messageDisplay.textContent = "";
    //change colors of squares
    for (let i = 0; i < squares.length; i++) {
        //if the square has a matching color in the colors array
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        }
        else { //no corresponding color- make the square disappear
            squares[i].style.display = "none";
        }
    }
    //reset h1 background
    h1.style.background = "steelblue";

}

resetButton.addEventListener("click", function () {
    reset();
})


function changeSquaresColors(newColor) {
    squares.forEach(function (square) {
        square.style.background = newColor;
    })
}

//choose randomly the square (the color) that the user needs to pick
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    rndColorsArr = [];
    for (let i = 0; i < num; i++) {
        //get random color and push to array
        rndColorsArr.push(randomColor());
    }
    return rndColorsArr;
}

function randomColor() {
    //pick "red" from 0-255
    var r = Math.floor(Math.random() * 256);
    //pick "green" from 0-255
    var g = Math.floor(Math.random() * 256);
    //pick "blue" from 0-255
    var b = Math.floor(Math.random() * 256);
    //refactor to "rgb(r, g, b)"
    return "rgb(" + r + ", " + g + ", " + b + ")";
}