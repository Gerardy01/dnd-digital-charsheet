import { useEffect, useState } from "react";

// hooks
import useDataHandler from "../global/useDataHandler";

// DTO
import type { CharacterDetails } from "../../models/dataInterface";



export function useCharacterDetails() {

    const { getCharacterDetailsData, changeCharacterDetailsData } = useDataHandler();

    const [characterDetails, setCharacterDetails] = useState<CharacterDetails | null>(() => {
        return getCharacterDetailsData();
    });

    useEffect(() => {
        if (!characterDetails) return;
        changeCharacterDetailsData(characterDetails)
    }, [characterDetails])

    const editAppearance = (value: string, type: string) => {
        if (!characterDetails) return;

        const newCharacterDetails = {
            ...characterDetails,
            appearance: {
                ...characterDetails.appearance,
                [type]: value
            }
        }

        setCharacterDetails(newCharacterDetails);
    }

    const editPersonality = (value: string, type: string) => {
        if (!characterDetails) return;

        const newCharacterDetails = {
            ...characterDetails,
            personality: {
                ...characterDetails.personality,
                [type]: value
            }
        }

        setCharacterDetails(newCharacterDetails);
    }

    const editMoreDetails = (value: string, type: string) => {
        if (!characterDetails) return;

        const newCharacterDetails = {
            ...characterDetails,
            [type]: value
        }

        setCharacterDetails(newCharacterDetails);
    }

    return {
        characterDetails,
        editAppearance,
        editPersonality,
        editMoreDetails,
    }
}



export function useMoreDetailsItem() {

    const [showInput, setShowInput] = useState<boolean>(false);

    const [inputValue, setInputValue] = useState<string>("");

    const changeInputValue = (value: string) => {
        setInputValue(value);
    }

    const toggleInput = (show: boolean) => {
        setShowInput(show);
    }

    const resetInput = () => {
        toggleInput(false);
        setInputValue("");
    }

    return {
        showInput,
        inputValue,
        toggleInput,
        changeInputValue,
        resetInput,
    }
}