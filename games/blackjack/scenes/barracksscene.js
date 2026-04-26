class BarracksScene extends Phaser.Scene {
    constructor() {
        super('BarracksScene');
    }

    create() {
        // 1. Scene Setup
        this.add.text(20, 20, "INTERIOR: HQ BARRACKS", { font: "24px Courier", fill: "#4af626" });

        // 2. Workstations (Visual Hitboxes)
        const locker = this.add.rectangle(200, 300, 80, 120, 0x555555).setInteractive();
        this.add.text(170, 220, "LOCKER", { font: "14px Courier", fill: "#ffffff" });

        const armsBench = this.add.rectangle(500, 300, 150, 80, 0x3d2b1f).setInteractive();
        this.add.text(460, 220, "ARMS BENCH", { font: "14px Courier", fill: "#ffffff" });

        // 3. The Soldier
        this.soldier = this.physics.add.sprite(400, 500, 'soldier_ocp').setDisplaySize(128, 128);
        
        // 4. Interaction Logic
        locker.on('pointerdown', () => this.openLockerMenu());
        armsBench.on('pointerdown', () => this.startWeaponCleaning());

        // 5. Exit Door (Go back to Main Map)
        const exitDoor = this.add.rectangle(400, 580, 100, 40, 0xff0000).setInteractive();
        this.add.text(370, 570, "EXIT", { font: "bold 16px Courier", fill: "#ffffff" });
        exitDoor.on('pointerdown', () => this.scene.start('BaseMap'));
    }

    openLockerMenu() {
        console.log("Opening Gear Customization...");
        // Here we will eventually add buttons to switch between OCP, PT, and Ghillie
    }

    startWeaponCleaning() {
        console.log("Starting Weapon Maintenance...");
        // Here we will add the clicking mini-game
    }
}
