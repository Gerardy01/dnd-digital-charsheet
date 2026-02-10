import { useEffect } from "react";

// hooks
import useDataHandler from "./useDataHandler";


export default function usePopulate() {

    const {
        getCharInfoData,
        changeCharInfoData,
        changeCharacterDetailsData,
        changeInfoStatData,
        changeCombatData,
        changePassiveScores,
        changeAbilitiesData,
        changeSavingsData,
        changeSkillsData,
        changeProficienciesAndTraining,
        changeExtraSenses,
        changeDefenses,
        changeEquipmentData,
        changeSpellsData,
        changeFeaturesAndTraits,
        changeActionEconomyData,
        changeOtherResourcesData,
        changeActionCache,
    } = useDataHandler();

    useEffect(() => {
        populateData();
    }, []);

    const populateData = () => {
        const charInfoData = getCharInfoData();
        if (charInfoData) return;

        changeCharInfoData({
            characterName: "--- Name ---",
            classesAndLevel: "-",
            species: "--- Race ---",
            background: "-",
            alignment: "-",
            experiencePoints: "-",
        });

        changeCharacterDetailsData({
            appearance: {
                gender: "",
                age: "",
                height: "",
                weight: "",
                size: "",
                hair: "",
                eyes: "",
                skin: "",
                faith: "",
            },
            personality: {
                traits: "",
                ideals: "",
                bonds: "",
                flaws: "",
            },
            alliesAndOrganizations: "",
            backstory: "",
            additionalNotes: "",
        });

        changeInfoStatData({
            proficiencyBonus: 0,
            heroicInspiration: false,
        });

        changeCombatData({
            hitPoints: {
                max: 1,
                current: 1,
                temporary: 0,
            },
            speed: 0,
            armorClass: 0,
            initiative: 0,
            hitDice: [],
        });

        changePassiveScores({
            perception: 0,
            insight: 0,
            investigation: 0,
        });

        changeAbilitiesData({
            strength: {
                score: 0,
                modifier: 0,
            },
            dexterity: {
                score: 0,
                modifier: 0,
            },
            constitution: {
                score: 0,
                modifier: 0,
            },
            intelligence: {
                score: 0,
                modifier: 0,
            },
            wisdom: {
                score: 0,
                modifier: 0,
            },
            charisma: {
                score: 0,
                modifier: 0,
            },
        });

        changeSavingsData({
            strength: {
                proficient: false,
                modifier: 0,
            },
            dexterity: {
                proficient: false,
                modifier: 0,
            },
            constitution: {
                proficient: false,
                modifier: 0,
            },
            intelligence: {
                proficient: false,
                modifier: 0,
            },
            wisdom: {
                proficient: false,
                modifier: 0,
            },
            charisma: {
                proficient: false,
                modifier: 0,
            },
        });

        changeSkillsData({
            acrobatics: {
                proficient: false,
                modifier: 0,
            },
            animalHandling: {
                proficient: false,
                modifier: 0,
            },
            arcana: {
                proficient: false,
                modifier: 0,
            },
            athletics: {
                proficient: false,
                modifier: 0,
            },
            deception: {
                proficient: false,
                modifier: 0,
            },
            history: {
                proficient: false,
                modifier: 0,
            },
            insight: {
                proficient: false,
                modifier: 0,
            },
            intimidation: {
                proficient: false,
                modifier: 0,
            },
            investigation: {
                proficient: false,
                modifier: 0,
            },
            medicine: {
                proficient: false,
                modifier: 0,
            },
            nature: {
                proficient: false,
                modifier: 0,
            },
            perception: {
                proficient: false,
                modifier: 0,
            },
            performance: {
                proficient: false,
                modifier: 0,
            },
            persuasion: {
                proficient: false,
                modifier: 0,
            },
            religion: {
                proficient: false,
                modifier: 0,
            },
            sleightOfHand: {
                proficient: false,
                modifier: 0,
            },
            stealth: {
                proficient: false,
                modifier: 0,
            },
            survival: {
                proficient: false,
                modifier: 0,
            },
        });

        changeProficienciesAndTraining({
            armor: [],
            weapons: [],
            tools: [],
            languages: [],
            other: [],
        });

        changeExtraSenses([]);
        changeDefenses([]);

        changeEquipmentData({
            currency: {
                cp: 0,
                sp: 0,
                ep: 0,
                gp: 0,
                pp: 0,
            },
            items: [],
            attunedMagicItems: [],
            weightCapacity: 0,
            encumbered: false,
            pushDragLift: 0,
        });

        changeSpellsData([]);
        changeFeaturesAndTraits([]);
        changeOtherResourcesData([]);

        const actionsData = {
            actions: [],
            bonusActions: [],
            reactions: [],
        }

        changeActionEconomyData(actionsData);
        changeActionCache([]);
    }
}