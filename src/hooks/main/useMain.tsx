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

    const changeName = (newName : string) => {
        if (!charInfoData) return;

        const newCharInfoData = {
            ...charInfoData,
            characterName: newName
        };

        setCharInfoData(newCharInfoData);

        // TODO: update data in storage
    }

    const changeRace = (newRace : string) => {
        if (!charInfoData) return;

        const newCharInfoData = {
            ...charInfoData,
            species: newRace
        };

        setCharInfoData(newCharInfoData);

        // TODO: update data in storage
    }

    return {
        charInfoData,
        infoStatData,
        changeName,
        changeRace,
    }
}