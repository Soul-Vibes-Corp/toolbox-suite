// Inside BaseMap.js fireBullet function
const cleanliness = this.registry.get('weaponCleanliness') || 100;

// If cleanliness is low, add a chance to jam
if (cleanliness < 30 && Math.random() < 0.1) {
    this.sound.play('weapon_jam_click');
    console.log("WEAPON JAMMED - Needs Maintenance!");
    return; // Stop firing
}

// Low cleanliness also slows down fire rate
const fireDelay = cleanliness < 50 ? 400 : 200; 
lastFired = time + fireDelay;
