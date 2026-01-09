import { useEffect, useState } from "react";

// DTO
import type { CharacterInfo, InfoStat } from "../../models/dataInterface";

// hooks
import useDataHandler from "../global/useDataHandler"


export default function useMain() {

    const { getCharInfoData, getInfoStatData } = useDataHandler();

    const [charInfoData, setCharInfoData] = useState<CharacterInfo | null>(null);
    const [infoStatData, setInfoStatData] = useState<InfoStat | null>(null);

    useEffect(() => {
        setCharInfoData(getCharInfoData());
        setInfoStatData(getInfoStatData());
    }, []);

    return {
        charInfoData,
        infoStatData,
    }
}