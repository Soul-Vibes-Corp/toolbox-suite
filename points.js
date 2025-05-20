function awardPoints(tool, points) {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const userRef = db.collection("users").doc(user.uid);
  userRef.update({
    [`usedTools.${tool}`]: firebase.firestore.FieldValue.increment(1),
    points: firebase.firestore.FieldValue.increment(points)
  });
}

document.getElementById("mergeBtn").addEventListener("click", function() {
  awardPoints("pdfMerger", 10);
});
