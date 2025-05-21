document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeBtn = document.getElementById("toggle-theme");
  const taskInput = document.getElementById("new-task-input");
  const taskList = document.getElementById("task-list");
  const exportJsonBtn = document.getElementById("export-json");

  themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && taskInput.value.trim()) {
      const li = document.createElement("li");
      li.textContent = taskInput.value;
      taskList.appendChild(li);
      taskInput.value = "";
      updateStats();
    }
  });

  exportJsonBtn.addEventListener("click", () => {
    const tasks = Array.from(taskList.children).map(li => li.textContent);
    const blob = new Blob([JSON.stringify({ tasks })], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schedule.json";
    a.click();
    URL.revokeObjectURL(url);
  });

  function updateStats() {
    document.getElementById("stats").textContent = `Hours: ${taskList.children.length}, Tasks: ${taskList.children.length}`;
  }
});
