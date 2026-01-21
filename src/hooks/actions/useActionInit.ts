import { useEffect, useState } from "react";

// hooks
import useDataHandler from "../global/useDataHandler";

// utils
import { ActionCategoryEnum, ActionTypeEnum, DefaultActionsEnum } from "../../utils/enums";

// DTO
import type { ActionEconomy, ActionItem, Equipment, FeaturesAndTraits, Spell, SpellcastingSource } from "../../models/dataInterface";


export default function useActionInit() {

    const {
        getActionEconomyData,
        getFeaturesAndTraits,
        getEquipmentData,
        getSpellsData,
        changeActionEconomyData,
    } = useDataHandler();

    const [actions] = useState<ActionEconomy | null>(() => {
        return getActionEconomyData();
    });

    const [features] = useState<FeaturesAndTraits[]>(() => {
        return getFeaturesAndTraits();
    });
    const [equipment] = useState<Equipment | null>(() => {
        return getEquipmentData();
    });
    const [spells] = useState<SpellcastingSource[]>(() => {
        return getSpellsData();
    });


    useEffect(() => {
        if (!actions || !equipment) return;
        const updatedActions = removeUnregisteredActions();

        if (!updatedActions) return;
        populateActions(updatedActions);
    }, []);

    const removeUnregisteredActions = (): ActionEconomy | null => {
        if (!actions || !equipment) return null;

        const tempActions: ActionEconomy = { ...actions };

        tempActions.actions.forEach(item => {
            if (item.name === DefaultActionsEnum.STANDARD) return;

            const itemFound = checkItemExist(item.name, item.category);
            if (itemFound) return;

            const filtered = tempActions.actions.filter(action => action.name !== item.name);
            tempActions.actions = filtered;
        });

        tempActions.bonusActions.forEach(item => {
            const itemFound = checkItemExist(item.name, item.category);
            if (itemFound) return;

            const filtered = tempActions.bonusActions.filter(action => action.name !== item.name);
            tempActions.bonusActions = filtered;
        });

        tempActions.reactions.forEach(item => {
            if (item.name === DefaultActionsEnum.OPPORTUNITY) return;

            const itemFound = checkItemExist(item.name, item.category);
            if (itemFound) return;

            const filtered = tempActions.reactions.filter(action => action.name !== item.name);
            tempActions.reactions = filtered;
        });

        changeActionEconomyData(tempActions);
        return tempActions;
    }

    const populateActions = (updatedActions: ActionEconomy): void => {
        if (!actions || !equipment) return;

        const actionTemp = updatedActions;

        features.forEach(item => {

            const itemExist = checkItemExistInActions(item.name);
            if (itemExist) return;

            if (item.actionType === ActionTypeEnum.ACTION) {
                actionTemp.actions.push(dataPopulationTemplate(item.name, ActionCategoryEnum.FEATURE));
            }

            if (item.actionType === ActionTypeEnum.BONUSACTION) {
                actionTemp.bonusActions.push(dataPopulationTemplate(item.name, ActionCategoryEnum.FEATURE));
            }

            if (item.actionType === ActionTypeEnum.REACTION) {
                actionTemp.reactions.push(dataPopulationTemplate(item.name, ActionCategoryEnum.FEATURE));
            }
        });

        const equipmentList = [...equipment.items, ...equipment.attunedMagicItems];

        equipmentList.forEach(item => {
            const itemExist = checkItemExistInActions(item.name);
            if (itemExist) return;

            if (item.equipable && !item.equipped) return;

            if (item.actionType === ActionTypeEnum.ACTION) {
                actionTemp.actions.push(dataPopulationTemplate(item.name, item.equipable ? ActionCategoryEnum.EQUIPABLE : ActionCategoryEnum.ITEM));
            }

            if (item.actionType === ActionTypeEnum.BONUSACTION) {
                actionTemp.bonusActions.push(dataPopulationTemplate(item.name, item.equipable ? ActionCategoryEnum.EQUIPABLE : ActionCategoryEnum.ITEM));
            }

            if (item.actionType === ActionTypeEnum.REACTION) {
                actionTemp.reactions.push(dataPopulationTemplate(item.name, item.equipable ? ActionCategoryEnum.EQUIPABLE : ActionCategoryEnum.ITEM));
            }
        });

        let spellList: Spell[] = [];

        spells.forEach(item => {
            spellList = [...spellList, ...item.spells];
        });

        const preparedSpells = spellList.filter(spell => spell.prepared);

        preparedSpells.forEach(spell => {
            const spellExist = checkItemExistInActions(spell.name);
            if (spellExist) return;

            actionTemp.actions.push(dataPopulationTemplate(spell.name, ActionCategoryEnum.SPELL, spell.level != 0 ? spell.level : null));
        });

        changeActionEconomyData(actionTemp);
    }

    const checkItemExist = (name: string, category: string): boolean => {
        if (!actions || !equipment) return false;

        let itemFound = false;

        if (category === ActionCategoryEnum.FEATURE) {
            itemFound = features.some(feature => feature.name === name);
        }

        if (category === ActionCategoryEnum.EQUIPABLE) {
            itemFound = equipment.items.some(eq => eq.name === name && eq.equipped) || equipment.attunedMagicItems.some(eq => eq.name === name && eq.equipped);
        }

        if (category === ActionCategoryEnum.ITEM) {
            itemFound = equipment.items.some(eq => eq.name === name) || equipment.attunedMagicItems.some(eq => eq.name === name);
        }

        if (category === ActionCategoryEnum.SPELL) {
            itemFound = spells.some(spell => spell.spells.some(spell => spell.name === name && spell.prepared));
        }

        return itemFound;
    }

    const checkItemExistInActions = (name: string): boolean => {
        if (!actions) return false;

        let itemFound = false;

        const actionsList = [...actions.actions, ...actions.bonusActions, ...actions.reactions];
        itemFound = actionsList.some(action => action.name === name);

        return itemFound;
    }

    const dataPopulationTemplate = (name: string, category: string, level: number | null = null): ActionItem => {
        return {
            name: name,
            level: level,
            category: category,
            activation: {
                type: "",
                bonus: 0,
                dice: "",
                damageType: "",
                saveDC: 0
            },
            description: "",
            resource: ""
        }
    }
}