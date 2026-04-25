const firebaseConfig = {
    apiKey: "AIzaSyA0tfVT75kWle3uwz1HouHRQdEWyzW1YNU",
    authDomain: "chat-code-forum.firebaseapp.com",
    projectId: "chat-code-forum",
    storageBucket: "chat-code-forum.firebasestorage.app",
    messagingSenderId: "496765673859",
    appId: "1:496765673859:web:6c2e6695be447d6e32d6b6",
    measurementId: "G-XJKWXHF8WN"
};

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const auth = firebase.auth();
const db = firebase.firestore();

window.playerData = { stamina: 100, xp: 0, rank: "PVT" };

window.handleLogin = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    
    try {
        const cred = await auth.signInWithEmailAndPassword(email, pass);
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        initDataSync(cred.user.uid);
    } catch (e) { alert("SITREP: Login Failure."); }
};

function initDataSync(uid) {
    db.collection("players").doc(uid).onSnapshot(doc => {
        if (doc.exists) {
            window.playerData = doc.data();
            updateUI();
        } else {
            db.collection("players").doc(uid).set(window.playerData);
        }
    });
}

function updateUI() {
    document.getElementById('stamina-fill').style.width = Math.max(0, window.playerData.stamina) + "%";
    document.getElementById('xp-val').innerText = window.playerData.xp;
    document.getElementById('rank-val').innerText = window.playerData.rank;
}

window.awardXP = async (amount) => {
    const user = auth.currentUser;
    if (!user) return;
    await db.collection("players").doc(user.uid).update({
        xp: firebase.firestore.FieldValue.increment(amount),
        stamina: firebase.firestore.FieldValue.increment(-2)
    });
};


// Add your Firebase Config here as before...
const auth = firebase.auth();
const db = firebase.firestore();
window.playerData = { stamina: 100, xp: 0, rank: "PVT" };

window.handleLogin = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    try {
        await auth.signInWithEmailAndPassword(email, pass);
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
    } catch (e) { alert("Access Denied: Invalid Credentials"); }
};
