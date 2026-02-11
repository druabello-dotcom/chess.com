import { registerTurnVariables } from "./turnRegister.js";

let timeInterval = null;
let remainingSeconds = 600;

export function waitUntilFirstMove() {
  return new Promise(function (resolve) {       //return a promise/ await til promise is returned by function 
    const interval = setInterval(function () {  //create a interval based function which runs every 100 ms
      if (registerTurnVariables.turnCounter === 2) { //if the turncounter has reached 2 then clear 
        clearInterval(interval); // the interval and run resolve() which will confimr the promise
        console.log("it worked");
        resolve();
      }

    }, 100);
  });
}

export function clockFunction() {
  if (timeInterval) return;

  function timer() {
    remainingSeconds--;

    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;

    document.getElementById(
      registerTurnVariables.turnDecider + "ClockVisual"
    ).innerHTML =
      minutes + ":" + seconds.toString().padStart(2, "0");

    if (remainingSeconds <= 0) {
      clearInterval(timeInterval);
      timeInterval = null;
    }
  }

  timer();
  timeInterval = setInterval(timer, 1000); //update every second = 1000ms
}

export async function startClockAfterFirstMove() {
  await waitUntilFirstMove(); // await until the promise has been completed
  clockFunction(); //then run the code of the clock
}
