import { useEffect, useState } from "react";

// hooks
import useDataHandler from "../global/useDataHandler";

// DTO
import type { Equipment } from "../../models/dataInterface";


export default function useEquipment() {

    const { getEquipmentData, changeEquipmentData } = useDataHandler();

    const [equipment, setEquipment] = useState<Equipment | null>(() => {
        return getEquipmentData();
    });

    const [weightCarried, setWeightCarried] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        if (!equipment) return;
        calculateWeightCarried();
        changeEquipmentData(equipment);
    }, [equipment]);

    useEffect(() => {
        if (!equipment) return;
        calculateProgress();
    }, [weightCarried]);

    const calculateWeightCarried = () => {
        if (!equipment) return;

        const itemsWeight = equipment.items.reduce((acc, item) => acc + item.weight * item.quantity, 0);
        const magicItemsWeight = equipment.attunedMagicItems.reduce((acc, item) => acc + item.weight * item.quantity, 0);
        const totalWeight = itemsWeight + magicItemsWeight;
        setWeightCarried(totalWeight);
    }

    const calculateProgress = () => {
        if (!equipment) return;

        const percentage = (weightCarried / equipment.weightCapacity) * 100;
        setProgress(percentage);
    }

    const handleEquip = (itemName: string, equip: boolean) => {
        if (!equipment) return;
        const updated = equipment.items.map((item) => {
            if (item.name === itemName) {
                item.equipped = equip;
            }
            return item;
        });
        setEquipment({ ...equipment, items: updated });
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

    return {
        equipment,
        weightCarried,
        progress,
        handleEquip,
        handleCurrency,
    }
}