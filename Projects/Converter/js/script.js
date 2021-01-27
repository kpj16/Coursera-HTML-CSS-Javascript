// initiate variables
const circleList = document.querySelectorAll(".circle");
const displaySection = document.querySelector("#display-section");

// global variables
let isFirstButtonClicked = false;
let currentPage = null;
let previousCircle;
let errorContainer;
let errorMessage;
let outputContainer;

// age input / output
let ageInput;
let ageOutput;
let btnAgeCompute;
let ageOptions;

let sourceWeight;
let sourceHeight;
let weightUnit;
let heightUnit;
let btnComputeBMI;
let bmiResult;

// data
let sourceInp;
let sourceData;
let outInt;
let outData;

const dataTable = {
  bits: -10,
  byte: 0,
  kilobyte: 1,
  megabyte: 2,
  gigabyte: 3,
  terabyte: 4,
  petabyte: 5,
};

//date
let dateFrom;
let dateTo;
let dateYear;
let dateMonths;
let dateDays;

// discount
let discOrigPrice;
let discDiscRate;
let discFinalPrice;

// length
let lengthInput;
let lengthInputOption;
let lengthOutput;
let lengthOutputOption;

// temperature
let sourceTemp;
let destTemp;
let sourceTempUnit;
let destTempUnit;

// hard coding transition
let transitionCount = 0;

document.addEventListener("DOMContentLoaded", addListeners);

function addListeners() {
  displaySection.addEventListener("transitionend", (event) => {
    transitionCount += 1;

    // hard coded transition for the start of the button click
    if (transitionCount == 3) {
      const rowList = displaySection.querySelectorAll(".row");
      rowList.forEach((element) => {
        if (!element.classList.contains("hidden")) {
          element.style.display = "flex";
        }
      });
    }
  });

  circleList.forEach(function (currentValue, currentIndex, listObj) {
    // console.log(`${currentValue} + ${currentIndex} + ${listObj}`);
    // console.log(`${currentValue.firstElementChild.innerHTML}`);
    currentValue.addEventListener("click", ready);
  });
}

function ready() {
  // console.log(`${this.firstElementChild.innerHTML} is the child inner HTML`);

  // TODO: Think of better implementation
  // add default values in case it cannot match the innerHTML
  let url = "snippets/bmi.html";

  const category = this.firstElementChild.innerHTML;

  if (currentPage != category) {
    switch (category) {
      case "AGE":
        url = "snippets/age.html";
        break;
      case "BMI":
        url = "snippets/bmi.html";
        break;
      case "DATA":
        url = "snippets/data.html";
        break;
      case "DATE":
        url = "snippets/date.html";
        break;
      case "DISCOUNT":
        url = "snippets/discount.html";
        break;
      case "LENGTH":
        url = "snippets/length.html";
        break;
      case "TEMP":
        url = "snippets/temp.html";
        break;
      default:
        break;
    }
    generateSnippet(url, category);

    if (previousCircle != null) {
      previousCircle.classList.toggle("hovered");
    }
    currentPage = category;
    this.classList.toggle("hovered");
    previousCircle = this;
  } else {
  }
}

function generateSnippet(url, category) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status == 200) {
      displaySection.innerHTML = this.responseText;

      // display animation / transition
      if (!isFirstButtonClicked) {
        displaySection.querySelectorAll(".row").forEach((element) => {
          if (!element.classList.contains("hidden")) {
            element.style.display = "none";
          }
        });
        displayTransition();
        isFirstButtonClicked = true;
      }

      // load listeners for the input
      loadCategoryListeners(category);
    } else if (this.status == 404) {
      displaySection.innerHTML = "Error 404: Page not Found!";
    } else {
      displaySection.innerHTML = "Error " + this.status;
    }
  };

  xhr.send();
}

// animation code
function displayTransition() {
  displaySection.style.width = "450px";
  displaySection.style.height = "300px";
  displaySection.style.visibility = "visible";
}

