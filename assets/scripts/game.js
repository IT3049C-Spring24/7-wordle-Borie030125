const wordToBeGuessed = "hello";
const userGuess = "heeyy";

if(wordToBeGuessed === userGuess) {
    console.log('You win');

}

userGuess.split('').forEach((letter, index)=> {
    if(letter === userGuess) {
        console.log(`Letter ${letter} is in the correct`);
    }
    else if(wordToBeGuessed.includes(letter)){
        console.log(`Letter ${letter} is in the word.`);
    }
    else{
        console.log(`Letter ${letter} is not in the correct position`);

    }
})