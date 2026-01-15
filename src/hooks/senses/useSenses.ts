import { useEffect, useState } from "react";

// hooks
import useDataHandler from "../global/useDataHandler";
import { Form, type FormProps } from "antd";

// utils
import { SensesEnum } from "../../utils/enums";

// DTO
import type { ExtraSenses, PassiveScores } from "../../models/dataInterface";
export type SensesForm = {
    name : string;
    distance : string;
}
interface SelectOption {
    value: string;
    label: string;
}



export default function useSenses() {

    const { getPassiveScoresData, getExtraSenses, changeExtraSenses, changePassiveScores } = useDataHandler();

    const [passiveScores, setPassiveScores] = useState<PassiveScores | null>(() => {
        return getPassiveScoresData();
    });

    const [extraSenses, setExtraSenses] = useState<ExtraSenses[]>(() => {
        return getExtraSenses() || []; 
    });

    const [inputVisible, setInputVisible] = useState<boolean>(false);

    const [addSenseForm] = Form.useForm();

    const sensesNameSelection = [
        {
            value: SensesEnum.BLINDSIGHT,
            label: SensesEnum.BLINDSIGHT,
        },
        {
            value: SensesEnum.DARKVISION,
            label: SensesEnum.DARKVISION,
        },
        {
            value: SensesEnum.TREMORSENSE,
            label: SensesEnum.TREMORSENSE,
        },
        {
            value: SensesEnum.TRUESIGHT,
            label: SensesEnum.TRUESIGHT,
        },
    ]

    const [sensesNameSelectionFiltered, setSensesNameSelectionFiltered] = useState<SelectOption[]>(sensesNameSelection);

    useEffect(() => {
        handleExtraSensesOptions();
        
        changeExtraSenses(extraSenses);
    }, [extraSenses]);

    useEffect(() => {
        if (!passiveScores) return;

        changePassiveScores(passiveScores);
    }, [passiveScores]);

    const showInput = (isShown : boolean) : void => {
        setInputVisible(isShown);
    }

    const handleRemove = (name : string) => {
        const updated = extraSenses.filter(item => item.name !== name);
        setExtraSenses(updated);
    }

    const submitNewSenses : FormProps<SensesForm>['onFinish'] = async (values) => {
        if (!values.distance || !values.name) return;

        const updated : ExtraSenses[] = [...extraSenses, {
            name : values.name,
            distance : Number(values.distance),
        }];

        setExtraSenses(updated);
        resetInput();
    }

    const resetInput = () : void => {
        setInputVisible(false);
        addSenseForm.resetFields();
    }

    const handleExtraSensesOptions = () : void => {
        const excludedNames = extraSenses.map(item => item.name);
        const filtered = sensesNameSelection.filter(item => !excludedNames.includes(item.value));

        setSensesNameSelectionFiltered(filtered);
    }

    const changePassive = (newValue : string, passiveType : string) : void => {
        if (!newValue || !passiveScores) return;

        const newValueNumber = Number(newValue);

        setPassiveScores({
            ...passiveScores,
            [passiveType] : newValueNumber
        });
    }

    return {
        passiveScores,
        extraSenses,
        inputVisible,
        addSenseForm,
        sensesNameSelection : sensesNameSelectionFiltered,
        handleRemove,
        showInput,
        submitNewSenses,
        resetInput,
        changePassive,
    }
}