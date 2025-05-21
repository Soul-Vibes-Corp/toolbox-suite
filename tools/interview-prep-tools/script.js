const questions = {
  frontend: {
    technical: ["Explain the virtual DOM.", "What is React's useEffect used for?"],
    behavioral: ["Describe a time you resolved a UI issue under pressure."],
    company: ["What do you know about our design system?"]
  },
  backend: {
    technical: ["Explain REST vs GraphQL.", "How do you scale a Node.js app?"],
    behavioral: ["Describe your experience working on backend teams."],
    company: ["Why do you want to join our infrastructure team?"]
  }
};

const questionContainer = document.getElementById("questionContainer");
const roleSelector = document.getElementById("roleSelector");
const filters = document.querySelectorAll(".filters input");
const themeToggle = document.getElementById("themeToggle");

function getFilteredQuestions(role) {
  const selectedFilters = [...filters].filter(f => f.checked).map(f => f.value);
  let results = [];
  selectedFilters.forEach(type => {
    if (questions[role][type]) {
      results.push(...questions[role][type]);
    }
  });
  return results;
}

function renderQuestions(qs) {
  questionContainer.innerHTML = "";
  qs.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.innerHTML = `
      <h3>Q${i + 1}: ${q}</h3>
      <textarea placeholder="Your Answer..."></textarea>
      <div class="favorite" onclick="toggleFavorite('${q}')">
        ❤️
      </div>
    `;
    questionContainer.appendChild(card);
  });
}

function toggleFavorite(question) {
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (favs.includes(question)) {
    localStorage.setItem("favorites", JSON.stringify(favs.filter(q => q !== question)));
  } else {
    favs.push(question);
    localStorage.setItem("favorites", JSON.stringify(favs));
  }
}

document.getElementById("generateBtn").onclick = () => {
  const role = roleSelector.value;
  const qs = getFilteredQuestions(role);
  renderQuestions(qs);
};

document.getElementById("exportBtn").onclick = () => {
  const answers = [...document.querySelectorAll(".question-card")].map(card => ({
    question: card.querySelector("h3").innerText,
    answer: card.querySelector("textarea").value
  }));
  const blob = new Blob([JSON.stringify(answers, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "interview_prep.json";
  link.click();
};

themeToggle.onclick = () => {
  document.body.classList.toggle("light");
};

// Optionally: implement mock interview mode with timers, audio, and random question flow.
