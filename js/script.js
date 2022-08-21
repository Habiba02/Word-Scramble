const wordTxt = document.querySelector(".word"),
hintTxt = document.querySelector(".hint span"),
inputField = document.querySelector("input"),
refeshBtn = document.querySelector(".refresh-word"),
timeTxt = document.querySelector(".time b"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval( () => {
        if(maxTime>0){
            maxTime--; //decrement maxTime by 1
            return timeTxt.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase( )} was the correct word`);//timer is finish
        initGame(); //call initGame to restart
    }, 1000);
}

const initGame = () => {
    initTimer(30) //call initTimer with passing 30 as maxTime
    let randomObj = words[Math.floor(Math.random() * words.length)]; //get random object
    let wordArray = randomObj.word.split("");//split letters
    for (let i = wordArray.length-1; i > 0 ; i--) {
        let j = Math.floor(Math.random() * (i + 1));//get randomm number
        [wordArray[i],wordArray[j]] = [wordArray[j],wordArray[i]]//swip letters randomly
    }
    wordTxt.innerText = wordArray.join("");//pass shuffle word as word
    hintTxt.innerText = randomObj.hint; //pass random object hint as jint
    correctWord = randomObj.word.toLowerCase(); //pass random word to correctWord
    inputField.value="";// input field empty
    inputField.setAttribute("maxlength", correctWord.length) //set input maxlength attr value to word length
    console.log(randomObj);
}
initGame();
const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();//get user value
    if(!userWord) return alert(`Please enter a word`);//if user do not enter anything
    if(userWord !== correctWord) return alert(`Ooops! ${userWord.toUpperCase()} is not the correct word`);//if word does not match the correct one
    alert(`Congrats! ${userWord.toUpperCase( )} is the correct word`);//if user enter the correct word
    initGame();
}
refeshBtn.addEventListener("click",initGame);//refresh on refresh button click
checkBtn.addEventListener("click",checkWord);//check on check button click
