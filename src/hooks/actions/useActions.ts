import { useEffect, useState } from "react";
import { Form, type FormProps, notification } from "antd";

// hooks
import { useActionState } from "./useActionState";
import useDataHandler from "../global/useDataHandler";

// utils
import { usabilityList, damageTypeList, resetList } from "../../utils/selectionData";

// DTO
import type { ActionEconomy, ActionItem, Resources } from "../../models/dataInterface";
interface EditAction {
    index: number;
    actionType: string;
}
interface ActionForm {
    type: string;
    bonus: number;
    dice: string;
    damageType: string;
    description: string;
    resourceStr: string;
    resourceName: string;
    resourceCount: number;
    resourceReset: string;
}


export default function useActions() {

    const { getActionEconomyData, changeActionEconomyData } = useDataHandler();

    const actions = useActionState();
    const { editAction: editActionState, populate, isPopulated } = actions;

    const [actionsFromStorage] = useState<ActionEconomy | null>(() => {
        return getActionEconomyData();
    });

    const [edited, setEdited] = useState<EditAction>({
        index: -1,
        actionType: ""
    });

    useEffect(() => {
        if (!actionsFromStorage) return;
        populate(actionsFromStorage);
    }, [actionsFromStorage]);

    useEffect(() => {
        if (!isPopulated) return;
        changeActionEconomyData(actions);
    }, [actions]);

    const editAction = (index: number, actionType: string) => {
        setEdited({ index, actionType });
    }

    const onEditAction = (newData: ActionItem) => {

        const targetName = actions[edited.actionType as keyof ActionEconomy][edited.index].name;
        editActionState(edited.actionType, targetName, newData);

        setEdited({ index: -1, actionType: "" });
    }

    return {
        actions,
        edited,
        editAction,
        onEditAction,
    }
}


export function useEditAction(
    onSubmit: (newData: ActionItem) => void,
    currentData: ActionItem,
) {

    const [editActionForm] = Form.useForm();

    const [resourceIsTracker, setResourceIsTracker] = useState<boolean>(typeof currentData.resource !== "string");

    const usabilitySelection = usabilityList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const damageTypeSelection = [{ value: "", label: "None" }, ...damageTypeList.map(item => {
        return {
            value: item,
            label: item,
        }
    })]

    const resetSelection = resetList.map(item => {
        return {
            value: item,
            label: item,
        }
    })

    const submitEditData: FormProps<ActionForm>['onFinish'] = (value) => {
        try {

            const resourceTracker: Resources = {
                name: value.resourceName,
                max: value.resourceCount,
                current: value.resourceCount,
                reset: value.resourceReset,
            }

            const resourceString: string = value.resourceStr;

            const newData: ActionItem = {
                name: "",
                level: null,
                category: "",
                activation: {
                    type: value.type,
                    bonus: value.bonus,
                    dice: value.dice,
                    damageType: value.damageType,
                },
                description: value.description,
                resource: resourceIsTracker ? resourceTracker : resourceString,
            }

            onSubmit(newData);
            reset();

        } catch {
            notification.warning({
                message: 'Action Cannot Be Deleted',
                description: 'Something went wrong',
                placement: 'top',
                style: { backgroundColor: '#fef08a', color: '#92400e' }
            });
        }
    }

    const reset = () => {
        editActionForm.resetFields();
    }

    const handleResourceIsTracker = (value: boolean) => {
        setResourceIsTracker(value);
    }

    return {
        editActionForm,
        usabilitySelection,
        damageTypeSelection,
        resourceIsTracker,
        resetSelection,
        submitEditData,
        reset,
        handleResourceIsTracker,
    }
}