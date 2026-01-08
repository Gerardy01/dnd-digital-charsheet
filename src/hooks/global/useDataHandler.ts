
// DTO
import type { AbilityScores, CharacterInfo } from "../../models/dataInterface";

export default function useDataHandler() {

    const getDataFromLocalStorage = <T>(key: string): T | null => {
        const storedData = localStorage.getItem(key);
        return storedData ? (JSON.parse(storedData) as T) : null;
    }

    const getCharInfoData = () : CharacterInfo | null => {
        return getDataFromLocalStorage<CharacterInfo>('charInfo');
    }

    const getAbilityData = () : AbilityScores | null => {
        return getDataFromLocalStorage<AbilityScores>('abilities');
    }

    return {
        getCharInfoData,
        getAbilityData,
    }
}