import { Form, type FormProps } from "antd";
import { useEffect, useState } from "react";

// hooks
import useDataHandler from "../global/useDataHandler"

// DTO
import type { SavingThrows } from "../../models/dataInterface";
interface SavingsForm {
    strValue: number;
    strProficiency: boolean;
    dexValue: number;
    dexProficiency: boolean;
    conValue: number;
    conProficiency: boolean;
    intValue: number;
    intProficiency: boolean;
    wisValue: number;
    wisProficiency: boolean;
    chaValue: number;
    chaProficiency: boolean;
}


export default function useSavings() {

    const { getSavingsData, changeSavingsData } = useDataHandler();

    const [savingsData, setSavingsData] = useState<SavingThrows | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);

    const [editSavingsForm] = Form.useForm();

    useEffect(() => {
        setSavingsData(getSavingsData());
    }, []);

    useEffect(() => {
        if (!savingsData) return;
        changeSavingsData(savingsData);
    }, [savingsData]);

    const isEdit = (edit: boolean): void => {
        setEditMode(edit);
    }

    const submitEditSavings: FormProps<SavingsForm>['onFinish'] = async (values) => {

        if (!savingsData) return;

        setSavingsData({
            strength: {
                modifier: values.strValue || 0,
                proficient: values.strProficiency
            },
            dexterity: {
                modifier: values.dexValue || 0,
                proficient: values.dexProficiency
            },
            constitution: {
                modifier: values.conValue || 0,
                proficient: values.conProficiency
            },
            intelligence: {
                modifier: values.intValue || 0,
                proficient: values.intProficiency
            },
            wisdom: {
                modifier: values.wisValue || 0,
                proficient: values.wisProficiency
            },
            charisma: {
                modifier: values.chaValue || 0,
                proficient: values.chaProficiency
            },
        });

        isEdit(false);
    }

    const resetForm = () => {
        editSavingsForm.resetFields();
        isEdit(false);
    }

    return {
        savingsData,
        editMode,
        editSavingsForm,
        isEdit,
        submitEditSavings,
        resetForm,
    }
}