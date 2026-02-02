import { create } from "zustand";

// utils
import { ActionTypeEnum } from "../../utils/enums";

// DTO
import type { ActionEconomy, ActionItem, ActionPopulateParams } from "../../models/dataInterface";
interface ActionState extends ActionEconomy {
    addActions: (data: ActionPopulateParams) => void;
    removeActions: (actionType: string, targetName: string) => void;
    changeName: (actionType: string, targetName: string, newName: string) => void;
    changeActionType: (actionType: string, targetName: string, newActionType: string) => void;
    populate: (data: ActionEconomy) => void;
}


export const useActionState = create<ActionState>((set) => ({
    actions: [],
    bonusActions: [],
    reactions: [],

    addActions: (data: ActionPopulateParams) => {

        const newAction: ActionItem = {
            name: data.name,
            level: data.level,
            category: data.category,
            activation: {
                type: "",
                bonus: 0,
                dice: "",
                damageType: "",
            },
            description: data.description,
            resource: ""
        }

        set((state) => {
            return {
                actions: data.actionType === ActionTypeEnum.ACTION ? [...state.actions, newAction] : state.actions,
                bonusActions: data.actionType === ActionTypeEnum.BONUSACTION ? [...state.bonusActions, newAction] : state.bonusActions,
                reactions: data.actionType === ActionTypeEnum.REACTION ? [...state.reactions, newAction] : state.reactions,
            }
        });
    },
    removeActions: (actionType: string, targetName: string) => {

        set((state) => {

            let actionData = state.actions;
            let bonusActionData = state.bonusActions;
            let reactionData = state.reactions;

            if (actionType === ActionTypeEnum.ACTION) {
                actionData = state.actions.filter((item) => item.name !== targetName);
            }

            if (actionType === ActionTypeEnum.BONUSACTION) {
                bonusActionData = state.bonusActions.filter((item) => item.name !== targetName);
            }

            if (actionType === ActionTypeEnum.REACTION) {
                reactionData = state.reactions.filter((item) => item.name !== targetName);
            }

            return {
                actions: actionData,
                bonusActions: bonusActionData,
                reactions: reactionData,
            }
        });
    },
    changeName: (actionType: string, targetName: string, newName: string) => {
        set((state) => {
            let actionData = state.actions;
            let bonusActionData = state.bonusActions;
            let reactionData = state.reactions;

            if (actionType === ActionTypeEnum.ACTION) {
                actionData = state.actions.map((item) => item.name === targetName ? { ...item, name: newName } : item);
            }

            if (actionType === ActionTypeEnum.BONUSACTION) {
                bonusActionData = state.bonusActions.map((item) => item.name === targetName ? { ...item, name: newName } : item);
            }

            if (actionType === ActionTypeEnum.REACTION) {
                reactionData = state.reactions.map((item) => item.name === targetName ? { ...item, name: newName } : item);
            }

            return {
                actions: actionData,
                bonusActions: bonusActionData,
                reactions: reactionData,
            }
        });
    },
    changeActionType: (actionType: string, targetName: string, newActionType: string) => {
        set((state) => {
            let actionData = state.actions;
            let bonusActionData = state.bonusActions;
            let reactionData = state.reactions;

            let targetAction: ActionItem | undefined;

            if (actionType === ActionTypeEnum.ACTION) {
                targetAction = state.actions.find((item) => item.name === targetName);
                actionData = state.actions.filter((item) => item.name !== targetName);
            }

            if (actionType === ActionTypeEnum.BONUSACTION) {
                targetAction = state.bonusActions.find((item) => item.name === targetName);
                bonusActionData = state.bonusActions.filter((item) => item.name !== targetName);
            }

            if (actionType === ActionTypeEnum.REACTION) {
                targetAction = state.reactions.find((item) => item.name === targetName);
                reactionData = state.reactions.filter((item) => item.name !== targetName);
            }

            if (!targetAction) return state;

            return {
                actions: newActionType === ActionTypeEnum.ACTION ? [...actionData, targetAction] : actionData,
                bonusActions: newActionType === ActionTypeEnum.BONUSACTION ? [...bonusActionData, targetAction] : bonusActionData,
                reactions: newActionType === ActionTypeEnum.REACTION ? [...reactionData, targetAction] : reactionData,
            }
        });
    },
    populate: (data: ActionEconomy) => {
        set({
            actions: data.actions,
            bonusActions: data.bonusActions,
            reactions: data.reactions,
        });
    }
}));
