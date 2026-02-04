import { useEffect, useState } from "react";

// hooks
import { useActionState } from "./useActionState";
import useDataHandler from "../global/useDataHandler";

// DTO
import type { ActionEconomy } from "../../models/dataInterface";



export default function useActions() {

    const { changeActionEconomyData } = useDataHandler();

    const actions = useActionState();

    useEffect(() => {
        changeActionEconomyData(actions);
    }, [actions]);

    return {
        actions,
    }
}