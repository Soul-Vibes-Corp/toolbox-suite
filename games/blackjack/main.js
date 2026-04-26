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
let soldier, joystick, bullets, cleaningSound, cursors, wasd, keyX;
let lastFired = 0, isAtBarracks = false, relaxPlayed = false;

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

    this.add.tileSprite(0, 0, worldSize, worldSize, 'terrain').setOrigin(0, 0).setDepth(-5).setAlpha(0.5);

    let trails = this.add.graphics().setDepth(-4);
    trails.lineStyle(30, 0x333333, 0.9).beginPath().moveTo(2600, 300).lineTo(2100, 300).strokePath();
    trails.lineStyle(40, 0x444444, 0.8).beginPath().moveTo(2750, 500).lineTo(2750, 1200).strokePath();
    trails.lineStyle(50, 0x3d2b1f, 0.7).beginPath().moveTo(2750, 1500).lineTo(1500, 2000).lineTo(300, 2700).strokePath();

    const barracksX = worldSize - 400;
    const barracksY = 100;
    this.add.rectangle(barracksX + 150, barracksY + 150, 400, 400, 0x333333, 0.8).setStrokeStyle(4, 0x4af626);
    this.add.text(barracksX + 20, barracksY + 20, "HQ BARRACKS\n(SAFETY ZONE)", { font: "bold 18px Courier", fill: "#4af626" });

    soldier = this.physics.add.sprite(barracksX + 150, barracksY + 150, 'soldier_ocp');
    soldier.setDisplaySize(64, 64);
    soldier.setCollideWorldBounds(true);
    soldier.speedModifier = 1.0;
    this.cameras.main.startFollow(soldier, true, 0.1, 0.1);

    cursors = this.input.keyboard.createCursorKeys();
    wasd = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });
    keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    bullets = this.physics.add.group({ defaultKey: 'bullet', maxSize: 20 });
    cleaningSound = this.sound.add('cleaning', { loop: true, volume: 0.3 });
    
    joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 120, y: window.innerHeight - 120, radius: 60,
        base: this.add.circle(0, 0, 60, 0x2b3a26, 0.5).setStrokeStyle(2, 0x4af626).setScrollFactor(0),
        thumb: this.add.circle(0, 0, 30, 0x4af626).setScrollFactor(0)
    });
}

function update(time) {
    if (!soldier || !soldier.body) return;

    let velX = 0;
    let velY = 0;
    const speed = 250 * soldier.speedModifier;

    // --- 1. ROTATION (STRICTLY MOUSE BASED) ---
    // The soldier always looks at the cursor, even if moving or standing still
    let targetAngle = Phaser.Math.Angle.Between(
        soldier.x, 
        soldier.y, 
        this.input.activePointer.worldX, 
        this.input.activePointer.worldY
    );
    soldier.setRotation(targetAngle + 1.57); // 1.57 is the 90-degree offset correction

    // --- 2. MOVEMENT (WASD / ARROWS) ---
    if (joystick.force > 0) {
        this.physics.velocityFromRotation(joystick.rotation, speed, soldier.body.velocity);
        // On mobile, we still want to look where we are moving
        soldier.setRotation(joystick.rotation + 1.57);
    } else {
        if (cursors.left.isDown || wasd.left.isDown) velX = -speed;
        else if (cursors.right.isDown || wasd.right.isDown) velX = speed;

        if (cursors.up.isDown || wasd.up.isDown) velY = -speed;
        else if (cursors.down.isDown || wasd.down.isDown) velY = speed;

        soldier.setVelocity(velX, velY);

        if (velX !== 0 && velY !== 0) {
            soldier.body.velocity.normalize().scale(speed);
        }
    }

    // --- 3. SAFETY ZONE & SOUND ---
    const isMoving = soldier.body.velocity.length() > 0;
    if (soldier.x > 2600 && soldier.y < 500) {
        isAtBarracks = true;
        if (!isMoving && !cleaningSound.isPlaying) cleaningSound.play();
    } else {
        isAtBarracks = false;
        if (cleaningSound.isPlaying) cleaningSound.stop();
    }

    // --- 4. SHOOTING (X OR CLICK) ---
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
        
        // Bullet direction is locked to the soldier's current rotation
        // We subtract 1.57 because Phaser's physics 0 is to the right
        scene.physics.velocityFromRotation(soldier.rotation - 1.57, 800, b.body.velocity);
        
        lastFired = time + 200;
        scene.time.delayedCall(1000, () => { 
            if(b.active) b.setActive(false).setVisible(false); 
        });
    }
}
