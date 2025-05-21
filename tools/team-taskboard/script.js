function addTask(columnId) {
  const taskText = prompt("Enter task description:");
  if (taskText) {
    const taskEl = document.createElement("div");
    taskEl.className = "task";
    taskEl.draggable = true;
    taskEl.textContent = taskText;
    addDragEvents(taskEl);
    document.getElementById(columnId + "-list").appendChild(taskEl);
  }
}

function addDragEvents(taskEl) {
  taskEl.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", taskEl.textContent);
    e.dataTransfer.setData("sourceId", taskEl.parentNode.id);
    taskEl.classList.add("dragging");
  });

  taskEl.addEventListener("dragend", () => {
    taskEl.classList.remove("dragging");
  });
}

document.querySelectorAll(".task-list").forEach(list => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  list.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const newTask = document.createElement("div");
    newTask.className = "task";
    newTask.draggable = true;
    newTask.textContent = data;
    addDragEvents(newTask);
    list.appendChild(newTask);
  });
});
