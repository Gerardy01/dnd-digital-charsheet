import { useState } from "react";

// hooks
import { useActionState } from "./useActionState";

// DTO
import type { ActionEconomy } from "../../models/dataInterface";



export default function useActions() {

    const actions = useActionState();

    return {
        actions,
    }
}