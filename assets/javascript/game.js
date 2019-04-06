// Counters for wins and guesses
var wins = 0;
var guessesRemaining = 10;
var won = false;

// var startBox = document.getElementById("press start");

// Array of strings to guess
var word = ["happy", "sad", "excited", "mad"]

// Array of every letter
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]

// Array of letters already guesses
var guesses = [];

// Assign pointers to important html elements to variables
var wordBox = document.getElementById("word-box");
var lettersGuessedBox = document.getElementById("letters-guessed-box");
var numberRemainingGuessesBox = document.getElementById("missed-box");
var winsBox = document.getElementById("wins-box");

// Generate a random index of the word array and return the string at index
function random(word) {
    var randomNumber = Math.floor(Math.random() * word.length);
    console.log(randomNumber);
    return word[Math.floor(Math.random() * word.length)]
}

// Assign the random string to a variable computerPick
var computerPick = random(word);
console.log(computerPick);

//Use the chosen string to generate a sequence of underscores to print
function writeCurrentWord(word) {
    var currentWord = " ";
    console.log(currentWord);

    // Iterate through all the characters of the chosen string except the last
    for (var i = 0; i < word.length - 1; i++) {
        if (word.charAt(i).toUpperCase() === " ") {
            currentWord += "\ \ ";
        }
        else if (!guesses.includes(word.charAt(i).toUpperCase())) {
            currentWord += "_ ";
        }
        else {
            currentWord += word.charAt(i);
        }
    }

    // Final character of string
    if (!guesses.includes(word.charAt(word.length - 1).toUpperCase())) {
        currentWord += "_";
    }
    else {
        currentWord += word.charAt(word.length - 1);
    }

    // Underscores string to the word box on screen
    wordBox.textContent = currentWord;
}
writeCurrentWord(computerPick);

function writeGuessedCharacters() {
    var guessedLettersString = "";
    console.log(guessedLettersString);
    for (var i = 0; i < guesses.length - 1; i++) {
        if (!computerPick.toUpperCase().includes(guesses[i])) {
            guessedLettersString += guesses[i] + ", ";
        }
    }
    if (!computerPick.toUpperCase().includes(guesses[guesses.length - 1])) {
        guessedLettersString += guesses[guesses.length - 1];
    }
    lettersGuessedBox.textContent = guessedLettersString;
}

function resetGame() {
    guesses = [];
    computerPick = random(word);
    writeCurrentWord(computerPick);
    guessesRemaining = 10;
    numberRemainingGuessesBox.textContent = guessesRemaining;
    lettersGuessedBox.textContent = "";
    winsBox.textContent = wins;
}

document.onkeyup = function (event) {
    var userInput = event.key;
    userInput = userInput.toUpperCase();

    if (alphabet.includes(userInput) && !guesses.includes(userInput)) {
        guesses.push(userInput);

        if (computerPick.toUpperCase().includes(userInput)) {
            writeCurrentWord(computerPick);
        }
        else {
            writeGuessedCharacters();
            guessesRemaining--;
            numberRemainingGuessesBox.textContent = guessesRemaining;
        }
    }

    if (guessesRemaining === 0) {
        resetGame();
    }

    if (won) {
        won = false;
        resetGame();
        wins++;
    }

}