
// utils
import {
    DefensesTypeEnum,
    HitDiceEnum,
    SensesEnum,
    RangeEnum,
    DurationEnum,
    ResourceResetEnum,
    SourceEnum,
    ActionTypeEnum,
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
    RangeEnum.SELF,
    RangeEnum.TOUCH,
    RangeEnum.TENFT,
    RangeEnum.FIFTEENFT,
    RangeEnum.THIRTYFT,
    RangeEnum.SIXTYFT,
    RangeEnum.HUNDREDFT,
    RangeEnum.FIVE_MILES,
    RangeEnum.SIGHT,
];

export const durationList: string[] = [
    DurationEnum.INSTANT,
    DurationEnum.ONEROUND,
    DurationEnum.ONEMINUTE,
    DurationEnum.TENMINUTES,
    DurationEnum.ONEHOUR,
    DurationEnum.EIGHTHOURS,
    DurationEnum.TWENTYFOURHOURS,
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

export const actionTypeList: { value: string; label: string }[] = [
    { value: "", label: "None" },
    { value: ActionTypeEnum.ACTION, label: "Action" },
    { value: ActionTypeEnum.BONUSACTION, label: "Bonus Action" },
    { value: ActionTypeEnum.REACTION, label: "Reaction" },
];
