const selectingMove = ["Scissors" , "Rock" ,"Paper"];                   //defining a moves to the computer player 

function getComputerChoice () {                                         //make a computer randomly select the moves and saves it
    let randomIndex = Math.floor(Math.random() * selectingMove.length)

    return selectingMove[randomIndex]
}



function getHumanChoice (roundNumber, humanScore, computerScore) {      //adding a popup with variables (Round number, Human Score, Computer Score,) to let the Human types what his moves and saves it
    let userInput = window.prompt(`Type your move
Round:${roundNumber + 1}     Human Point:${humanScore}     Computer Point:${computerScore}`)
    let cleanInput = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase(); //changing the input text into a clean text Example :(roCk to Rock)

    return cleanInput
}


function playGame() {
    let humanScore = 0                          //defining the human score and computer score and setting it to 0
    let computerScore = 0

function playRound(humanChoice, computerChoice){   //making comparison between the computer selection and the human input and add a point to the winner
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


for (let i = 0; i < 5; i++ ){                      //adding a round system which is a 5 round
    const humanSelection = getHumanChoice(i , humanScore, computerScore);
    const computerSelection = getComputerChoice();

    playRound(humanSelection,computerSelection) 
}

let winnerPlayer = ""        //defining a winner player and setting it to blank

if (humanScore > computerScore){ // Determine final match winner based on highest score
    winnerPlayer = "Human!"
} else if (computerScore > humanScore) { 
    winnerPlayer = "Computer!"
} else { // if its equal its a tie
    winnerPlayer = "Nobody its a tie game!"
}

alert(`The winner is ${winnerPlayer}`) // making a popup to tell the user who is the winner 

}

playGame();  