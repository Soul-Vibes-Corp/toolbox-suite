let timerInterval = null;
let startTime = null;
let tracking = false;
let logs = [];

document.getElementById("startStopBtn").addEventListener("click", () => {
  if (!tracking) {
    // Start tracking
    const taskName = document.getElementById("taskName").value.trim();
    if (!taskName) return alert("Please enter a task name.");
    startTime = new Date();
    tracking = true;
    document.getElementById("startStopBtn").textContent = "⏹ Stop";
  } else {
    // Stop tracking
    const endTime = new Date();
    const duration = Math.round((endTime - startTime) / 1000); // in seconds
    const taskName = document.getElementById("taskName").value.trim();
    const tags = document.getElementById("taskTags").value.split(",").map(tag => tag.trim());
    const category = document.getElementById("taskCategory").value;

    logs.push({
      task: taskName,
      start: startTime.toLocaleString(),
      end: endTime.toLocaleString(),
      duration: `${Math.floor(duration / 60)}m ${duration % 60}s`,
      seconds: duration,
      tags,
      category,
    });

    tracking = false;
    startTime = null;
    document.getElementById("startStopBtn").textContent = "▶️ Start";
    document.getElementById("taskName").value = "";
    document.getElementById("taskTags").value = "";

    updateLogs();
  }
});

function updateLogs() {
  document.getElementById("timeLogs").textContent = JSON.stringify(logs, null, 2);
}

document.getElementById("exportLogsJSON").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "timelogs.json";
  a.click();
});

document.getElementById("exportLogsPDF").addEventListener("click", () => {
  const printWindow = window.open('', '', 'width=800,height=600');
  const content = document.getElementById("timeLogs").textContent;
  printWindow.document.write(`<pre>${content}</pre>`);
  printWindow.document.close();
  printWindow.print();
});

document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
