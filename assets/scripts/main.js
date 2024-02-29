const gameState = {
    wordToGuess: '',
    currentAttempt: 0,
    currentPosition: 0,
    currentGuess: ''
};

const gameConfig = {
    rows: 5,
    cols: 5 
};

function setupGrid() {
    const wordleGrid = document.getElementById('wordle-grid');
    for (let row = 0; row < gameConfig.rows; row++) {
        for (let col = 0; col < gameConfig.cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('letter');
            cell.id = `L-${row}-${col}`;
            wordleGrid.appendChild(cell);
        }
    }
}

function addLetterToBox(row, col, letter) {
    const cellId = `L-${row}-${col}`;
    const cell = document.getElementById(cellId);
    if (cell) {
        cell.textContent = letter.toUpperCase();
    }
}

function isLetter(letter) {
    return letter.length === 1 && letter.match(/[a-z]/i);
}

async function isWordValid(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await fetch(url);
        return response.ok;
    } catch (error) {
        console.error("Error fetching word validation:", error);
        return false;
    }
}

async function setRandomWordAsTarget() {
    try {
        const response = await fetch('https://it3049c-hangman.fly.dev');
        if (!response.ok) throw new Error('Failed to fetch the word.');
        const data = await response.json();
        gameState.wordToGuess = data.word.toLowerCase();
        console.log("Target word set to:", gameState.wordToGuess); 
    } catch (error) {
        console.error("Error setting random word as target:", error);
    }
}

document.addEventListener('keydown', async (event) => {
    if (isLetter(event.key) && gameState.currentPosition < gameConfig.cols) {
        addLetterToBox(gameState.currentAttempt, gameState.currentPosition, event.key);
        gameState.currentGuess += event.key;
        gameState.currentPosition++;
    } else if (event.key === 'Backspace' && gameState.currentPosition > 0) {
        gameState.currentPosition--;
        gameState.currentGuess = gameState.currentGuess.slice(0, -1);
        addLetterToBox(gameState.currentAttempt, gameState.currentPosition, '');
    } else if (event.key === 'Enter') {
        if (gameState.currentGuess.length === gameConfig.cols) {
            checkAndDisplayGuess();
        } else {
            console.log('Incomplete guess');
        }
    }
});

async function checkAndDisplayGuess() {
    const guess = gameState.currentGuess.toLowerCase();
    const correctWord = gameState.wordToGuess.toLowerCase();
    for (let i = 0; i < guess.length; i++) {
        const cell = document.getElementById(`L-${gameState.currentAttempt}-${i}`);
        if (guess[i] === correctWord[i]) {
            cell.classList.add('correct');
        } else if (correctWord.includes(guess[i])) {
            cell.classList.add('misplaced');
        } else {
            cell.classList.add('wrong');
        }
    }

    // Prepare for the next guess
    gameState.currentAttempt++;
    gameState.currentPosition = 0;
    gameState.currentGuess = '';

    // Check for end of game conditions
    if (gameState.currentAttempt >= gameConfig.rows) {
        console.log('Game Over. The correct word was:', gameState.wordToGuess);
        // Optionally, implement game over logic here
    }
}

async function initializeGame() {
    setupGrid();
    await setRandomWordAsTarget();
}

initializeGame();