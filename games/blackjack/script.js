// Core Logic: Stamina impacts accuracy
update() {
    const playerStamina = firebaseData.stamina; 
    // Lower stamina = higher deviation in the shot trajectory
    let sway = (100 - playerStamina) * 0.5; 
    
    if (this.input.activePointer.isDown) {
        this.fireWeapon(sway);
    }
}

fireWeapon(sway) {
    let accuracyOffset = Phaser.Math.Between(-sway, sway);
    let bullet = bullets.get(player.x, player.y);
    bullet.fire(player.rotation + accuracyOffset);
}

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 450 // 16:9 Landscape is standard for mobile sims
    }
};

// Inside your Phaser Scene
create() {
    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 150,
        y: window.innerHeight - 150,
        radius: 80,
        base: this.add.circle(0, 0, 80, 0x2b3a26, 0.5).setStrokeStyle(2, 0x4af626),
        thumb: this.add.circle(0, 0, 40, 0x4af626),
    });
}

update() {
    const cursorKeys = this.joyStick.createCursorKeys();
    let speed = 200;

    // Apply movement to the 11B Sprite
    if (this.joyStick.force > 0) {
        this.physics.velocityFromRotation(this.joyStick.rotation, speed, player.body.velocity);
        player.setRotation(this.joyStick.rotation); // Soldier faces the direction of travel
    } else {
        player.setVelocity(0);
    }
}

import { db } from "./firebase-config";
import { doc, updateDoc, increment } from "firebase/firestore";

async function reportForFormation(userId) {
    const playerRef = doc(db, "players", userId);

    try {
        await updateDoc(playerRef, {
            xp: increment(50),
            stamina: increment(-10), // Formation is draining!
            morale: increment(5)     // Good leadership increases morale
        });
        console.log("SITREP: Formation complete. XP gained.");
        updateHUD(); // Refresh the UI stats
    } catch (error) {
        console.error("Critical Failure: Could not reach HQ", error);
    }
}
