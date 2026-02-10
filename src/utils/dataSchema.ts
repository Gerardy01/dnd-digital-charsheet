import { z } from 'zod';

// --- Sub-schemas ---

const characterInfoSchema = z.object({
    characterName: z.string(),
    classesAndLevel: z.string(),
    species: z.string(),
    background: z.string(),
    alignment: z.string(),
    experiencePoints: z.string(),
});

const infoStatSchema = z.object({
    proficiencyBonus: z.number(),
    heroicInspiration: z.boolean(),
});

const characterDetailsSchema = z.object({
    appearance: z.object({
        gender: z.string(),
        age: z.string(),
        height: z.string(),
        weight: z.string(),
        size: z.string(),
        hair: z.string(),
        eyes: z.string(),
        skin: z.string(),
        faith: z.string(),
    }),
    personality: z.object({
        traits: z.string(),
        ideals: z.string(),
        bonds: z.string(),
        flaws: z.string(),
    }),
    alliesAndOrganizations: z.string(),
    backstory: z.string(),
    additionalNotes: z.string(),
});

const singleAbilitySchema = z.object({
    score: z.number(),
    modifier: z.number(),
});

const abilitySchema = z.object({
    strength: singleAbilitySchema,
    dexterity: singleAbilitySchema,
    constitution: singleAbilitySchema,
    intelligence: singleAbilitySchema,
    wisdom: singleAbilitySchema,
    charisma: singleAbilitySchema,
});

const singleSavingSchema = z.object({
    modifier: z.number(),
    proficient: z.boolean(),
});

const savingsSchema = z.object({
    strength: singleSavingSchema,
    dexterity: singleSavingSchema,
    constitution: singleSavingSchema,
    intelligence: singleSavingSchema,
    wisdom: singleSavingSchema,
    charisma: singleSavingSchema,
});

const singleSkillSchema = z.object({
    modifier: z.number(),
    proficient: z.boolean(),
});

const skillsSchema = z.object({
    acrobatics: singleSkillSchema,
    animalHandling: singleSkillSchema,
    arcana: singleSkillSchema,
    athletics: singleSkillSchema,
    deception: singleSkillSchema,
    history: singleSkillSchema,
    insight: singleSkillSchema,
    intimidation: singleSkillSchema,
    investigation: singleSkillSchema,
    medicine: singleSkillSchema,
    nature: singleSkillSchema,
    perception: singleSkillSchema,
    performance: singleSkillSchema,
    persuasion: singleSkillSchema,
    religion: singleSkillSchema,
    sleightOfHand: singleSkillSchema,
    stealth: singleSkillSchema,
    survival: singleSkillSchema,
});

const combatSchema = z.object({
    hitPoints: z.object({
        max: z.number(),
        current: z.number(),
        temporary: z.number(),
    }),
    speed: z.number(),
    armorClass: z.number(),
    initiative: z.number(),
    hitDice: z.array(
        z.object({
            class: z.string(),
            type: z.string(),
            total: z.number(),
            remaining: z.number(),
        })
    ),
});

const proficienciesAndTrainingSchema = z.object({
    armor: z.array(z.string()),
    weapons: z.array(z.string()),
    tools: z.array(z.string()),
    languages: z.array(z.string()),
    other: z.array(z.string()),
});

const passiveScoresSchema = z.object({
    perception: z.number(),
    insight: z.number(),
    investigation: z.number(),
});

const featureSchema = z.object({
    name: z.string(),
    description: z.string(),
    source: z.string(),
    sourceType: z.string(),
    actionType: z.string(),
});

const extraSenseSchema = z.object({
    name: z.string(),
    distance: z.number(),
});

const defenseSchema = z.object({
    name: z.string(),
    type: z.string(),
});

const currencySchema = z.object({
    cp: z.number(),
    sp: z.number(),
    ep: z.number(),
    gp: z.number(),
    pp: z.number(),
});

const itemSchema = z.object({
    name: z.string(),
    quantity: z.number(),
    weight: z.number(),
    equipable: z.boolean(),
    description: z.string(),
    actionType: z.string(),
    equipped: z.boolean().optional(),
});

const equipmentSchema = z.object({
    currency: currencySchema,
    items: z.array(itemSchema),
    attunedMagicItems: z.array(itemSchema),
    weightCapacity: z.number(),
    encumbered: z.boolean(),
    pushDragLift: z.number(),
});

const spellItemSchema = z.object({
    name: z.string(),
    level: z.number(),
    school: z.string(),
    castingTime: z.string(),
    range: z.string(),
    components: z.array(z.string()),
    duration: z.string(),
    ritual: z.boolean(),
    concentration: z.boolean(),
    prepared: z.boolean(),
    description: z.string(),
    sourcePage: z.string(),
    actionType: z.string(),
});

const spellLevelSchema = z.object({
    source: z.string(),
    sourceType: z.string(),
    ability: z.string(),
    spellSaveDC: z.number(),
    spellAttackBonus: z.number(),
    spells: z.array(spellItemSchema),
});

const otherResourceSchema = z.object({
    name: z.string(),
    current: z.number(),
    max: z.number(),
    reset: z.string(),
    notes: z.string(),
});

const activationSchema = z.object({
    type: z.string(),
    bonus: z.number(),
    dice: z.string(),
    damageType: z.string(),
});

const resourceUsageSchema = z.union([
    z.string(),
    z.object({
        name: z.string(),
        current: z.number(),
        max: z.number(),
        reset: z.string()
    })
]);

const actionItemSchema = z.object({
    name: z.string(),
    level: z.number().nullable(),
    category: z.string(),
    activation: activationSchema,
    description: z.string(),
    resource: resourceUsageSchema,
});

const actionEconomySchema = z.object({
    actions: z.array(actionItemSchema),
    bonusActions: z.array(actionItemSchema),
    reactions: z.array(actionItemSchema),
});

// --- Main Schema ---

export const characterSheetSchema = z.object({
    charInfo: characterInfoSchema,
    infoStat: infoStatSchema,
    characterDetails: characterDetailsSchema,
    ability: abilitySchema,
    savings: savingsSchema,
    skills: skillsSchema,
    combat: combatSchema,
    proficienciesAndTraining: proficienciesAndTrainingSchema,
    passiveScores: passiveScoresSchema,
    featuresAndTraits: z.array(featureSchema),
    extraSenses: z.array(extraSenseSchema),
    defenses: z.array(defenseSchema),
    equipment: equipmentSchema,
    spells: z.array(spellLevelSchema),
    otherResources: z.array(otherResourceSchema),
    actionEconomy: actionEconomySchema,
    actionCache: z.array(actionItemSchema),
});

export type CharacterSheet = z.infer<typeof characterSheetSchema>;
