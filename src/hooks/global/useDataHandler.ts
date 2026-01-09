
// DTO
import type { AbilityScores, CharacterInfo, Combat, InfoStat, SavingThrows, Skills } from "../../models/dataInterface";

export default function useDataHandler() {

    const getDataFromLocalStorage = <T>(key: string): T | null => {
        const storedData = localStorage.getItem(key);
        return storedData ? (JSON.parse(storedData) as T) : null;
    }

    const getCharInfoData = () : CharacterInfo | null => {
        return getDataFromLocalStorage<CharacterInfo>('charInfo');
    }

    const getInfoStatData = () : InfoStat | null => {
        return getDataFromLocalStorage<InfoStat>('infoStat');
    }

    const getAbilityData = () : AbilityScores | null => {
        return getDataFromLocalStorage<AbilityScores>('abilities');
    }

    const getSavingsData = () : SavingThrows | null => {
        return getDataFromLocalStorage<SavingThrows>('savings'); 
    }

    const getSkillsData = () : Skills | null => {
        return getDataFromLocalStorage<Skills>('skills'); 
    }

    const getCombatData = () : Combat | null => {
        return getDataFromLocalStorage<Combat>('combat'); 
    }

    return {
        getCharInfoData,
        getInfoStatData,
        getAbilityData,
        getSavingsData,
        getSkillsData,
        getCombatData,
    }
}