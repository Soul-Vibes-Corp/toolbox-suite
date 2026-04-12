// 1. FIREBASE INITIALIZATION
const firebaseConfig = {
    apiKey: "AIzaSyA0tfVT75kWle3uwz1HouHRQdEWyzW1YNU",
    authDomain: "chat-code-forum.firebaseapp.com",
    projectId: "chat-code-forum",
    storageBucket: "chat-code-forum.firebasestorage.app",
    messagingSenderId: "496765673859",
    appId: "1:496765673859:web:6c2e6695be447d6e32d6b6",
    measurementId: "G-XJKWXHF8WN"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let player;
let joystick;
let windowStats = { stamina: 100, xp: 0, rank: "PVT" };

// 2. AUTHENTICATION LOGIC
window.handleLogin = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    try {
        const userCred = await auth.signInWithEmailAndPassword(email, pass);
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        syncData(userCred.user.uid);
    } catch (err) { alert("SITREP: Login Failed."); }
};

function syncData(uid) {
    db.collection("players").doc(uid).onSnapshot((doc) => {
        if (doc.exists()) {
            windowStats = doc.data();
            document.getElementById('stamina-fill').style.width = windowStats.stamina + "%";
            document.getElementById('xp-val').innerText = windowStats.xp;
            document.getElementById('rank-val').innerText = windowStats.rank;
        }
    });
}

window.reportForFormation = async () => {
    const uid = auth.currentUser.uid;
    await db.collection("players").doc(uid).update({
        xp: firebase.firestore.FieldValue.increment(50),
        stamina: firebase.firestore.FieldValue.increment(-5)
    });
};

// 3. PHASER 3 GAME ENGINE
const phaserConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true, // Shows the CSS background
    physics: { default: 'arcade' },
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(phaserConfig);

function preload() {
    this.load.image('soldier', 'https://labs.phaser.io/assets/sprites/asikane.png'); // Placeholder
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
}

function create() {
    player = this.physics.add.sprite(400, 300, 'soldier').setScale(0.5);
    
    joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 100, y: window.innerHeight - 100,
        radius: 60,
        base: this.add.circle(0, 0, 60, 0x2b3a26, 0.5).setStrokeStyle(2, 0x4af626),
        thumb: this.add.circle(0, 0, 30, 0x4af626)
    });
}

function update() {
    // Movement Logic
    if (joystick.force > 0) {
        this.physics.velocityFromRotation(joystick.rotation, 200, player.body.velocity);
        player.setRotation(joystick.rotation);
    } else {
        player.setVelocity(0);
    }

    // Shooting Sway Logic
    if (this.input.activePointer.isDown && this.input.activePointer.x > 250) {
        let sway = (100 - windowStats.stamina) * 0.02; 
        console.log("Firing with sway:", sway);
        // Add bullet logic here as needed
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    physics: { default: 'arcade' },
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(config);
let soldier;
let joystick;

function preload() {
    // Relative path to assets
    this.load.image('soldier', '../../assets/infantry/soldier.png');
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
}

function create() {
    soldier = this.physics.add.sprite(window.innerWidth/2, window.innerHeight/2, 'soldier');
    
    joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 100, y: window.innerHeight - 100,
        radius: 60,
        base: this.add.circle(0, 0, 60, 0x2b3a26, 0.5).setStrokeStyle(2, 0x4af626),
        thumb: this.add.circle(0, 0, 30, 0x4af626)
    });
}

function update() {
    if (joystick.force > 0) {
        this.physics.velocityFromRotation(joystick.rotation, 200, soldier.body.velocity);
        soldier.setRotation(joystick.rotation);
    } else {
        soldier.setVelocity(0);
    }
}
