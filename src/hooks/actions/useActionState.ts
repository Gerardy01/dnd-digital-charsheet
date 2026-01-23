import { create } from "zustand";

// DTO
import type { ActionEconomy } from "../../models/dataInterface";
interface ActionState extends ActionEconomy {
    addActions: (actionType: string, name: string, category: string, level: number | null) => void;
    removeActions: (actionType: string, targetName: string) => void;
    changeName: (actionType: string, targetName: string, newName: string) => void;
    populate: (data: ActionEconomy) => void;
}


export const useActionState = create<ActionState>((set) => ({
    actions: [],
    bonusActions: [],
    reactions: [],

    addActions: (actionType: string, name: string, category: string, level: number | null) => {

    },
    removeActions: (actionType: string, targetName: string) => {

    },
    changeName: (actionType: string, targetName: string, newName: string) => {

    },
    populate: (data: ActionEconomy) => {
        set({
            actions: data.actions,
            bonusActions: data.bonusActions,
            reactions: data.reactions,
        });
    }
}));
