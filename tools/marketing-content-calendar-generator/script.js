document.getElementById('calendar-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const business = document.getElementById('businessName').value;
  const audience = document.getElementById('audience').value;
  const industry = document.getElementById('industry').value;
  const themes = document.getElementById('themes').value.split(',');
  const frequency = document.getElementById('frequency').value;
  const startDate = new Date(document.getElementById('startDate').value);
  const duration = parseInt(document.getElementById('duration').value);
  const platforms = Array.from(document.getElementById('platforms').selectedOptions).map(opt => opt.value);

  const output = document.getElementById('calendar-table');
  output.innerHTML = '';
  const table = document.createElement('table');

  const header = document.createElement('tr');
  ['Date', 'Platform', 'Theme', 'Content Type', 'Suggested Idea'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    header.appendChild(th);
  });
  table.appendChild(header);

  const contentTypes = ['Post', 'Reel', 'Blog', 'Newsletter', 'Story'];
  let date = new Date(startDate);

  const totalPosts = frequency === 'daily' ? duration : Math.ceil((duration / 7) * (frequency === '3' ? 3 : 1));
  for (let i = 0; i < totalPosts; i++) {
    const row = document.createElement('tr');
    const theme = themes[i % themes.length].trim();
    const platform = platforms[i % platforms.length];
    const contentType = contentTypes[i % contentTypes.length];
    const idea = `Create a ${contentType.toLowerCase()} on "${theme}" for ${audience}`;

    row.innerHTML = `
      <td>${date.toISOString().split('T')[0]}</td>
      <td>${platform}</td>
      <td>${theme}</td>
      <td>${contentType}</td>
      <td>${idea}</td>
    `;
    table.appendChild(row);

    date.setDate(date.getDate() + (frequency === 'daily' ? 1 : frequency === '3' ? 2 : 7));
  }

  output.appendChild(table);
  document.getElementById('downloadCsv').style.display = 'inline-block';
});

// Download CSV
document.getElementById('downloadCsv').addEventListener('click', () => {
  const rows = Array.from(document.querySelectorAll('table tr')).map(tr =>
    Array.from(tr.children).map(td => `"${td.textContent}"`).join(',')
  );
  const csvContent = "data:text/csv;charset=utf-8," + rows.join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csvContent));
  link.setAttribute('download', 'marketing_content_calendar.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
