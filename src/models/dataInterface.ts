


/* =========================
   Character Info
========================= */

export interface CharacterInfo {
    characterName: string;
    classesAndLevel: string;
    species: string;
    background: string;
    alignment: string;
    experiencePoints: string;
}

export interface InfoStat {
    proficiencyBonus: number;
    heroicInspiration: boolean;
}

/* =========================
   Character Details
========================= */

export interface CharacterDetails {
    appearance: Appearance;
    personality: Personality;
    alliesAndOrganizations: string;
    backstory: string;
    additionalNotes: string;
}

export interface Appearance {
    gender: string;
    age: number;
    height: string;
    weight: string;
    size: string;
    hair: string;
    eyes: string;
    skin: string;
    faith: string;
}

export interface Personality {
    traits: string;
    ideals: string;
    bonds: string;
    flaws: string;
}

/* =========================
   Abilities & Skills
========================= */

export interface AbilityScore {
    score: number;
    modifier: number;
}

export interface AbilityScores {
    strength: AbilityScore;
    dexterity: AbilityScore;
    constitution: AbilityScore;
    intelligence: AbilityScore;
    wisdom: AbilityScore;
    charisma: AbilityScore;
}

export interface SaveOrSkill {
    proficient: boolean;
    modifier: number;
}

export interface SavingThrows {
    strength: SaveOrSkill;
    dexterity: SaveOrSkill;
    constitution: SaveOrSkill;
    intelligence: SaveOrSkill;
    wisdom: SaveOrSkill;
    charisma: SaveOrSkill;
}

export interface Skills {
    acrobatics: SaveOrSkill;
    animalHandling: SaveOrSkill;
    arcana: SaveOrSkill;
    athletics: SaveOrSkill;
    deception: SaveOrSkill;
    history: SaveOrSkill;
    insight: SaveOrSkill;
    intimidation: SaveOrSkill;
    investigation: SaveOrSkill;
    medicine: SaveOrSkill;
    nature: SaveOrSkill;
    perception: SaveOrSkill;
    performance: SaveOrSkill;
    persuasion: SaveOrSkill;
    religion: SaveOrSkill;
    sleightOfHand: SaveOrSkill;
    stealth: SaveOrSkill;
    survival: SaveOrSkill;
}

/* =========================
   Combat
========================= */

export interface Combat {
    hitPoints: HitPoints;
    speed: number;
    armorClass: number;
    initiative: number;
    hitDice: HitDice[];
    heroicInspiration: boolean;
}

export interface HitPoints {
    max: number;
    current: number;
    temporary: number;
}

export interface HitDice {
    class: string;
    type: string;
    total: number;
    remaining: number;
}


export interface ProficienciesAndTraining {
    armor: string[];
    weapons: string[];
    tools: string[];
    languages: string[];
    other: string[];
}


export interface ActionEconomy {
    actions: ActionItem[];
    bonusActions: ActionItem[];
    reactions: ActionItem[];
}

export interface ActionItem {
    name: string;
    level: number | null;
    category: string;
    activation: ActionActivation;
    description: string;
    resource: Resources | string;
}

export interface ActionActivation {
    type: string;
    bonus: number;
    dice: string;
    damageType: string;
}

export interface ActionPopulateParams {
    name: string;
    actionType: string;
    category: string;
    description: string;
    level: number | null;
}

/* =========================
   Resources
========================= */

export interface Resources {
    name: string;
    current: number;
    max: number;
    reset: string;
}

export interface OtherResources extends Resources {
    notes: string;
}

/* =========================
   Attacks & Features
========================= */

export interface AttackOrCantrip {
    name: string;
    attackBonus: number;
    damage: string;
    damageType: string;
}

export interface FeaturesAndTraits {
    name: string;
    description: string;
    source: string;
    sourceType: string;
    actionType: string;
}

/* =========================
   Passive & Senses
========================= */

export interface PassiveScores {
    perception: number;
    insight: number;
    investigation: number;
}

export interface ExtraSenses {
    name: string;
    distance: number;
}

export interface Defenses {
    name: string;
    type: string;
}

/* =========================
   Equipment
========================= */

export interface Equipment {
    currency: Currency;
    items: Item[];
    attunedMagicItems: Item[];
    weightCapacity: number;
    encumbered: boolean;
    pushDragLift: number;
}

export interface Currency {
    cp: number;
    sp: number;
    ep: number;
    gp: number;
    pp: number;
}

export interface Item {
    name: string;
    quantity: number;
    weight: number;
    equipable: boolean;
    description: string;
    actionType: string;
    equipped?: boolean;
}

/* =========================
   Spellcasting
========================= */

export interface SpellcastingSource {
    source: string;
    sourceType: string;
    ability: string;
    spellSaveDC: number;
    spellAttackBonus: number;
    spells: Spell[];
}

export interface SpellcastingTransformed {
    source: string;
    sourceType: string;
    ability: string;
    spellSaveDC: number;
    spellAttackBonus: number;
    spells: SpellTransformed[];
}

export interface SpellTransformed {
    levelName: string;
    spells: Spell[];
}

export interface Spell {
    name: string;
    level: number;
    school: string;
    castingTime: string;
    range: string;
    components: string[];
    duration: string;
    ritual: boolean;
    concentration: boolean;
    prepared: boolean;
    description: string;
    sourcePage: string;
    actionType: string;
}