//main functionality
function loadCategoryListeners(category) {
  // console.log(`Loading categories...`);
  switch (category) {
    case "AGE":
      ageInput = document.querySelector("#dob-input");
      ageOutput = document.querySelector("#dob-output");
      btnAgeCompute = document.querySelector("#btn-age-compute");
      ageOptions = document.querySelector("#age-options");

      ageInput.addEventListener("change", truncateAge);
      btnAgeCompute.addEventListener("click", computeAge);
      ageOptions.addEventListener("change", computeAge);
      break;
    case "BMI":
      sourceWeight = document.querySelector("#bmi-weight");
      sourceHeight = document.querySelector("#bmi-height");
      weightUnit = document.querySelector("#bmi-weight-unit");
      heightUnit = document.querySelector("#bmi-height-unit");
      btnComputeBMI = document.querySelector("#btn-compute-bmi");
      bmiResult = document.querySelector("#bmi-result");

      btnComputeBMI.addEventListener("click", computeBMI);
      break;
    case "DATA":
      sourceInp = document.querySelector("#source-input");
      sourceData = document.querySelector("#source-data");
      outInt = document.querySelector("#source-output");
      outData = document.querySelector("#output-data");

      sourceInp.oninput = computeData;
      outInt.oninput = computeDataReverse;
      sourceData.addEventListener("change", computeData);
      outData.addEventListener("change", computeData);
      break;
    case "DATE":
      dateFrom = document.querySelector("#date-from");
      dateTo = document.querySelector("#date-to");
      dateYear = document.querySelector("#date-years");
      dateMonths = document.querySelector("#date-months");
      dateDays = document.querySelector("#date-days");

      dateTo.value = getDateToday();
      dateFrom.addEventListener("change", computeDate);
      dateTo.addEventListener("change", computeDate);
      break;
    case "DISCOUNT":
      discOrigPrice = document.querySelector("#disc-original-price");
      discDiscRate = document.querySelector("#disc-discount-rate");
      discFinalPrice = document.querySelector("#disc-final-price");

      discOrigPrice.addEventListener("input", computeDiscount);
      discDiscRate.addEventListener("input", computeDiscount);

      discDiscRate.defaultValue = 10;
      break;
    case "LENGTH":
      lengthInput = document.querySelector("#length-input");
      lengthInputOption = document.querySelector("#length-input-option");
      lengthOutput = document.querySelector("#length-output");
      lengthOutputOption = document.querySelector("#length-output-option");

      lengthInput.addEventListener("input", computeLength);
      // lengthOutput.addEventListener("input") reverse
      lengthInputOption.addEventListener("change", computeLength);
      lengthOutputOption.addEventListener("change", computeLength);
      break;
    case "TEMP":
      sourceTemp = document.querySelector("#temp-source-input");
      destTemp = document.querySelector("#temp-source-output");
      sourceTempUnit = document.querySelector("#temp-source-options");
      destTempUnit = document.querySelector("#temp-to-options");

      sourceTemp.oninput = computeTemperature;
      destTemp.oninput = computeTemperature;
      sourceTempUnit.addEventListener("change", computeTemperature);
      destTempUnit.addEventListener("change", computeTemperature);

      break;
    default:
      break;
  }

  errorContainer = document.querySelector(".error");
  errorMessage = document.querySelector("#error-message");
  outputContainer = document.querySelector(".output");
  // console.log(`Listeners added...`);
}

// ***************************
//        AGE
// ***************************
function convertAge(age) {
  let convertedAge;
  switch (ageOptions.value) {
    case "years":
      convertedAge = age;
      break;
    case "months":
      convertedAge = age * 12;
      break;
    case "weeks":
      convertedAge = Math.round(age * 52.143);
      break;
    case "days":
      convertedAge = age * 365;
      break;
    default:
      convertedAge = age;
      break;
  }
  return convertedAge;
}

function computeAge() {
  const parts = ageInput.value.split("-");
  const dateNow = new Date();

  if (
    parseInt(parts[0]) >= 1500 &&
    parseInt(parts[0]) <= parseInt(dateNow.getFullYear()) &&
    parts[0].length == 4
  ) {
    removeError();
    const birthDate = new Date(parts[0], parts[1] - 1, parts[2]);

    // compute age in years
    let ageNow = dateNow.getFullYear() - birthDate.getFullYear();
    const monthChecker = dateNow.getMonth() - birthDate.getMonth();

    // if today's current month is less than birth date month, subtract 1 since technically did not have birthday yet
    // if it's the same month, we would check if the date is the less since getDate would return time in ms
    if (
      monthChecker < 0 ||
      (monthChecker === 0 && dateNow.getDate() < birthDate.getDate())
    ) {
      ageNow--;
    }

    ageOutput.textContent = "The age is " + convertAge(ageNow) + " ";
  } else {
    // error message
    createError();
  }
}

