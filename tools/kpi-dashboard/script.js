const loginScreen = document.getElementById('loginScreen');
const app = document.getElementById('app');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const toggleTheme = document.getElementById('toggleTheme');

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('userName').textContent = user.email;
    loginScreen.style.display = 'none';
    app.style.display = 'flex';
    loadWidgets(); // Load KPIs
  } else {
    app.style.display = 'none';
    loginScreen.style.display = 'flex';
  }
});

loginBtn.onclick = () => {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, pass)
    .catch(err => alert(err.message));
};

logoutBtn.onclick = () => auth.signOut();

toggleTheme.onclick = () => {
  document.body.classList.toggle('dark');
};

function loadWidgets() {
  const grid = document.getElementById('kpiGrid');
  const kpis = [
    { title: "Revenue", value: "$120,000", domain: "Sales", data: [100, 120, 90, 130] },
    { title: "Leads", value: "320", domain: "Sales", data: [300, 280, 310, 320] },
    { title: "Conversion Rate", value: "12%", domain: "Sales", data: [11, 12, 10, 12] },
    { title: "Reach", value: "75,000", domain: "Marketing", data: [50000, 60000, 70000, 75000] },
    { title: "Engagement", value: "5,200", domain: "Marketing", data: [4000, 4500, 5000, 5200] },
    { title: "Marketing ROI", value: "180%", domain: "Marketing", data: [160, 170, 180, 180] },
    { title: "Profit", value: "$18,000", domain: "Finance", data: [14000, 15000, 16000, 18000] },
    { title: "Cash Flow", value: "$24,500", domain: "Finance", data: [20000, 22000, 23000, 24500] },
    { title: "Margins", value: "45%", domain: "Finance", data: [40, 42, 43, 45] },
    { title: "Output", value: "12,340 units", domain: "Manufacturing", data: [10000, 11000, 11500, 12340] },
    { title: "Downtime", value: "2.5 hrs", domain: "Manufacturing", data: [3.1, 2.9, 2.8, 2.5] },
    { title: "Yield", value: "94%", domain: "Manufacturing", data: [92, 93, 94, 94] }
  ];

  kpis.forEach((kpi, index) => {
    const div = document.createElement('div');
    div.className = 'kpi-card';
    div.innerHTML = `<h3>${kpi.title}</h3><p>${kpi.value}</p><canvas id="chart${index}"></canvas>`;
    grid.appendChild(div);
    new Chart(document.getElementById(`chart${index}`), {
      type: 'line',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: kpi.title,
          data: kpi.data,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  });
}
