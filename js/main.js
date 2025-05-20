auth.onAuthStateChanged(user => {
  if (user) {
    db.collection("users").doc(user.uid).get().then(doc => {
      const data = doc.data();
      document.getElementById("pointsDisplay").innerText = data.points || 0;
    });
  } else {
    window.location.href = "login.html";
  }
});
