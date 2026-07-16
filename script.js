document.body.style.overflow = 'hidden';

let scissorsChoice = document.getElementById('ScissorsButton')
let rockChoice = document.getElementById('RockButton')
let paperChoice = document.getElementById('PaperButton')
let computerPlayer = document.querySelector('.ComputerPlayer')
let blackOverlay = document.getElementById('blackOverlay')
let speechBubble = document.querySelector('.speechBubble')
let mainContainer = document.querySelector('.mainContainer')
let startPlay = document.querySelector('.startPlay')
let RoundText = document.querySelector('.Round')
let RoundNumContainer = document.querySelector('.RoundNum')
let roundNumChanger = document.querySelector('.Num')
let ComputerCard = document.querySelector('#ComputerCardMove')

const bipSound = new Audio('assets/Sounds/Pickup46.wav')
const crashSound = new Audio('assets/Sounds/Boom24.wav')

crashSound.volume = 0.8 ;
bipSound.volume = 1;
let soundInterval = null;

RoundText.textContent = "";
roundNumChanger.textContent = "";

function callback(mutationsList, observer) {
  console.log("Mutations:", mutationsList);
  console.log("Observer:", observer);
}

const mutationObserver = new MutationObserver(callback);

mutationObserver.observe(document.querySelector('.ComputerPlayer'), { attributes: true });

function triggerSpeechBubble(speechClassName){
    if (!speechBubble) return;

    if (soundInterval) {
        clearInterval(soundInterval);
        soundInterval = null;
    }  

    speechBubble.style.animationDuration = '';
    speechBubble.style.animationDelay = '';

    speechBubble.className = "speechBubble";
    speechBubble.className = `speechBubble ${speechClassName}`

    const computedStyle = window.getComputedStyle(speechBubble);
    const durationInSecond = parseFloat(computedStyle.animationDuration);
    const timingFunction = computedStyle.animationTimingFunction;
    
    let stepNumberText = timingFunction.replace("steps(","");
    stepNumberText = stepNumberText.replace(")","");
    const totalSteps = parseInt(stepNumberText, 10);

    const durationInMs = durationInSecond * 1000;
    const msPerStep = durationInMs / totalSteps

    let bipCount = 0;
    let maxBips = totalSteps;

    soundInterval = setInterval(() => {

        bipSound.currentTime = 0 ;
        bipSound.play()

        bipCount++;
        if (bipCount>= maxBips){
            clearInterval(soundInterval)
        }
    }, msPerStep)
    console.log("Switched to speech one successfully ")
}

function callback(mutationsList) {
  mutationsList.forEach((mutation) => {
    if (mutation.attributeName === "class") {
        setTimeout(() => {
            triggerSpeechBubble(`playingSpeechOne`);
        },1000);
    }
  });
}

function buttonDisable(){
    const buttonDisable = document.querySelector('#PlayerButtons button')
}

function triggerComputerAnimation(animationClassName){
    computerPlayer.className = 'ComputerPlayer'; 
    void computerPlayer.offsetWidth; 
    computerPlayer.className = `ComputerPlayer ${animationClassName}`; 
    console.log("Switched to sprite sheet win animation smoothly!");
}

function showStartButton(){
    startPlay.removeAttribute("disabled");
    startPlay.style.opacity = "1";
}


blackOverlay.addEventListener('animationend', () => {
    triggerComputerAnimation("state-winner");
})

function skipSpeech(){
    if (speechBubble.className !== "speechBubble") {
        
        if (soundInterval) {
            clearInterval(soundInterval);
        }
        
        speechBubble.style.animationDuration = "0s";
        speechBubble.style.animationDelay = "0s";
        
        console.log("clicked skip");
    }
}

document.addEventListener('click', skipSpeech)

speechBubble.addEventListener('animationend', () => {
    if (speechBubble.classList.contains('playingSpeechOne')) {
        setTimeout(() => {
            triggerSpeechBubble("playingSpeechTwo");
        },1000);
    }
    
    else if (speechBubble.classList.contains('playingSpeechTwo')) {
        setTimeout(() => {
            triggerSpeechBubble("playingSpeechThree");
        },1000);
    }
    
    else if (speechBubble.classList.contains('playingSpeechThree')) {
        setTimeout(() => {
            triggerSpeechBubble("playingSpeechFour");
        },1000);
    }

    else if (speechBubble.classList.contains('playingSpeechFour')) {
        showStartButton();
        document.removeEventListener('click',skipSpeech);
    }

})

function setUpGame(){
    setTimeout(() => {
        RoundNumContainer.classList.add("RoundNumIntro");
        RoundText.textContent = "Round"
        roundNumChanger.textContent = `Num`
    },500)
    

    RoundNumContainer.addEventListener('animationend', function handleTheIntro(event){
        if (event.animationName === 'lineDown') {
            RoundNumContainer.classList.remove('RoundNumIntro');
            RoundNumContainer.classList.add("RoundNumFloat");
            RoundNumContainer.removeEventListener('animationend',handleTheIntro);
        }
    })

    speechBubble.className = "speechBubble playingSpeechStop";
    mutationObserver.disconnect();
    triggerComputerAnimation("state-winner-reverse")
    if(computerPlayer.classList.contains('state-winner-reverse')){
        setTimeout(() => {
            triggerComputerAnimation("state-think")
        },1000);
    }
}

function shakeTheScreen(shakeEnable){
    mainContainer.className = "mainContainer"
    void mainContainer.offsetWidth
    mainContainer.className = `mainContainer ${shakeEnable}`
    if (shakeEnable !== "shakeOff") {
            setTimeout(() => {
                shakeTheScreen("shakeOff");
            }, 300);
    }
}

startPlay.addEventListener('click', () => {
    
    startPlay.style.opacity = "0";
    startPlay.disabled = true;

    triggerSpeechBubble("playingSpeechFive");
    speechBubble.addEventListener('animationend', () => {


    if (speechBubble.classList.contains('playingSpeechFive')) {
        setTimeout(() => {
            triggerSpeechBubble("playingSpeechSix");
        },1000);
        setTimeout(() => {
            crashSound.play();
            shakeTheScreen("shakeOn");
        },2400);
    }

    else if (speechBubble.classList.contains('playingSpeechSix')) {
        setTimeout(() => {
            setUpGame();
        },1000);
        console.log("All computer speeches finished")
    }

    })
})

const selectingMove = ["Scissors" , "Rock" ,"Paper"];


function getHumanChoice (selectItem) {      //adding a popup with variables (Round number, Human Score, Computer Score,) to let the Human types what his moves and saves it
    let userInput = selectingMove[selectItem]
    return userInput
}

scissorsChoice.addEventListener('click', () => {
    getHumanChoice(0)
    scissorsChoice.style.opacity = "1"
    rockChoice.style.opacity = "0.5"
    paperChoice.style.opacity = "0.5"
})
rockChoice.addEventListener('click', () => {
    getHumanChoice(1)
    rockChoice.style.opacity = "1"
    scissorsChoice.style.opacity = "0.5"
    paperChoice.style.opacity = "0.5"
})
paperChoice.addEventListener('click', () => {
    getComputerChoice(2)
    paperChoice.style.opacity = "1"
    scissorsChoice.style.opacity = "0.5"
    rockChoice.style.opacity = "0.5"
})

function getComputerChoice () {                                         //make a computer randomly select the moves and saves it
    let randomIndex = Math.floor(Math.random() * selectingMove.length)

  return selectingMove[randomIndex]
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