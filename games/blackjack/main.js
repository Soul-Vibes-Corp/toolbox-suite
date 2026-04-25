const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: false, // Changed to false to support background colors
    backgroundColor: '#1a2318',
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(config);
let soldier, joystick, bullets, cleaningSound, ruckWaypoint;
let lastFired = 0, isAtBarracks = false, relaxPlayed = false, isRucking = false;

function preload() {
    this.load.image('terrain', 'https://labs.phaser.io/assets/textures/grass.png');
    this.load.image('soldier_ocp', '../../assets/infantry/soldier_ocp.png');
    this.load.image('soldier_ghillie', '../../assets/infantry/soldier_ghillie.png');
    this.load.image('soldier_pt', '../../assets/infantry/soldier_pt.png');
    this.load.image('bullet', '../../assets/infantry/bullet.png');
    this.load.image('target', '../../assets/infantry/target.png');
    
    this.load.audio('m4_shot', '../../assets/infantry/firearm-discharge-1.mp3');
    this.load.audio('relax_trooper', '../../assets/infantry/high-ranking-official-relax-trooper.mp3');
    this.load.audio('cleaning', '../../assets/infantry/sound-of-cleaning-a-gun-in-mp3-format.mp3');
    
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
}

function create() {
    const worldSize = 3000;
    this.cameras.main.setBounds(0, 0, worldSize, worldSize);
    this.physics.world.setBounds(0, 0, worldSize, worldSize);

    // 1. TACTICAL GROUND
    let ground = this.add.tileSprite(0, 0, worldSize, worldSize, 'terrain')
        .setOrigin(0, 0).setDepth(-2).setAlpha(0.5);

    // 2. VISUAL LOCATIONS
    // Barracks (Top Left) - Where the official is
    this.add.rectangle(150, 150, 300, 300, 0x333333, 0.8).setStrokeStyle(4, 0x4af626);
    this.add.text(40, 40, "HQ BARRACKS\n(SAFE ZONE)", { font: "bold 18px Courier", fill: "#4af626" });

    // PT Field (Top Right)
    this.add.grid(2500, 300, 400, 400, 64, 64, 0x4af626, 0.1, 0x4af626, 0.3);
    this.add.text(2350, 100, "PT FORMATION AREA", { font: "bold 18px Courier", fill: "#4af626" });

    // Ruck Start Point (Bottom Left)
    this.add.circle(300, 2700, 100, 0x4af626, 0.2).setStrokeStyle(2, 0x4af626);
    this.add.text(200, 2550, "RUCK MARCH\nDEPARTURE", { font: "bold 18px Courier", fill: "#4af626" });

    // 3. SOLDIER SETUP
    soldier = this.physics.add.sprite(400, 400, 'soldier_ocp');
    soldier.setDisplaySize(64, 64); // FIX: Keeps soldier small
    soldier.setCollideWorldBounds(true);
    soldier.speedModifier = 1.0;

    // Camera follow
    this.cameras.main.startFollow(soldier, true, 0.1, 0.1);

    // 4. COMBAT & OBJECTS
    bullets = this.physics.add.group({ defaultKey: 'bullet', maxSize: 20 });
    this.targets = this.physics.add.group();
    cleaningSound = this.sound.add('cleaning', { loop: true, volume: 0.3 });
    ruckWaypoint = this.add.circle(0, 0, 60, 0xff0000, 0.3).setStrokeStyle(3, 0xff0000).setVisible(false);

    // 5. JOYSTICK (Fixed to Screen)
    joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 120, y: window.innerHeight - 120, radius: 60,
        base: this.add.circle(0, 0, 60, 0x2b3a26, 0.5).setStrokeStyle(2, 0x4af626).setScrollFactor(0),
        thumb: this.add.circle(0, 0, 30, 0x4af626).setScrollFactor(0)
    });

    this.physics.add.overlap(bullets, this.targets, (b, t) => { b.destroy(); t.destroy(); window.awardXP(10); });
}

function update(time) {
    if (!soldier) return;

    // Movement Logic
    if (joystick.force > 0) {
        this.physics.velocityFromRotation(joystick.rotation, 250 * soldier.speedModifier, soldier.body.velocity);
        soldier.setRotation(joystick.rotation + 1.57); // Offset for sprite facing
        if (cleaningSound.isPlaying) cleaningSound.stop();
    } else {
        soldier.setVelocity(0);
        if (isAtBarracks && !cleaningSound.isPlaying) cleaningSound.play();
    }

    // Advanced Zone Detection
    // Check if in Barracks (Top Left 300x300)
    if (soldier.x < 300 && soldier.y < 300) {
        if (!isAtBarracks) {
            isAtBarracks = true;
            if (!relaxPlayed) {
                this.sound.play('relax_trooper');
                relaxPlayed = true;
            }
        }
        if (window.playerData && window.playerData.stamina < 100) {
            window.playerData.stamina += 0.2;
        }
    } else {
        isAtBarracks = false;
        if (cleaningSound.isPlaying) cleaningSound.stop();
    }

    // Shooting Logic (Locked in Barracks)
    if (this.input.activePointer.isDown && !isAtBarracks && time > lastFired) {
        // Only shoot if clicking far from joystick
        if (this.input.activePointer.x > 300) {
            fireBullet(this, time);
        }
    }
}

function fireBullet(scene, time) {
    let b = bullets.get(soldier.x, soldier.y);
    if (b) {
        scene.sound.play('m4_shot', { volume: 0.5 });
        b.setActive(true).setVisible(true);
        b.setDisplaySize(15, 15);
        scene.physics.velocityFromRotation(soldier.rotation - 1.57, 800, b.body.velocity);
        lastFired = time + 200;
        // Auto-kill bullet after 1 second
        scene.time.delayedCall(1000, () => { if(b.active) b.setActive(false).setVisible(false); });
    }
}

// Global Uniform Switcher Fix
window.equipItem = (itemType) => {
    if (!soldier) return;
    soldier.setTexture(`soldier_${itemType}`);
    soldier.setDisplaySize(64, 64); // Ensure size stays small
    const mods = { 'ghillie': 0.7, 'pt': 1.5, 'ocp': 1.0 };
    soldier.speedModifier = mods[itemType] || 1.0;
};
