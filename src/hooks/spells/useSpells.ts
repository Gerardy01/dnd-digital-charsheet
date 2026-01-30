import { useEffect, useState } from "react";


// hooks
import useDataHandler from "../global/useDataHandler"

// DTO
import type { Spell, SpellcastingSource, SpellcastingTransformed, SpellTransformed } from "../../models/dataInterface";


export default function useSpells() {

    const { getSpellsData } = useDataHandler();

    const [spellcasting, setSpellcasting] = useState<SpellcastingSource[]>(() => {
        return getSpellsData();
    });

    const [transformed, setTransformed] = useState<SpellcastingTransformed[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [preparedOnly, setPreparedOnly] = useState<boolean>(false);
    const [hidedList, setHidedList] = useState<number[]>([]);

    useEffect(() => {
        handleTransform();
    }, [spellcasting, preparedOnly]);

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

    return {
        spellcasting: transformed,
        loading,
        preparedOnly,
        hidedList,
        handlePrepare,
        handlePreparedOnlySwitch,
        handleHide,
    }
}