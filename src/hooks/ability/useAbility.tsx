import { useEffect, useState } from "react";

// Hooks
import useDataHandler from "../global/useDataHandler";

// DTO
import type { AbilityScores, AbilityScore } from "../../models/dataInterface";



export default function useAbility() {

    const { getAbilityData, changeAbilitiesData } = useDataHandler();

    const [abilityData, setAbilityData] = useState<AbilityScores | null>(null);

    useEffect(() => {
        setAbilityData(getAbilityData());
    }, []);

    useEffect(() => {
        if (!abilityData) return;

        changeAbilitiesData(abilityData);
    }, [abilityData]);

    const changeAbilityScore = (abilityName: keyof AbilityScores, newScore: string) => {
        if (!abilityData) return;
        if (newScore === "") return;

        setAbilityData({
            ...abilityData,
            [abilityName]: {
                ...abilityData[abilityName],
                score: Number(newScore),
            }
        });
    };

    const changeAbilityModifier = (abilityName: keyof AbilityScores, newModifier: string) => {
        if (!abilityData) return;
        if (newModifier === "") return;

        setAbilityData({
            ...abilityData,
            [abilityName]: {
                ...abilityData[abilityName],
                modifier: Number(newModifier),
            }
        });
    };

    return {
        abilityData,
        changeAbilityScore,
        changeAbilityModifier,
    }
}