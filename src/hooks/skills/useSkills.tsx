import { useEffect, useState } from "react";

// hooks
import useDataHandler from "../global/useDataHandler"

// DTO
import type { Skills } from "../../models/dataInterface";

export default function useSkills() {

    const { getSkillsData } = useDataHandler();

    const [skillsData, setSkillsData] = useState<Skills | null>(null);

    useEffect(() => {
        setSkillsData(getSkillsData());
    }, []);

    return {
        skillsData,
    };
}