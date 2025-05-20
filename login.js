auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => window.location.href = "dashboard.html")
    .catch(console.error);
}

function register() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, pass)
    .then(cred => {
      return db.collection("users").doc(cred.user.uid).set({
        points: 0,
        rewards: []
      });
    })
    .then(() => window.location.href = "dashboard.html")
    .catch(console.error);
}
