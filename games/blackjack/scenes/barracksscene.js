class BarracksScene extends Phaser.Scene {
    constructor() {
        super('BarracksScene');
    }

    create() {
        // 1. Background / Floor
        this.add.rectangle(0, 0, 800, 600, 0x222222).setOrigin(0);
        this.add.text(20, 20, "HQ BARRACKS - ROOM 101", { font: "18px Courier", fill: "#4af626" });

        // 2. The Physical Wall Locker
        this.locker = this.physics.add.staticSprite(150, 150, 'locker_image'); // Assume you have a locker asset
        this.locker.setDisplaySize(60, 100);
        
        // 3. The Soldier
        // Retrieve current skin from Global State (default to OCP)
        const currentSkin = this.registry.get('soldierSkin') || 'soldier_ocp';
        this.soldier = this.physics.add.sprite(400, 300, currentSkin);
        this.soldier.setDisplaySize(64, 64);
        this.soldier.setCollideWorldBounds(true);

        // 4. Keyboard Setup
        this.cursors = this.input.keyboard.createCursorKeys();
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // 5. Interaction UI (Hidden by default)
        this.promptText = this.add.text(150, 100, "[E] OPEN LOCKER", { font: "14px Courier", fill: "#ffff00" }).setVisible(false);
    }

    update() {
        // Standard Movement Logic
        this.soldier.setVelocity(0);
        const speed = 200;

        if (this.cursors.left.isDown) this.soldier.setVelocityX(-speed);
        else if (this.cursors.right.isDown) this.soldier.setVelocityX(speed);
        if (this.cursors.up.isDown) this.soldier.setVelocityY(-speed);
        else if (this.cursors.down.isDown) this.soldier.setVelocityY(speed);

        // --- PROXIMITY CHECK ---
        const dist = Phaser.Math.Distance.Between(this.soldier.x, this.soldier.y, this.locker.x, this.locker.y);
        
        if (dist < 80) {
            this.promptText.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
                this.openGearMenu();
            }
        } else {
            this.promptText.setVisible(false);
        }
    }

    openGearMenu() {
        // Instead of a scene change, we can overlay HTML buttons or Phaser buttons
        console.log("Locker Opened. Choose your Uniform.");
        // This is where we trigger the "Customization UI"
    }
}

// Inside BarracksScene.js

startWeaponMaintenance() {
    // 1. Freeze soldier movement
    this.soldier.body.moves = false;

    // 2. Create the Cleaning UI Overlay
    this.cleaningOverlay = this.add.container(400, 300);
    
    // Background for the bench
    const benchBg = this.add.rectangle(0, 0, 500, 300, 0x333333).setStrokeStyle(4, 0x4af626);
    const weaponSprite = this.add.image(0, 0, 'm4_rifle_topdown').setScale(0.8);
    
    this.cleaningOverlay.add([benchBg, weaponSprite]);

    // 3. Generate "Dirt" spots
    for(let i = 0; i < 5; i++) {
        let dirt = this.add.circle(
            Phaser.Math.Between(-150, 150), 
            Phaser.Math.Between(-50, 50), 
            10, 0x111111, 0.8
        ).setInteractive();

        this.cleaningOverlay.add(dirt);

        // Cleaning interaction
        dirt.on('pointerover', () => {
            dirt.destroy(); // Simulating wiping away carbon
            this.checkCleanliness();
        });
    }
}

checkCleanliness() {
    // Once all dirt is gone
    this.sound.play('cleaning_click'); // Visual/Audio feedback
    this.registry.set('weaponCleanliness', 100);
    // Add logic to close overlay and unfreeze soldier
}

