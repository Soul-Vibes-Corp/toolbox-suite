const calculateBtn = document.getElementById("calculateBtn");
const exportJSON = document.getElementById("exportJSON");
const exportPDF = document.getElementById("exportPDF");
const toggleTheme = document.getElementById("toggleTheme");

calculateBtn.addEventListener("click", () => {
  const base = parseFloat(document.getElementById("baseSalary").value || 0);
  const bonus = parseFloat(document.getElementById("bonus").value || 0);
  const overtime = parseFloat(document.getElementById("overtime").value || 0);
  const taxRate = parseFloat(document.getElementById("taxRate").value || 0);
  const deductions = parseFloat(document.getElementById("deductions").value || 0);
  const benefits = parseFloat(document.getElementById("benefits").value || 0);
  const view = document.querySelector("input[name='view']:checked").value;

  const gross = base + bonus + overtime + benefits;
  const tax = (gross * taxRate) / 100;
  const net = gross - tax - deductions;

  const monthlyMultiplier = view === "monthly" ? 1 : 12;

  const output = {
    View: view.toUpperCase(),
    Base: base * monthlyMultiplier,
    Bonus: bonus * monthlyMultiplier,
    Overtime: overtime * monthlyMultiplier,
    Benefits: benefits * monthlyMultiplier,
    Gross: gross * monthlyMultiplier,
    Tax: tax * monthlyMultiplier,
    Deductions: deductions * monthlyMultiplier,
    Net: net * monthlyMultiplier,
  };

  document.getElementById("results").textContent = JSON.stringify(output, null, 2);
});

exportJSON.addEventListener("click", () => {
  const data = document.getElementById("results").textContent;
  const blob = new Blob([data], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "salary-report.json";
  a.click();
});

exportPDF.addEventListener("click", () => {
  const printWindow = window.open('', '', 'width=800,height=600');
  const content = document.getElementById("results").textContent;
  printWindow.document.write(`<pre>${content}</pre>`);
  printWindow.document.close();
  printWindow.print();
});

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
