import { Form, type FormProps } from "antd";
import { useEffect, useState } from "react";

// hooks
import useDataHandler from "../global/useDataHandler"

// DTO
import type { Skills } from "../../models/dataInterface";
interface SkillsForm {
    acrobaticsValue: number;
    acrobaticsProficiency: boolean;
    animalHandlingValue: number;
    animalHandlingProficiency: boolean;
    arcanaValue: number;
    arcanaProficiency: boolean;
    athleticsValue: number;
    athleticsProficiency: boolean;
    deceptionValue: number;
    deceptionProficiency: boolean;
    historyValue: number;
    historyProficiency: boolean;
    insightValue: number;
    insightProficiency: boolean;
    intimidationValue: number;
    intimidationProficiency: boolean;
    investigationValue: number;
    investigationProficiency: boolean;
    medicineValue: number;
    medicineProficiency: boolean;
    natureValue: number;
    natureProficiency: boolean;
    perceptionValue: number;
    perceptionProficiency: boolean;
    performanceValue: number;
    performanceProficiency: boolean;
    persuasionValue: number;
    persuasionProficiency: boolean;
    religionValue: number;
    religionProficiency: boolean;
    sleightOfHandValue: number;
    sleightOfHandProficiency: boolean;
    stealthValue: number;
    stealthProficiency: boolean;
    survivalValue: number;
    survivalProficiency: boolean;
}



export default function useSkills() {

    const { getSkillsData, changeSkillsData } = useDataHandler();

    const [skillsData, setSkillsData] = useState<Skills | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);

    const [editSkillsForm] = Form.useForm();

    useEffect(() => {
        setSkillsData(getSkillsData());
    }, []);

    useEffect(() => {
        if (!skillsData) return;
        changeSkillsData(skillsData);
    }, [skillsData]);

    const isEdit = (edit: boolean): void => {
        setEditMode(edit);
    }

    const submitEditSkills: FormProps<SkillsForm>['onFinish'] = async (values) => {
        console.log(values);
        if (!skillsData) return;

        setSkillsData({
            acrobatics: {
                modifier: values.acrobaticsValue || 0,
                proficient: values.acrobaticsProficiency
            },
            animalHandling: {
                modifier: values.animalHandlingValue || 0,
                proficient: values.animalHandlingProficiency
            },
            arcana: {
                modifier: values.arcanaValue || 0,
                proficient: values.arcanaProficiency
            },
            athletics: {
                modifier: values.athleticsValue || 0,
                proficient: values.athleticsProficiency
            },
            deception: {
                modifier: values.deceptionValue || 0,
                proficient: values.deceptionProficiency
            },
            history: {
                modifier: values.historyValue || 0,
                proficient: values.historyProficiency
            },
            insight: {
                modifier: values.insightValue || 0,
                proficient: values.insightProficiency
            },
            intimidation: {
                modifier: values.intimidationValue || 0,
                proficient: values.intimidationProficiency
            },
            investigation: {
                modifier: values.investigationValue || 0,
                proficient: values.investigationProficiency
            },
            medicine: {
                modifier: values.medicineValue || 0,
                proficient: values.medicineProficiency
            },
            nature: {
                modifier: values.natureValue || 0,
                proficient: values.natureProficiency
            },
            perception: {
                modifier: values.perceptionValue || 0,
                proficient: values.perceptionProficiency
            },
            performance: {
                modifier: values.performanceValue || 0,
                proficient: values.performanceProficiency
            },
            persuasion: {
                modifier: values.persuasionValue || 0,
                proficient: values.persuasionProficiency
            },
            religion: {
                modifier: values.religionValue || 0,
                proficient: values.religionProficiency
            },
            sleightOfHand: {
                modifier: values.sleightOfHandValue || 0,
                proficient: values.sleightOfHandProficiency
            },
            stealth: {
                modifier: values.stealthValue || 0,
                proficient: values.stealthProficiency
            },
            survival: {
                modifier: values.survivalValue || 0,
                proficient: values.survivalProficiency
            },
        });

        isEdit(false);
    }

    const resetForm = () => {
        editSkillsForm.resetFields();
        isEdit(false);
    }

    return {
        skillsData,
        editMode,
        editSkillsForm,
        isEdit,
        submitEditSkills,
        resetForm,
    };
}