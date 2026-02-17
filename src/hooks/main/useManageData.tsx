import { message, Modal, Input, notification } from "antd";

// hooks
import useDataHandler from "../global/useDataHandler";

// utils
import { characterSheetSchema, type CharacterSheet } from "../../utils/dataSchema";

const { confirm } = Modal;

export default function useManageData(
    populateData: () => void,
) {

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

    const resetData = () => {

        confirm({
            title: "Reset Data",
            content: "Are you sure you want to reset data?",
            centered: true,
            onOk() {
                populateData();
                window.location.reload();
            },
        });
    }

    const handleCopy = async () => {
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

        try {
            const jsonString = JSON.stringify(data, null, 2);
            await navigator.clipboard.writeText(jsonString);
            message.success('Character sheet data copied to clipboard!');
        } catch {
            message.error('Failed to copy data. Please try again.');
        }

    }

    const handleLoadData = () => {

        let value = "";

        Modal.confirm({
            title: "Load Data",
            content: (
                <div style={{ marginTop: 16 }}>
                    <p>Paste your exported JSON data below:</p>
                    <Input.TextArea
                        rows={5}
                        placeholder="Paste JSON here..."
                        onChange={(e) => { value = e.target.value }}
                    />
                </div>
            ),
            okText: 'Load',
            cancelText: 'Cancel',
            centered: true,
            onOk() {
                if (!value.trim()) {
                    message.warning("Please put some data first.");
                    return Promise.reject();
                }

                try {
                    const rawData = JSON.parse(value);

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
                        title: 'Character Sheet Data Loaded',
                        description: 'The character sheet data has been loaded successfully.',
                        placement: 'top',
                        style: { backgroundColor: '#dcfce7', color: '#166534' }
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                } catch {
                    message.error('Failed to Load data. Please try again.');
                    return Promise.reject();
                }
            },
        });
    }

    return {
        resetData,
        handleCopy,
        handleLoadData,
    }
}