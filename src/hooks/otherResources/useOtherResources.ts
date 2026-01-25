import { useState } from "react";

// hooks
import useDataHandler from "../global/useDataHandler"

// DTO
import type { Resources } from "../../models/dataInterface";



export default function useOtherResources() {

    const { getOtherResourcesData, changeOtherResourcesData } = useDataHandler();

    const [otherResources, setOtherResources] = useState<Resources[]>(() => {
        return getOtherResourcesData();
    });


    return {
        otherResources,
    }
}