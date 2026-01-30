import { useEffect, useState } from "react";
import { Form, type FormProps } from "antd";

// utils
import { resetList } from "../../utils/selectionData";

// hooks
import useDataHandler from "../global/useDataHandler"

// DTO
import type { OtherResources } from "../../models/dataInterface";
interface OtherResourcesForm {
    name: string;
    count: number;
    reset: string;
    notes: string;
}



export function useOtherResources() {

    const { getOtherResourcesData, changeOtherResourcesData } = useDataHandler();

    const [otherResources, setOtherResources] = useState<OtherResources[]>(() => {
        return getOtherResourcesData();
    });

    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [editedIndex, setEditedIndex] = useState<number>(-1);

    useEffect(() => {
        changeOtherResourcesData(otherResources);
    }, [otherResources]);

    const adding = (value: boolean) => {
        setIsAdding(value);
    }

    const onClickEdit = (index: number) => {
        setEditedIndex(index);
    }

    const changePoint = (newCurrent: number, targetIndex: number) => {
        if (!otherResources) return;

        const newOtherResources = otherResources.map((item, i) => {
            if (i === targetIndex) {
                return { ...item, current: newCurrent };
            }
            return item;
        });

        setOtherResources(newOtherResources);
    }

    const onAddOtherResources = (newData: OtherResources) => {
        if (!otherResources) return;

        const newOtherResources = [...otherResources, newData];

        setOtherResources(newOtherResources);
        adding(false);
    }

    const onEditOtherResources = (newData: OtherResources) => {
        if (!otherResources) return;

        const newOtherResources = otherResources.map((item, i) => {
            if (i === editedIndex) {
                return newData;
            }
            return item;
        });

        setOtherResources(newOtherResources);
        onClickEdit(-1);
    }

    const removeOtherResources = (index: number) => {
        if (!otherResources) return;

        const newOtherResources = otherResources.filter((_, i) => i !== index);

        setOtherResources(newOtherResources);
        onClickEdit(-1);
    }

    return {
        otherResources,
        isAdding,
        editedIndex,
        adding,
        onClickEdit,
        changePoint,
        onAddOtherResources,
        onEditOtherResources,
        removeOtherResources,
    }
}

export function useAddOtherResources(
    onSubmit: (newData: OtherResources) => void,
) {

    const [addOtherResourcesForm] = Form.useForm();

    const resetSelection = resetList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const submitNewOtherResources: FormProps<OtherResourcesForm>['onFinish'] = (values) => {

        const newOtherResources: OtherResources = {
            name: values.name,
            current: values.count,
            max: values.count,
            reset: values.reset,
            notes: values.notes,
        }

        onSubmit(newOtherResources);
        reset();
    }

    const reset = () => {
        addOtherResourcesForm.resetFields();
    }

    return {
        addOtherResourcesForm,
        resetSelection,
        submitNewOtherResources,
        reset,
    }
}

export function useEditOtherResources(
    onSubmit: (newData: OtherResources) => void,
) {

    const [editOtherResourcesForm] = Form.useForm();

    const resetSelection = resetList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const submitEditData: FormProps<OtherResourcesForm>['onFinish'] = (values) => {

        const newData: OtherResources = {
            name: values.name,
            current: values.count,
            max: values.count,
            reset: values.reset,
            notes: values.notes,
        }

        onSubmit(newData);
        reset();
    }

    const reset = () => {
        editOtherResourcesForm.resetFields();
    }

    return {
        editOtherResourcesForm,
        resetSelection,
        submitEditData,
        reset,
    }
}