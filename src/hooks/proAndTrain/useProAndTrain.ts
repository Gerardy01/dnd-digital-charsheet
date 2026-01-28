import { useEffect, useState } from "react";

// hooks
import useDataHandler from "../global/useDataHandler"

// DTO
import type { ProficienciesAndTraining } from "../../models/dataInterface";

export default function useProAndTrain() {

    const { getProficienciesAndTrainingData, changeProficienciesAndTraining } = useDataHandler();

    const [proAndTrain, setProAndTrain] = useState<ProficienciesAndTraining | null>(null);

    useEffect(() => {
        setProAndTrain(getProficienciesAndTrainingData());
    }, []);

    useEffect(() => {
        if (!proAndTrain) return;

        changeProficienciesAndTraining(proAndTrain);
    }, [proAndTrain]);

    const handleRemove = (category: keyof ProficienciesAndTraining, index: number): void => {
        if (!proAndTrain) return;

        const updated = proAndTrain[category].filter((_, i: number) => i !== index);
        setProAndTrain({
            ...proAndTrain,
            [category]: updated,
        });
    }

    const handleAdd = (category: keyof ProficienciesAndTraining, item: string): void => {
        if (!proAndTrain) return;

        const updated = [...proAndTrain[category], item];
        setProAndTrain({
            ...proAndTrain,
            [category]: updated,
        });
    }

    return {
        proAndTrain,
        handleRemove,
        handleAdd,
    }
}