// ***************************
//        BMI
// ***************************
function computeBMI() {
  let bmi;
  let bmiClassification;
  let weight;
  let height;

  // input checking
  if (
    sourceHeight.value != null &&
    sourceWeight.value != null &&
    sourceHeight.value != "" &&
    sourceWeight.value != "" &&
    sourceHeight.value >= 1 &&
    sourceWeight.value >= 1
  ) {
    removeError();
    // convert weight to kg
    if (weightUnit.value == "lb") {
      weight = sourceWeight.value / 2.20462262185;
    } else {
      weight = sourceWeight.value;
    }

    // convert height to m
    switch (heightUnit.value) {
      case "cm":
        height = sourceHeight.value / 100;
        break;
      case "ft":
        height = sourceHeight.value / 3.28084;
        break;
      case "in":
        height = sourceHeight.value / 39.3701;
        break;
      default:
        height = sourceHeight.value;
        break;
    }

    bmi = weight / (height * height);

    if (bmi < 18.5) {
      bmiClassification = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      bmiClassification = "Normal";
    } else if (bmi >= 24.9 && bmi < 30) {
      bmiClassification = "Overweight";
    } else if (bmi >= 30.0) {
      bmiClassification = "Obese";
    }

    const bmiCharCount = bmi.toString().length;
    let bmiAppend;

    if (bmiCharCount >= 5) {
      bmiAppend = bmi.toString().substr(0, 5);
    } else {
      bmiAppend = bmi.toString();
    }

    // create span element
    const bmiSpan = document.createElement("span");
    bmiSpan.textContent = bmiAppend;
    bmiSpan.classList.add("result-highlight");
    bmiResult.textContent = "Your BMI is ";
    bmiResult.appendChild(bmiSpan);

    const bmiHighlight = document.createElement("span");
    bmiHighlight.textContent = bmiClassification;
    bmiHighlight.classList.add("result-highlight");
    const resultStatus = ". You are " + bmiHighlight.outerHTML + ".";

    bmiResult.innerHTML += resultStatus;

    bmiResult.style.display = "block";
  } else {
    // add error here
    createError();
  }
}

// ***************************
//        DATA
// ***************************
function computeData() {
  let multiplier = 0;
  let result = 0;
  //   check if source input is empty

  if (
    sourceInp.value != null &&
    sourceInp.value != "" &&
    sourceInp.value >= 0
  ) {
    removeError();
    multiplier = dataTable[outData.value] - dataTable[sourceData.value];

    // for bits
    if (multiplier >= 10) {
      result = sourceInp.value / (8 * Math.pow(1024, dataTable[outData.value]));
    } else if (multiplier <= -5) {
      result =
        sourceInp.value * Math.pow(1024, dataTable[sourceData.value]) * 8;
    }

    // for bytes
    if (multiplier > 0 && multiplier < 10) {
      result = sourceInp.value / Math.pow(1024, multiplier);
    } else if (multiplier < 0 && multiplier > -5) {
      result = sourceInp.value * Math.pow(1024, multiplier * -1);
    } else if (multiplier === 0) {
      result = sourceInp.value;
    }

    outInt.value = result;
  } else {
    //   show error or do nothing
    createError();
    // sourceInp.value = "";
    // outInt.value = "";
  }
}

function computeDataReverse() {
  let multiplier = 0;
  let result = 0;

  if (outInt.value != null && outInt.value != "" && outInt.value >= 0) {
    multiplier = dataTable[sourceData.value] - dataTable[outData.value];
    removeError();
    // for bits
    if (multiplier >= 10) {
      result = outInt.value / (8 * Math.pow(1024, dataTable[sourceData.value]));
    } else if (multiplier <= -5) {
      result = outInt.value * Math.pow(1024, dataTable[outData.value]) * 8;
    }

    // for bytes
    if (multiplier > 0 && multiplier < 10) {
      result = outInt.value / Math.pow(1024, multiplier);
    } else if (multiplier < 0 && multiplier > -5) {
      result = outInt.value * Math.pow(1024, multiplier * -1);
    } else if (multiplier === 0) {
      result = outInt.value;
    }

    sourceInp.value = result;
  } else {
    createError();
    // sourceInp.value = "";
    // outInt.value = "";
  }
}

