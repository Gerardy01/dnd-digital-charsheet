


export const StorageKey = {
    CHARINFO: "charInfo",
    INFOSTAT: "infoStat",
    ABILITIES: "abilities",
    SAVINGS: "savings",
    SKILLS: "skills",
    COMBAT: "combat",
    PROANDTRAIN: "proficienciesAndTraining",
    PASSIVE: "passive",
    FEATANDTRAITS: "featuresAndTraits",
    EXTRASENSES: "extraSenses",
    DEFENSES: "defenses",
    CHARDETAILS: "characterDetails",
    EQUIPMENT: "equipment",
    SPELLCASTING: "spellcasting",
    ACTIONECONOMY: "actionEconomy",
    OTHERRESOURCES: "otherResources",
}

export const AbilityEnum = {
    STR: "strength",
    DEX: "dexterity",
    CON: "constitution",
    INT: "intelligence",
    WIS: "wisdom",
    CHA: "charisma",
} as const;

export const AbilitySelectionEnum = {
    STR: "Strength",
    DEX: "Dexterity",
    CON: "Constitution",
    INT: "Intelligence",
    WIS: "Wisdom",
    CHA: "Charisma",
} as const;

export const ProAndTrainEnum = {
    ARMOR: "armor",
    WEAPONS: "weapons",
    TOOLS: "tools",
    LANGUAGES: "languages",
    OTHER: "other",
} as const;

export const CurrencyEnum = {
    CP: "cp",
    SP: "sp",
    EP: "ep",
    GP: "gp",
    PP: "pp",
} as const;

export const PersonalityEnum = {
    TRAITS: "traits",
    IDEALS: "ideals",
    BONDS: "bonds",
    FLAWS: "flaws",
} as const;

export const MoreDetailsEnum = {
    BACKSTORY: "backstory",
    ALLIESANDORGANIZATIONS: "alliesAndOrganizations",
    ADDITIONALNOTES: "additionalNotes",
} as const;

export const AppearanceEnum = {
    GENDER: "gender",
    AGE: "age",
    HEIGHT: "height",
    WEIGHT: "weight",
    SIZE: "size",
    HAIR: "hair",
    EYES: "eyes",
    SKIN: "skin",
    FAITH: "faith",
} as const

export const ActionTypeEnum = {
    ACTION: "actions",
    BONUSACTION: "bonusActions",
    REACTION: "reactions",
} as const

export const DefaultActionsEnum = {
    OPPORTUNITY: "Opportunity Attack",
    STANDARD: "Standard Combat Actions",
}

export const ActionCategoryEnum = {
    EQUIPABLE: "Equipable",
    SPELL: "Spell",
    FEATURE: "Feature",
    ITEM: "Item",
    OTHER: "Other",
} as const;

export const UsabilityEnum = {
    ATTACK: "Attack",
    UTILITY: "Utility",
    HEALING: "Healing",
    BUFF: "Buff",
} as const;

export const ResourceResetEnum = {
    LONGREST: "Long Rest",
    SHORTREST: "Short Rest",
} as const;

export const PassiveTypeEnum = {
    PERCEPTION: "perception",
    INSIGHT: "insight",
    INVESTIGATION: "investigation",
} as const

export const SensesEnum = {
    BLINDSIGHT: "Blindsight",
    DARKVISION: "Darkvision",
    TREMORSENSE: "Tremorsense",
    TRUESIGHT: "Truesight"
} as const

export const DefensesTypeEnum = {
    RESISTANCE: "Resistance",
    IMMUNITIES: "Immunities",
    VULNERABILITY: "Vulnerability",
} as const

export const DamageTypeEnum = {
    SLASHING: "Slashing",
    PIERCING: "Piercing",
    BLUDGEONING: "Bludgeoning",
    FIRE: "Fire",
    COLD: "Cold",
    LIGHTNING: "Lightning",
    ACID: "Acid",
    POISON: "Poison",
    THUNDER: "Thunder",
    FORCE: "Force",
    PSYCHIC: "Psychic",
    RADIANT: "Radiant",
    NECROTIC: "Necrotic",
} as const

export const SourceEnum = {
    RACE: "Race",
    CLASS: "Class",
    BACKGROUND: "Background",
} as const

export const SpellComponentsEnum = {
    V: "V",
    S: "S",
    M: "M",
} as const

export const SpellSchoolEnum = {
    ABJURATION: "Abjuration",
    CONJURATION: "Conjuration",
    DIVINATION: "Divination",
    ENCHANTMENT: "Enchantment",
    EVOCATION: "Evocation",
    ILLUSION: "Illusion",
    NECROMANCY: "Necromancy",
    TRANSMUTATION: "Transmutation",
} as const

export const HitDiceEnum = {
    D4: "d4",
    D6: "d6",
    D8: "d8",
    D10: "d10",
    D12: "d12",
    D20: "d20",
} as const