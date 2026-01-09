import { useEffect, useState } from "react";


// hooks
import useDataHandler from "../global/useDataHandler"

// DTO
import type { Combat } from "../../models/dataInterface";


export default function useCombatStat() {

    const { getCombatData } = useDataHandler();

    const [combatData, setCombatData] = useState<Combat | null>(null);

    useEffect(() => {
        setCombatData(getCombatData());
    }, []);

    return {
        combatData,
    }
}