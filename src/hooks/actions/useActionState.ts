import { create } from "zustand";

// utils
import { ActionTypeEnum } from "../../utils/enums";
import { getActionCache } from "../global/useDataHandler";

// DTO
import type { ActionEconomy, ActionItem, ActionPopulateParams } from "../../models/dataInterface";
interface CacheNameToChange {
    targetName: string;
    newName: string;
}
interface ActionState extends ActionEconomy {
    isPopulated: boolean;
    cacheNameToChange: CacheNameToChange | null;
    addActions: (data: ActionPopulateParams) => void;
    editAction: (actionType: string, targetName: string, newData: ActionItem) => void;
    removeActions: (actionType: string, targetName: string) => void;
    changeName: (actionType: string, targetName: string, newName: string) => void;
    changeLevel: (actionType: string, targetName: string, newLevel: number | null) => void;
    changeActionType: (actionType: string, targetName: string, newActionType: string) => void;
    populate: (data: ActionEconomy) => void;
    resetNameToChange: () => void;
    changeTrackerPoint: (actionType: string, actionName: string, newMax: number) => void;
}


export const useActionState = create<ActionState>((set) => ({
    actions: [],
    bonusActions: [],
    reactions: [],
    isPopulated: false,
    cacheNameToChange: null,

    addActions: (data: ActionPopulateParams) => {

        let newAction: ActionItem = {
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

        const cachedDataExist = getActionCache().find(item => item.name === data.name);
        if (cachedDataExist) {
            newAction = cachedDataExist;
        }

        set((state) => {
            const newState = {
                actions: data.actionType === ActionTypeEnum.ACTION ? [...state.actions, newAction] : state.actions,
                bonusActions: data.actionType === ActionTypeEnum.BONUSACTION ? [...state.bonusActions, newAction] : state.bonusActions,
                reactions: data.actionType === ActionTypeEnum.REACTION ? [...state.reactions, newAction] : state.reactions,
            }

            return newState;
        });
    },
    editAction: (actionType: string, targetName: string, newData: ActionItem) => {
        set((state) => {
            let actionData = state.actions;
            let bonusActionData = state.bonusActions;
            let reactionData = state.reactions;

            if (actionType === ActionTypeEnum.ACTION) {
                actionData = state.actions.map((item) => {
                    if (item.name !== targetName) return item;
                    return {
                        ...newData,
                        name: item.name,
                        level: item.level,
                        category: item.category,
                    }
                });
            }

            if (actionType === ActionTypeEnum.BONUSACTION) {
                bonusActionData = state.bonusActions.map((item) => {
                    if (item.name !== targetName) return item;
                    return {
                        ...newData,
                        name: item.name,
                        level: item.level,
                        category: item.category,
                    }
                });
            }

            if (actionType === ActionTypeEnum.REACTION) {
                reactionData = state.reactions.map((item) => {
                    if (item.name !== targetName) return item;
                    return {
                        ...newData,
                        name: item.name,
                        level: item.level,
                        category: item.category,
                    }
                });
            }

            const newState = {
                actions: actionData,
                bonusActions: bonusActionData,
                reactions: reactionData,
            }

            return newState;
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

            const newState = {
                actions: actionData,
                bonusActions: bonusActionData,
                reactions: reactionData,
            }

            return newState;
        });
    },
    changeName: (actionType: string, targetName: string, newName: string) => {
        set((state) => {
            let actionData = state.actions;
            let bonusActionData = state.bonusActions;
            let reactionData = state.reactions;

            const cachedDataExist = getActionCache().find(item => item.name === newName);

            if (actionType === ActionTypeEnum.ACTION) {
                actionData = state.actions.map(item => {
                    if (item.name !== targetName) return item;
                    if (cachedDataExist) return cachedDataExist;
                    return {
                        ...item,
                        name: newName
                    }
                });
            }

            if (actionType === ActionTypeEnum.BONUSACTION) {
                bonusActionData = state.bonusActions.map(item => {
                    if (item.name !== targetName) return item;
                    if (cachedDataExist) return cachedDataExist;
                    return {
                        ...item,
                        name: newName
                    }
                });
            }

            if (actionType === ActionTypeEnum.REACTION) {
                reactionData = state.reactions.map(item => {
                    if (item.name !== targetName) return item;
                    if (cachedDataExist) return cachedDataExist;
                    return {
                        ...item,
                        name: newName
                    }
                });
            }

            const nameToChange = {
                targetName: targetName,
                newName: newName,
            }

            const newState = {
                actions: actionData,
                bonusActions: bonusActionData,
                reactions: reactionData,
                cacheNameToChange: cachedDataExist ? null : nameToChange,
            }

            return newState;
        });
    },
    changeLevel: (actionType: string, targetName: string, newLevel: number | null) => {
        set((state) => {
            let actionData = state.actions;
            let bonusActionData = state.bonusActions;
            let reactionData = state.reactions;

            if (actionType === ActionTypeEnum.ACTION) {
                actionData = state.actions.map((item) => item.name === targetName ? { ...item, level: newLevel } : item);
            }

            if (actionType === ActionTypeEnum.BONUSACTION) {
                bonusActionData = state.bonusActions.map((item) => item.name === targetName ? { ...item, level: newLevel } : item);
            }

            if (actionType === ActionTypeEnum.REACTION) {
                reactionData = state.reactions.map((item) => item.name === targetName ? { ...item, level: newLevel } : item);
            }

            const newState = {
                actions: actionData,
                bonusActions: bonusActionData,
                reactions: reactionData,
            }

            return newState;
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

            const newState = {
                actions: newActionType === ActionTypeEnum.ACTION ? [...actionData, targetAction] : actionData,
                bonusActions: newActionType === ActionTypeEnum.BONUSACTION ? [...bonusActionData, targetAction] : bonusActionData,
                reactions: newActionType === ActionTypeEnum.REACTION ? [...reactionData, targetAction] : reactionData,
            }

            return newState;
        });
    },
    populate: (data: ActionEconomy) => {
        set({
            actions: data.actions,
            bonusActions: data.bonusActions,
            reactions: data.reactions,
            isPopulated: true,
        });
    },
    resetNameToChange: () => {
        set({
            cacheNameToChange: null,
        });
    },
    changeTrackerPoint: (actionType: string, actionName: string, newCurrent: number) => {
        set((state) => {
            let actionData = state.actions;
            let bonusActionData = state.bonusActions;
            let reactionData = state.reactions;

            if (actionType === ActionTypeEnum.ACTION) {
                actionData = state.actions.map((item) => {
                    if (item.name !== actionName) return item;
                    if (typeof item.resource === "string") return item;
                    return {
                        ...item,
                        resource: {
                            ...item.resource,
                            current: newCurrent
                        }
                    }
                });
            }

            if (actionType === ActionTypeEnum.BONUSACTION) {
                bonusActionData = state.bonusActions.map((item) => {
                    if (item.name !== actionName) return item;
                    if (typeof item.resource === "string") return item;
                    return {
                        ...item,
                        resource: {
                            ...item.resource,
                            current: newCurrent
                        }
                    }
                });
            }

            if (actionType === ActionTypeEnum.REACTION) {
                reactionData = state.reactions.map((item) => {
                    if (item.name !== actionName) return item;
                    if (typeof item.resource === "string") return item;
                    return {
                        ...item,
                        resource: {
                            ...item.resource,
                            current: newCurrent
                        }
                    }
                });
            }

            const newState = {
                actions: actionData,
                bonusActions: bonusActionData,
                reactions: reactionData,
            }

            return newState;
        });
    }
}));
