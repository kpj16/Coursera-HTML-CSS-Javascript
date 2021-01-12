// declare and initialize variables
const btnPause = document.querySelector("#btn-pause");
const btnPlay = document.querySelector("#btn-play");
const btnReset = document.querySelector("#btn-reset");

const btnImg = document.querySelectorAll("button > img");

const textMs = document.querySelector("#milliseconds");
const textSecs = document.querySelector("#seconds");
const textMins = document.querySelector("#minutes");
const textHours = document.querySelector("#hours");

let initialTime = 0;
let savedTime = 0;
let difference = 0;
let isRunning = false;
let isPaused = false;
let tInterval = 0;

let finalTimeMs = 0;
let finalTimeSecs = 0;
let finalTimeMins = 0;
let finalTimeHrs = 0;

function addButtonListeners() {
  btnPause.addEventListener("click", pauseTime, false);
  btnPlay.addEventListener("click", startTime, false);
  btnReset.addEventListener("click", resetTime, false);

  window.addEventListener("keypress", function (e) {
    if (e.key == "s") {
      startTime();
    }

    if (e.key == "p") {
      pauseTime();
    }

    if (e.key == "r") {
      resetTime();
    }
  });
}

function stopDefault(e) {
  e.stopPropagation();
  e.preventDefault();
  console.log("Prevented");
}

function pauseTime() {
  console.log(`PAUSE!`);
  if (isRunning && !isPaused) {
    clearInterval(tInterval);
    isRunning = false;
    isPaused = true;
    savedTime = difference;
  }
}

function startTime() {
  console.log(`START!`);
  if (!isRunning) {
    initialTime = new Date().getTime();
    tInterval = setInterval(computeTimer, 10);
    isRunning = true;
    isPaused = false;
  }
}

function resetTime() {
  isPaused = true;
  isRunning = false;
  clearInterval(tInterval);
  if (confirm("Are you sure you want to reset?")) {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    isRunning = false;
    isPaused = false;
    tInterval = 0;

    textMs.innerHTML = "00";
    textSecs.innerHTML = "00";
    textMins.innerHTML = "00";
    textHours.innerHTML = "00";
  } else {
    startTime();
  }
}

function computeTimer() {
  const t1 = new Date();
  const timeNow = t1.getTime();

  if (savedTime > 0) {
    difference = timeNow - initialTime + savedTime;
  } else {
    difference = timeNow - initialTime;
  }

  //   compute Values
  finalTimeMs = Math.floor((difference % 1000) / 10)
    .toString()
    .padStart(2, "0");
  finalTimeSecs = Math.floor((difference % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");
  finalTimeMins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  finalTimeHrs = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
    .toString()
    .padStart(2, "0");

  // display Values
  textMs.innerHTML = finalTimeMs;
  textSecs.innerHTML = finalTimeSecs;
  textMins.innerHTML = finalTimeMins;
  textHours.innerHTML = finalTimeHrs;
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", addButtonListeners);
} else {
  addButtonListeners();
}
