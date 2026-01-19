
// utils
import { StorageKey } from "../../utils/enums";

// DTO
import type { AbilityScores, CharacterInfo, Combat, InfoStat, SavingThrows, Skills, ProficienciesAndTraining, PassiveScores, FeaturesAndTraits, ExtraSenses, Defenses, CharacterDetails, Equipment, SpellcastingSource } from "../../models/dataInterface";

export default function useDataHandler() {

    const getDataFromLocalStorage = <T>(key: string): T | null => {
        const storedData = localStorage.getItem(key);
        return storedData ? (JSON.parse(storedData) as T) : null;
    }

    const getCharInfoData = (): CharacterInfo | null => {
        return getDataFromLocalStorage<CharacterInfo>(StorageKey.CHARINFO);
    }

    const getInfoStatData = (): InfoStat | null => {
        return getDataFromLocalStorage<InfoStat>(StorageKey.INFOSTAT);
    }

    const getCharacterDetailsData = (): CharacterDetails | null => {
        return getDataFromLocalStorage<CharacterDetails>(StorageKey.CHARDETAILS);
    }

    const getAbilityData = (): AbilityScores | null => {
        return getDataFromLocalStorage<AbilityScores>(StorageKey.ABILITIES);
    }

    const getSavingsData = (): SavingThrows | null => {
        return getDataFromLocalStorage<SavingThrows>(StorageKey.SAVINGS);
    }

    const getSkillsData = (): Skills | null => {
        return getDataFromLocalStorage<Skills>(StorageKey.SKILLS);
    }

    const getCombatData = (): Combat | null => {
        return getDataFromLocalStorage<Combat>(StorageKey.COMBAT);
    }

    const getProficienciesAndTrainingData = (): ProficienciesAndTraining | null => {
        return getDataFromLocalStorage<ProficienciesAndTraining>(StorageKey.PROANDTRAIN);
    }

    const getPassiveScoresData = (): PassiveScores | null => {
        return getDataFromLocalStorage<PassiveScores>(StorageKey.PASSIVE);
    }

    const getFeaturesAndTraits = (): FeaturesAndTraits[] => {
        return getDataFromLocalStorage<FeaturesAndTraits[]>(StorageKey.FEATANDTRAITS) ?? [];
    }

    const getExtraSenses = (): ExtraSenses[] => {
        return getDataFromLocalStorage<ExtraSenses[]>(StorageKey.EXTRASENSES) ?? [];
    }

    const getDefenses = (): Defenses[] => {
        return getDataFromLocalStorage<Defenses[]>(StorageKey.DEFENSES) ?? [];
    }

    const getEquipmentData = (): Equipment | null => {
        return getDataFromLocalStorage<Equipment>(StorageKey.EQUIPMENT);
    }

    const getSpellsData = (): SpellcastingSource[] => {
        return getDataFromLocalStorage<SpellcastingSource[]>(StorageKey.SPELLCASTING) ?? [];
    }

    const changeCharInfoData = (newData: CharacterInfo): void => {
        localStorage.setItem(StorageKey.CHARINFO, JSON.stringify(newData));
    }

    const changeCharacterDetailsData = (newData: CharacterDetails): void => {
        localStorage.setItem(StorageKey.CHARDETAILS, JSON.stringify(newData));
    }

    const changePassiveScores = (newData: PassiveScores): void => {
        localStorage.setItem(StorageKey.PASSIVE, JSON.stringify(newData));
    }

    const changeExtraSenses = (newData: ExtraSenses[]): void => {
        localStorage.setItem(StorageKey.EXTRASENSES, JSON.stringify(newData));
    }

    const changeDefenses = (newData: Defenses[]): void => {
        localStorage.setItem(StorageKey.DEFENSES, JSON.stringify(newData));
    }

    const changeEquipmentData = (newData: Equipment): void => {
        localStorage.setItem(StorageKey.EQUIPMENT, JSON.stringify(newData));
    }

    return {
        getCharInfoData,
        getInfoStatData,
        getCharacterDetailsData,
        getAbilityData,
        getSavingsData,
        getSkillsData,
        getCombatData,
        getProficienciesAndTrainingData,
        getPassiveScoresData,
        getFeaturesAndTraits,
        getExtraSenses,
        getDefenses,
        getEquipmentData,
        getSpellsData,
        changeCharInfoData,
        changeCharacterDetailsData,
        changePassiveScores,
        changeExtraSenses,
        changeDefenses,
        changeEquipmentData,
    }
}