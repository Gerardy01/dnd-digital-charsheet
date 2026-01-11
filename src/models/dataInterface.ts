


export interface CharSheetDataDTO {
    characterInfo: CharacterInfo;
    characterDetails: CharacterDetails;
    proficiencyBonus: number;
    abilities: AbilityScores;
    savingThrows: SavingThrows;
    skills: Skills;
    combat: Combat;
    proficienciesAndTraining: ProficienciesAndTraining;
    actionEconomy: ActionEconomy;
    resourceTrackers: ResourceTracker[];
    attacksAndCantrips: AttackOrCantrip[];
    featuresAndTraits: FeatureOrTrait[];
    passiveScores: PassiveScores;
    defenses: string[];
    senses: string[];
    equipment: Equipment;
    spellcasting: SpellcastingSource[];
    notes: string;
}

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
    speed: string;
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

/* =========================
   Proficiencies
========================= */

export interface ProficienciesAndTraining {
    armor: string[];
    weapons: string[];
    tools: string[];
    languages: string[];
    other: string[];
}

/* =========================
   Action Economy
========================= */

export interface ActionEconomy {
    actions: ActionItem[];
    bonusActions: ActionItem[];
    reactions: ActionItem[];
}

export interface ActionItem {
    name: string;
    type: string;
    resource: string;
    notes: string;
}

/* =========================
   Resources
========================= */

export interface ResourceTracker {
    name: string;
    current: number;
    max: number;
    reset: string;
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

export interface FeatureOrTrait {
    name: string;
    description: string;
    source: string;
    sourceType: "Race" | "Class" | "Background";
}

/* =========================
   Passive & Senses
========================= */

export interface PassiveScores {
    perception: number;
    insight: number;
    investigation: number;
}

/* =========================
   Equipment
========================= */

export interface Equipment {
    currency: Currency;
    items: Item[];
    attunedMagicItems: string[];
    weightCarried: number;
    weightCapacity: number;
    encumbered: boolean;
    pushDragLift: string;
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
    equipped: boolean;
    description: string;
}

/* =========================
   Spellcasting
========================= */

export interface SpellcastingSource {
    source: string;
    sourceType: "racial" | "class";
    ability: string;
    spellSaveDC: number;
    spellAttackBonus: number;
    spells: SpellLevels;
}

export interface SpellLevels {
    cantrips?: Spell[];
    level1?: Spell[];
}

export interface Spell {
    name: string;
    level: number;
    school: string;
    castingTime: string;
    range: string;
    components: string[];
    duration: string;
    prepared: boolean;
    description?: string;
    sourcePage: string;
}
