const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: false,
    backgroundColor: '#1a2318',
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(config);
let soldier, joystick, bullets, cleaningSound, ruckWaypoint;
let lastFired = 0, isAtBarracks = false, relaxPlayed = false, isRucking = false;

// World constants for easy mapping
const WORLD_SIZE = 3000;
const BARRACKS_X = WORLD_SIZE - 400; // Positioned near the right edge
const BARRACKS_Y = 100;

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
    this.cameras.main.setBounds(0, 0, WORLD_SIZE, WORLD_SIZE);
    this.physics.world.setBounds(0, 0, WORLD_SIZE, WORLD_SIZE);

    // 1. TACTICAL GROUND
    this.add.tileSprite(0, 0, WORLD_SIZE, WORLD_SIZE, 'terrain')
        .setOrigin(0, 0).setDepth(-2).setAlpha(0.5);

    // 2. VISUAL LOCATIONS
    // BARRACKS (Now moved to the TOP RIGHT)
    this.add.rectangle(BARRACKS_X + 150, BARRACKS_Y + 150, 400, 400, 0x333333, 0.8).setStrokeStyle(4, 0x4af626);
    this.add.text(BARRACKS_X + 20, BARRACKS_Y + 20, "HQ BARRACKS\nRIGHT FLANK SECTOR", { font: "bold 18px Courier", fill: "#4af626" });

    // PT FIELD (Moved slightly to avoid overlap)
    this.add.grid(BARRACKS_X - 600, 300, 400, 400, 64, 64, 0x4af626, 0.1, 0x4af626, 0.3);
    this.add.text(BARRACKS_X - 750, 100, "PT FORMATION AREA", { font: "bold 18px Courier", fill: "#4af626" });

    // RUCK START (Stays Bottom Left)
    this.add.circle(300, 2700, 100, 0x4af626, 0.2).setStrokeStyle(2, 0x4af626);
    this.add.text(200, 2550, "RUCK MARCH\nDEPARTURE", { font: "bold 18px Courier", fill: "#4af626" });

    // 3. SOLDIER SETUP
    soldier = this.physics.add.sprite(BARRACKS_X + 150, BARRACKS_Y + 150, 'soldier_ocp'); // Start inside new Barracks
    soldier.setDisplaySize(64, 64);
    soldier.setCollideWorldBounds(true);
    soldier.speedModifier = 1.0;

    this.cameras.main.startFollow(soldier, true, 0.1, 0.1);

    // 4. COMBAT & OBJECTS
    bullets = this.physics.add.group({ defaultKey: 'bullet', maxSize: 20 });
    this.targets = this.physics.add.group();
    cleaningSound = this.sound.add('cleaning', { loop: true, volume: 0.3 });

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

    // Movement
    if (joystick.force > 0) {
        this.physics.velocityFromRotation(joystick.rotation, 250 * soldier.speedModifier, soldier.body.velocity);
        soldier.setRotation(joystick.rotation + 1.57);
        if (cleaningSound.isPlaying) cleaningSound.stop();
    } else {
        soldier.setVelocity(0);
        if (isAtBarracks && !cleaningSound.isPlaying) cleaningSound.play();
    }

    // ZONE DETECTION (Updated for Right Side)
    // Checks if player is within the Barracks rectangle on the right
    if (soldier.x > BARRACKS_X && soldier.x < WORLD_SIZE && soldier.y < BARRACKS_Y + 400) {
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

    // Shooting
    if (this.input.activePointer.isDown && !isAtBarracks && time > lastFired) {
        if (this.input.activePointer.x > 300) {
            fireBullet(this, time);
        }
    }
}

function fireBullet(scene, time) {
    let b = bullets.get(soldier.x, soldier.y);
    if (b) {
        scene.sound.play('m4_shot', { volume: 0.5 });
        b.setActive(true).setVisible(true).setDisplaySize(15, 15);
        scene.physics.velocityFromRotation(soldier.rotation - 1.57, 800, b.body.velocity);
        lastFired = time + 200;
        scene.time.delayedCall(1000, () => { if(b.active) b.setActive(false).setVisible(false); });
    }
}
