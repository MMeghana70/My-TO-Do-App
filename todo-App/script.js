//const input = document.getElementById("task-input");
//const addBtn = document.getElementById("add-btn");
//const taskList = document.getElementById("task-list");

//addBtn.addEventListener("click", () => {
  //const taskText = input.value.trim();

  //if (taskText === "") {
  //  alert("Please enter a task!");
  //  return;
  //}

  //const li = document.createElement("li");
  //li.textContent = taskText;

  //// Add complete and delete buttons
  //const completeBtn = document.createElement("button");
  //completeBtn.textContent = "✔";
  //completeBtn.style.marginRight = "10px";
  //completeBtn.addEventListener("click", () => {
    //li.classList.toggle("completed");
  //});

  //const deleteBtn = document.createElement("button");
  //deleteBtn.textContent = "🗑";
  //deleteBtn.addEventListener("click", () => {
   // taskList.removeChild(li);
  //});

  //li.prepend(completeBtn);
  //li.appendChild(deleteBtn);
  //taskList.appendChild(li);

  //input.value = "";
//});
 const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const counter = document.getElementById("task-counter");

// Load tasks from local storage on page load
window.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  addTaskToDOM(taskText, false);
  saveTask(taskText, false);
  input.value = "";
  updateTaskCounter(); // ✅ Update immediately after adding
});

function addTaskToDOM(taskText, isCompleted) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (isCompleted) {
    li.classList.add("completed");
  }

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.style.marginRight = "10px";
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
    updateTaskCounter(); // ✅ Update after marking complete
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    updateLocalStorage();
    updateTaskCounter(); // ✅ Update after deleting
  });

  li.prepend(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(taskText, isCompleted) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: isCompleted });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    const taskText = li.childNodes[1].textContent;
    const completed = li.classList.contains("completed");
    tasks.push({ text: taskText, completed: completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTaskToDOM(task.text, task.completed);
  });
  updateTaskCounter(); // ✅ Call after loading all tasks
}

function updateTaskCounter() {
  const totalTasks = taskList.querySelectorAll("li").length;
  const completedTasks = taskList.querySelectorAll("li.completed").length;
  counter.textContent = `📝 Total Tasks: ${totalTasks} | ✅ Completed: ${completedTasks}`;
}


