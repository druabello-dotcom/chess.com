



import * as TurnRegister from "./turnRegister.js";
import { resetChessboard,resetChessboardButtonElements } from "./resetChessboard.js";
import { resizeGame } from "./resizeGame.js";

//export const clocks = 
let turn = null

const lia = document.getElementById(turn+'Clockviual')


let remainingSeconds = minutes*60 + seconds
function timer(){

    --remainingSeconds
    let minutes= Math.floor(remainingSeconds/60)
    let seconds = remainingSeconds%60
    console.log(minutes + ":" + seconds)
    console.log(`${minutes}:${seconds.toString().padStart(2, "0")}`);

    if (remainingSeconds <= 0) {
        clearInterval(timeInterval);
        console.log("Time’s up");
    }
}
timer()

let timeInterval = setInterval(timer,1000)












