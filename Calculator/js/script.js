const buttonList = document.querySelectorAll("button");
const buttonArrayList = Array.from(buttonList);

const displayInput = document.querySelector("#display-input");

const accuracyFactor = 10;

function addListeners() {
  buttonArrayList.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(`${e.target.id}`);
      // for modifing on cursor: future feature
      // const cursorPos = displayInput.selectionStart; TODO
      const inpValue = displayInput.value;

      if (e.target.id == "btn-equals" && inpValue.length > 0) {
        inputValidation();
      } else if (e.target.id == "btn-clear") {
        clear();
      } else {
        addToDisplay(e.target.id);
      }
    });
  });
}

function addToDisplay(btnId) {
  let inp;
  switch (btnId) {
    case "btn-divide":
      inp = "/";
      break;
    case "btn-multiply":
      inp = "*";
      break;
    case "btn-minus":
      inp = "-";
      break;
    case "btn-add":
      inp = "+";
      break;
    case "btn-dot":
      inp = ".";
      break;
    case "btn-0":
      inp = "0";
      break;
    case "btn-1":
      inp = "1";
      break;
    case "btn-2":
      inp = "2";
      break;
    case "btn-3":
      inp = "3";
      break;
    case "btn-4":
      inp = "4";
      break;
    case "btn-5":
      inp = "5";
      break;
    case "btn-6":
      inp = "6";
      break;
    case "btn-7":
      inp = "7";
      break;
    case "btn-8":
      inp = "8";
      break;
    case "btn-9":
      inp = "9";
      break;
    default:
      break;
  }
  console.log(`Inp = ${inp}`);
  displayInput.value += inp;
}

function clear() {
  if (displayInput.value.length > 0) {
    displayInput.value = displayInput.value.slice(
      0,
      displayInput.value.length - 1
    );
  }
}

