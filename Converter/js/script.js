// TODO:
// fix output for discount: display price round off
// fix output for temperature : display float round off

// fix output display
// generalize css

// declare variables

// data converter
const sourceInp = document.querySelector("#source-input");
const sourceData = document.querySelector("#source-data");
const outInt = document.querySelector("#source-output");
const outData = document.querySelector("#output-data");

const dataTable = {
  bits: -10,
  byte: 0,
  kilobyte: 1,
  megabyte: 2,
  gigabyte: 3,
  terabyte: 4,
  petabyte: 5,
};

// bmi input / output
const sourceWeight = document.querySelector("#bmi-weight");
const sourceHeight = document.querySelector("#bmi-height");
const weightUnit = document.querySelector("#bmi-weight-unit");
const heightUnit = document.querySelector("#bmi-height-unit");
const btnComputeBMI = document.querySelector("#btn-compute-bmi");
const bmiResult = document.querySelector("#bmi-result");
const bmiResultStatus = document.querySelector("#bmi-result-status");

// age input / output
const ageInput = document.querySelector("#dob-input");
const ageOutput = document.querySelector("#dob-output");
const ageOutputContainer = document.querySelector(".age-output");
const ageErrorContainer = document.querySelector(".age-error-container");
const btnAgeCompute = document.querySelector("#btn-age-compute");
const ageOptions = document.querySelector("#age-options");

// date
const dateFrom = document.querySelector("#date-from");
const dateTo = document.querySelector("#date-to");
const dateYear = document.querySelector("#date-years");
const dateMonths = document.querySelector("#date-months");
const dateDays = document.querySelector("#date-days");

// temperature
const sourceTemp = document.querySelector("#temp-source-input");
const destTemp = document.querySelector("#temp-source-output");
const sourceTempUnit = document.querySelector("#temp-source-options");
const destTempUnit = document.querySelector("#temp-to-options");

// discount
const discOrigPrice = document.querySelector("#disc-original-price");
const discDiscRate = document.querySelector("#disc-discount-rate");
const discFinalPrice = document.querySelector("#disc-final-price");

// length
const lengthInput = document.querySelector("#length-input");
const lengthInputOption = document.querySelector("#length-input-option");
const lengthOutput = document.querySelector("#length-output");
const lengthOutputOption = document.querySelector("#length-output-option");

