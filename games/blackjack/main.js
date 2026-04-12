/**
 * MOS 11B: Garrison Life - Main Game Engine
 * Consolidated Version: Combat, Uniforms, and Barracks Logic
 */

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(config);

// Global Variables
let soldier;
let joystick;
let bullets;
let lastFired = 0;
let isAtBarracks = false;
let relaxPlayed = false;
let cleaningSound; 
let ruckWaypoint;
let ruckLabel;
let isRucking = false;

function preload() {
    // 1. Load Sprite Assets
    this.load.image('soldier_ocp', '../../assets/infantry/soldier_ocp.png');
    this.load.image('soldier_ghillie', '../../assets/infantry/soldier_ghillie.png');
    this.load.image('soldier_pt', '../../assets/infantry/soldier_pt.png');
    this.load.image('bullet', '../../assets/infantry/bullet.png'); 
    this.load.image('target', '../../assets/infantry/target.png'); 
    
    // 2. Load Your Specific Audio Assets
    this.load.audio('m4_shot', '../../assets/infantry/firearm-discharge-1.mp3');
    this.load.audio('rifle_burst', '../../assets/infantry/firearm-rifle-discharges.mp3');
    this.load.audio('relax_trooper', '../../assets/infantry/high-ranking-official-relax-trooper.mp3');
    this.load.audio('cleaning', '../../assets/infantry/sound-of-cleaning-a-gun-in-mp3-format.mp3');
    
    // 3. Load Plugins
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
}

function create() {
    // Initialize Soldier
    soldier = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'soldier_ocp');
    soldier.setCollideWorldBounds(true);
    soldier.setScale(0.8);
    soldier.speedModifier = 1.0; 

    // Initialize Bullets
    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 30

    // Create the Ruck Waypoint (A glowing green circle)
ruckWaypoint = this.add.circle(0, 0, 40, 0x4af626, 0.2).setStrokeStyle(2, 0x4af626);
ruckLabel = this.add.text(0, 0, 'WAYPOINT', { fontSize: '12px', fill: '#4af626' }).setOrigin(0.5, 2.5);

// Hide it by default
ruckWaypoint.setVisible(false);
ruckLabel.setVisible(false);

// Function to generate a new waypoint
this.spawnWaypoint = () => {
    let newX = Phaser.Math.Between(100, window.innerWidth - 100);
    let newY = Phaser.Math.Between(100, window.innerHeight - 100);
    ruckWaypoint.setPosition(newX, newY).setVisible(true);
    ruckLabel.setPosition(newX, newY).setVisible(true);
    isRucking = true;
};

// Global trigger for the "RUCK MARCH" button in HTML
window.startRuck = () => {
    if (isAtBarracks) {
        this.spawnWaypoint();
        console.log("Ruck March Commenced. Move to the waypoint.");
    } else {
        alert("You must be at the Barracks to start a Ruck March.");
    }
};    
    });

    // Barracks Zone Setup
    this.barracksZone = this.add.rectangle(0, 0, 300, 300, 0x2b3a26, 0.3).setOrigin(0, 0);
    this.add.text(10, 10, "BARRACKS - REST AREA", { fontSize: '14px', fill: '#4af626', fontStyle: 'bold' });
    cleaningSound = this.sound.add('cleaning', { loop: true, volume: 0.3 });

    // Target System
    this.targets = this.physics.add.group();
    this.time.addEvent({ 
        delay: 4000, 
        callback: () => {
            let x = Phaser.Math.Between(350, window.innerWidth - 50); // Spawn outside barracks
            let y = Phaser.Math.Between(50, window.innerHeight - 150);
            let t = this.targets.create(x, y, 'target');
            t.setScale(0.5);
            this.time.delayedCall(3000, () => { if (t.active) t.destroy(); });
        }, 
        callbackScope: this, 
        loop: true 
    });

    // Hit Detection
    this.physics.add.overlap(bullets, this.targets, (bullet, target) => {
        bullet.destroy();
        target.destroy();
        if (window.awardXP) window.awardXP(10); 
    }, null, this);

    // Joystick
    joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 120, y: window.innerHeight - 120,
        radius: 60,
        base: this.add.circle(0, 0, 60, 0x2b3a26, 0.5).setStrokeStyle(2, 0x4af626),
        thumb: this.add.circle(0, 0, 30, 0x4af626)
    });

    // Resize Handler
    window.addEventListener('resize', () => {
        this.scale.resize(window.innerWidth, window.innerHeight);
        joystick.setPosition(120, window.innerHeight - 120);
    });
}

