import { useEffect, useState } from "react";
import { Form, type FormProps } from "antd";

// hooks
import useDataHandler from "../global/useDataHandler"

// utils
import { diceList } from "../../utils/selectionData";

// DTO
import type { Combat, HitDice } from "../../models/dataInterface";
type HitDiceForm = {
    class: string;
    count: number;
    dice: string;
}


export function useCombatStat() {

    const { getCombatData, changeCombatData } = useDataHandler();

    const [combatData, setCombatData] = useState<Combat | null>(null);
    const [hpPercentage, setHpPercentage] = useState<number>(0);

    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [editedIndex, setEditedIndex] = useState<number>(-1);

    useEffect(() => {
        setCombatData(getCombatData());
    }, []);

    useEffect(() => {
        if (!combatData) return;

        const percentage = percentageCalculator(combatData.hitPoints.current, combatData.hitPoints.max);
        setHpPercentage(percentage);

        changeCombatData(combatData);
    }, [combatData]);

    const percentageCalculator = (current: number, max: number): number => {
        return (current / max) * 100;
    }

    const changeHP = (newCurrent: number, newMax: number) => {
        if (!combatData) return;
        if (newCurrent < 0) return;

        const hitPoints = combatData.hitPoints;

        let currentData = newCurrent > hitPoints.max ? hitPoints.max : newCurrent;
        let maxData = newMax < 1 ? 1 : newMax;
        if (newMax < hitPoints.current) {
            currentData = maxData;
        }

        const newHitPoints = {
            ...hitPoints,
            current: currentData,
            max: maxData,
        };

        const newCombatData = {
            ...combatData,
            hitPoints: newHitPoints
        };

        setCombatData(newCombatData);
    }

    const changeHpWithBtn = (isIncrease: boolean) => {
        if (!combatData) return;

        const hitPoints = combatData.hitPoints;

        if (hitPoints.current >= hitPoints.max && isIncrease) return;
        if (hitPoints.current <= 0 && !isIncrease) return;

        const newHitPoints = {
            ...hitPoints,
            current: isIncrease ? hitPoints.current + 1 : hitPoints.current - 1,
        }

        const newCombatData = {
            ...combatData,
            hitPoints: newHitPoints
        }

        setCombatData(newCombatData);
    }

    const changeTempHp = (newCurrent: string) => {
        if (!combatData) return;
        if (!newCurrent) return;

        let newTempNumber = Number(newCurrent);

        if (newTempNumber < 0) {
            newTempNumber = 0;
        }

        setCombatData({
            ...combatData,
            hitPoints: {
                ...combatData.hitPoints,
                temporary: newTempNumber
            }
        });
    }

    const changeAC = (newAc: string) => {
        if (!combatData) return;
        if (!newAc) return;

        let newAcNumber = Number(newAc);

        if (newAcNumber < 0) {
            newAcNumber = 0;
        }

        setCombatData({
            ...combatData,
            armorClass: newAcNumber
        });
    }

    const changeInitiative = (newInitiative: string) => {
        if (!combatData) return;
        if (!newInitiative) return;

        let newInitiativeNumber = Number(newInitiative);

        if (newInitiativeNumber < 0) {
            newInitiativeNumber = 0;
        }

        setCombatData({
            ...combatData,
            initiative: newInitiativeNumber,
        });
    }

    const changeSpeed = (newSpeed: string) => {
        if (!combatData) return;
        if (!newSpeed) return;

        let newSpeedNumber = Number(newSpeed);

        if (newSpeedNumber < 0) {
            newSpeedNumber = 0;
        }

        setCombatData({
            ...combatData,
            speed: newSpeedNumber,
        });
    }

    const changeHitDicePoint = (newCurrent: number, targetClass: string) => {
        if (!combatData) return;

        const hitDiceData = combatData.hitDice;
        const newHitDice = hitDiceData.map(item => {
            if (item.class === targetClass) {
                return { ...item, remaining: newCurrent };
            }
            return item;
        });

        const newCombatData = {
            ...combatData,
            hitDice: newHitDice
        };

        setCombatData(newCombatData);
    }

    const onAddHitDice = (newHitDice: HitDice) => {
        if (!combatData) return;

        const hitDiceData = combatData.hitDice;
        const newHitDiceData = [...hitDiceData, newHitDice];

        const newCombatData = {
            ...combatData,
            hitDice: newHitDiceData
        };

        setCombatData(newCombatData);
        adding(false);
    }

    const onEditHitDice = (newData: HitDice) => {
        if (!combatData) return;

        const hitDiceData = combatData.hitDice;
        const newHitDiceData = hitDiceData.map(item => {
            if (item.class === newData.class) {
                return newData;
            }
            return item;
        });

        const newCombatData = {
            ...combatData,
            hitDice: newHitDiceData
        };

        setCombatData(newCombatData);
        onClickEdit(-1);
    }

    const adding = (add: boolean): void => {
        setIsAdding(add);
    }

    const onClickEdit = (index: number): void => {
        setEditedIndex(index);
    }

    const removeHitDice = (index: number): void => {
        if (!combatData) return;

        const filtered = combatData.hitDice.filter((_, i) => i !== index);

        const newCombatData = {
            ...combatData,
            hitDice: filtered
        };

        setCombatData(newCombatData);
        onClickEdit(-1);
    }

    return {
        combatData,
        hpPercentage,
        editedIndex,
        isAdding,
        changeHitDicePoint,
        changeHP,
        changeHpWithBtn,
        changeTempHp,
        changeAC,
        changeInitiative,
        changeSpeed,
        onAddHitDice,
        adding,
        onClickEdit,
        onEditHitDice,
        removeHitDice,
    }
}

export function useAddHitDice(
    onSubmit: (newHitDice: HitDice) => void,
) {

    const [addHitDiceForm] = Form.useForm();

    const hitDiceSelection = diceList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const submitNewHitDice: FormProps<HitDiceForm>['onFinish'] = async (values) => {
        if (!values.count || !values.class || !values.dice) return;

        const newHitDice: HitDice = {
            class: values.class,
            type: values.dice,
            total: values.count,
            remaining: values.count,
        };

        onSubmit(newHitDice);
        reset();
    }

    const reset = () => {
        addHitDiceForm.resetFields();
    }

    return {
        addHitDiceForm,
        hitDiceSelection,
        reset,
        submitNewHitDice,
    }
}

export function useEditHitDice(
    onSubmit: (newData: HitDice) => void,
) {

    const [editHitDiceForm] = Form.useForm();

    const hitDiceSelection = diceList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const submitData: FormProps<HitDiceForm>['onFinish'] = async (values) => {
        if (!values.count || !values.class || !values.dice) return;

        const newHitDice: HitDice = {
            class: values.class,
            type: values.dice,
            total: values.count,
            remaining: values.count,
        };

        onSubmit(newHitDice);
        reset();
    }

    const reset = () => {
        editHitDiceForm.resetFields();
    }

    return {
        editHitDiceForm,
        hitDiceSelection,
        reset,
        submitData,
    }
}