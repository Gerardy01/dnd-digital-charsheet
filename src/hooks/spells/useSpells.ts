import { useEffect, useState } from "react";
import { Form, Modal, notification, type FormProps } from "antd";

// hooks
import useDataHandler from "../global/useDataHandler"

// utils
import { SourceTypeList, abilityList } from "../../utils/selectionData";

// DTO
import type { Spell, SpellcastingSource, SpellcastingTransformed, SpellTransformed } from "../../models/dataInterface";
interface SpellSourceForm {
    source: string;
    sourceType: string;
    ability: string;
    spellSaveDC: number;
    spellAttackBonus: number;
}

const { confirm } = Modal;


export default function useSpells() {

    const { getSpellsData, changeSpellsData } = useDataHandler();

    const [spellcasting, setSpellcasting] = useState<SpellcastingSource[]>(() => {
        return getSpellsData();
    });

    const [transformed, setTransformed] = useState<SpellcastingTransformed[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [preparedOnly, setPreparedOnly] = useState<boolean>(false);
    const [hidedList, setHidedList] = useState<number[]>([]);

    const [isAddingSpellsource, setIsAddingSpellsource] = useState<boolean>(false);
    const [editedSpellsourceIndex, setEditedSpellsourceIndex] = useState<number>(-1);

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
        })
        setSpellcasting(updatedData);
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

        const preparedSpells = spellcasting[editedSpellsourceIndex].spells.filter(spell => spell.prepared);

        if (preparedSpells.length > 0) {
            notification.warning({
                message: 'Spell Source Cannot Be Deleted',
                description: 'Please unprepare all spells in this spell source before deleting it.',
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
                const updatedData = spellcasting.filter((_, i) => i !== editedSpellsourceIndex);
                setSpellcasting(updatedData);
                editSpellSource(-1);
            },
        });
    }

    return {
        spellcasting: transformed,
        loading,
        preparedOnly,
        hidedList,
        isAddingSpellsource,
        editedSpellsourceIndex,
        handlePrepare,
        handlePreparedOnlySwitch,
        handleHide,
        addSpellSource,
        editSpellSource,
        onAddSpellSource,
        onEditSpellSource,
        removeSpellSource,
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
