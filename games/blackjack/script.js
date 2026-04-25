window.equipItem = (itemType) => {
    if (!soldier) return;
    const mods = { 'ghillie': 0.7, 'pt': 1.5, 'ocp': 1.0 };
    soldier.setTexture(`soldier_${itemType}`);
    soldier.speedModifier = mods[itemType];
    soldier.setDisplaySize(64, 64);
};

window.startRuck = () => {
    if (!isAtBarracks) return alert("Must start Ruck at Barracks!");
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    ruckWaypoint.setPosition(x, y).setVisible(true);
    isRucking = true;
};

window.reportForFormation = () => {
    window.awardXP(25);
    alert("Reported for formation. +25 XP");

};