// ***************************
//        DATE
// ***************************
// TODO: check if first date is greater than second date
function computeDate() {
  if (isValidDate(dateFrom.value) && isValidDate(dateTo.value)) {
    removeError();
    const date1 = convertStringToDate(dateFrom.value);
    const date2 = convertStringToDate(dateTo.value);
    console.log(`Date1 ${date1} and date2 ${date2}`);

    const sourceDate = luxon.DateTime.fromJSDate(date1);
    const destDate = luxon.DateTime.fromJSDate(date2);

    const diff = destDate
      .diff(sourceDate, ["years", "months", "days"])
      .toObject();

    dateYear.textContent = diff["years"] + " years";
    dateMonths.textContent = diff["months"] + " months";
    dateDays.textContent = diff["days"] + " days";
  } else {
    createError();
  }
}

function convertStringToDate(dateString) {
  const dateParts = dateString.split("-");
  console.log(
    `0 is ${dateParts[0]} 1 is ${dateParts[1] - 1}, 2 is ${dateParts[2]}`
  );
  return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
}

// ***************************
//        DISCOUNT
// ***************************
function computeDiscount() {
  if (
    isNotEmptyAndValid(discOrigPrice.value, 0) &&
    isNotEmptyAndValid(discDiscRate.value, 0, 100)
  ) {
    removeError();
    const originalPrice = parseFloat(discOrigPrice.value);
    let finalPrice;
    let discountPrice;
    const discountRate = parseFloat(discDiscRate.value) / 100;
    discountPrice = originalPrice * (parseFloat(discDiscRate.value) / 100);
    finalPrice = originalPrice - discountPrice;

    discFinalPrice.innerHTML = finalPrice;
  } else {
    createError();
    // discFinalPrice.innerHTML = "";
  }
}

// ***************************
//        LENGTH
// ***************************
function convertFromCM(value, toUnit) {
  const inputValue = parseFloat(value);
  let convertedValue;
  switch (toUnit) {
    case "m":
      convertedValue = inputValue / 100;
      break;
    case "km":
      convertedValue = inputValue / 100000;
      break;
    case "dm":
      convertedValue = inputValue / 10;
      break;
    case "mm":
      convertedValue = inputValue * 10;
      break;
    case "um":
      convertedValue = inputValue * 10000;
      break;
    case "nm":
      convertedValue = inputValue * 10000000;
      break;
    case "pm":
      convertedValue = inputValue * 10000000000;
      break;
    case "nmi":
      convertedValue = inputValue / 185200;
      break;
    case "mi":
      convertedValue = inputValue / 160934.4;
      break;
    case "fur":
      convertedValue = inputValue / 20117;
      break;
    case "ftm":
      convertedValue = inputValue / 182.88;
      break;
    case "yd":
      convertedValue = inputValue / 91.44;
      break;
    case "ft":
      convertedValue = inputValue / 30.48;
      break;
    case "in":
      convertedValue = inputValue / 2.54;
      break;
    default:
      convertedValue = inputValue;
      break;
  }

  return convertedValue;
}

function convertToCM(value, fromUnit) {
  let convertedValue = parseFloat(value);
  switch (fromUnit) {
    case "m":
      convertedValue = convertedValue * 100;
      break;
    case "km":
      convertedValue = convertedValue * 100000;
      break;
    case "dm":
      convertedValue = convertedValue * 10;
      break;
    case "mm":
      convertedValue = convertedValue / 10;
      break;
    case "um":
      convertedValue = convertedValue / 10000;
      break;
    case "nm":
      convertedValue = convertedValue / 10000000;
      break;
    case "pm":
      convertedValue = convertedValue / 10000000000;
      break;
    case "nmi":
      convertedValue = convertedValue * 185200;
      break;
    case "mi":
      convertedValue = convertedValue * 160934.4;
      break;
    case "fur":
      convertedValue = convertedValue * 20117;
      break;
    case "ftm":
      convertedValue = convertedValue * 182.88;
      break;
    case "yd":
      convertedValue = convertedValue * 91.44;
      break;
    case "ft":
      convertedValue = convertedValue * 30.48;
      break;
    case "in":
      convertedValue = convertedValue * 2.54;
      break;
    default:
      break;
  }

  return convertedValue;
}

function computeLength() {
  const inLength = lengthInput.value;
  const inUnit = lengthInputOption.value;
  const outUnit = lengthOutputOption.value;

  if (isNotEmptyAndValid(inLength, 0)) {
    removeError();
    if (inUnit != outUnit) {
      let temp = convertToCM(inLength, inUnit);
      let output = convertFromCM(temp, outUnit);

      lengthOutput.value = output;
    } else {
      lengthOutput.value = inLength;
    }
  } else {
    createError();
  }
}

