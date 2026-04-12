/**
 * MOS 11B: Garrison Life - Phaser Engine
 * This file handles the 2D simulation logic.
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
let bullets;

function preload() {
    // Relative paths based on your new repo structure
    this.load.image('soldier', '../../assets/infantry/soldier.png');
    this.load.image('bullet', '../../assets/infantry/bullet.png');
    
    // Virtual Joystick Plugin
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
    this.player.setScale(0.8);

    // 3. Bullet Group
    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 15
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
    // Reads from window.playerData (synced by auth.js)
    const currentStamina = window.playerData?.stamina || 100;
    
    // Sway gets worse as stamina drops
    let sway = (100 - currentStamina) * 0.03; 

    // Fire if clicking/tapping right side of screen
    if (this.input.activePointer.isDown && this.input.activePointer.x > 350) {
        fireWeapon(this, sway);
    }
}

function fireWeapon(scene, sway) {
    // Simple rate limiting
    const now = scene.time.now;
    if (scene.lastFired && now < scene.lastFired + 250) return;
    scene.lastFired = now;

    let bullet = bullets.get(scene.player.x, scene.player.y);
    if (bullet) {
        bullet.setActive(true).setVisible(true);
        bullet.setPosition(scene.player.x, scene.player.y);
        
        let accuracyOffset = Phaser.Math.FloatBetween(-sway, sway);
        scene.physics.velocityFromRotation(scene.player.rotation + accuracyOffset, 500, bullet.body.velocity);
        bullet.setRotation(scene.player.rotation);

        // Despawn bullet after it leaves view
        scene.time.delayedCall(1500, () => {
            if (bullet.active) bullet.setActive(false).setVisible(false);
        });
    }
}