function inputValidation() {
  // pattern checker for valid input
  // pattern for integer
  // const pattern = /^[\-]?[0-9]+([/*\-+]{1}[\-]?[0-9]+)*/g;

  // pattern for decimal
  // int + int
  // decimal + int
  // int + decimal
  // negative - positive
  // negative - negative

  // negative * positive
  // negative * negative
  // positive * positive
  // positive * negative

  // negative / positive
  // negative / negative
  // positive / negative
  // positive / positive

  const pattern = /^[\-]?[0-9]*\.?[0-9]+([/*\-+]{1}[\-]?[0-9]*\.?[0-9]+)*/g;
  // const pattern = /^[\-]?[0-9]*\.?[0-9]+([/*\-+]{1}[\-]?[0-9]*\.?[0-9]+)*[0-9]+$/g;

  // pattern checker if there's something wrong with the input
  const pattern2 = /[/*\-+]+?/;
  const s = displayInput.value;

  // console.log(s.match(pattern));

  // if checker returns valid, everything is good. However, if it includes an operator, then it is invalid
  // const checker = s.replace(pattern, "valid");
  const followsPattern = pattern.test(s);
  const hasOperator = pattern2.test(s);
  console.log(`Pattern Test: ${followsPattern}, hasOperator: ${hasOperator}`);
  // console.log(`Checker is: ${checker}`);
  // TODO: If single operand remaining, does weird things

  // if (checker == null || checker == "" || pattern2.test(checker)) {
  //   console.log(`Pattern is invalid`);
  // } else {
  //   console.log(`Pattern is valid`);
  //   // if pattern is valid, parse and compute
  //   parseString(s);
  // }

  if (followsPattern && hasOperator) {
    parseString(s);
  } else {
  }
}

function parseString(string) {
  console.log(`Parsing ${string} ...`);

  // need g as per mdn docs for exec
  const operatorPattern = /[/*\-+]/g;
  // lookback: (?<=y)x
  // left operand: matches the number(may contain a negative sign) if and only if it's preceded by an operator sign
  // lookahead:x(?=y)
  // right operand:
  // for decimal, changed parseInt to parseFloat
  // additional error occured since parseFloat is inaccurate e.g. 45.3 + 3.3 yields 48.59999994
  // possible solutions would be to multiply by 10 the operands then divide the sum by 10, but will test it out
  // TODO

  // pattern for integer
  // const lookBackPattern = /(?<=[/*\-+]?)[\-]?[0-9]+/;

  // pattern for decimal
  const lookBackPattern = /(?<=[/*\-+]?)[\-]?[0-9]*\.?[0-9]+/;

  // const lookAheadPattern = /[\-]?[0-9]*\.?[0-9]+(?=[/*\-+])/;

  // check last operator Index
  let lastOperatorIndex = 0;

  let arrayForm = [];

  // regex exec
  // either find all operators or operands first then find some way to split and evaluate
  while (operatorPattern.exec(string) != null) {
    // console.log(`Executing while.. ${operandPattern.lastIndex}`);
    if (operatorPattern.lastIndex != null && operatorPattern.lastIndex > 1) {
      if (isNaN(string[operatorPattern.lastIndex - 2])) {
        // console.log(`Position ${operandPattern.lastIndex} is a negative`);
      } else {
        // console.log(`Position ${operandPattern.lastIndex} is an operator`);
        console.log(
          `Substring to be matched with pattern: ${string.substring(
            lastOperatorIndex,
            operatorPattern.lastIndex - 1
          )}`
        );
        const leftOperand = parseFloat(
          string
            .substring(lastOperatorIndex, operatorPattern.lastIndex - 1)
            .match(lookBackPattern)
        );

        console.log(`Left Operand: ${leftOperand}`);

        arrayForm.push(leftOperand);
        arrayForm.push(string[operatorPattern.lastIndex - 1]);
        lastOperatorIndex = operatorPattern.lastIndex - 1;
      }
    }
  }

  const lastOperand = parseFloat(
    string.substring(lastOperatorIndex + 1, string.length)
  );

  console.log(
    `Last Op Index ${lastOperatorIndex}, String Length ${
      string.length
    }, Substring is: ${string.substring(lastOperatorIndex + 1, string.length)}`
  );

  arrayForm.push(lastOperand);
  console.log(`Original Array: ${arrayForm}`);
  // evaluate the expression

  // function to check if there are higher orders (divide or multiply, whichever it finds first)
  const isHigherOrder = (element) => {
    if (element == "/" || element == "*") {
      return element;
    } else {
      return null;
    }
  };

  // same function as above but for lower orders (- and +)
  const isLowerOrder = (element) => {
    if (element == "+" || element == "-") {
      return element;
    } else {
      return null;
    }
  };

  // for each element in the array, look for the index (prioritize higher order then lower order), match to string index, check left and right operands, evaluate
  // TODO: SHORTEN

  while (arrayForm.findIndex(isHigherOrder) != -1) {
    const index = arrayForm.findIndex(isHigherOrder);

    if (arrayForm[index] == "/") {
      arrayForm.splice(
        index - 1,
        3,
        // without accuracy factor
        // arrayForm[index - 1] / arrayForm[index + 1]
        // with accuracy factor
        (arrayForm[index - 1] * accuracyFactor) /
          (arrayForm[index + 1] * accuracyFactor)
      );
    } else if (arrayForm[index] == "*") {
      arrayForm.splice(
        index - 1,
        3,
        // without accuracy factor
        // arrayForm[index - 1] * arrayForm[index + 1]
        // with accuracy factor
        (arrayForm[index - 1] *
          accuracyFactor *
          (arrayForm[index + 1] * accuracyFactor)) /
          (accuracyFactor * accuracyFactor)
      );
    }
    console.log(`New Array: ${arrayForm}`);
  }

  while (arrayForm.findIndex(isLowerOrder) != -1) {
    const index = arrayForm.findIndex(isLowerOrder);
    console.log(`Index ${index}`);
    if (arrayForm[index] == "+") {
      arrayForm.splice(
        index - 1,
        3,
        // without accuracy factor
        // arrayForm[index - 1] + arrayForm[index + 1]
        // with accuracy factor
        (arrayForm[index - 1] * accuracyFactor +
          arrayForm[index + 1] * accuracyFactor) /
          accuracyFactor
      );
    } else if (arrayForm[index] == "-") {
      arrayForm.splice(
        index - 1,
        3,
        // without accuracy factor
        // arrayForm[index - 1] - arrayForm[index + 1]
        // with accuracy factr
        (arrayForm[index - 1] * accuracyFactor -
          arrayForm[index + 1] * accuracyFactor) /
          accuracyFactor
      );
    }
    console.log(`New Array: ${arrayForm}`);
  }

  // TODO: Display only two decimal places if possible rounded off
  console.log(`Disp: ${displayInput.value}`);
  arrayForm[0] = toTwoDecimal(arrayForm[0]);
  displayInput.value = arrayForm[0];
}

function toTwoDecimal(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", addListeners);
} else {
  addListeners();
}
