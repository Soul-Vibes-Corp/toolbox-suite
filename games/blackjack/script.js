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
