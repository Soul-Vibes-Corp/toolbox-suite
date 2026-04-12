/**
 * MOS 11B: Garrison Life - Phaser Engine
 * Optimized for Custom Assets and Audio
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
    // 1. Updated Image Paths to match your uploads
    this.load.image('soldier_ocp', '../../assets/infantry/soldier_ocp.png');
    this.load.image('soldier_ghillie', '../../assets/infantry/soldier_ghillie.png');
    this.load.image('soldier_pt', '../../assets/infantry/soldier_pt.png');
    this.load.image('bullet', '../../assets/infantry/bullet.png');
    this.load.image('target', '../../assets/infantry/target.png');
    
    // 2. Updated Audio to match your uploads
    this.load.audio('m4_shot', '../../assets/infantry/firearm-discharge-1.mp3');
    this.load.audio('relax_trooper', '../../assets/infantry/high-ranking-official-relax-trooper.mp3');
    
    // Virtual Joystick Plugin
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
}

function create() {
    // Responsive Resizing
    window.addEventListener('resize', () => {
        this.scale.resize(window.innerWidth, window.innerHeight);
    });

    // Player Setup - Default to OCP
    this.player = this.physics.add.sprite(window.innerWidth/2, window.innerHeight/2, 'soldier_ocp');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.8);
    this.player.speedModifier = 1.0; // Added for uniform buffs

    // Bullet Group
    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 15
    });

    // Joystick Setup
    this.joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 150,
        y: window.innerHeight - 150,
        radius: 80,
        base: this.add.circle(0, 0, 80, 0x2b3a26, 0.5).setStrokeStyle(2, 0x4af626),
        thumb: this.add.circle(0, 0, 40, 0x4af626),
    });
}

function update(time) {
    // --- Movement Logic ---
    let baseSpeed = 200; 
    if (this.joystick.force > 0) {
        this.physics.velocityFromRotation(this.joystick.rotation, baseSpeed * this.player.speedModifier, this.player.body.velocity);
        this.player.setRotation(this.joystick.rotation);
    } else {
        this.player.setVelocity(0);
    }

    // --- Combat Logic ---
    const currentStamina = window.playerData?.stamina || 100;
    let sway = (100 - currentStamina) * 0.03; 

    // Fire if clicking right side and rate-limited
    if (this.input.activePointer.isDown && this.input.activePointer.x > 350) {
        fireWeapon(this, sway);
    }
}

function fireWeapon(scene, sway) {
    const now = scene.time.now;
    if (scene.lastFired && now < scene.lastFired + 200) return;
    scene.lastFired = now;

    let bullet = bullets.get(scene.player.x, scene.player.y);
    if (bullet) {
        // Play the specific M4 sound
        scene.sound.play('m4_shot', { volume: 0.4 });

        bullet.setActive(true).setVisible(true);
        bullet.setPosition(scene.player.x, scene.player.y);
        
        let accuracyOffset = Phaser.Math.FloatBetween(-sway, sway);
        scene.physics.velocityFromRotation(scene.player.rotation + accuracyOffset, 600, bullet.body.velocity);
        bullet.setRotation(scene.player.rotation);

        scene.time.delayedCall(1500, () => {
            if (bullet.active) bullet.setActive(false).setVisible(false);
        });
    }
}

/** * Uniform Switcher Logic 
 * This needs to be available globally for the HTML buttons
 */
window.equipItem = (itemType) => {
    // Logic to find the player sprite regardless of which script defined it
    const p = game.scene.scenes[0].player; 
    if (!p) return;

    switch(itemType) {
        case 'ghillie':
            p.setTexture('soldier_ghillie');
            p.speedModifier = 0.7;
            break;
        case 'pt':
            p.setTexture('soldier_pt');
            p.speedModifier = 1.4;
            break;
        default:
            p.setTexture('soldier_ocp');
            p.speedModifier = 1.0;
    }
};
