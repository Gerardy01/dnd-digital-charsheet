
// utils
import {
    DefensesTypeEnum,
    HitDiceEnum,
    SensesEnum,
    ResourceResetEnum,
    SourceEnum,
    ActionTypeEnum,
    AbilitySelectionEnum,
    SpellSchoolEnum,
    SpellComponentsEnum,
} from "./enums";


export const sensesNameList: string[] = [
    SensesEnum.BLINDSIGHT,
    SensesEnum.DARKVISION,
    SensesEnum.TREMORSENSE,
    SensesEnum.TRUESIGHT,
];

export const defenseTypeList: string[] = [
    DefensesTypeEnum.RESISTANCE,
    DefensesTypeEnum.IMMUNITIES,
    DefensesTypeEnum.VULNERABILITY,
];

export const diceList: string[] = [
    HitDiceEnum.D4,
    HitDiceEnum.D6,
    HitDiceEnum.D8,
    HitDiceEnum.D10,
    HitDiceEnum.D12,
    HitDiceEnum.D20,
];

export const rangeList: string[] = [
    "Self",
    "Touch",
    "10 feet",
    "15 feet",
    "30 feet",
    "60 feet",
    "100 feet",
    "150 feet",
    "5 miles",
    "Sight",
];

export const durationList: string[] = [
    "Instantaneous",
    "1 round",
    "1 minute",
    "10 minutes",
    "1 hour",
    "8 hours",
    "24 hours",
];

export const resetList: string[] = [
    ResourceResetEnum.LONGREST,
    ResourceResetEnum.SHORTREST,
];

export const SourceTypeList: string[] = [
    SourceEnum.RACE,
    SourceEnum.CLASS,
    SourceEnum.BACKGROUND,
];

export const actionTypeOptionalList: { value: string; label: string }[] = [
    { value: "", label: "None" },
    { value: ActionTypeEnum.ACTION, label: "Action" },
    { value: ActionTypeEnum.BONUSACTION, label: "Bonus Action" },
    { value: ActionTypeEnum.REACTION, label: "Reaction" },
];

export const actionTypeList: { value: string; label: string }[] = [
    { value: ActionTypeEnum.ACTION, label: "Action" },
    { value: ActionTypeEnum.BONUSACTION, label: "Bonus Action" },
    { value: ActionTypeEnum.REACTION, label: "Reaction" },
];

export const abilityList: string[] = [
    AbilitySelectionEnum.STR,
    AbilitySelectionEnum.DEX,
    AbilitySelectionEnum.CON,
    AbilitySelectionEnum.INT,
    AbilitySelectionEnum.WIS,
    AbilitySelectionEnum.CHA,
];

export const schoolList: string[] = [
    SpellSchoolEnum.ABJURATION,
    SpellSchoolEnum.CONJURATION,
    SpellSchoolEnum.DIVINATION,
    SpellSchoolEnum.ENCHANTMENT,
    SpellSchoolEnum.EVOCATION,
    SpellSchoolEnum.ILLUSION,
    SpellSchoolEnum.NECROMANCY,
    SpellSchoolEnum.TRANSMUTATION,
];

export const castingTimeList: string[] = [
    "1 Action",
    "1 Bonus Action",
    "1 Reaction",
    "Free Action",
    "1 Minute",
    "10 Minutes",
    "1 Hour",
    "8 Hours",
    "24 Hours",
];

export const componentList: string[] = [
    SpellComponentsEnum.V,
    SpellComponentsEnum.S,
    SpellComponentsEnum.M,
];


