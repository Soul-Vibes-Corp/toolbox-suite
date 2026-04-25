const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
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
    soldier = this.physics.add.sprite(400, 400, 'soldier_ocp').setScale(0.8);
    soldier.setCollideWorldBounds(true);
    soldier.speedModifier = 1.0;

    bullets = this.physics.add.group({ defaultKey: 'bullet', maxSize: 20 });
    this.targets = this.physics.add.group();

    // Barracks Zone
    this.add.rectangle(0, 0, 300, 300, 0x2b3a26, 0.3).setOrigin(0, 0);
    cleaningSound = this.sound.add('cleaning', { loop: true, volume: 0.3 });

    // Waypoint
    ruckWaypoint = this.add.circle(0, 0, 40, 0x4af626, 0.2).setStrokeStyle(2, 0x4af626).setVisible(false);

    // Joystick
    joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 120, y: window.innerHeight - 120, radius: 60,
        base: this.add.circle(0, 0, 60, 0x2b3a26, 0.5).setStrokeStyle(2, 0x4af626),
        thumb: this.add.circle(0, 0, 30, 0x4af626)
    });

    this.physics.add.overlap(bullets, this.targets, (b, t) => { b.destroy(); t.destroy(); window.awardXP(10); });

    // 1. SET THE WORLD SIZE (3000x3000px creates a massive battlefield)
    const worldSize = 3000;
    this.cameras.main.setBounds(0, 0, worldSize, worldSize);
    this.physics.world.setBounds(0, 0, worldSize, worldSize);

    // 2. THE BACKGROUND FIX: 
    // We add a TileSprite. This repeats the 'terrain' image across the whole map.
    // We set the depth to -1 to ensure it stays UNDER the soldier and buildings.
    let ground = this.add.tileSprite(0, 0, worldSize, worldSize, 'terrain')
        .setOrigin(0, 0)
        .setDepth(-1)
        .setAlpha(0.8); // 0.8 keeps it slightly dark/tactical

    // 3. OPTIONAL: Add a "Grid" for that tactical sim look
    let graphics = this.add.graphics();
    graphics.lineStyle(1, 0x4af626, 0.05); // Very faint green lines
    for (let i = 0; i < worldSize; i += 64) {
        graphics.moveTo(i, 0);
        graphics.lineTo(i, worldSize);
        graphics.moveTo(0, i);
        graphics.lineTo(worldSize, i);
    }
    graphics.strokePath();

    // ... rest of your soldier and joystick code
}

function update(time) {
    if (!soldier) return;

    // Movement
    if (joystick.force > 0) {
        this.physics.velocityFromRotation(joystick.rotation, 200 * soldier.speedModifier, soldier.body.velocity);
        soldier.setRotation(joystick.rotation);
        if (cleaningSound.isPlaying) cleaningSound.stop();
    } else {
        soldier.setVelocity(0);
        if (isAtBarracks && !cleaningSound.isPlaying) cleaningSound.play();
    }

    // Zone Detection
    if (soldier.x < 300 && soldier.y < 300) {
        isAtBarracks = true;
        if (!relaxPlayed) { this.sound.play('relax_trooper'); relaxPlayed = true; }
        if (window.playerData.stamina < 100) window.playerData.stamina += 0.2;
    } else {
        isAtBarracks = false;
        if (cleaningSound.isPlaying) cleaningSound.stop();
    }

    // Shooting
    if (this.input.activePointer.isDown && this.input.activePointer.x > 350 && !isAtBarracks && time > lastFired) {
        let b = bullets.get(soldier.x, soldier.y);
        if (b) {
            this.sound.play('m4_shot');
            b.setActive(true).setVisible(true);
            this.physics.velocityFromRotation(soldier.rotation, 600, b.body.velocity);
            lastFired = time + 200;
        }
    }
}
