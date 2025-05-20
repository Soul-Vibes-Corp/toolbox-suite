function claimReward(rewardName, cost) {
  const user = firebase.auth().currentUser;
  const userRef = db.collection("users").doc(user.uid);

  db.runTransaction(t => {
    return t.get(userRef).then(doc => {
      const points = doc.data().points;
      if (points >= cost) {
        t.update(userRef, {
          points: points - cost,
          rewards: firebase.firestore.FieldValue.arrayUnion(rewardName)
        });
      } else {
        alert("Not enough points!");
      }
    });
  }).then(() => {
    alert("Reward claimed!");
  }).catch(console.error);
}
