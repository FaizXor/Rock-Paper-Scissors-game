const selectingMove = ["Scissors" , "Rock" ,"Paper"];

function getComputerChoice () {
    let randomIndex = Math.floor(Math.random() * selectingMove.length)

    return selectingMove[randomIndex]
}

console.log(getComputerChoice());

function getHumanChoice () {
    let userInput = window.prompt("Type your move")

    return userInput
}

console.log(getHumanChoice());