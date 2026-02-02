import { useEffect, useState } from "react";
import { Form, type FormProps } from "antd";

// hooks
import useDataHandler from "../global/useDataHandler"
import { useActionState } from "../actions/useActionState";

// utils
import { actionTypeList, SourceTypeList } from "../../utils/selectionData";
import { ActionCategoryEnum } from "../../utils/enums";

// DTO
import type { FeaturesAndTraits } from "../../models/dataInterface";
interface FeaturesAndTraitsForm {
    name: string;
    description: string;
    source: string;
    sourceType: string;
    actionType: string;
}

export function useFeatures() {

    const { getFeaturesAndTraits, changeFeaturesAndTraits } = useDataHandler();
    const { addActions, removeActions, changeName, changeActionType } = useActionState();

    const [featuresAndTraits, setFeaturesAndTraits] = useState<FeaturesAndTraits[]>(() => {
        return getFeaturesAndTraits();
    });

    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [editedIndex, setEditedIndex] = useState<number>(-1);

    useEffect(() => {
        if (!featuresAndTraits) return;
        changeFeaturesAndTraits(featuresAndTraits);
    }, [featuresAndTraits]);

    const adding = (value: boolean) => {
        setIsAdding(value);
    }

    const onClickEdit = (index: number) => {
        setEditedIndex(index);
    }

    const onAddFeatures = (newData: FeaturesAndTraits) => {
        if (!featuresAndTraits) return;

        const newFeatures = [...featuresAndTraits, newData];

        setFeaturesAndTraits(newFeatures);
        adding(false);

        handleActionModify(newData, "add");
    }

    const onEditFeatures = (newData: FeaturesAndTraits) => {
        if (!featuresAndTraits) return;

        const newFeatures = featuresAndTraits.map((item, i) => {
            if (i === editedIndex) {
                return newData;
            }
            return item;
        });

        setFeaturesAndTraits(newFeatures);
        onClickEdit(-1);

        handleActionModify(newData, "edit");
    }

    const removeFeatures = (index: number) => {
        if (!featuresAndTraits) return;

        const filteredFeatures = featuresAndTraits.filter((_, i) => i !== index);

        setFeaturesAndTraits(filteredFeatures);
        onClickEdit(-1);

        handleActionModify(featuresAndTraits[index], "remove");
    }

    const handleActionModify = (data: FeaturesAndTraits, upon: "add" | "edit" | "remove") => {

        const category = ActionCategoryEnum.FEATURE

        if (upon === "add" && data.actionType !== "") {
            addActions({
                name: data.name,
                actionType: data.actionType,
                category: category,
                description: data.description,
                level: null,
            });
        }

        if (upon === "edit") {
            const currentData = featuresAndTraits[editedIndex];

            if (data.name !== currentData.name && data.actionType !== "") {
                changeName(currentData.actionType, currentData.name, data.name);
            }

            if (currentData.actionType === "" && data.actionType !== "") {
                addActions({
                    name: data.name,
                    actionType: data.actionType,
                    category: category,
                    description: data.description,
                    level: null,
                });
            } else if ((data.actionType !== currentData.actionType) && data.actionType !== "") {
                changeActionType(currentData.actionType, data.name, data.actionType);
            }

            if ((data.actionType !== currentData.actionType) && data.actionType === "") {
                removeActions(currentData.actionType, data.name);
            }
        }

        if (upon === "remove" && data.actionType !== "") {
            removeActions(data.actionType, data.name);
        }
    }

    return {
        featuresAndTraits,
        isAdding,
        editedIndex,
        adding,
        onClickEdit,
        onAddFeatures,
        onEditFeatures,
        removeFeatures,
    }
}



export function useAddFeatures(
    onSubmit: (newData: FeaturesAndTraits) => void,
) {

    const [addFeaturesForm] = Form.useForm();

    const sourceTypeSelection = SourceTypeList.map(item => {
        return {
            value: item,
            label: item,
        }
    });
    const actionTypeSelection = actionTypeList;

    const submitNewFeatures: FormProps<FeaturesAndTraitsForm>['onFinish'] = (values) => {

        const newFeatures: FeaturesAndTraits = {
            name: values.name,
            description: values.description,
            source: values.source,
            sourceType: values.sourceType,
            actionType: values.actionType,
        }

        onSubmit(newFeatures);
        reset();
    }

    const reset = () => {
        addFeaturesForm.resetFields();
    }

    return {
        addFeaturesForm,
        sourceTypeSelection,
        actionTypeSelection,
        submitNewFeatures,
        reset,
    }
}



export function useEditFeatures(
    onSubmit: (newData: FeaturesAndTraits) => void,
) {

    const [editFeaturesForm] = Form.useForm();

    const sourceTypeSelection = SourceTypeList.map(item => {
        return {
            value: item,
            label: item,
        }
    });
    const actionTypeSelection = actionTypeList;

    const submitEditData: FormProps<FeaturesAndTraitsForm>['onFinish'] = (values) => {

        const newData: FeaturesAndTraits = {
            name: values.name,
            description: values.description,
            source: values.source,
            sourceType: values.sourceType,
            actionType: values.actionType,
        }

        onSubmit(newData);
        reset();
    }

    const reset = () => {
        editFeaturesForm.resetFields();
    }

    return {
        editFeaturesForm,
        sourceTypeSelection,
        actionTypeSelection,
        submitEditData,
        reset,
    }
}