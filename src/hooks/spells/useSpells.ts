import { useEffect, useState } from "react";
import { Form, Modal, notification, type FormProps } from "antd";

// hooks
import useDataHandler from "../global/useDataHandler";
import { useActionState } from "../actions/useActionState";

// utils
import { SourceTypeList, abilityList, castingTimeList, componentList, durationList, rangeList, schoolList } from "../../utils/selectionData";
import { ActionCategoryEnum } from "../../utils/enums";

// DTO
import type { Spell, SpellcastingSource, SpellcastingTransformed, SpellTransformed } from "../../models/dataInterface";
interface EditSpellIndex {
    sourceIdx: number;
    lvlGroupIdx: number;
    spellIdx: number;
}
interface SpellSourceForm {
    source: string;
    sourceType: string;
    ability: string;
    spellSaveDC: number;
    spellAttackBonus: number;
}
interface SpellForm {
    name: string;
    level: number;
    school: string;
    castingTime: string;
    range: string;
    components: string[];
    duration: string;
    ritual: boolean;
    concentration: boolean;
    description: string;
    sourcePage: string;
    actionType: string;
}

const { confirm } = Modal;


export default function useSpells() {

    const { getSpellsData, changeSpellsData } = useDataHandler();
    const { addActions, removeActions, changeName, changeActionType, changeLevel } = useActionState();

    const [spellcasting, setSpellcasting] = useState<SpellcastingSource[]>(() => {
        return getSpellsData();
    });

    const [transformed, setTransformed] = useState<SpellcastingTransformed[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [preparedOnly, setPreparedOnly] = useState<boolean>(false);
    const [hidedList, setHidedList] = useState<number[]>([]);

    const [isAddingSpellsource, setIsAddingSpellsource] = useState<boolean>(false);
    const [editedSpellsourceIndex, setEditedSpellsourceIndex] = useState<number>(-1);

    const [addingSpellIndex, setAddingSpellIndex] = useState<number>(-1);
    const [editedSpellIndex, setEditedSpellIndex] = useState<EditSpellIndex>({
        sourceIdx: -1,
        lvlGroupIdx: -1,
        spellIdx: -1,
    });

    useEffect(() => {
        handleTransform();
    }, [spellcasting, preparedOnly]);

    useEffect(() => {
        changeSpellsData(spellcasting);
    }, [spellcasting]);

    const handleTransform = (): void => {
        setLoading(true);

        const transformedData = spellcasting.map(item => {
            const grouped = item.spells.reduce((acc, spell) => {
                const level = spell.level;
                if (!acc[level]) {
                    acc[level] = []
                }
                if (preparedOnly && !spell.prepared) return acc;
                acc[level].push(spell);
                return acc
            }, {} as Record<number, Spell[]>);

            const spellTransformed: SpellTransformed[] = Object.keys(grouped).map(lvlKey => {
                const level = parseInt(lvlKey);
                return {
                    level,
                    levelName: level === 0 ? `CANTRIPS` : `LEVEL ${level}`,
                    spells: grouped[level],
                };
            })
                .sort((a, b) => {
                    const levelA = a.levelName === "CANTRIPS" ? 0 : parseInt(a.levelName.replace("Level ", ""));
                    const levelB = b.levelName === "CANTRIPS" ? 0 : parseInt(b.levelName.replace("Level ", ""));
                    return levelA - levelB;
                });

            return {
                ...item,
                spells: spellTransformed,
            }
        });

        setTransformed(transformedData);

        setLoading(false);
    }

    const handlePrepare = (spellName: string, prepared: boolean, level: number): void => {
        if (loading) return;
        if (level === 0) return;

        const updatedData = spellcasting.map(item => {
            if (item.spells.some(spell => spell.name === spellName)) {
                return {
                    ...item,
                    spells: item.spells.map(spell => {
                        if (spell.name === spellName) {
                            return {
                                ...spell,
                                prepared
                            }
                        }
                        return spell;
                    })
                }
            }
            return item;
        });
        setSpellcasting(updatedData);

        handleActionUponPrepare(spellName, prepared);
    }

    const handlePreparedOnlySwitch = (prepared: boolean): void => {
        setPreparedOnly(prepared);
    }

    const handleHide = (index: number): void => {
        setHidedList(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            }
            return [...prev, index];
        });
    }

    const addSpellSource = (adding: boolean): void => {
        setIsAddingSpellsource(adding);
    }

    const editSpellSource = (index: number): void => {
        setEditedSpellsourceIndex(index);
    }

    const addSpell = (index: number): void => {
        setAddingSpellIndex(index);
    }

    const editSpell = (sourceIdx: number, lvlGroupIdx: number, spellIdx: number): void => {
        setEditedSpellIndex({ sourceIdx, lvlGroupIdx, spellIdx });
    }

    const onAddSpellSource = (values: SpellcastingSource): void => {
        if (loading) return;

        const updatedData = [...spellcasting, values];
        setSpellcasting(updatedData);
        addSpellSource(false);
    }

    const onEditSpellSource = (values: SpellcastingSource): void => {
        if (loading) return;

        const updatedData = spellcasting.map((item, i) => {
            if (i === editedSpellsourceIndex) {
                return {
                    ...values,
                    spells: item.spells,
                };
            }
            return item;
        })
        setSpellcasting(updatedData);
        editSpellSource(-1);
    }

    const removeSpellSource = (): void => {
        if (loading) return;

        const preparedSpells = spellcasting[editedSpellsourceIndex].spells.filter(spell => spell.prepared && spell.level > 0);

        if (preparedSpells.length > 0) {
            notification.warning({
                message: 'Spell Source Cannot Be Deleted',
                description: 'Please unprepare all spells (except cantrips) in this spell source before deleting it.',
                placement: 'top',
                style: { backgroundColor: '#fef08a', color: '#92400e' }
            });
            return;
        }

        confirm({
            title: "Delete Spell Source",
            content: "Are you sure you want to delete this spell source?",
            centered: true,
            onOk() {
                const spellList = spellcasting[editedSpellsourceIndex].spells;

                const updatedData = spellcasting.filter((_, i) => i !== editedSpellsourceIndex);
                setSpellcasting(updatedData);
                editSpellSource(-1);

                spellList.forEach(spell => {
                    handleActionUponRemove(spell);
                });
            },
        });
    }

    const onAddSpell = (values: Spell): void => {
        if (loading) return;

        const updatedData = spellcasting.map((item, i) => {
            if (i === addingSpellIndex) {
                return {
                    ...item,
                    spells: [...item.spells, values],
                };
            }
            return item;
        })

        setSpellcasting(updatedData);
        addSpell(-1);

        handleActionUponAdd(values);
    }

    const onEditSpell = (values: Spell): void => {
        if (loading) return;

        const sourceIdx = editedSpellIndex.sourceIdx;
        const lvlGroupIdx = editedSpellIndex.lvlGroupIdx;
        const spellIdx = editedSpellIndex.spellIdx;

        const targetSpellName = transformed[sourceIdx].spells[lvlGroupIdx].spells[spellIdx].name;

        const targetSpell = spellcasting[sourceIdx].spells.find(spell => spell.name === targetSpellName);

        if (!targetSpell) return;

        const updatedData = spellcasting.map((item, i) => {
            if (i === sourceIdx) {
                return {
                    ...item,
                    spells: item.spells.map((spell) => {
                        if (spell.name === targetSpellName) {
                            return {
                                ...values,
                                prepared: values.level === 0 ? true : spell.prepared,
                            }
                        }
                        return spell;
                    })
                }
            }
            return item;
        })
        setSpellcasting(updatedData);
        editSpell(-1, -1, -1);

        handleActionUponEdit(values, targetSpell);
    }

    const removeSpell = (): void => {
        if (loading) return;

        const sourceIdx = editedSpellIndex.sourceIdx;
        const lvlGroupIdx = editedSpellIndex.lvlGroupIdx;
        const spellIdx = editedSpellIndex.spellIdx;

        const targetSpellName = transformed[sourceIdx].spells[lvlGroupIdx].spells[spellIdx].name;

        const targetSpell = spellcasting[sourceIdx].spells.find(spell => spell.name === targetSpellName);

        if (!targetSpell) return;

        confirm({
            title: "Delete Spell",
            content: `Are you sure you want to delete ${targetSpellName}? ${targetSpell.prepared && targetSpell.level > 0 ? "This spell is prepared." : ""}`,
            centered: true,
            onOk() {
                const updatedData = spellcasting.map((item, i) => {
                    if (i === sourceIdx) {
                        return {
                            ...item,
                            spells: item.spells.filter(spell => spell.name !== targetSpellName),
                        };
                    }
                    return item;
                })
                setSpellcasting(updatedData);
                editSpell(-1, -1, -1);

                handleActionUponRemove(targetSpell);
            }
        });
    }

    const handleActionUponPrepare = (spellName: string, prepared: boolean) => {
        const targetSpellSource = spellcasting.find(item => item.spells.some(spell => spell.name === spellName));
        const targetSpell = targetSpellSource?.spells.find(spell => spell.name === spellName);
        if (!targetSpell || targetSpell.level === 0) return;

        if (prepared) {
            addActions({
                name: targetSpell.name,
                actionType: targetSpell.actionType,
                category: ActionCategoryEnum.SPELL,
                description: targetSpell.description,
                level: targetSpell.level,
            });
        } else {
            removeActions(targetSpell.actionType, targetSpell.name);
        }
    }

    const handleActionUponAdd = (data: Spell) => {
        if (data.level !== 0) return;

        const category = ActionCategoryEnum.SPELL;
        addActions({
            name: data.name,
            actionType: data.actionType,
            category: category,
            description: data.description,
            level: null,
        });
    }

    const handleActionUponEdit = (newData: Spell, currentData: Spell) => {

        if (newData.name !== currentData.name && currentData.prepared) {
            changeName(currentData.actionType, currentData.name, newData.name);
        }

        if (currentData.actionType !== newData.actionType && currentData.prepared) {
            changeActionType(currentData.actionType, newData.name, newData.actionType);
        }

        if (newData.level === 0 && currentData.level !== 0 && !currentData.prepared) {
            addActions({
                name: newData.name,
                actionType: newData.actionType,
                category: ActionCategoryEnum.SPELL,
                description: newData.description,
                level: null,
            });
        }

        if (currentData.level !== newData.level && currentData.prepared) {
            changeLevel(currentData.actionType, newData.name, newData.level === 0 ? null : newData.level);
        }
    }

    const handleActionUponRemove = (data: Spell) => {
        if (!data.prepared) return;

        removeActions(data.actionType, data.name);
    }

    return {
        spellcasting: transformed,
        loading,
        preparedOnly,
        hidedList,
        isAddingSpellsource,
        editedSpellsourceIndex,
        addingSpellIndex,
        editedSpellIndex,
        handlePrepare,
        handlePreparedOnlySwitch,
        handleHide,
        addSpellSource,
        editSpellSource,
        onAddSpellSource,
        onEditSpellSource,
        removeSpellSource,
        addSpell,
        editSpell,
        onAddSpell,
        onEditSpell,
        removeSpell,
    }
}



