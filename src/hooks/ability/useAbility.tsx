import { useEffect, useState } from "react";

// Hooks
import useDataHandler from "../global/useDataHandler";

// DTO
import type { AbilityScores } from "../../models/dataInterface";



export default function useAbility() {

    const { getAbilityData } = useDataHandler();

    const [abilityData, setAbilityData] = useState<AbilityScores | null>(null);

    useEffect(() => {
        setAbilityData(getAbilityData());
    }, []);

    return {
        abilityData,
    }
}