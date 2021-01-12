const inpHrs = document.querySelector("#input-hours");
const inpMins = document.querySelector("#input-mins");
const inpSecs = document.querySelector("#input-secs");
const btnPause = document.querySelector("#btn-pause");
const btnPlay = document.querySelector("#btn-play");
const btnReset = document.querySelector("#btn-reset");
const warningContainer = document.querySelector(".warning-container");
const timerContainer = document.querySelector(".timer-container");
const timeBox = document.querySelector(".time").children;
const timeArray = Array.from(timeBox);

const dispHrs = document.querySelector("#hours");
const dispMins = document.querySelector("#minutes");
const dispSecs = document.querySelector("#seconds");

let isRunning = false;
let totalTimeInSecs = 0;
let tInterval = 0;

function addButtonListeners() {
  btnPause.addEventListener("click", stopTimer);
  btnPlay.addEventListener("click", startTimer);
  btnReset.addEventListener("click", resetTimer);
}

function startTimer() {
  if (validateInput() && !isRunning) {
    const finalHrs = parseInt(inpHrs.value);
    const finalMins = parseInt(inpMins.value);
    const finalSecs = parseInt(inpSecs.value);

    totalTimeInSecs =
      totalTimeInSecs + finalHrs * 3600 + finalMins * 60 + finalSecs;

    const msg = `Are you sure you want to set a timer for ${finalHrs} hrs, ${finalMins} mins, ${finalSecs} secs?`;

    if (confirm(msg) && !isRunning) {
      removeAnimation();
      dispHrs.innerHTML = finalHrs.toString().padStart(2, "0");
      dispMins.innerHTML = finalMins.toString().padStart(2, "0");
      dispSecs.innerHTML = finalSecs.toString().padStart(2, "0");
      isRunning = true;
    }

    if (isRunning) {
      tInterval = setInterval(computeTimer, 1000);
    }
  }
}

function stopTimer() {
  if (isRunning) {
    if (confirm("Are you sure you want to stop the timer?")) {
      clearInterval(tInterval);
      isRunning = false;
      totalTimeInSecs = 0;
      dispHrs.innerHTML = "00";
      dispMins.innerHTML = "00";
      dispSecs.innerHTML = "00";
      inpHrs.value = 0;
      inpMins.value = 0;
      inpSecs.value = 0;
    }
  }
}

function resetTimer() {
  removeAnimation();
  clearInterval(tInterval);
  totalTimeInSecs = 0;
  dispHrs.innerHTML = "00";
  dispMins.innerHTML = "00";
  dispSecs.innerHTML = "00";
  isRunning = false;
}

function validateInput() {
  let hrsCheck = isValid(inpHrs.value, 0, 24);
  let minsCheck = isValid(inpMins.value, 0, 59);
  let secsCheck = isValid(inpSecs.value, 0, 59);
  let warningHrs = "Hours [0 - 24]" + "<br>";
  let warningMins = "Minutes [0 - 59]" + "<br>";
  let warningSecs = "Seconds [0 - 59]" + "<br>";

  if (hrsCheck && minsCheck && secsCheck) {
    warningContainer.innerHTML = "";
    warningContainer.style.display = "none";
    return true;
  } else {
    let warning = "Please enter a valid input for the following:" + "<br>";
    if (!hrsCheck) {
      warning += warningHrs;
    }
    if (!minsCheck) {
      warning += warningMins;
    }
    if (!secsCheck) {
      warning += warningSecs;
    }
    warningContainer.innerHTML = warning;
    return false;
  }
}

function isValid(stringVal, min, max) {
  if (stringVal == null || stringVal == "" || isNaN(stringVal)) {
    return false;
  } else {
    const temp = parseInt(stringVal);
    if (temp < min || temp > max) {
      return false;
    } else {
      return true;
    }
  }
}

function computeTimer() {
  totalTimeInSecs -= 1;
  // compute the number of seconds to display via modulo
  if (totalTimeInSecs >= 0) {
    const secsToDisplay = totalTimeInSecs % 60;
    //   deduct the seconds to be displayed to get totalMins
    const totalMins = (totalTimeInSecs - secsToDisplay) / 60;
    // compute number of mins to display via module
    const minsToDisplay = totalMins % 60;
    // deduct the minsToDisplay to totalMins to get remaining hours
    const hoursToDisplay = (totalMins - minsToDisplay) / 60;

    dispHrs.innerHTML = hoursToDisplay.toString().padStart(2, "0");
    dispMins.innerHTML = minsToDisplay.toString().padStart(2, "0");
    dispSecs.innerHTML = secsToDisplay.toString().padStart(2, "0");
  }

  if (totalTimeInSecs < 0) {
    clearInterval(tInterval);
    totalTimeInSecs = 0;
    dispHrs.innerHTML = "00";
    dispMins.innerHTML = "00";
    dispSecs.innerHTML = "00";
    isRunning = false;

    // TODO: Add Alert here
    addAnimation();
  }
}

function addAnimation() {
  timeArray.forEach((item) => {
    if (!item.classList.contains("animate")) {
      item.classList.add("animate");
    }
  });
}

function removeAnimation() {
  timeArray.forEach((item) => {
    if (item.classList.contains("animate")) {
      item.classList.remove("animate");
    }
  });
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", addButtonListeners);
} else {
  addButtonListeners();
}
