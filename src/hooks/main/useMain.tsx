import { useEffect, useState } from "react";
import { ArrowsAltOutlined, BookOutlined, InboxOutlined, UserOutlined } from "@ant-design/icons";

// components
import Features from "../../components/features/Features";
import Equipment from "../../components/equipment/Equipment";
import Spells from "../../components/spells/Spells";

// DTO
import type { CharacterInfo, InfoStat } from "../../models/dataInterface";

// hooks
import useDataHandler from "../global/useDataHandler"


export default function useMain() {

    const { getCharInfoData, changeCharInfoData, getInfoStatData } = useDataHandler();

    const [charInfoData, setCharInfoData] = useState<CharacterInfo | null>(null);
    const [infoStatData, setInfoStatData] = useState<InfoStat | null>(null);
    const [selectedTab, setSelectedTab] = useState<string>('1');

    const tabs = [
        {
            label: 'Action',
            key: '1',
            icon: <ArrowsAltOutlined />,
            children: ""
        },
        {
            label: 'Inventory',
            key: '2',
            icon: <InboxOutlined />,
            children: <Equipment />,
        },
        {
            label: 'Spellbook',
            key: '3',
            icon: <BookOutlined />,
            children: <Spells />,
        },
        {
            label: 'Features',
            key: '4',
            icon: <UserOutlined />,
            children: <Features />,
        }
    ];

    useEffect(() => {
        setCharInfoData(getCharInfoData());
        setInfoStatData(getInfoStatData());
    }, []);

    useEffect(() => {
        if (!charInfoData) return;

        changeCharInfoData(charInfoData);

    }, [charInfoData]);

    const changeName = (newName: string): void => {
        if (!charInfoData) return;

        const newCharInfoData: CharacterInfo = {
            ...charInfoData,
            characterName: newName
        };

        setCharInfoData(newCharInfoData);
    }

    const changeRace = (newRace: string): void => {
        if (!charInfoData) return;

        const newCharInfoData: CharacterInfo = {
            ...charInfoData,
            species: newRace
        };

        setCharInfoData(newCharInfoData);
    }

    const changeClassAndLevel = (newClassAndLevel: string): void => {
        if (!charInfoData) return;

        const newCharInfoData: CharacterInfo = {
            ...charInfoData,
            classesAndLevel: newClassAndLevel,
        };

        setCharInfoData(newCharInfoData);
    }

    const changeBackgroud = (newBackground: string): void => {
        if (!charInfoData) return;

        const newCharInfoData: CharacterInfo = {
            ...charInfoData,
            background: newBackground,
        };

        setCharInfoData(newCharInfoData);
    }

    const changeAlignment = (newAlignment: string): void => {
        if (!charInfoData) return;

        const newCharInfoData: CharacterInfo = {
            ...charInfoData,
            alignment: newAlignment,
        };

        setCharInfoData(newCharInfoData);
    }

    const changeExp = (newExp: string): void => {
        if (!charInfoData) return;

        const newCharInfoData: CharacterInfo = {
            ...charInfoData,
            experiencePoints: newExp,
        };

        setCharInfoData(newCharInfoData);
    }

    const changeProficiencyBonus = (newProficiencyBonus: string): void => {
        if (!infoStatData) return;

        const numberValue = Number(newProficiencyBonus);
        if (!numberValue) return;

        const newInfoStat: InfoStat = {
            ...infoStatData,
            proficiencyBonus: numberValue
        }

        setInfoStatData(newInfoStat);
    }

    const onTabChange = (key: string) => {
        setSelectedTab(key);
    }

    return {
        charInfoData,
        infoStatData,
        selectedTab,
        tabs,
        changeName,
        changeRace,
        changeClassAndLevel,
        changeBackgroud,
        changeAlignment,
        changeExp,
        changeProficiencyBonus,
        onTabChange,
    }
}