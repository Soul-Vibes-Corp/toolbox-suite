const firebaseConfig = {
  apiKey: "AIzaSyA0tfVT75kWle3uwz1HouHRQdEWyzW1YNU",
  authDomain: "chat-code-forum.firebaseapp.com",
  projectId: "chat-code-forum",
  storageBucket: "chat-code-forum.firebasestorage.app",
  messagingSenderId: "496765673859",
  appId: "1:496765673859:web:6c2e6695be447d6e32d6b6",
  measurementId: "G-XJKWXHF8WN"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


<script>
  const errorMsg = document.getElementById("error-msg");

  function showForm(formType) {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("profile-form").style.display = "none";
    document.getElementById("form-title").textContent =
      formType === "register" ? "📝 Register for Toolbox Suite" :
      formType === "login" ? "🔐 Login to Toolbox Suite" :
      "👤 Update Profile";

    document.getElementById(`${formType}-form`).style.display = "block";
  }

  // Register
  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('confirm-password').value;

    if (password !== confirm) return errorMsg.textContent = "Passwords do not match.";

    try {
      const userCred = await auth.createUserWithEmailAndPassword(email, password);
      const uid = userCred.user.uid;

      await db.collection('users').doc(uid).set({
        fullname: document.getElementById('fullname').value,
        username: document.getElementById('username').value,
        occupation: document.getElementById('occupation').value,
        skills: document.getElementById('skills').value,
        portfolio: document.getElementById('portfolio').value,
        bio: document.getElementById('bio').value
      });

      alert("✅ Registration successful!");
      showForm('profile');
      document.getElementById("profile-tab").style.display = "inline-block";
      loadProfile(uid);
    } catch (err) {
      errorMsg.textContent = err.message;
    }
  });

  // Login
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const userCred = await auth.signInWithEmailAndPassword(email, password);
      alert("✅ Login successful!");
      showForm('profile');
      document.getElementById("profile-tab").style.display = "inline-block";
      loadProfile(userCred.user.uid);
    } catch (err) {
      errorMsg.textContent = err.message;
    }
  });

  // Load Profile
  async function loadProfile(uid) {
    const doc = await db.collection('users').doc(uid).get();
    const data = doc.data();
    if (!data) return;

    document.getElementById('profile-fullname').value = data.fullname || '';
    document.getElementById('profile-username').value = data.username || '';
    document.getElementById('profile-occupation').value = data.occupation || '';
    document.getElementById('profile-skills').value = data.skills || '';
    document.getElementById('profile-portfolio').value = data.portfolio || '';
    document.getElementById('profile-bio').value = data.bio || '';
  }

  // Update Profile
  document.getElementById('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("Please login again.");

    await db.collection('users').doc(user.uid).update({
      fullname: document.getElementById('profile-fullname').value,
      username: document.getElementById('profile-username').value,
      occupation: document.getElementById('profile-occupation').value,
      skills: document.getElementById('profile-skills').value,
      portfolio: document.getElementById('profile-portfolio').value,
      bio: document.getElementById('profile-bio').value
    });

    alert("✅ Profile updated!");
  });

  // Logout
  function logout() {
    auth.signOut().then(() => {
      alert("Logged out.");
      showForm('login');
    });
  }

  // Auto-login handling
  auth.onAuthStateChanged((user) => {
    if (user) {
      showForm('profile');
      document.getElementById("profile-tab").style.display = "inline-block";
      loadProfile(user.uid);
    }
  });
</script>

