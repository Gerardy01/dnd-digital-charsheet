import { useEffect, useState } from "react";

// DTO
import type { CharacterInfo } from "../../models/dataInterface";

// hooks
import useDataHandler from "../global/useDataHandler"


export default function useMain() {

    const { getCharInfoData } = useDataHandler();

    const [charInfoData, setCharInfoData] = useState<CharacterInfo | null>(null);

    useEffect(() => {
        setCharInfoData(getCharInfoData());
        
    }, []);

    return {
        charInfoData,
    }
}