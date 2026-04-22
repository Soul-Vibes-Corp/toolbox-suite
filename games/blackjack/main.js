const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: { 
        default: 'arcade', 
        arcade: { gravity: { y: 0 }, debug: false } 
    },
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(config);

function preload() {
    // ADVANCED ASSETS
    this.load.image('ground', 'https://labs.phaser.io/assets/textures/grass.png'); // Replace with your OCP-style ground
    this.load.image('sandbags', 'https://labs.phaser.io/assets/sprites/crate.png'); // Placeholder for obstacles
    this.load.image('soldier_ocp', '../../assets/infantry/soldier_ocp.png');
    this.load.image('bullet', '../../assets/infantry/bullet.png');
    
    // Plugins
    this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
}

function create() {
    // 1. CREATE A LARGE WORLD (3000x3000px)
    this.cameras.main.setBounds(0, 0, 3000, 3000);
    this.physics.world.setBounds(0, 0, 3000, 3000);

    // 2. TILE THE GROUND
    this.add.tileSprite(1500, 1500, 3000, 3000, 'ground').setAlpha(0.4);

    // 3. BARRACKS BUILDING (A more advanced visual)
    const barracks = this.add.container(200, 200);
    const roof = this.add.rectangle(0, 0, 400, 400, 0x333333, 0.8).setStrokeStyle(4, 0x4af626);
    barracks.add([roof]);
    this.add.text(50, 50, "HQ / BARRACKS", { font: "20px Arial", fill: "#4af626" });

    // 4. OBSTACLES (War Game Elements)
    this.obstacles = this.physics.add.staticGroup();
    for(let i=0; i<10; i++) {
        let x = Phaser.Math.Between(500, 2500);
        let y = Phaser.Math.Between(500, 2500);
        this.obstacles.create(x, y, 'sandbags').setScale(0.5).refreshBody();
    }

    // 5. PLAYER SETUP
    soldier = this.physics.add.sprite(1500, 1500, 'soldier_ocp').setScale(1);
    soldier.setCollideWorldBounds(true);
    this.physics.add.collider(soldier, this.obstacles);

    // 6. CAMERA FOLLOW (This makes it feel like a modern sim)
    this.cameras.main.startFollow(soldier, true, 0.05, 0.05);

    // 7. JOYSTICK FIX (Ensure it stays fixed to the screen, not the world)
    joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 150, y: window.innerHeight - 150, radius: 80,
        base: this.add.circle(0, 0, 80, 0x000000, 0.5).setStrokeStyle(3, 0x4af626).setScrollFactor(0),
        thumb: this.add.circle(0, 0, 40, 0x4af626).setScrollFactor(0)
    });
}

function update(time) {
    if (!soldier) return;

    // Movement
    if (joystick.force > 0) {
        this.physics.velocityFromRotation(joystick.rotation, 250 * (soldier.speedModifier || 1), soldier.body.velocity);
        soldier.setRotation(joystick.rotation + 1.57); // Adjusting for sprite facing
    } else {
        soldier.setVelocity(0);
    }

    // Advanced Zone Detection (Barracks)
    let distToHQ = Phaser.Math.Distance.Between(soldier.x, soldier.y, 200, 200);
    if (distToHQ < 300) {
        // Regeneration logic here
        soldier.setTint(0x99ff99); // Visual feedback
    } else {
        soldier.clearTint();
    }
}