function addListeners() {
  // data
  sourceInp.oninput = computeData;
  outInt.oninput = computeDataReverse;
  sourceData.addEventListener("change", computeData);
  outData.addEventListener("change", computeData);

  // bmi
  btnComputeBMI.addEventListener("click", computeBMI);

  // age
  btnAgeCompute.addEventListener("click", computeAge);
  ageOptions.addEventListener("change", computeAge);

  // date
  dateFrom.value = getDateToday();
  dateTo.value = getDateToday();
  dateFrom.addEventListener("change", computeDate);
  dateTo.addEventListener("change", computeDate);

  // temperature
  sourceTemp.oninput = computeTemperature;
  // destTemp.oninput = computeTempReverse;
  sourceTempUnit.addEventListener("change", computeTemperature);
  destTempUnit.addEventListener("change", computeTemperature);

  // discount
  discOrigPrice.addEventListener("input", computeDiscount);
  discDiscRate.addEventListener("input", computeDiscount);

  discDiscRate.defaultValue = 10;

  // length
  lengthInput.addEventListener("input", computeLength);
  // lengthOutput.addEventListener("input") reverse
  lengthInputOption.addEventListener("change", computeLength);
  lengthOutputOption.addEventListener("change", computeLength);
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

function convertFromCM(value, toUnit) {
  const inputValue = parseFloat(value);
  let convertedValue;
  console.log(`Value from CM is ${value}`);
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

  console.log(`Value in cm is ${convertedValue}`);
  return convertedValue;
}

function computeLength() {
  const inLength = lengthInput.value;
  const inUnit = lengthInputOption.value;
  const outUnit = lengthOutputOption.value;

  if (isNotEmptyAndValid(inLength, 0)) {
    if (inUnit != outUnit) {
      let temp = convertToCM(inLength, inUnit);
      let output = convertFromCM(temp, outUnit);

      lengthOutput.value = output;
    } else {
      lengthOutput.value = inLength;
    }
  } else {
    console.log(`Length: Input is not valid!`);
  }
}

function computeDiscount() {
  console.log(
    `price is ${isNotEmptyAndValid(
      discOrigPrice.value,
      0
    )} and discount is ${isNotEmptyAndValid(discDiscRate.value, 0, 100)}`
  );
  if (
    isNotEmptyAndValid(discOrigPrice.value, 0) &&
    isNotEmptyAndValid(discDiscRate.value, 0, 100)
  ) {
    // compute discount
    const originalPrice = parseFloat(discOrigPrice.value);
    let finalPrice;
    let discountPrice;
    const discountRate = parseFloat(discDiscRate.value) / 100;
    discountPrice = originalPrice * (parseFloat(discDiscRate.value) / 100);
    finalPrice = originalPrice - discountPrice;

    console.log(
      `Original Price is: ${originalPrice}. Discount Rate is ${
        discountRate * 100
      }%. Discount Price is ${discountPrice}. Final Price is ${finalPrice}`
    );

    discFinalPrice.innerHTML = finalPrice;
  } else {
    discFinalPrice.innerHTML = "";
  }
}

function computeTemperature() {
  if (sourceTemp.value != null && sourceTemp.value != "") {
    const from = sourceTemp.value;
    const fromUnit = sourceTempUnit.value;
    const toUnit = destTempUnit.value;

    destTemp.value = convertTemp(
      sourceTemp.value,
      sourceTempUnit.value,
      destTempUnit.value
    );
  } else {
    console.log(`No valid input!`);
  }
}

function convertTemp(from, fromUnit, toUnit) {
  let temperature = from;

  if (fromUnit == toUnit) {
    temperature = from;
  } else {
    switch (fromUnit) {
      case "celcius":
        temperature = convertFromCelcius(from, toUnit);
        break;
      case "farenheit":
        temperature = convertFromFarenheit(from, toUnit);
        break;
      case "kelvin":
        temperature = convertFromKelvin(from, toUnit);
        break;
      case "rankine":
        temperature = convertFromRankine(from, toUnit);
        break;
      case "reaumur":
        temperature = convertFromReaumur(from, toUnit);
        break;
      default:
        temperature = 0;
        break;
    }
  }

  return temperature;
}

function convertFromCelcius(from, toUnit) {
  let temperature = parseFloat(from);

  console.log(`Converting from ${from}...With type ${typeof from}`);

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
      temperature = 0;
      break;
  }

  return temperature;
}

function convertFromFarenheit(from, toUnit) {
  let temperature = parseFloat(from);

  switch (toUnit) {
    case "celcius":
      temperature = (temperature - 32) / (9 / 5);
      break;
    case "kelvin":
      temperature = (temperature + 459.67) / (9 / 5);
      break;
    case "rankine":
      temperature = temperature + 459.67;
      break;
    case "reaumur":
      temperature = (temperature - 32) / (9 / 4);
      break;
    default:
      temperature = 0;
      break;
  }

  return temperature;
}

function convertFromKelvin(from, toUnit) {
  let temperature = parseFloat(from);

  switch (toUnit) {
    case "celcius":
      temperature = temperature - 273.15;
      break;
    case "farenheit":
      temperature = temperature * (9 / 5) - 459.67;
      break;
    case "rankine":
      temperature = temperature * (9 / 5);
      break;
    case "reaumur":
      temperature = (temperature - 273.15) * 0.8;
      break;
    default:
      temperature = 0;
      break;
  }

  return temperature;
}

function convertFromRankine(from, toUnit) {
  let temperature = parseFloat(from);

  switch (toUnit) {
    case "celcius":
      temperature = (temperature - 32 - 459.67) / (9 / 5);
      break;
    case "kelvin":
      temperature = temperature / (9 / 5);
      break;
    case "farenheit":
      temperature = temperature - 459.67;
      break;
    case "reaumur":
      temperature = (temperature - 32 - 459.67) / (9 / 5);
      break;
    default:
      temperature = 0;
      break;
  }

  return temperature;
}

function convertFromReaumur(from, toUnit) {
  let temperature = parseFloat(from);

  switch (toUnit) {
    case "celcius":
      temperature = temperature * 1.25;
      break;
    case "kelvin":
      temperature = temperature * 1.25 + 273.15;
      break;
    case "farenheit":
      temperature = temperature * 2.25 + 32;
      break;
    case "rankine":
      temperature = temperature * 2.25 + 32 + 459.67;
      break;
    default:
      temperature = 0;
      break;
  }

  return temperature;
}

