import { useEffect, useState } from "react";

// hooks
import useDataHandler from "../global/useDataHandler"

// DTO
import type { FeaturesAndTraits } from "../../models/dataInterface";


export default function useFeatures() {

    const { getFeaturesAndTraits } = useDataHandler();

    const [featuresAndTraits, setFeaturesAndTraits] = useState<FeaturesAndTraits[]>([]);

    useEffect(() => {
        setFeaturesAndTraits(getFeaturesAndTraits());
    }, []);

    return {
        featuresAndTraits,
    }
}