export function useAddSpellSource(
    onSubmit: (values: SpellcastingSource) => void
) {

    const [addSpellsourceForm] = Form.useForm();

    const sourceTypeSelection = SourceTypeList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const abilitySelection = abilityList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const submitNewSpellSource: FormProps<SpellSourceForm>['onFinish'] = (values) => {

        const newSpellSource: SpellcastingSource = {
            source: values.source,
            sourceType: values.sourceType,
            ability: values.ability,
            spellSaveDC: values.spellSaveDC,
            spellAttackBonus: values.spellAttackBonus,
            spells: [],
        }

        onSubmit(newSpellSource);
        resetAddSpellsource();
    }

    const resetAddSpellsource = (): void => {
        addSpellsourceForm.resetFields();
    }

    return {
        addSpellsourceForm,
        sourceTypeSelection,
        abilitySelection,
        resetAddSpellsource,
        submitNewSpellSource,
    }
}



export function useEditSpellSource(
    onSubmit: (values: SpellcastingSource) => void,
) {

    const [editSpellsourceForm] = Form.useForm();

    const sourceTypeSelection = SourceTypeList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const abilitySelection = abilityList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const submitEditData: FormProps<SpellSourceForm>['onFinish'] = (values) => {

        const newData: SpellcastingSource = {
            source: values.source,
            sourceType: values.sourceType,
            ability: values.ability,
            spellSaveDC: values.spellSaveDC,
            spellAttackBonus: values.spellAttackBonus,
            spells: [],
        }

        onSubmit(newData);
        reset();
    }

    const reset = (): void => {
        editSpellsourceForm.resetFields();
    }

    return {
        editSpellsourceForm,
        sourceTypeSelection,
        abilitySelection,
        reset,
        submitEditData,
    }
}



