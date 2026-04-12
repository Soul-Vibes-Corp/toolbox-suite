export const getCombatStats = (playerData, inventoryData) => {
    // Base Accuracy (11B Standard)
    let accuracy = 80; 

    // Gear Buffs
    if (inventoryData.equipped.primary === "M4A1_ACOG") {
        accuracy += 15; // Scope bonus
    }

    // Debuffs (The "Suck" Factor)
    if (playerData.stamina < 20) {
        accuracy -= 30; // Fatigue shakes
    }

    return {
        spread: 100 - accuracy,
        moveSpeed: inventoryData.equipped.weight > 50 ? 150 : 250
    };
};
