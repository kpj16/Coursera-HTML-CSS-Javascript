// variable declarations

const btnAddTask = document.querySelector("#btn-add-task");
const doneBtnList = document.querySelectorAll(".btn-done");
const removeBtnList = document.querySelectorAll(".btn-remove");
const taskInput = document.querySelector("#text-input");
const unorderedList = document.querySelector("#ul-task-list");
const warningContainer = document.querySelector("#warning-container");
const warning = document.querySelector("#warning");
const clearBtn = document.querySelector("#btn-clear-all");

// function declarations
btnAddTask.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAllTask);

// function to add task
function addTask(e) {
  let task = taskInput.value;
  console.log(warningContainer.textContent);
  if (task === "" || task === null || task === undefined) {
    if (
      warningContainer.childElementCount == 1 &&
      (warning.textContent == "" ||
        warning.textContent == null ||
        warning.textContent == undefined)
    ) {
      warning.append(document.createTextNode("Task cannot be empty or blank."));
    } else {
      // append warning to warning container
      warningContainer.appendChild(warning);
    }

    setTimeout(() => warning.remove(), 3000);
  } else {
    // create new li element
    let li = document.createElement("li");
    // add class
    li.className = "task-list-item";
    // create new p element
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(taskInput.value));

    // create done-button
    let btn1 = document.createElement("button");
    btn1.className = "btn-done";
    btn1.textContent = "✓";
    btn1.addEventListener("click", taskDone);

    // create remove-button
    let btn2 = document.createElement("button");
    btn2.className = "btn-remove";
    btn2.textContent = "✗";
    btn2.addEventListener("click", removeTask);

    //append btn to li
    li.appendChild(p);
    li.appendChild(btn1);
    li.appendChild(btn2);

    // append to UL
    unorderedList.appendChild(li);

    //Clear the input area
    taskInput.value = "";
  }
}

// add eventlisteners to all buttons
function addEvent(buttonList) {
  for (let i = 0; i < buttonList.length; i++) {
    if (buttonList[i].className === "btn-done") {
      buttonList[i].addEventListener("click", taskDone);
    } else if (buttonList[i].className === "btn-remove") {
      buttonList[i].addEventListener("click", removeTask);
    } else {
    }
  }
}

// function that marks a task as done
function taskDone(e) {
  let cname = e.target.parentElement.className;

  if (cname == "task-list-item done") {
    if (confirm("Un-mark this task as NOT DONE?")) {
      e.target.parentElement.classList.remove("done");
    }
  } else {
    e.target.parentElement.classList.add("done");
  }
}

// function to remove task on the list
function removeTask(e) {
  if (confirm("Are you sure you want to remove this task?")) {
    let parentLi = e.target.parentElement;
    unorderedList.removeChild(parentLi);
  }
}

// function to clear all task
function clearAllTask(e) {
  if (confirm("Are you sure you want to remove all tasks?")) {
    let parentUL = unorderedList;
    while (parentUL.hasChildNodes()) {
      parentUL.removeChild(parentUL.firstChild);
    }
  }
}

// function execution

addEvent(doneBtnList);
addEvent(removeBtnList);