export function useAddSpell(
    onSubmit: (values: Spell) => void,
) {

    const [addSpellForm] = Form.useForm();

    const castingTimeSelection = castingTimeList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const schoolOptions = schoolList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const rangeSelection = rangeList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const durationSelection = durationList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const componentSelection = componentList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const submitNewSpell: FormProps<SpellForm>['onFinish'] = (values) => {

        const newData: Spell = {
            name: values.name,
            level: values.level,
            school: values.school,
            castingTime: values.castingTime,
            range: values.range,
            components: values.components,
            duration: values.duration,
            ritual: values.ritual,
            concentration: values.concentration,
            prepared: values.level === 0 ? true : false,
            description: values.description,
            sourcePage: values.sourcePage,
            actionType: values.actionType,
        }

        onSubmit(newData);
        reset();
    }

    const reset = () => {
        addSpellForm.resetFields();
    }

    return {
        addSpellForm,
        castingTimeSelection,
        schoolOptions,
        rangeSelection,
        durationSelection,
        componentSelection,
        reset,
        submitNewSpell,
    }
}



export function useEditSpell(
    onSubmit: (values: Spell) => void,
) {

    const [editSpellForm] = Form.useForm();

    const castingTimeSelection = castingTimeList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const schoolOptions = schoolList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const rangeSelection = rangeList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const durationSelection = durationList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const componentSelection = componentList.map(item => {
        return {
            value: item,
            label: item,
        }
    });

    const submitEditData: FormProps<SpellForm>['onFinish'] = (values) => {

        const newData: Spell = {
            name: values.name,
            level: values.level,
            school: values.school,
            castingTime: values.castingTime,
            range: values.range,
            components: values.components,
            duration: values.duration,
            ritual: values.ritual,
            concentration: values.concentration,
            prepared: false,
            description: values.description,
            sourcePage: values.sourcePage,
            actionType: values.actionType,
        }

        onSubmit(newData);
        reset();
    }

    const reset = () => {
        editSpellForm.resetFields();
    }

    return {
        editSpellForm,
        castingTimeSelection,
        schoolOptions,
        rangeSelection,
        durationSelection,
        componentSelection,
        reset,
        submitEditData,
    }
}
