// --- Firebase Configuration ---
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

// Global data object
window.playerData = { stamina: 100, xp: 0, rank: "PVT" };

// --- Authentication ---
window.handleLogin = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    
    if (!email || !pass) {
        alert("SITREP: Credentials missing.");
        return;
    }

    try {
        const cred = await auth.signInWithEmailAndPassword(email, pass);
        console.log("Authenticated:", cred.user.uid);
        
        // HIDE login and SHOW game ONLY after successful auth
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        
        initDataSync(cred.user.uid);
    } catch (e) { 
        console.error(e);
        alert("SITREP: Login Failure. Check credentials."); 
    }
};

// --- Data Synchronization ---
function initDataSync(uid) {
    const playerRef = db.collection("players").doc(uid);

    playerRef.onSnapshot(doc => {
        if (doc.exists) {
            window.playerData = doc.data();
            updateUI();
        } else {
            console.log("No profile found. Creating enlistment papers...");
            playerRef.set(window.playerData);
        }
    }, err => {
        console.error("Firestore Sync Error:", err);
    });
}

// --- UI Updates ---
function updateUI() {
    const stamFill = document.getElementById('stamina-fill');
    const xpVal = document.getElementById('xp-val');
    const rankVal = document.getElementById('rank-val');

    if (stamFill) stamFill.style.width = Math.min(Math.max(window.playerData.stamina || 0, 0), 100) + "%";
    if (xpVal) xpVal.innerText = window.playerData.xp || 0;
    if (rankVal) rankVal.innerText = window.playerData.rank || "PVT";
}

// --- Stats Update Functions ---
window.reportForFormation = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
        await db.collection("players").doc(user.uid).update({
            xp: firebase.firestore.FieldValue.increment(25),
            stamina: firebase.firestore.FieldValue.increment(-5)
        });
    } catch (e) { console.error("Formation Sync Error:", e); }
};

window.awardXP = async (amount) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const userRef = db.collection("players").doc(user.uid);
        await userRef.update({
            xp: firebase.firestore.FieldValue.increment(amount),
            stamina: firebase.firestore.FieldValue.increment(-0.5) 
        });
        
        // Instant Local Feedback
        if(window.playerData) {
            window.playerData.xp += amount;
            window.playerData.stamina -= 0.5;
            updateUI();
        }
    } catch (e) { console.error("XP Sync Error:", e); }
};

// Stamina Recovery Interval
setInterval(async () => {
    const user = auth.currentUser;
    if (user && window.playerData.stamina < 100) {
        await db.collection("players").doc(user.uid).update({
            stamina: firebase.firestore.FieldValue.increment(2)
        });
    }
}, 30000);
