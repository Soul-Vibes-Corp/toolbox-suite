export default class BarracksScene extends Phaser.Scene {
    constructor() {
        super('BarracksScene');
        this.dirtCount = 0;
    }

    create() {
        // 1. ROOM DESIGN & BOUNDARIES
        // Create the floor and the tactical green border
        this.add.rectangle(400, 300, 760, 560, 0x222222).setStrokeStyle(4, 0x4af626);
        this.add.text(20, 20, "UNIT BARRACKS | SECURE INTERIOR", { font: "18px Courier", fill: "#4af626" });

        // 2. INTERACTION OBJECTS (Locker and Arms Bench)
        // Locker in the top-left
        this.locker = this.physics.add.staticImage(150, 150, 'locker_image');
        this.locker.setDisplaySize(60, 100);

        // Arms Bench in the top-right
        this.armsBench = this.physics.add.staticImage(650, 150, 'bench_image');
        this.armsBench.setDisplaySize(150, 80);
        
        // 3. THE SOLDIER
        const currentSkin = this.registry.get('soldierSkin') || 'soldier_ocp';
        this.soldier = this.physics.add.sprite(400, 500, currentSkin);
        this.soldier.setCollideWorldBounds(true);
        this.soldier.setDisplaySize(64, 64);

        // 4. INPUT & KEYS
        this.cursors = this.input.keyboard.createCursorKeys();
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // 5. UI PROMPTS (Hidden by default)
        this.promptText = this.add.text(400, 450, "", { font: "16px Courier", fill: "#ffff00" })
            .setOrigin(0.5).setVisible(false).setDepth(10);

        // 6. EXIT POINT (Door to Tactical Map)
        const exitPoint = this.add.rectangle(400, 585, 120, 30, 0xff0000, 0.5).setInteractive();
        this.add.text(400, 585, "EXIT TO HQ", { font: "bold 14px Courier", fill: "#ffffff" }).setOrigin(0.5);
        exitPoint.on('pointerdown', () => this.scene.start('BaseMap'));
    }

    update() {
        if (!this.soldier.body.moves) return; // Don't move if cleaning weapon

        // --- MOVEMENT ---
        this.soldier.setVelocity(0);
        const speed = 200;

        if (this.cursors.left.isDown) this.soldier.setVelocityX(-speed);
        else if (this.cursors.right.isDown) this.soldier.setVelocityX(speed);
        
        if (this.cursors.up.isDown) this.soldier.setVelocityY(-speed);
        else if (this.cursors.down.isDown) this.soldier.setVelocityY(speed);
        
        // --- ROTATION ---
        if (this.soldier.body.velocity.x !== 0 || this.soldier.body.velocity.y !== 0) {
            this.soldier.rotation = Math.atan2(this.soldier.body.velocity.y, this.soldier.body.velocity.x) + 1.57;
        }

        // --- PROXIMITY CHECKS ---
        const distLocker = Phaser.Math.Distance.Between(this.soldier.x, this.soldier.y, this.locker.x, this.locker.y);
        const distBench = Phaser.Math.Distance.Between(this.soldier.x, this.soldier.y, this.armsBench.x, this.armsBench.y);

        if (distLocker < 80) {
            this.promptText.setText("[E] OPEN LOCKER").setPosition(this.locker.x, this.locker.y + 70).setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(this.interactKey)) this.openGearMenu();
        } 
        else if (distBench < 100) {
            this.promptText.setText("[E] MAINTAIN WEAPON").setPosition(this.armsBench.x, this.armsBench.y + 60).setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(this.interactKey)) this.startWeaponMaintenance();
        }
        else {
            this.promptText.setVisible(false);
        }
    }

    // --- GEAR CUSTOMIZATION ---
    openGearMenu() {
        console.log("Locker Opened. Choose your Uniform.");
        // This links to your existing equipItem functionality
        // You can add a simple popup or use the HTML buttons you already have
    }

    // --- WEAPON MAINTENANCE MINI-GAME ---
    startWeaponMaintenance() {
        this.soldier.body.moves = false; // Freeze soldier
        this.promptText.setVisible(false);
        this.dirtCount = 5;

        // Create UI Overlay Container
        this.cleaningOverlay = this.add.container(400, 300).setDepth(20);
        
        const benchBg = this.add.rectangle(0, 0, 500, 350, 0x1a1a1a).setStrokeStyle(4, 0x4af626);
        const title = this.add.text(-230, -160, "FIELD MAINTENANCE: M4A1", { font: "18px Courier", fill: "#4af626" });
        const weaponSprite = this.add.image(0, 0, 'm4_rifle_topdown').setScale(0.8);
        const instruction = this.add.text(0, 140, "WIPE AWAY CARBON DEPOSITS", { font: "12px Courier", fill: "#ffffff" }).setOrigin(0.5);
        
        this.cleaningOverlay.add([benchBg, title, weaponSprite, instruction]);

        // Generate Dirt Spots
        for(let i = 0; i < this.dirtCount; i++) {
            let dirt = this.add.circle(
                Phaser.Math.Between(-150, 150), 
                Phaser.Math.Between(-40, 40), 
                12, 0x000000, 0.9
            ).setInteractive();

            this.cleaningOverlay.add(dirt);

            dirt.on('pointerover', () => {
                this.sound.play('cleaning', { volume: 0.2 }); // Using your existing sound
                dirt.destroy();
                this.dirtCount--;
                this.checkCleanliness();
            });
        }
    }

    checkCleanliness() {
        if (this.dirtCount <= 0) {
            this.registry.set('weaponCleanliness', 100);
            
            const successText = this.add.text(0, 0, "WEAPON COMBAT READY", { font: "bold 24px Courier", fill: "#4af626" }).setOrigin(0.5);
            this.cleaningOverlay.add(successText);

            this.time.delayedCall(1500, () => {
                this.cleaningOverlay.destroy();
                this.soldier.body.moves = true; // Unfreeze soldier
            });
        }
    }
}
