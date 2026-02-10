import { useEffect, useState } from "react";
import { Upload, type MenuProps } from "antd";
import { ArrowsAltOutlined, BookOutlined, ExportOutlined, ImportOutlined, InboxOutlined, UserOutlined } from "@ant-design/icons";

// components
import Features from "../../components/features/Features";
import Equipment from "../../components/equipment/Equipment";
import Spells from "../../components/spells/Spells";
import Actions from "../../components/actions/Actions";

// DTO
import type { CharacterInfo, InfoStat } from "../../models/dataInterface";

// hooks
import useDataHandler from "../global/useDataHandler"
import usePopulate from "../global/usePopulate";
import useExportImport from "../global/useExportImport";


export default function useMain() {

    usePopulate();

    const {
        getCharInfoData,
        changeCharInfoData,
        getInfoStatData,
        changeInfoStatData,
    } = useDataHandler();

    const {
        exportJsonData,
        importJsonData
    } = useExportImport();

    const [charInfoData, setCharInfoData] = useState<CharacterInfo | null>(null);
    const [infoStatData, setInfoStatData] = useState<InfoStat | null>(null);
    const [selectedTab, setSelectedTab] = useState<string>('1');

    const tabs = [
        {
            label: 'Action',
            key: '1',
            icon: <ArrowsAltOutlined />,
            children: <Actions />
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

    const dropdownItem: MenuProps['items'] = [
        {
            key: '1',
            type: 'group',
            label: 'Import Export Data',
            children: [
                {
                    key: '1-1',
                    label: (
                        <Upload
                            showUploadList={false}
                            accept=".json"
                            beforeUpload={importJsonData}
                        >
                            Import Data
                        </Upload>
                    ),
                    icon: <ImportOutlined />,
                },
                {
                    key: '1-2',
                    label: (
                        <span onClick={exportJsonData}>
                            Export Data
                        </span>
                    ),
                    icon: <ExportOutlined />,
                },
            ]
        }
    ]

    useEffect(() => {
        setCharInfoData(getCharInfoData());
        setInfoStatData(getInfoStatData());
    }, []);

    useEffect(() => {
        if (!charInfoData) return;

        changeCharInfoData(charInfoData);

    }, [charInfoData]);

    useEffect(() => {
        if (!infoStatData) return;

        changeInfoStatData(infoStatData);

    }, [infoStatData]);

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

    const changeInspiration = (): void => {
        if (!infoStatData) return;

        const newInfoStat: InfoStat = {
            ...infoStatData,
            heroicInspiration: !infoStatData.heroicInspiration
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
        dropdownItem,
        changeName,
        changeRace,
        changeClassAndLevel,
        changeBackgroud,
        changeAlignment,
        changeExp,
        changeProficiencyBonus,
        changeInspiration,
        onTabChange,
    }
}