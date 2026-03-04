import { registerTurnVariables } from "./turnRegister.js";
import { endGame } from "./sounds.js";
import { winScreen } from "./main.js";
import { lowTime } from "./sounds.js";

export let timeInterval = null;
export let msTimeInterval = null;

export let typeGame = "10:00"; //type of game in mins, ex. "3:00", "2:00"
let addOn = 0; // The add on seconds
export let timeReference = 600000;

export let remainingSeconds = {
  white: 600000,
  black: 600000,
};

export let urgencyMode = {
  white: false,
  black: false,
};

let changeVisualOpacity = document.getElementById("timeButtons");
let win = "";

function clockTurn() {
  if (registerTurnVariables.turnCounter % 2 == 0) {
    return "white";
  } else {
    return "black";
  }
}

function reduceOpacity() {
  if (registerTurnVariables.turnCounter > 1) {
    changeVisualOpacity.style.animationName = "Opacity";
    changeVisualOpacity.style.animationDuration = "400ms";
    changeVisualOpacity.style.animationIterationCount = "1";
    changeVisualOpacity.style.animationFillMode = "forwards";
  }
}
export function inceraseOpacity() {
  changeVisualOpacity.style.animationName = "opacityIncrease";
  changeVisualOpacity.style.animationDuration = "400ms";
  changeVisualOpacity.style.animationIterationCount = "1";
  changeVisualOpacity.style.animationFillMode = "forwards";
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

const TMOSAO = document.getElementById("twoMinOneSecAddOn"); // TMOSA = Two Minutes One Second Add On
TMOSAO.addEventListener("click", newTime);

const OMOSAO = document.getElementById("oneMinOneSecAddOn");
OMOSAO.addEventListener("click", newTime);

function newTime(event) {
  console.log(event.currentTarget.id);
  if (event.currentTarget.id === "fiveMinGame") {
    timeReference = 300000;
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
    timeReference = 180000;
    remainingSeconds.white = 180000;
    remainingSeconds.black = 180000;
    blackClk.innerHTML = "3:00";
    whiteClk.innerHTML = "3:00";
    typeGame = "3:00";
    addOn = 2000;
  }
  if (event.currentTarget.id === "oneMinGame") {
    timeReference = 60000;
    remainingSeconds.white = 60000;
    remainingSeconds.black = 60000;
    blackClk.innerHTML = "1:00";
    whiteClk.innerHTML = "1:00";
    typeGame = "1:00";
  }
  if (event.currentTarget.id === "twoMinOneSecAddOn") {
    timeReference = 120000;
    remainingSeconds.white = 120000;
    remainingSeconds.black = 120000;
    blackClk.innerHTML = "2:00";
    whiteClk.innerHTML = "2:00";
    addOn = 1000;
    typeGame = "2:00";
  }
  if (event.currentTarget.id === "oneMinOneSecAddOn") {
    timeReference = 60000;
    remainingSeconds.white = 60000;
    remainingSeconds.black = 60000;
    blackClk.innerHTML = "1:00";
    whiteClk.innerHTML = "1:00";
    addOn = 1000;
    typeGame = "1:00";
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
        timeRange.push(referenceDiv[i].value);
      }

      const mergedSeconds = String(timeRange[2]) + String(timeRange[3]);
      const parsedIntCheck = Number(mergedSeconds);

      if (parsedIntCheck > 59) {
        let count = 0;

        let shakedObject = document.getElementById("customOptions");
        shakedObject.style.animationName = "shaker";
        shakedObject.style.animationDuration = "0.5s";
        shakedObject.style.animationIterationCount = "1";
        shakedObject.style.animationDirection = "alternate";

        function removeAfterOneSec() {
          count++;
          if (count == 1) {
            clearInterval(intervalForSec);
            shakedObject.style.animationName = "";
            shakedObject.style.animationDuration = "";
            shakedObject.style.animationIterationCount = "";
            shakedObject.style.animationDirection = "";
          }
        }
        let intervalForSec = setInterval(removeAfterOneSec, 1000);
        return;
      }
      typeGame = String(
        timeRange[0] + timeRange[1] + ":" + timeRange[2] + timeRange[3],
      );
      function timeConverter() {
        const mergedMinutes = String(timeRange[0]) + String(timeRange[1]); // make sure minutes are one singular string
        const parsedInt = Number(mergedMinutes);

        let Minutes = mergedMinutes * 60000;
        let firstSecondToMs = timeRange[2] * 10000;
        let secondSecondToMs = timeRange[3] * 1000;

        let RSC = Minutes + firstSecondToMs + secondSecondToMs;
        timeReference = RSC;

        let minutes = Math.floor(RSC / 60000);
        let seconds = Math.floor((RSC / 1000) % 60);

        document.getElementById("blackClockVisual").innerHTML =
          minutes + ":" + seconds.toString().padStart(2, "0");

        document.getElementById("whiteClockVisual").innerHTML =
          minutes + ":" + seconds.toString().padStart(2, "0");

        remainingSeconds.white = RSC;
        remainingSeconds.black = RSC;
      }
      timeConverter();
    }
  }
});
// wait for first move to be made, returns a promise which activates the timer function
export function waitUntilFirstMove() {
  return new Promise(function (resolve) {
    const interval = setInterval(() => {
      if (registerTurnVariables.turnCounter === 2) {
        clearInterval(interval);
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
      if (turnOfClock === "white") win = "black";
      if (turnOfClock === "black") win = "white";
      function winnerOfTime() {
        if (win !== "") {
          endGame();
          winScreen.style.display = "flex";
          let victoryAnnouncer = document.querySelector(
            "#victoryAnnouncement h1",
          );
          let victoryGoesTo = `${win} won!`;
          victoryAnnouncer.innerText = `${victoryGoesTo.toUpperCase()}`;
        }
      }
      winnerOfTime();
      return;
    }

    let minutes = Math.floor(RSC / 60000);
    let seconds = Math.floor((RSC / 1000) % 60);

    document.getElementById(
      registerTurnVariables.turnDecider + "ClockVisual",
    ).innerHTML = minutes + ":" + seconds.toString().padStart(2, "0");

    if (RSC < 20000) {
      // if we crossed into urgency, switch intervals to a samller 10ms
      lowTime()
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
    remainingSeconds[turnOfClock] -= 10; // urgent mode ticks in 10ms/decrements in -10 and interval is 10ms
    let RSC = remainingSeconds[turnOfClock];

    if (RSC <= 0) {
      remainingSeconds[turnOfClock] = 0;

      clearInterval(msTimeInterval);
      msTimeInterval = null;
      document.getElementById(
        registerTurnVariables.turnDecider + "ClockVisual",
      ).innerHTML = "0.00";
      if (turnOfClock === "white") win = "black";
      if (turnOfClock === "black") win = "white";
      function winnerOfTime() {
        if (win !== "") {
          endGame();
          winScreen.style.display = "flex";
          let victoryAnnouncer = document.querySelector(
            "#victoryAnnouncement h1",
          );
          let victoryGoesTo = `${win} won!`;
          victoryAnnouncer.innerText = `${victoryGoesTo.toUpperCase()}`;
        }
      }
      winnerOfTime();
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
  reduceOpacity();
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
