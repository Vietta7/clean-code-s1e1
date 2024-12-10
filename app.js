// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task"); // Add a new task.
var addButton = document.getElementsByTagName("button")[0]; // first button
var incompleteTaskHolder = document.getElementById("tasks-todo"); // ul of #incompleteTasks
var completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks

// New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");

  // input (checkbox)
  var checkBox = document.createElement("input"); // checkbox
  // label
  var label = document.createElement("label"); // label
  label.innerText = taskString;
  label.className = "task__label";

  // input (text)
  var editInput = document.createElement("input"); // text
  // button.edit
  var editButton = document.createElement("button"); // edit button

  // button.delete
  var deleteButton = document.createElement("button"); // delete button
  var deleteButtonImg = document.createElement("img"); // delete button image

  label.innerText = taskString;
  label.className = "task__label";

  checkBox.type = "checkbox";
  checkBox.className = "task-item__checkbox"; // Apply the same class as the "Pay Bills" task
  checkBox.checked = false; // New tasks should start as unchecked

  editInput.type = "text";
  editInput.className = "task-input task";

  editButton.innerText = "Edit";
  editButton.className = "edit__btn btn edit"; // Apply the same class as the "Pay Bills" task

  deleteButton.className = "delete__btn btn delete"; // Apply the same class as the "Pay Bills" task
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Remove Task action"; // Set alt attribute for accessibility
  deleteButtonImg.className = "button__img"; // Apply the same class as the existing tasks
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  // Ensure that the newly created listItem has the same structure and classes
  listItem.className = "task-item";
  bindTaskEvents(listItem, taskCompleted);

  return listItem;
};

var addTask = function () {
  console.log("Add Task...");
  // Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  // Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

// Edit an existing task.
var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector('input[type="text"]');
  var label = listItem.querySelector(".task__label");
  var editBtn = listItem.querySelector(".edit__btn");
  var containsClass = listItem.classList.contains("edit-mode");

  // If class of the parent is .editmode
  if (containsClass) {
    // switch to .editmode
    // label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // toggle .editmode on the parent.
  listItem.classList.toggle("edit-mode");
};

// Delete task.
var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  // Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

// Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");

  // Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");
  // Mark task as incomplete.
  // When the checkbox is unchecked
  // Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

// The glue to hold it all together.

// Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    // select ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector(".edit__btn");
    var deleteButton = taskListItem.querySelector(".delete__btn");
  
    // Bind editTask to edit button.
    editButton.onclick = editTask;
    // Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    // Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
  
    // Remove the "completed" style if it exists
    if (taskListItem.classList.contains("completed")) {
      taskListItem.classList.remove("completed");
    }
  };
  

// cycle over incompleteTaskHolder ul list items
// for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  // bind events to list items children(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  // bind events to list items children(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
