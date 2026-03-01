import { registerTurnVariables } from "./turnRegister.js";

export let timeInterval = null;
export let msTimeInterval = null;

let timeMode = ""; // The add on seconds
export let typeGame = ""; //type of game in mins, ex. "3:00", "2:00"

let addOn = 0;

export let remainingSeconds = {
  white: 6000,
  black: 6000,
};

export let urgencyMode = {
  white: false,
  black: false,
};

function clockTurn() {
  if (registerTurnVariables.turnCounter % 2 == 0) {
    return "white";
  } else {
    return "black";
  }
}

export let blackClk = document.getElementById("blackClockVisual");
export let whiteClk = document.getElementById("whiteClockVisual");

const fiveMinGames = document.getElementById("fiveMinGame");
fiveMinGames.addEventListener("click", newTime);

const threeMinGames = document.getElementById("threeMinGame");
threeMinGames.addEventListener("click", newTime);

const TMTSA = document.getElementById("threeMinTwoSecAddOn");
TMTSA.addEventListener("click", newTime);

const oneMinGame = document.getElementById("oneMinGame");
oneMinGame.addEventListener("click", newTime);

const TMOSA = document.getElementById("twoMinOneSecAddOn");
TMOSA.addEventListener("click", newTime);

function newTime(event) {
      console.log(event.currentTarget.id)
  if (event.currentTarget.id === "fiveMinGame") {
    remainingSeconds.white = 300000;
    remainingSeconds.black = 300000;
    blackClk.innerHTML = "5:00";
    whiteClk.innerHTML = "5:00";
    typeGame = "5:00";
  }

  if (event.currentTarget.id === "threeMinGame") {
    remainingSeconds.white = 180000;
    remainingSeconds.black = 180000;
    blackClk.innerHTML = "3:00";
    whiteClk.innerHTML = "3:00";
    typeGame = "3:00";
  }

  if (event.currentTarget.id === "threeMinTwoSecAddOn") {
    remainingSeconds.white = 180000;
    remainingSeconds.black = 180000;
    blackClk.innerHTML = "3:00";
    whiteClk.innerHTML = "3:00";
    typeGame = "3:00";
    addOn = 2000;
    timeMode = "twoSeconds";
  }
  if (event.currentTarget.id === "oneMinGame") {
    remainingSeconds.white = 60000
    remainingSeconds.black = 60000
    blackClk.innerHTML = "1:00"
    whiteClk.innerHTML = "1:00"
    typeGame = "1:00"
 }
 
}

// custom time iteration
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    var referenceDiv = document.querySelectorAll("#inputTime");
    for (let i = 0; i < 4; i++) {
      console.log(referenceDiv[i].value);

      let timeRange = [];
      for (let i = 0; i < 4; i++) {
        console.log(referenceDiv[i].value);

        timeRange.push(referenceDiv[i].value);
      }
      console.log(timeRange);
    }
  }
});
 // wait for first move to be made, returns a promise which activates the timer function
export function waitUntilFirstMove() {
  return new Promise(function (resolve) {
    const interval = setInterval(() => {
      if (registerTurnVariables.turnCounter === 2) {
        clearInterval(interval);
        console.log("it worked");
        resolve();
      }
    }, 10); // check every 10 ms untill the first move has been made
  });
}

export function clockFunction() {
  if (timeInterval || msTimeInterval) return;
  function normalTimer() {
    let turnOfClock = clockTurn();

    remainingSeconds[turnOfClock] -= 1000; // normal mode ticks in seconds = 1000ms
    let RSC = remainingSeconds[turnOfClock];

    if (RSC <= 0) {
      remainingSeconds[turnOfClock] = 0;
      clearInterval(timeInterval);
      timeInterval = null;
      document.getElementById(
        registerTurnVariables.turnDecider + "ClockVisual",
      ).innerHTML = "0:00";
      return;
    }

    let minutes = Math.floor(RSC / 60000);
    let seconds = Math.floor((RSC / 1000) % 60);

    document.getElementById(
      registerTurnVariables.turnDecider + "ClockVisual",
    ).innerHTML = minutes + ":" + seconds.toString().padStart(2, "0");

    if (RSC < 5999) {
      // if we crossed into urgency, switch intervals to a samller 10ms
      urgencyMode[turnOfClock] = true;
      clearInterval(timeInterval);
      timeInterval = null;

      urgentTimer(); // instant change
      msTimeInterval = setInterval(urgentTimer, 10);
    }
  }

  function urgentTimer() {
    let turnOfClock = clockTurn();
    document.getElementById(turnOfClock + "ClockVisual").style.color = "red";
    remainingSeconds[turnOfClock] -= 10; // urgent mode ticks in 10ms
    let RSC = remainingSeconds[turnOfClock];

    if (RSC <= 0) {
      remainingSeconds[turnOfClock] = 0;

      clearInterval(msTimeInterval);
      msTimeInterval = null;
      document.getElementById(
        registerTurnVariables.turnDecider + "ClockVisual",
      ).innerHTML = "0.00";
      return;
    }

    let urgentSeconds = Math.floor((RSC / 1000) % 60);
    let urgentHundredths = Math.floor((RSC % 1000) / 10);

    document.getElementById(
      registerTurnVariables.turnDecider + "ClockVisual",
    ).innerHTML =
      urgentSeconds + "." + urgentHundredths.toString().padStart(2, "0");
  }

  normalTimer(); // start in normal mode
  timeInterval = setInterval(normalTimer, 1000);
}

export async function startClockAfterFirstMove() {
  await waitUntilFirstMove();
  clockFunction();
}

export function resetIntervals() {
  //for resetting clock
  if (timeInterval) {
    clearInterval(timeInterval);
    timeInterval = null;
  }
  if (msTimeInterval) {
    clearInterval(msTimeInterval);
    msTimeInterval = null;
  }
}

let justMoved = "";

function justMadeMove(turnOfClock) {
  if (turnOfClock === "white") {
    justMoved = "black";
  } else if (turnOfClock === "black") {
    justMoved = "white";
  }
  return justMoved;
}

function refreshClockDisplay(color) {
  const ms = remainingSeconds[color];
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms / 1000) % 60);

  document.getElementById(color + "ClockVisual").innerHTML =
    minutes + ":" + seconds.toString().padStart(2, "0");
}

export function afterMoveNewTime() {
  if (addOn === 0) return;

  const turnOfClock = clockTurn(); // current turn
  const mover = justMadeMove(turnOfClock); // opposite = just moved

  remainingSeconds[mover] += addOn;
  refreshClockDisplay(mover);
}
