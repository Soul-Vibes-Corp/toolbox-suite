const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: { default: 'arcade', arcade: { gravity: { y: 0 }, debug: false } },
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(config);
let soldier, joystick, bullets, obstacles;
let isAtBarracks = false;

function preload() {
    // Assets
    this.load.image('dirt', 'https://labs.phaser.io/assets/textures/mud.png'); 
    this.load.image('sandbags', 'https://labs.phaser.io/assets/sprites/crate.png');
    this.load.image('soldier_ocp', '../../assets/infantry/soldier_ocp.png');
    this.load.image('bullet', '../../assets/infantry/bullet.png');
    this.load.audio('m4_shot', '../../assets/infantry/firearm-discharge-1.mp3');
    
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
}

function create() {
    // 1. World Bounds
    this.cameras.main.setBounds(0, 0, 3000, 3000);
    this.physics.world.setBounds(0, 0, 3000, 3000);

    // 2. Ground Layer
    this.add.tileSprite(1500, 1500, 3000, 3000, 'dirt').setAlpha(0.5);

    // 3. Barracks / Safe Zone (Visual)
    const barracksArea = this.add.rectangle(400, 400, 600, 600, 0x1a2318, 0.5);
    this.add.text(150, 150, "BARRACKS COMMAND", { font: "bold 24px Courier", fill: "#4af626" });

    // 4. Obstacles Group (Sandbags)
    obstacles = this.physics.add.staticGroup();
    for(let i=0; i < 20; i++) {
        let x = Phaser.Math.Between(800, 2800);
        let y = Phaser.Math.Between(200, 2800);
        obstacles.create(x, y, 'sandbags').setScale(0.6).refreshBody();
    }

    // 5. Soldier Physics
    soldier = this.physics.add.sprite(400, 400, 'soldier_ocp').setScale(0.9);
    soldier.setCollideWorldBounds(true);
    this.physics.add.collider(soldier, obstacles);

    // 6. Camera Follow
    this.cameras.main.startFollow(soldier, true, 0.1, 0.1);

    // 7. HUD-Fixed Joystick
    joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 150, y: window.innerHeight - 150, radius: 80,
        base: this.add.circle(0, 0, 80, 0x000000, 0.5).setStrokeStyle(3, 0x4af626).setScrollFactor(0),
        thumb: this.add.circle(0, 0, 40, 0x4af626).setScrollFactor(0)
    });

    bullets = this.physics.add.group({ defaultKey: 'bullet', maxSize: 30 });
}

function update(time) {
    if (!soldier) return;

    // Movement Logic
    if (joystick.force > 0) {
        this.physics.velocityFromRotation(joystick.rotation, 250 * (soldier.speedModifier || 1), soldier.body.velocity);
        soldier.setRotation(joystick.rotation + 1.57); // Sprite rotation offset
    } else {
        soldier.setVelocity(0);
    }

    // Barracks Detection (Regen)
    if (soldier.x < 700 && soldier.y < 700) {
        isAtBarracks = true;
        if (window.playerData.stamina < 100) window.playerData.stamina += 0.2;
        soldier.setTint(0x99ff99);
    } else {
        isAtBarracks = false;
        soldier.clearTint();
    }

    // Shooting (Relative to Camera)
    if (this.input.activePointer.isDown && this.input.activePointer.x > 400 && !isAtBarracks) {
        fireAdvanced(this, time);
    }
    
    // UI Update Sync
    updateHUD();
}

function fireAdvanced(scene, time) {
    if (time < lastFired + 150) return;
    let b = bullets.get(soldier.x, soldier.y);
    if (b) {
        scene.sound.play('m4_shot', { volume: 0.4 });
        b.setActive(true).setVisible(true);
        scene.physics.velocityFromRotation(soldier.rotation - 1.57, 800, b.body.velocity);
        lastFired = time;
        scene.time.delayedCall(1000, () => b.setActive(false).setVisible(false));
    }
}

function updateHUD() {
    const fill = document.getElementById('stamina-fill');
    if (fill) fill.style.width = window.playerData.stamina + "%";
}
