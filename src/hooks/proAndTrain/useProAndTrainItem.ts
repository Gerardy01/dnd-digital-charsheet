import { useState , useRef } from "react";
import type { InputRef } from "antd";



export default function useProAndTrainItem() {

    const inputRef = useRef<InputRef>(null);

    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const showInput = (isShown : boolean) : void => {
        setInputVisible(isShown);
    }

    const handleChangeInput = (newValue : string) : void => {
        setInputValue(newValue);
    }

    const resetInput = () : void => {
        setInputVisible(false);
        setInputValue("");
    }

    return {
        inputVisible,
        inputValue,
        inputRef,
        showInput,
        handleChangeInput,
        resetInput,
    }
}