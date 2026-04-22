/**
 * MOS 11B: Garrison Life - Main Game Engine
 * Integrated with Custom Audio and Uniform Logic
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
    // Initialize Soldier (Default OCP)
    soldier = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'soldier_ocp');
    soldier.setCollideWorldBounds(true);
    soldier.setScale(0.8);
    soldier.speedModifier = 1.0; // Base speed multiplier

    // Initialize Bullets
    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 30
    });

    // Initialize Targets
    this.targets = this.physics.add.group();
    
    // Spawn target loop
    this.time.addEvent({ 
        delay: 4000, 
        callback: () => {
            let x = Phaser.Math.Between(300, window.innerWidth - 50);
            let y = Phaser.Math.Between(50, window.innerHeight - 150);
            let t = this.targets.create(x, y, 'target');
            t.setScale(0.5);
            this.time.delayedCall(3000, () => { if (t.active) t.destroy(); });
        }, 
        callbackScope: this, 
        loop: true 
    });

    // Overlap Detection
    this.physics.add.overlap(bullets, this.targets, (bullet, target) => {
        bullet.destroy();
        target.destroy();
        if (window.awardXP) window.awardXP(10); 
    }, null, this);

    // Initialize Joystick
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

    // Movement Logic with Uniform Speed Modifier
    let baseSpeed = 200;
    if (joystick.force > 0) {
        this.physics.velocityFromRotation(joystick.rotation, baseSpeed * soldier.speedModifier, soldier.body.velocity);
        soldier.setRotation(joystick.rotation);
    } else {
        soldier.setVelocity(0);
    }

    // Shooting Logic
    if (this.input.activePointer.isDown && this.input.activePointer.x > 250 && time > lastFired) {
        fireBullet(this);
        lastFired = time + 200; 
    }
}

function fireBullet(scene) {
    const bullet = bullets.get(soldier.x, soldier.y);
    if (bullet) {
        // Trigger the specific M4 sound you uploaded
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

// Global Uniform Switcher
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
    
    console.log(`Uniform changed to ${itemType}. Speed modifier: ${soldier.speedModifier}`);
};
