import { useEffect, useState } from "react";
import { Form, Modal, notification, type FormProps } from "antd";

// hooks
import useDataHandler from "../global/useDataHandler";
import { useActionState } from "../actions/useActionState";

// utils
import { ActionCategoryEnum } from "../../utils/enums";

// DTO
import type { Equipment, Item } from "../../models/dataInterface";
interface ItemForm {
    name: string;
    quantity: number;
    weight: number;
    equipable: boolean;
    description: string;
    actionType: string;
}

const { confirm } = Modal;


export default function useEquipment() {

    const { getEquipmentData, changeEquipmentData } = useDataHandler();
    const { addActions, removeActions, changeName, changeActionType } = useActionState();

    const [equipment, setEquipment] = useState<Equipment | null>(() => {
        return getEquipmentData();
    });

    const [weightCarried, setWeightCarried] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    const [addItem, setAddItem] = useState<boolean>(false);
    const [addMagicItem, setAddMagicItem] = useState<boolean>(false);

    const [editItemIdx, setEditItemIdx] = useState<number>(-1);
    const [editMagicItemIdx, setEditMagicItemIdx] = useState<number>(-1);

    useEffect(() => {
        if (!equipment) return;
        calculateWeightCarried();
        changeEquipmentData(equipment);
    }, [equipment]);

    useEffect(() => {
        if (!equipment) return;
        calculateProgress();
    }, [weightCarried, equipment?.weightCapacity]);

    const calculateWeightCarried = () => {
        if (!equipment) return;

        const itemsWeight = equipment.items.reduce((acc, item) => acc + item.weight * item.quantity, 0);
        const magicItemsWeight = equipment.attunedMagicItems.reduce((acc, item) => acc + item.weight * item.quantity, 0);
        const totalWeight = itemsWeight + magicItemsWeight;
        setWeightCarried(Number(totalWeight.toFixed(1)));
    }

    const calculateProgress = () => {
        if (!equipment) return;

        const percentage = (weightCarried / equipment.weightCapacity) * 100;
        setProgress(percentage);
    }

    const handleEquip = (itemName: string, equip: boolean, type: 'item' | 'magicItem') => {
        if (!equipment) return;

        if (type === 'item') {
            const updated = equipment.items.map((item) => {
                if (item.name === itemName) {
                    item.equipped = equip;
                }
                return item;
            });
            setEquipment({ ...equipment, items: updated });

            return;
        }

        const updated = equipment.attunedMagicItems.map((item) => {
            if (item.name === itemName) {
                item.equipped = equip;
            }
            return item;
        });
        setEquipment({ ...equipment, attunedMagicItems: updated });
    }

    const handleCurrency = (currencyType: string, amount: string) => {
        if (!equipment || !amount) return;

        setEquipment({
            ...equipment,
            currency: {
                ...equipment.currency,
                [currencyType]: Number(amount)
            }
        });
    }

    const handleClickQuantity = (itemName: string, isAdd: boolean, type: 'item' | 'magicItem') => {
        if (!equipment) return;

        if (type === 'item') {
            const updated = equipment.items.map((item) => {
                if (item.name === itemName) {
                    let newValue = item.quantity + (isAdd ? 1 : -1);
                    if (newValue < 0) {
                        newValue = 0;
                    }
                    item.quantity = newValue;
                }
                return item;
            });
            setEquipment({ ...equipment, items: updated });

            return;
        }

        const updated = equipment.attunedMagicItems.map((item) => {
            if (item.name === itemName) {
                let newValue = item.quantity + (isAdd ? 1 : -1);
                if (newValue < 0) {
                    newValue = 0;
                }
                item.quantity = newValue;
            }
            return item;
        });
        setEquipment({ ...equipment, attunedMagicItems: updated });
    }

    const handleChangeCapacity = (capacity: string) => {
        if (!equipment || !capacity) return;

        setEquipment({ ...equipment, weightCapacity: Number(capacity) });
    }

    const handleChangePushDragLift = (value: string) => {
        if (!equipment || !value) return;

        setEquipment({ ...equipment, pushDragLift: Number(value) });
    }

    const addingItem = (adding: boolean) => {
        setAddItem(adding);
    }

    const addingMagicItem = (adding: boolean) => {
        setAddMagicItem(adding);
    }

    const editItem = (idx: number) => {
        setEditItemIdx(idx);
    }

    const editMagicItem = (idx: number) => {
        setEditMagicItemIdx(idx);
    }

    const onAddItem = (newData: Item) => {
        if (!equipment) return;

        setEquipment({ ...equipment, items: [...equipment.items, newData] });
        addingItem(false);

        handleActionUponAdding(newData);
    }

    const onAddMagicItem = (newData: Item) => {
        if (!equipment) return;

        setEquipment({ ...equipment, attunedMagicItems: [...equipment.attunedMagicItems, newData] });
        addingMagicItem(false);

        handleActionUponAdding(newData);
    }

    const onEditItem = (newData: Item) => {
        if (!equipment) return;

        const updated = equipment.items.map((item, index) => {
            if (index === editItemIdx) {
                return {
                    ...newData,
                    equipped: newData.equipable ? item.equipped : false,
                }
            }
            return item;
        });

        handleActionUponEdit(newData, equipment.items[editItemIdx]);

        setEquipment({ ...equipment, items: updated });
        editItem(-1);

    }

    const onEditMagicItem = (newData: Item) => {
        if (!equipment) return;
        console.log(newData);

        const updated = equipment.attunedMagicItems.map((item, index) => {
            if (index === editMagicItemIdx) {
                return {
                    ...newData,
                    equipped: newData.equipable ? item.equipped : false,
                }
            }
            return item;
        });

        handleActionUponEdit(newData, equipment.attunedMagicItems[editMagicItemIdx]);

        setEquipment({ ...equipment, attunedMagicItems: updated });
        editMagicItem(-1);
    }

    const removeItem = () => {
        if (!equipment) return;

        const targetItem = equipment.items.find((_, index) => index === editItemIdx);
        if (!targetItem) return;

        if (targetItem.equipable && targetItem.equipped) {
            notification.warning({
                message: 'Item Cannot Be Deleted',
                description: 'Please unequip this item before deleting it.',
                placement: 'top',
                style: { backgroundColor: '#fef08a', color: '#92400e' }
            });
            return;
        }

        confirm({
            title: "Delete Item",
            content: `Are you sure you want to delete ${targetItem.name}?`,
            centered: true,
            onOk() {
                const updated = equipment.items.filter((_, index) => index !== editItemIdx);
                setEquipment({ ...equipment, items: updated });

                editItem(-1);

                handleActionUponRemove(targetItem);
            }
        });
    }

    const removeMagicItem = () => {
        if (!equipment) return;

        const targetItem = equipment.attunedMagicItems.find((_, index) => index === editMagicItemIdx);
        if (!targetItem) return;

        if (targetItem.equipable && targetItem.equipped) {
            notification.warning({
                message: 'Item Cannot Be Deleted',
                description: 'Please unequip this item before deleting it.',
                placement: 'top',
                style: { backgroundColor: '#fef08a', color: '#92400e' }
            });
            return;
        }

        confirm({
            title: "Delete Magic Item",
            content: `Are you sure you want to delete ${targetItem.name}?`,
            centered: true,
            onOk() {
                const updated = equipment.attunedMagicItems.filter((_, index) => index !== editMagicItemIdx);
                setEquipment({ ...equipment, attunedMagicItems: updated });

                editMagicItem(-1);

                handleActionUponRemove(targetItem);
            }
        });
    }

    const handleActionUponAdding = (data: Item) => {
        if (data.actionType === "") return;

        const category = data.equipable ? ActionCategoryEnum.EQUIPABLE : ActionCategoryEnum.ITEM;
        addActions({
            name: data.name,
            actionType: data.actionType,
            category: category,
            description: data.description,
            level: null,
        });
    }

    const handleActionUponEdit = (newData: Item, currentData: Item) => {

        const category = newData.equipable ? ActionCategoryEnum.EQUIPABLE : ActionCategoryEnum.ITEM;

        if (newData.name !== currentData.name && newData.actionType !== "") {
            changeName(currentData.actionType, currentData.name, newData.name);
        }

        if (currentData.actionType === "" && newData.actionType !== "") {
            addActions({
                name: newData.name,
                actionType: newData.actionType,
                category: category,
                description: newData.description,
                level: null,
            });
        } else if ((newData.actionType !== currentData.actionType) && newData.actionType !== "") {
            changeActionType(currentData.actionType, newData.name, newData.actionType);
        }

        if ((newData.actionType !== currentData.actionType) && newData.actionType === "") {
            removeActions(currentData.actionType, newData.name);
        }
    }

    const handleActionUponRemove = (data: Item) => {
        if (data.actionType === "") return;

        removeActions(data.actionType, data.name);
    }

    return {
        equipment,
        weightCarried,
        progress,
        addItem,
        addMagicItem,
        editItemIdx,
        editMagicItemIdx,
        handleEquip,
        handleCurrency,
        addingItem,
        addingMagicItem,
        editItem,
        editMagicItem,
        handleClickQuantity,
        handleChangeCapacity,
        handleChangePushDragLift,
        onAddItem,
        onAddMagicItem,
        onEditItem,
        onEditMagicItem,
        removeItem,
        removeMagicItem,
    }
}


export function useAddItem(
    onSubmit: (values: Item) => void,
) {

    const [addItemForm] = Form.useForm();

    const submitNewItem: FormProps<ItemForm>['onFinish'] = (values) => {

        const newItem: Item = {
            name: values.name,
            quantity: values.quantity,
            weight: values.weight,
            equipable: values.equipable,
            description: values.description,
            actionType: values.actionType,
        }

        onSubmit(newItem);
        reset();
    }

    const reset = () => {
        addItemForm.resetFields();
    }

    return {
        addItemForm,
        submitNewItem,
        reset,
    }
}


export function useEditItem(
    onSubmit: (values: Item) => void,
) {

    const [editItemForm] = Form.useForm();

    const submitEditedItem: FormProps<ItemForm>['onFinish'] = (values) => {

        const editedItem: Item = {
            name: values.name,
            quantity: values.quantity,
            weight: values.weight,
            equipable: values.equipable,
            description: values.description,
            actionType: values.actionType,
        }

        onSubmit(editedItem);
        reset();
    }

    const reset = () => {
        editItemForm.resetFields();
    }

    return {
        editItemForm,
        submitEditedItem,
        reset,
    }
}