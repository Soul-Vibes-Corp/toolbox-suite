/**
 * MOS 11B: Garrison Life - Main Game Engine
 * Handles Phaser 3 rendering, movement, and combat.
 */

// 1. PHASER CONFIGURATION
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true, // Allows CSS backgrounds/HUD to show through
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: { preload: preload, create: create, update: update }
};

// Global Game Instance
const game = new Phaser.Game(config);

// Global Variables
let soldier;
let joystick;
let bullets;
let lastFired = 0;

function preload() {
    // Relative path to assets - ensure these files exist in your repo!
    this.load.image('soldier', '../../assets/infantry/soldier.png');
    this.load.image('bullet', '../../assets/infantry/bullet.png'); 
    
    // Virtual Joystick Plugin
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
}

function create() {
    // 1. Initialize Soldier
    soldier = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'soldier');
    soldier.setCollideWorldBounds(true);
    soldier.setScale(0.8);

    // 2. Initialize Bullets Group
    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 30
    });

    // 3. Initialize Virtual Joystick
    joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 120, 
        y: window.innerHeight - 120,
        radius: 60,
        base: this.add.circle(0, 0, 60, 0x2b3a26, 0.5).setStrokeStyle(2, 0x4af626),
        thumb: this.add.circle(0, 0, 30, 0x4af626)
    });

    // 4. Handle Window Resize
    window.addEventListener('resize', () => {
        this.scale.resize(window.innerWidth, window.innerHeight);
        joystick.setPosition(120, window.innerHeight - 120);
    });
}

function update(time) {
    // --- Movement Logic ---
    if (joystick.force > 0) {
        this.physics.velocityFromRotation(joystick.rotation, 200, soldier.body.velocity);
        soldier.setRotation(joystick.rotation);
    } else {
        soldier.setVelocity(0);
    }

    // --- Combat Logic (Shooting) ---
    // Pointer is down, not touching the joystick area, and rate-limiting shots
    if (this.input.activePointer.isDown && this.input.activePointer.x > 250 && time > lastFired) {
        fireBullet(this);
        lastFired = time + 200; // Fire every 200ms
    }
}

/**
 * Handles weapon fire and applies accuracy sway based on Stamina
 */
function fireBullet(scene) {
    const bullet = bullets.get(soldier.x, soldier.x);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.setPosition(soldier.x, soldier.y);

        // Calculate accuracy sway from global window.playerData (synced in auth.js)
        const currentStamina = window.playerData ? window.playerData.stamina : 100;
        let sway = (100 - currentStamina) * 0.02; // Reduced multiplier for playable accuracy
        
        let randomOffset = Phaser.Math.FloatBetween(-sway, sway);
        
        scene.physics.velocityFromRotation(soldier.rotation + randomOffset, 600, bullet.body.velocity);
        bullet.setRotation(soldier.rotation);

        // Auto-kill bullets after 2 seconds to save memory
        scene.time.delayedCall(2000, () => {
            if (bullet.active) bullet.setActive(false).setVisible(false);
        });
    }
}
