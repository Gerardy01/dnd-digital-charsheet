import type { RcFile } from "antd/es/upload";
import { notification } from "antd";

// hooks
import useDataHandler from "./useDataHandler";

// utils
import { characterSheetSchema, type CharacterSheet } from "../../utils/dataSchema";


export default function useExportImport() {

    const {
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
        getOtherResourcesData,
        getActionEconomyData,
        getActionCache,
        changeCharInfoData,
        changeInfoStatData,
        changeAbilitiesData,
        changeCharacterDetailsData,
        changeSavingsData,
        changeSkillsData,
        changeCombatData,
        changeProficienciesAndTraining,
        changePassiveScores,
        changeExtraSenses,
        changeDefenses,
        changeEquipmentData,
        changeSpellsData,
        changeFeaturesAndTraits,
        changeOtherResourcesData,
        changeActionEconomyData,
        changeActionCache
    } = useDataHandler();

    const exportJsonData = () => {
        const charInfo = getCharInfoData();
        const infoStat = getInfoStatData();
        const characterDetails = getCharacterDetailsData();
        const ability = getAbilityData();
        const savings = getSavingsData();
        const skills = getSkillsData();
        const combat = getCombatData();
        const proficienciesAndTraining = getProficienciesAndTrainingData();
        const passiveScores = getPassiveScoresData();
        const featuresAndTraits = getFeaturesAndTraits();
        const extraSenses = getExtraSenses();
        const defenses = getDefenses();
        const equipment = getEquipmentData();
        const spells = getSpellsData();
        const otherResources = getOtherResourcesData();
        const actionEconomy = getActionEconomyData();
        const actionCache = getActionCache();

        const data = {
            charInfo,
            infoStat,
            characterDetails,
            ability,
            savings,
            skills,
            combat,
            proficienciesAndTraining,
            passiveScores,
            featuresAndTraits,
            extraSenses,
            defenses,
            equipment,
            spells,
            otherResources,
            actionEconomy,
            actionCache
        };

        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${charInfo?.characterName || 'character'}-sheet-data.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    const importJsonData = (file: RcFile) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const result = e.target?.result;
                if (typeof result !== 'string') return;

                const rawData = JSON.parse(result);

                const validation = characterSheetSchema.safeParse(rawData);
                if (!validation.success) {
                    throw new Error('Invalid Character Sheet Data');
                }

                const data: CharacterSheet = validation.data;

                changeCharInfoData(data.charInfo);
                changeInfoStatData(data.infoStat);
                changeCharacterDetailsData(data.characterDetails);
                changeAbilitiesData(data.ability);
                changeSavingsData(data.savings);
                changeSkillsData(data.skills);
                changeCombatData(data.combat);
                changeProficienciesAndTraining(data.proficienciesAndTraining);
                changePassiveScores(data.passiveScores);
                changeExtraSenses(data.extraSenses);
                changeDefenses(data.defenses);
                changeEquipmentData(data.equipment);
                changeSpellsData(data.spells);
                changeFeaturesAndTraits(data.featuresAndTraits);
                changeOtherResourcesData(data.otherResources);
                changeActionEconomyData(data.actionEconomy);
                changeActionCache(data.actionCache);

                notification.success({
                    title: 'Character Sheet Data Imported',
                    description: 'The character sheet data has been imported successfully.',
                    placement: 'top',
                    style: { backgroundColor: '#dcfce7', color: '#166534' }
                });

                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            } catch (error) {
                notification.warning({
                    title: 'Invalid Character Sheet Data',
                    description: 'The uploaded file is not a valid character sheet data.',
                    placement: 'top',
                    style: { backgroundColor: '#fef08a', color: '#92400e' }
                });
            }
        }
        reader.readAsText(file);
    }

    return {
        exportJsonData,
        importJsonData
    }
}