import { useEffect, useState } from "react";
import { Modal, Upload, type MenuProps } from "antd";
import { ArrowsAltOutlined, BookOutlined, DeleteOutlined, ExportOutlined, ImportOutlined, InboxOutlined, UserOutlined } from "@ant-design/icons";

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

const { confirm } = Modal;


export default function useMain() {

    const { populateData } = usePopulate();

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

    const resetData = () => {

        confirm({
            title: "Reset Data",
            content: "Are you sure you want to reset data?",
            centered: true,
            onOk() {
                populateData();
                window.location.reload();
            },
        });
    }

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
        },
        {
            key: '2',
            type: 'group',
            label: 'Manage Data',
            children: [
                {
                    key: '2-1',
                    label: (
                        <span onClick={resetData}>
                            Reset Data
                        </span>
                    ),
                    icon: <DeleteOutlined />,
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