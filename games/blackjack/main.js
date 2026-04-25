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
// Added 'cursors', 'wasd', and 'keyX' to global scope
let soldier, joystick, bullets, cleaningSound, ruckWaypoint, cursors, wasd, keyX;
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
    this.add.tileSprite(0, 0, worldSize, worldSize, 'terrain')
        .setOrigin(0, 0).setDepth(-5).setAlpha(0.5);

    // --- 2. THE TRAIL NETWORK ---
    let trails = this.add.graphics().setDepth(-4);
    
    trails.lineStyle(30, 0x333333, 0.9);
    trails.beginPath();
    trails.moveTo(2600, 300); 
    trails.lineTo(2100, 300); 
    trails.strokePath();

    trails.lineStyle(40, 0x444444, 0.8);
    trails.beginPath();
    trails.moveTo(2750, 500); 
    trails.lineTo(2750, 1200); 
    trails.strokePath();

    trails.lineStyle(50, 0x3d2b1f, 0.7);
    trails.beginPath();
    trails.moveTo(2750, 1500); 
    trails.lineTo(1500, 2000); 
    trails.lineTo(300, 2700);  
    trails.strokePath();

    // --- 3. VISUAL LOCATIONS ---
    const barracksX = worldSize - 400;
    const barracksY = 100;
    this.add.rectangle(barracksX + 150, barracksY + 150, 400, 400, 0x333333, 0.8).setStrokeStyle(4, 0x4af626);
    this.add.text(barracksX + 20, barracksY + 20, "HQ BARRACKS\n(SAFETY ZONE)", { font: "bold 18px Courier", fill: "#4af626" });

    this.add.graphics().lineStyle(20, 0x555555, 0.8).strokeRoundedRect(barracksX - 900, 150, 600, 300, 100); 
    this.add.text(barracksX - 750, 80, "PT RUNNING TRACK", { font: "bold 18px Courier", fill: "#4af626" });

    this.add.rectangle(2750, 1350, 500, 300, 0x2b3a26, 0.6).setStrokeStyle(2, 0x4af626);
    this.add.text(2550, 1250, "FORMATION GROUNDS", { font: "bold 18px Courier", fill: "#4af626" });

    this.add.circle(300, 2700, 120, 0x4af626, 0.2).setStrokeStyle(2, 0x4af626);
    this.add.text(180, 2520, "RUCK START POINT", { font: "bold 18px Courier", fill: "#4af626" });

    // --- 4. SOLDIER SETUP ---
    soldier = this.physics.add.sprite(barracksX + 150, barracksY + 150, 'soldier_ocp');
    soldier.setDisplaySize(64, 64);
    soldier.setCollideWorldBounds(true);
    soldier.speedModifier = 1.0;
    this.cameras.main.startFollow(soldier, true, 0.1, 0.1);

    // --- 5. INPUT REGISTRATION ---
    // Register Keys: Arrows, WASD, and X
    cursors = this.input.keyboard.createCursorKeys();
    wasd = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });
    keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    // --- 6. COMBAT & JOYSTICK ---
    bullets = this.physics.add.group({ defaultKey: 'bullet', maxSize: 20 });
    this.targets = this.physics.add.group();
    cleaningSound = this.sound.add('cleaning', { loop: true, volume: 0.3 });
    
    joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 120, y: window.innerHeight - 120, radius: 60,
        base: this.add.circle(0, 0, 60, 0x2b3a26, 0.5).setStrokeStyle(2, 0x4af626).setScrollFactor(0),
        thumb: this.add.circle(0, 0, 30, 0x4af626).setScrollFactor(0)
    });

    this.physics.add.overlap(bullets, this.targets, (b, t) => { b.destroy(); t.destroy(); window.awardXP(10); });
}

function update(time) {
    if (!soldier) return;

    let velocityX = 0;
    let velocityY = 0;
    const speed = 250 * soldier.speedModifier;

    // --- MOVEMENT HANDLING ---
    // Priority 1: Mobile Joystick
    if (joystick.force > 0) {
        this.physics.velocityFromRotation(joystick.rotation, speed, soldier.body.velocity);
        soldier.setRotation(joystick.rotation + 1.57);
    } 
    // Priority 2: PC Keyboard (WASD / Arrows)
    else {
        if (cursors.left.isDown || wasd.left.isDown) {
            velocityX = -speed;
            soldier.setRotation(-1.57); // Face Left
        } else if (cursors.right.isDown || wasd.right.isDown) {
            velocityX = speed;
            soldier.setRotation(1.57); // Face Right
        }

        if (cursors.up.isDown || wasd.up.isDown) {
            velocityY = -speed;
            if (velocityX === 0) soldier.setRotation(0); // Face Up
        } else if (cursors.down.isDown || wasd.down.isDown) {
            velocityY = speed;
            if (velocityX === 0) soldier.setRotation(3.14); // Face Down
        }
        soldier.setVelocity(velocityX, velocityY);
    }

    // --- AUDIO LOGIC ---
    if (soldier.body.velocity.length() > 0) {
        if (cleaningSound.isPlaying) cleaningSound.stop();
    } else {
        if (isAtBarracks && !cleaningSound.isPlaying) cleaningSound.play();
    }

    // --- SAFETY ZONE LOGIC ---
    if (soldier.x > 2600 && soldier.y < 500) {
        if (!isAtBarracks) {
            isAtBarracks = true;
            if (!relaxPlayed) { this.sound.play('relax_trooper'); relaxPlayed = true; }
        }
        if (window.playerData && window.playerData.stamina < 100) window.playerData.stamina += 0.2;
    } else {
        isAtBarracks = false;
        if (cleaningSound.isPlaying) cleaningSound.stop();
    }

    // --- SHOOTING LOGIC ---
    // Can fire if: (X is pressed OR Screen is tapped) AND not in safety zone
    const isXPressed = keyX.isDown;
    const isPointerDown = this.input.activePointer.isDown && this.input.activePointer.x > 300;

    if ((isXPressed || isPointerDown) && !isAtBarracks && time > lastFired) {
        fireBullet(this, time);
    }
}

function fireBullet(scene, time) {
    let b = bullets.get(soldier.x, soldier.y);
    if (b) {
        scene.sound.play('m4_shot', { volume: 0.5 });
        b.setActive(true).setVisible(true).setDisplaySize(15, 15);
        // Fires in the direction the soldier sprite is facing
        scene.physics.velocityFromRotation(soldier.rotation - 1.57, 800, b.body.velocity);
        lastFired = time + 200;
        scene.time.delayedCall(1000, () => { if(b.active) b.setActive(false).setVisible(false); });
    }
}

window.equipItem = (itemType) => {
    if (!soldier) return;
    soldier.setTexture(`soldier_${itemType}`);
    soldier.setDisplaySize(64, 64);
    const mods = { 'ghillie': 0.7, 'pt': 1.5, 'ocp': 1.0 };
    soldier.speedModifier = mods[itemType] || 1.0;
};
