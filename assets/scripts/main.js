const dictionary = ['apple','plane', 'spark', 'hello']
const wordleGrid = document.getElementById('wordle-grid');


function addCellToGrid(row, col) {
    const cell = document.createElement('div');
    cell.classList.add('letter');
    cell.id = `${row}-${col}`;
    wordleGrid.appendChild(cell);
}

const gameConfig = {
    rows:5,
    cols:5,
    word:'hello',
}

for (let row = 0; row < gameConfig.rows; row++) {
    for(let col = 0; col < gameConfig.cols; col++){
        addCellToGrid(row, col);
    }
}

function addLetterToBox(letter, row, col) {
    const cell = document.getElementById(`${row}-${col}`);
    cell.innerText = letter;
}

const gameState = {
    currentAttempt: 0,
    currentPosition:0,
    currentGuess:'' 
}

function isLetter(letter) {
    return letter.length === 1 && letter.match(/[a-z]/i);
}

async function isWordValid(word) {
    const response = await fetch(`https://api.dictionaryapi.dec/api/v2/entries/en/${word}`).then((response) =>response.json());
    console.log(Array.isArray(reponse) && response.length > 0);
    return Array.isArray(response) && response.length > 0;
}

document.addEventListener('keydown', async(event) => {
    console.log(event.key);

    if(event.key ==='Enter') {
        // did thet finish all their attempts
        if(gameState.currentAttempt === gameConfig.rows -1) {
            console.log('Game Over');
        }
        
        //check if they provided 5 characters
        if(gameState.currentPosition !== gameConfig.cols - 1){
            console.log('you did not provided 5 characters');
        }
        //check if it a correct word
        if(isWordValid(gameState.currentGuess)) {
            console.log('You guessed a valid word')
        }
        // are my characters in the right position
        //did they finish all theur attempts
        // if it is correct, show the word in green
        gameState.currentAttempt++;
        gameState.currentPosition = 0;
        gameState.currentGuess = '';
    }
    if(event.key ==='Backspace') {
        addLetterToBox('', 0, gameState.currentPosition);
        gameState.currentPosition--;
        return;
    }

    if(isLetter(event.key)){
    addLetterToBox(
        event.key, gameState.currentAttempt ,gameState.currentGuess);
    gameState.currentGuess += event.key;
    if(gameState.currentPosition !== gameConfig.cols -1) {
        gameState.currentPosition++;
    }
    }
})