// ***************************
//        TEMPERATURE
// ***************************
function computeTemperature() {
  if (sourceTemp.value != null && sourceTemp.value != "") {
    removeError();
    const from = sourceTemp.value;
    const fromUnit = sourceTempUnit.value;
    const toUnit = destTempUnit.value;

    if (fromUnit == toUnit) {
      destTemp.value = sourceTemp.value;
    } else {
      let temperature = parseFloat(from);

      // convert whatever unit to celcius
      switch (fromUnit) {
        case "farenheit":
          temperature = (temperature - 32) / (9 / 5);
          break;
        case "kelvin":
          temperature = temperature - 273.15;
          break;
        case "rankine":
          temperature = (temperature - 32 - 459.67) / (9 / 5);
          break;
        case "reaumur":
          temperature = temperature * 1.25;
          break;
        default:
          break;
      }

      // convert celcius to destination unit
      switch (toUnit) {
        case "farenheit":
          temperature = temperature * (9 / 5) + 32;
          break;
        case "kelvin":
          temperature = temperature + 273.15;
          break;
        case "rankine":
          temperature = temperature * (9 / 5) + 491.67;
          break;
        case "reaumur":
          temperature = temperature * (4 / 5);
          break;
        default:
          break;
      }

      destTemp.value = temperature;
    }
  } else {
    createError();
  }
}

// ***************************
//        FUNCTIONALITIES
// ***************************
function getDateToday() {
  const today = new Date();
  let month = String(today.getMonth() + 1);

  if (month.length == 1) {
    month = "0" + month;
  }

  return today.getFullYear() + "-" + month + "-" + today.getDate();
}

function isNotEmptyAndValid(value, lowerLimit, upperLimit) {
  const temp = parseInt(value);
  if (upperLimit != null) {
    if (
      value != null &&
      value != "" &&
      value >= lowerLimit &&
      value <= upperLimit
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    if (value != null && value != "" && value >= lowerLimit) {
      return true;
    } else {
      return false;
    }
  }
}

function isValidDate(date) {
  // will check if string is on the pattern yyyy-mm-dd
  // yyyy must be greater than 1000 but less than or equal to 9999
  return /^[1-9]{1}[0-9]{3}\-(0[0-9]|1[0-2])\-([0-2][0-9]|[3][0-1])/.test(date);
}

// TODO:
// https://stackoverflow.com/questions/24603919/html5-date-input-6-digit-year

function truncateAge() {
  console.log(`Listening inside truncate...`);
  if (ageInput.value.length > 10) {
    console.log(ageInput.value);
    const first = ageInput.value.slice(0, 4);
    const second = ageInput.value.slice(5, 11);
    ageInput.value = first + second;
    console.log(ageInput.value);
  }
}

// TODO: programatically create error message since there are some fields that would require a different message and a different location
// some containers also have multiple inputs so we need to determine where to put the error message
function addErrorMessage(message) {
  errorMessage.textContent = "";
  const textContent = document.createTextNode(message);
  errorMessage.appendChild(textContent);
}

function createError() {
  const hasRowError = displaySection.lastElementChild.classList.contains(
    "error"
  );

  const hasOutput = displaySection.lastElementChild.classList.contains(
    "output"
  );

  if (!hasRowError) {
    const row = document.createElement("div");
    row.classList.add("row", "error");

    const col = document.createElement("div");
    col.classList.add("col", "col-12", "error-col");

    const img = document.createElement("img");
    const imgSrc = "../img/warning.png";
    img.src = imgSrc;
    img.classList.add("error-img");

    const errMessage = document.createElement("div");
    errMessage.innerHTML = "Please check your input.";
    errMessage.classList.add("error-message");

    col.append(img);
    col.append(errMessage);

    row.append(col);

    if (
      hasOutput &&
      !displaySection.lastElementChild.classList.contains("hidden")
    ) {
      displaySection.lastElementChild.classList.toggle("hidden");
    }

    displaySection.append(row);
  }
}

function removeError() {
  const hasRowError = displaySection.lastElementChild.classList.contains(
    "error"
  );

  if (hasRowError) {
    displaySection.lastChild.remove();
  }

  const hasOutput = displaySection.lastElementChild.classList.contains(
    "output"
  );

  if (
    hasOutput &&
    displaySection.lastElementChild.classList.contains("hidden")
  ) {
    displaySection.lastElementChild.classList.toggle("hidden");
  }
}
