import { registerTurnVariables } from "./turnRegister.js";

export let timeInterval = null;
export let msTimeInterval = null;

let addOn = 0;

export let remainingSeconds = {
  white: 6000,
  black: 6000,
};


export let urgencyMode = {
  white: false,
  black: false,
};

let blackClk = document.getElementById("blackClockVisual")
let whiteClk = document.getElementById("whiteClockVisual")

const fiveMinGames = document.getElementById("fiveMinGame");
fiveMinGames.addEventListener("click", newTime);

const threeMinGames = document.getElementById("threeMinGame")
threeMinGames.addEventListener("click", newTime)

function newTime(event) {
  if ((event.currentTarget.id === "fiveMinGame")) {
    remainingSeconds.white = 300000;
    remainingSeconds.black = 300000;
  blackClk.innerHTML = "5:00";
  whiteClk.innerHTML = "5:00";
  }
  
  if ((event.currentTarget.id === "threeMinGame")){
    remainingSeconds.white = 180000
    remainingSeconds.black = 180000
    blackClk.innerHTML = "3:00"
    whiteClk.innerHTML = "3:00"
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

export function waitUntilFirstMove() {
  return new Promise(function (resolve) {
    const interval = setInterval(() => {
      if (registerTurnVariables.turnCounter === 2) {
        clearInterval(interval);
        console.log("it worked");
        resolve();
      }
    }, 10);
  });
}

export function clockFunction() {
  if (timeInterval || msTimeInterval) return;

  function clockTurn() {
    if (registerTurnVariables.turnCounter % 2 == 0) {
      return "white";
    } else {
      return "black";
    }
  }

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
    console.log(
      (document.getElementById(turnOfClock + "ClockVisual").style.color =
        "red"),
    );
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
