const selectingMove = ["Scissors" , "Rock" ,"Paper"];

function getComputerChoice () {
    let randomIndex = Math.floor(Math.random() * selectingMove.length)

    return selectingMove[randomIndex]
}



function getHumanChoice (roundNumber, humanScore, computerScore) {
    let userInput = window.prompt(`Type your move
Round:${roundNumber + 1}     Human Point:${humanScore}     Computer Point:${computerScore}`)
    let cleanInput = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();

    return cleanInput
}


function playGame() {
    let humanScore = 0
    let computerScore = 0

function playRound(humanChoice, computerChoice){
    if (humanChoice === computerChoice) {
        alert(`it is a tie!     Computer Choice: ${computerChoice}`); 
    } else if ((humanChoice === "Rock") && (computerChoice === "Scissors") ) {
        alert(`You won Yay!     Computer Choice: ${computerChoice}`);
        humanScore++;
    } else if ((humanChoice === "Paper") && (computerChoice === "Rock")) {
        alert(`You won :) !     Computer Choice: ${computerChoice}`);
        humanScore++;
    } else if ((humanChoice === "Scissors") && (computerChoice === "Paper")) {
        alert(`You won yippee!  Computer Choice: ${computerChoice}`)
        humanScore++;
    }

    else {
        alert(`Computer Won :(  Computer Choice: ${computerChoice}`)
        computerScore++;
    }
}


for (let i = 0; i < 5; i++ ){
    const humanSelection = getHumanChoice(i , humanScore, computerScore);
    const computerSelection = getComputerChoice();

    playRound(humanSelection,computerSelection) 
}

let winnerPlayer = ""

if (humanScore > computerScore){
    winnerPlayer = "Human!"
} else if (computerScore > humanScore) {
    winnerPlayer = "Computer!"
} else {
    winnerPlayer = "Nobody its a tie game!"
}

alert(`The winner is ${winnerPlayer}`)

}

playGame();