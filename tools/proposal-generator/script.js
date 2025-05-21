document.getElementById('proposalForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const clientName = document.getElementById('clientName').value;
  const projectScope = document.getElementById('projectScope').value;
  const deliverables = document.getElementById('deliverables').value;
  const timeline = document.getElementById('timeline').value;
  const budget = document.getElementById('budget').value;

  const proposal = `
Dear ${clientName},

Thank you for considering us for your upcoming project. Below is the customized proposal:

📝 Project Scope:
${projectScope}

📦 Deliverables:
${deliverables}

📅 Timeline:
${timeline}

💰 Budget:
${budget}

We are confident that this collaboration will be a valuable one and look forward to working with you.

Sincerely,  
Your Company
  `;

  document.getElementById('output').innerText = proposal;
});
