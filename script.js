const selectingMove = ["Scissors" , "Rock" ,"Paper"];

function getComputerChoice () {
    let randomIndex = Math.floor(Math.random() * selectingMove.length)

    return selectingMove[randomIndex]
}

console.log(getComputerChoice());

