document.getElementById("email-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const audience = document.getElementById("audience").value.trim();
  const offer = document.getElementById("offer").value.trim();
  const goal = document.getElementById("goal").value.trim();
  const count = parseInt(document.getElementById("emails-count").value);

  if (!audience || !offer || !goal || !count) {
    alert("Please fill out all fields to generate your email sequence.");
    return;
  }

  const sequence = generateEmailSequence(audience, offer, goal, count);
  document.getElementById("email-content").innerText = sequence;
  document.getElementById("email-output").classList.remove("hidden");
});

function generateEmailSequence(audience, offer, goal, count) {
  let emails = "";
  for (let i = 1; i <= count; i++) {
    emails += `📧 Email ${i}: ${generateSubject(i, goal)}\n`;
    emails += `${generateBody(i, audience, offer, goal)}\n\n`;
  }
  return emails.trim();
}

function generateSubject(i, goal) {
  const topics = [
    "Let's talk about what’s slowing you down...",
    "You're not alone in this...",
    "A simple strategy for big results...",
    "Ready to make your next move?",
    "Last chance to unlock this opportunity...",
    "Here’s what others in your shoes are doing...",
    "A final thought before we go quiet..."
  ];
  return topics[i - 1] || `Follow-up Email ${i}`;
}

function generateBody(i, audience, offer, goal) {
  switch (i) {
    case 1:
      return `Hi there 👋,\n\nAs a ${audience}, you might be facing challenges like ${goal}. We’ve helped many professionals like you overcome them.\n\nInterested in exploring how? ${offer}.`;
    case 2:
      return `Hey again,\n\nJust checking in — if you’re like most ${audience}, this might be the exact time to take action.\n\nOur clients love the simplicity and results. ${offer}.`;
    case 3:
      return `Hope you're doing well,\n\nWe know that ${goal} can slow progress. That's why this solution exists.\n\nIf you'd like to chat more, ${offer}.`;
    case 4:
      return `Quick reminder,\n\nStill thinking it over? Totally okay. But don’t miss the chance to act on your ${goal}.\n\nClick here to ${offer}.`;
    case 5:
      return `You're busy — we get it.\n\nBut sometimes the right action at the right time makes all the difference.\n\nHere’s the link again to ${offer}.`;
    case 6:
      return `Final days to act!\n\nOther ${audience} are already seeing results. Don’t miss out.\n\nTake the next step: ${offer}.`;
    case 7:
      return `This is the last one, I promise.\n\nThanks for reading along. Whether now or later, we're here for your journey to ${goal}.\n\nStill time to ${offer}.`;
    default:
      return `Here’s another helpful follow-up for your journey as a ${audience}.\n\nReminder: ${offer}.`;
  }
}

function downloadSequence() {
  const content = document.getElementById("email-content").textContent;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.download = "Smart_Email_Sequence.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
}
