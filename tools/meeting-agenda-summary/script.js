const agendaForm = document.getElementById('agendaForm');
const addAgendaItemBtn = document.getElementById('addAgendaItemBtn');
const agendaItemsContainer = document.getElementById('agendaItemsContainer');
const notesSection = document.getElementById('notesSection');
const meetingTitleDisplay = document.getElementById('meetingTitleDisplay');
const notesInput = document.getElementById('notesInput');
const generateSummaryBtn = document.getElementById('generateSummaryBtn');
const summaryOutput = document.getElementById('summaryOutput');

function createAgendaItem(value = '') {
  const div = document.createElement('div');
  div.classList.add('agenda-item');

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Agenda item';
  input.value = value;
  input.required = true;

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '×';
  removeBtn.title = 'Remove item';

  removeBtn.addEventListener('click', () => {
    agendaItemsContainer.removeChild(div);
  });

  div.appendChild(input);
  div.appendChild(removeBtn);
  agendaItemsContainer.insertBefore(div, addAgendaItemBtn);
}

addAgendaItemBtn.addEventListener('click', () => {
  createAgendaItem();
});

agendaForm.addEventListener('submit', e => {
  e.preventDefault();

  // Collect meeting details
  const title = document.getElementById('meetingTitle').value.trim();
  const dateTime = document.getElementById('meetingDate').value;
  const agendaInputs = agendaItemsContainer.querySelectorAll('.agenda-item input');

  if (agendaInputs.length === 0) {
    alert('Please add at least one agenda item.');
    return;
  }

  const agendaList = [];
  for (const input of agendaInputs) {
    if (input.value.trim() === '') {
      alert('Agenda items cannot be empty.');
      return;
    }
    agendaList.push(input.value.trim());
  }

  // Hide form and show notes section
  agendaForm.classList.add('hidden');
  notesSection.classList.remove('hidden');

  meetingTitleDisplay.textContent = title;

  // Display agenda summary
  let agendaText = `Date & Time: ${new Date(dateTime).toLocaleString()}\n\nAgenda:\n`;
  agendaList.forEach((item, idx) => {
    agendaText += `${idx + 1}. ${item}\n`;
  });
  document.getElementById('agendaSummary').textContent = agendaText;

  // Clear previous notes & summary
  notesInput.value = '';
  summaryOutput.classList.add('hidden');
  summaryOutput.textContent = '';
});

generateSummaryBtn.addEventListener('click', () => {
  const meetingTitle = meetingTitleDisplay.textContent;
  const agendaText = document.getElementById('agendaSummary').textContent;
  const notes = notesInput.value.trim();

  if (!notes) {
    alert('Please enter some notes to generate a summary.');
    return;
  }

  // Generate a neat summary with agenda and notes
  const summary = `
Meeting Summary: ${meetingTitle}

${agendaText}

Notes:
${notes}

---
Generated on: ${new Date().toLocaleString()}
`;

  summaryOutput.textContent = summary;
  summaryOutput.classList.remove('hidden');
});
