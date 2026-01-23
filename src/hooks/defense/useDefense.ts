import { useEffect, useState } from "react";
import { Form, type FormProps } from "antd";

// hooks
import useDataHandler from "../global/useDataHandler"

// utils
import { defenseTypeList } from "../../utils/selectionData";

// DTO
import type { Defenses } from "../../models/dataInterface";
interface DefensesForm {
    name: string;
    type: string;
}


export default function useDefense() {

    const { getDefenses, changeDefenses } = useDataHandler();

    const [defenses, setDefenses] = useState<Defenses[]>(() => {
        return getDefenses();
    });

    const [inputVisible, setInputVisible] = useState<boolean>(false);

    const [addDefensesForm] = Form.useForm();

    const defensesTypeSelection = defenseTypeList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    useEffect(() => {
        changeDefenses(defenses);
    }, [defenses]);

    const submitNewDefenses: FormProps<DefensesForm>['onFinish'] = async (values) => {
        if (!values.name || !values.type) return;

        const updated: Defenses[] = [...defenses, {
            name: values.name,
            type: values.type,
        }];
        setDefenses(updated);
        resetInput();
    }

    const handleRemove = (name: string): void => {
        const filtered = defenses.filter(item => item.name !== name);
        setDefenses(filtered);
    }

    const showInput = (show: boolean): void => {
        setInputVisible(show);
    }

    const resetInput = (): void => {
        addDefensesForm.resetFields();
        showInput(false);
    }

    return {
        defenses,
        inputVisible,
        addDefensesForm,
        defensesTypeSelection,
        handleRemove,
        resetInput,
        showInput,
        submitNewDefenses,
    }
}