document.getElementById('bizplan-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const inputs = this.querySelectorAll('input, textarea');
  let plan = '';
  inputs.forEach(input => {
    plan += `🔹 ${input.placeholder}:\n${input.value.trim()}\n\n`;
  });

  document.getElementById('plan-content').textContent = plan;
  document.getElementById('plan-output').classList.remove('hidden');
});

function downloadPlan() {
  const text = document.getElementById('plan-content').textContent;
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'BusinessPlan.txt';
  a.click();
}
