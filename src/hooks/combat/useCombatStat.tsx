import { useEffect, useState } from "react";


// hooks
import useDataHandler from "../global/useDataHandler"

// DTO
import type { Combat } from "../../models/dataInterface";


export default function useCombatStat() {

    const { getCombatData, changeCombatData } = useDataHandler();

    const [combatData, setCombatData] = useState<Combat | null>(null);
    const [hpPercentage, setHpPercentage] = useState<number>(0);

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

    return {
        combatData,
        hpPercentage,
        changeHitDicePoint,
        changeHP,
        changeHpWithBtn,
    }
}