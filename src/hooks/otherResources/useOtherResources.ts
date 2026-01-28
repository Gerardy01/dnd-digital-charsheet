import { useState } from "react";

// hooks
import useDataHandler from "../global/useDataHandler"

// DTO
import type { OtherResources } from "../../models/dataInterface";



export default function useOtherResources() {

    const { getOtherResourcesData, changeOtherResourcesData } = useDataHandler();

    const [otherResources, setOtherResources] = useState<OtherResources[]>(() => {
        return getOtherResourcesData();
    });


    return {
        otherResources,
    }
}