function update(time) {
    if (!soldier) return;

    // --- 1. MOVEMENT LOGIC ---
    let baseSpeed = 200;
    if (joystick.force > 0) {
        this.physics.velocityFromRotation(joystick.rotation, baseSpeed * soldier.speedModifier, soldier.body.velocity);
        soldier.setRotation(joystick.rotation);
        if (cleaningSound.isPlaying) cleaningSound.stop();
    } else {
        soldier.setVelocity(0);
        if (isAtBarracks && !cleaningSound.isPlaying) cleaningSound.play();
    }

    // --- 2. BARRACKS DETECTION ---
    if (soldier.x < 300 && soldier.y < 300) {
        if (!isAtBarracks) {
            isAtBarracks = true;
            if (!relaxPlayed) {
                this.sound.play('relax_trooper');
                relaxPlayed = true; 
            }
        }
        // Stamina Regen (Direct UI & Data update)
        if (window.playerData && window.playerData.stamina < 100) {
            window.playerData.stamina += 0.15;
            document.getElementById('stamina-fill').style.width = Math.min(window.playerData.stamina, 100) + '%';
        }
    } else {
        isAtBarracks = false;
        if (cleaningSound.isPlaying) cleaningSound.stop();
    }

    // --- 3. SHOOTING LOGIC ---
    // Prevent shooting in Barracks or if joystick is being used (left side)
    if (this.input.activePointer.isDown && this.input.activePointer.x > 350 && !isAtBarracks) {
        if (time > lastFired) {
            fireBullet(this);
            lastFired = time + 200;
        }
    }

    // --- 4. RUCK WAYPOINT LOGIC ---
if (isRucking) {
    let dist = Phaser.Math.Distance.Between(soldier.x, soldier.y, ruckWaypoint.x, ruckWaypoint.y);
    
    // If player is moving while rucking, drain extra stamina
    if (joystick.force > 0 && window.playerData) {
        window.playerData.stamina -= 0.05; 
    }

    // Check if waypoint reached
    if (dist < 40) {
        isRucking = false;
        ruckWaypoint.setVisible(false);
        ruckLabel.setVisible(false);
        
        if (window.awardXP) window.awardXP(150); // Big reward for rucking
        console.log("Waypoint Reached. XP Awarded.");
    }
}
}

function fireBullet(scene) {
    const bullet = bullets.get(soldier.x, soldier.y);
    if (bullet) {
        scene.sound.play('m4_shot', { volume: 0.5 });
        bullet.setActive(true).setVisible(true).setPosition(soldier.x, soldier.y);

        const currentStamina = window.playerData ? window.playerData.stamina : 100;
        let sway = (100 - currentStamina) * 0.02;
        let randomOffset = Phaser.Math.FloatBetween(-sway, sway);
        
        scene.physics.velocityFromRotation(soldier.rotation + randomOffset, 600, bullet.body.velocity);
        bullet.setRotation(soldier.rotation);

        scene.time.delayedCall(2000, () => {
            if (bullet.active) bullet.setActive(false).setVisible(false);
        });
    }
}

window.equipItem = (itemType) => {
    if (!soldier) return;
    switch(itemType) {
        case 'ghillie':
            soldier.setTexture('soldier_ghillie');
            soldier.speedModifier = 0.7; 
            break;
        case 'pt':
            soldier.setTexture('soldier_pt');
            soldier.speedModifier = 1.4; 
            break;
        default:
            soldier.setTexture('soldier_ocp');
            soldier.speedModifier = 1.0;
    }
};
