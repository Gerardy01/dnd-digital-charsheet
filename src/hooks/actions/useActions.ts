import { useEffect, useState } from "react";

// hooks
import { useActionState } from "./useActionState";
import useDataHandler from "../global/useDataHandler";

// utils
import type { ActionTypeEnum } from "../../utils/enums";

// DTO
import type { ActionEconomy } from "../../models/dataInterface";
interface EditAction {
    index: number;
    actionType: string;
}


export default function useActions() {

    const { getActionEconomyData, changeActionEconomyData } = useDataHandler();

    const actions = useActionState();
    const { populate, isPopulated } = actions;

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

    return {
        actions,
        edited,
        editAction,
    }
}