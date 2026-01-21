import { useState } from "react";


// DTO
import type { ActionEconomy } from "../../models/dataInterface";



export default function useActions() {

    const [actions, setActions] = useState<ActionEconomy | null>(null);

    return {

    }
}