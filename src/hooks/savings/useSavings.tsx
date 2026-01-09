import { useEffect, useState } from "react";

// hooks
import useDataHandler from "../global/useDataHandler"

// DTO
import type { SavingThrows } from "../../models/dataInterface";



export default function useSavings() {

    const { getSavingsData } = useDataHandler();

    const [savingsData, setSavingsData] = useState<SavingThrows | null>(null); 

    useEffect(() => {
        setSavingsData(getSavingsData());
    }, []);

    return {
        savingsData,
    }
}