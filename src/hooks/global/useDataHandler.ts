
// utils
import { StorageKey } from "../../utils/enums";

// DTO
import type { AbilityScores, CharacterInfo, Combat, InfoStat, SavingThrows, Skills, ProficienciesAndTraining, PassiveScores, FeaturesAndTraits, ExtraSenses, Defenses, CharacterDetails, Equipment, SpellcastingSource, ActionEconomy, Resources } from "../../models/dataInterface";

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

    const getOtherResourcesData = (): Resources[] => {
        return getDataFromLocalStorage<Resources[]>(StorageKey.OTHERRESOURCES) ?? [];
    }

    const getActionEconomyData = (): ActionEconomy | null => {
        return getDataFromLocalStorage<ActionEconomy>(StorageKey.ACTIONECONOMY);
    }

    const changeCharInfoData = (newData: CharacterInfo): void => {
        localStorage.setItem(StorageKey.CHARINFO, JSON.stringify(newData));
    }

    const changeInfoStatData = (newData: InfoStat): void => {
        localStorage.setItem(StorageKey.INFOSTAT, JSON.stringify(newData));
    }

    const changeAbilitiesData = (newData: AbilityScores): void => {
        localStorage.setItem(StorageKey.ABILITIES, JSON.stringify(newData));
    }

    const changeSavingsData = (newData: SavingThrows): void => {
        localStorage.setItem(StorageKey.SAVINGS, JSON.stringify(newData));
    }

    const changeSkillsData = (newData: Skills): void => {
        localStorage.setItem(StorageKey.SKILLS, JSON.stringify(newData));
    }

    const changeCombatData = (newData: Combat): void => {
        localStorage.setItem(StorageKey.COMBAT, JSON.stringify(newData));
    }

    const changeProficienciesAndTraining = (newData: ProficienciesAndTraining): void => {
        localStorage.setItem(StorageKey.PROANDTRAIN, JSON.stringify(newData));
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

    const changeActionEconomyData = (newData: ActionEconomy): void => {
        localStorage.setItem(StorageKey.ACTIONECONOMY, JSON.stringify(newData));
    }

    const changeEquipmentData = (newData: Equipment): void => {
        localStorage.setItem(StorageKey.EQUIPMENT, JSON.stringify(newData));
    }

    const changeSpellsData = (newData: SpellcastingSource[]): void => {
        localStorage.setItem(StorageKey.SPELLCASTING, JSON.stringify(newData));
    }

    const changeFeaturesAndTraits = (newData: FeaturesAndTraits[]): void => {
        localStorage.setItem(StorageKey.FEATANDTRAITS, JSON.stringify(newData));
    }

    const changeCharacterDetailsData = (newData: CharacterDetails): void => {
        localStorage.setItem(StorageKey.CHARDETAILS, JSON.stringify(newData));
    }

    const changeOtherResourcesData = (newData: Resources[]): void => {
        localStorage.setItem(StorageKey.OTHERRESOURCES, JSON.stringify(newData));
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
        getActionEconomyData,
        getOtherResourcesData,
        changeCharInfoData,
        changeCharacterDetailsData,
        changeInfoStatData,
        changeAbilitiesData,
        changeSavingsData,
        changeSkillsData,
        changePassiveScores,
        changeExtraSenses,
        changeDefenses,
        changeEquipmentData,
        changeActionEconomyData,
        changeProficienciesAndTraining,
        changeCombatData,
        changeSpellsData,
        changeFeaturesAndTraits,
        changeOtherResourcesData,
    }
}