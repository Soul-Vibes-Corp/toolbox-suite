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