function computeDate() {
  const date1 = convertStringToDate(dateFrom.value);
  const date2 = convertStringToDate(dateTo.value);

  const sourceDate = luxon.DateTime.fromJSDate(date1);
  const destDate = luxon.DateTime.fromJSDate(date2);

  const diff = destDate
    .diff(sourceDate, ["years", "months", "days"])
    .toObject();

  dateYear.textContent = diff["years"] + " years";
  dateMonths.textContent = diff["months"] + " months";
  dateDays.textContent = diff["days"] + " days";
}

function convertStringToDate(dateString) {
  const dateParts = dateString.split("-");
  return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
}

function getDateToday() {
  const today = new Date();
  return today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
}

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
    toggleAgeError(1);
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

    ageOutput.textContent = convertAge(ageNow);
  } else {
    // error message
    toggleAgeError(0);
  }
}

function toggleAgeError(errCode) {
  if (errCode === 0 && ageErrorContainer.style.display != "inline-block") {
    ageErrorContainer.style.display = "inline-block";
    // ageOutputContainer.style.display = "none";
  } else {
    // ageOutputContainer.style.display = "flex";
    ageErrorContainer.style.display = "none";
  }
}

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
    bmiSpan.classList.add("bmi-class");
    bmiResult.textContent = "Your BMI is ";
    bmiResult.appendChild(bmiSpan);

    const bmiHighlight = document.createElement("span");
    bmiHighlight.textContent = bmiClassification;
    bmiHighlight.classList.add("bmi-class");
    bmiResultStatus.textContent = "You are ";
    bmiResultStatus.appendChild(bmiHighlight);

    bmiResult.style.display = "block";
    bmiResultStatus.style.display = "block";
  } else {
    console.log(`Wrong input!`);
  }
}

// scenarios
// [x] from lower to larger excluding bits
// [x] from larger to lower excluding bits
// [x] same unit excluding bits
// [x] bits
// [x] onchange on output should be a diff function to change inpvalue
function computeData() {
  let multiplier = 0;
  let result = 0;
  //   check if source input is empty

  console.log(this);
  if (
    sourceInp.value != null &&
    sourceInp.value != "" &&
    sourceInp.value >= 0
  ) {
    multiplier = dataTable[outData.value] - dataTable[sourceData.value];

    // for bits
    if (multiplier >= 10) {
      console.log("Running...");
      result = sourceInp.value / (8 * Math.pow(1024, dataTable[outData.value]));
    } else if (multiplier <= -5) {
      result =
        sourceInp.value * Math.pow(1024, dataTable[sourceData.value]) * 8;
    }

    // for bytes
    if (multiplier > 0 && multiplier < 10) {
      console.log("converting up");
      result = sourceInp.value / Math.pow(1024, multiplier);
    } else if (multiplier < 0 && multiplier > -5) {
      console.log("converting down");
      result = sourceInp.value * Math.pow(1024, multiplier * -1);
    } else if (multiplier === 0) {
      result = sourceInp.value;
    }

    outInt.value = result;
  } else {
    //   show error or do nothing
    sourceInp.value = "";
    outInt.value = "";
  }
}

function computeDataReverse() {
  let multiplier = 0;
  let result = 0;

  if (outInt.value != null && outInt.value != "" && outInt.value >= 0) {
    multiplier = dataTable[sourceData.value] - dataTable[outData.value];

    // for bits
    if (multiplier >= 10) {
      result = outInt.value / (8 * Math.pow(1024, dataTable[sourceData.value]));
    } else if (multiplier <= -5) {
      result = outInt.value * Math.pow(1024, dataTable[outData.value]) * 8;
    }

    // for bytes
    if (multiplier > 0 && multiplier < 10) {
      console.log("converting up");
      result = outInt.value / Math.pow(1024, multiplier);
    } else if (multiplier < 0 && multiplier > -5) {
      console.log("converting down");
      result = outInt.value * Math.pow(1024, multiplier * -1);
    } else if (multiplier === 0) {
      result = outInt.value;
    }

    sourceInp.value = result;
  } else {
    sourceInp.value = "";
    outInt.value = "";
  }
}

// check if DOM Content has loaded
// if document has finished loading the initial structure
// to avoid null pointers if ever we are searching for a specific element and it hasn't loaded yet
if (document.onreadystatechange == "loading") {
  document.addEventListener("DOMContentLoaded", addListeners);
} else {
  addListeners();
}
