
// utils
import {
    DefensesTypeEnum,
    HitDiceEnum,
    SensesEnum
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

export const hitDiceList: string[] = [
    HitDiceEnum.D4,
    HitDiceEnum.D6,
    HitDiceEnum.D8,
    HitDiceEnum.D10,
    HitDiceEnum.D12,
    HitDiceEnum.D20,
];