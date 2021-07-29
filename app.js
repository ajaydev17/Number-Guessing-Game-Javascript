// Set screen zoom level

document.body.style.zoom = "100%";

// variable values

const minValue = 1,
    maxValue = 10;

const winningNumber = () => {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

let guessLeft = 3;

// UI variables

const UIgame = document.querySelector("#game"),
    UIminValue = document.querySelector(".min-value"),
    UImaxValue = document.querySelector(".max-value"),
    UIguessedNumber = document.querySelector("#guessed-number"),
    UIsubmitButton = document.querySelector("#submit-button"),
    UImessage = document.querySelector(".message");

UIgame.addEventListener("mousedown", (event) => {
    if (event.target.className === "play-again") {
        window.location.reload();
    }
});

// Set UI min and max values

UIminValue.textContent = minValue;
UImaxValue.textContent = maxValue;

// Listener for the button click event

UIsubmitButton.addEventListener("click", () => {
    guessedNumber = parseInt(UIguessedNumber.value);

    if (isNaN(guessedNumber) || guessedNumber < 0 || guessedNumber > 10) {
        UImessage.style.color = "red";
        setMessage(
            `Please enter the number between ${minValue} and ${maxValue}.`
        );
    } else if (winningNumber() === guessedNumber) {
        gameOver(true, `${guessedNumber} is coreect!, YOU WON.`, true);
    } else {
        guessLeft = guessLeft - 1;

        if (guessLeft === 0) {
            gameOver(
                false,
                `Game over, YOU LOST. The correct answer was ${winningNumber()}.`,
                true
            );
        } else {
            UImessage.style.color = "red";
            setMessage(
                `${guessedNumber} is not correct. You have ${guessLeft} guess left.`
            );
        }
    }
});

const gameOver = (wonOrLost, message, setDisabled) => {
    let color;

    wonOrLost === true ? (color = "green") : (color = "red");
    UIguessedNumber.disabled = setDisabled;
    UIguessedNumber.style.borderColor = color;
    UImessage.style.color = color;

    UIsubmitButton.className += "play-again";
    UIsubmitButton.value = "Play Again";

    setMessage(message);
};

const setMessage = (message) => {
    UImessage.textContent = message;
};
