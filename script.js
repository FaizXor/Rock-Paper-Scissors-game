const selectingMove = ["Scissors" , "Rock" ,"Paper"];

function getComputerChoice () {
    let randomIndex = Math.floor(Math.random() * selectingMove.length)

    return selectingMove[randomIndex]
}



function getHumanChoice () {
    let userInput = window.prompt("Type your move")
    let cleanInput = userInput.charAt(0).toUpperCase() + userInput.slice(1).toLowerCase();

    return cleanInput
}


let humanScore = 0
let computerScore = 0

function playRound(humanChoice, computerChoice){
    if (humanChoice === computerChoice) {
        alert("hollu shi");
    } else if ((humanChoice === "Rock") && (computerChoice === "Scissors") ) {
        alert("yay")
    } else if ((humanChoice === "Paper") && (computerChoice === "Rock")) {
        alert("horray")
    } else if ((humanChoice === "Scissors") && (computerChoice === "Paper")) {
        alert("yeppy")
    }

    else {
        alert("oh no!")
    }
}

const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

playRound(humanSelection,computerSelection) 