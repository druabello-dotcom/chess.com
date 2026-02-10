
import { registerTurnVariables } from "./turnRegister.js";



let timeInterval = null;
let remainingSeconds = 600;

export function clockFunction(){

    if (timeInterval) return; 

    function timer(){
        remainingSeconds--;

        let minutes = Math.floor(remainingSeconds/60);
        let seconds = remainingSeconds % 60;

        document.getElementById(
            registerTurnVariables.turnDecider + "ClockVisual"
        ).innerHTML =
        minutes + ":" + seconds.toString().padStart(2, "0");

        if (remainingSeconds <= 0) {
            clearInterval(timeInterval);
        }
    }

    timeInterval = setInterval(timer, 1000);
}






