function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}

function register() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, pass)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        email: email,
        points: 0
      });
    })
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Registration failed: " + error.message);
    });
}
