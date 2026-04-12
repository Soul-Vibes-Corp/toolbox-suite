// Phaser Config for Web App
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: { 
        default: 'arcade',
        arcade: { debug: false } 
    },
    scene: { preload: preload, create: create, update: update }
};

let game = new Phaser.Game(config);
let player;
let joystick;
let bullets;

function preload() {
    this.load.image('soldier', 'assets/11b_sprite.png');
    this.load.image('bullet', 'assets/bullet.png');
    // Plugin for Joystick
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
}

function create() {
    // 1. Responsive Resizing
    window.addEventListener('resize', () => {
        this.scale.resize(window.innerWidth, window.innerHeight);
    });

    // 2. Player Setup
    this.player = this.physics.add.sprite(window.innerWidth/2, window.innerHeight/2, 'soldier');
    this.player.setCollideWorldBounds(true);

    // 3. Bullet Group
    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 10
    });

    // 4. Joystick Setup
    this.joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 150,
        y: window.innerHeight - 150,
        radius: 80,
        base: this.add.circle(0, 0, 80, 0x2b3a26, 0.5).setStrokeStyle(2, 0x4af626),
        thumb: this.add.circle(0, 0, 40, 0x4af626),
    });
}

function update() {
    // --- Movement Logic ---
    let speed = 200; 
    if (this.joystick.force > 0) {
        this.physics.velocityFromRotation(this.joystick.rotation, speed, this.player.body.velocity);
        this.player.setRotation(this.joystick.rotation);
    } else {
        this.player.setVelocity(0);
    }

    // --- Combat Logic (Stamina Impact) ---
    // Accessing global stamina (updated by auth.js/Firebase)
    const currentStamina = window.playerStats?.stamina || 100;
    let sway = (100 - currentStamina) * 0.05; // Fixed multiplier for realistic sway

    if (this.input.activePointer.isDown && this.input.activePointer.x > 300) { // Don't fire if touching joystick area
        fireWeapon(this, sway);
    }
}

function fireWeapon(scene, sway) {
    let bullet = bullets.get(scene.player.x, scene.player.y);
    if (bullet) {
        bullet.setActive(true).setVisible(true);
        let accuracyOffset = Phaser.Math.FloatBetween(-sway, sway);
        scene.physics.velocityFromRotation(scene.player.rotation + accuracyOffset, 400, bullet.body.velocity);
    }
}

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, onSnapshot, updateDoc, increment } from "firebase/firestore";

const firebaseConfig = { /* YOUR CONFIG HERE */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Global Stats Object accessible by Phaser
window.playerStats = { stamina: 100, xp: 0, morale: 100 };

// 1. Handle Login
async function handleLogin() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        listenToStats(userCredential.user.uid);
    } catch (error) {
        alert("ACCESS DENIED: Check Credentials");
    }
}

// 2. Real-time Stats Sync
function listenToStats(uid) {
    onSnapshot(doc(db, "players", uid), (doc) => {
        if (doc.exists()) {
            window.playerStats = doc.data();
            updateHUD(); // Visual update
        }
    });
}

// 3. Garrison Formation Logic
window.reportForFormation = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const playerRef = doc(db, "players", user.uid);
    await updateDoc(playerRef, {
        xp: increment(50),
        stamina: increment(-10)
    });
};
