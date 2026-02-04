import { Button, Divider, Empty, Switch, Typography } from "antd";
import { BookOutlined, DownOutlined, EditOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";

// components
import SpellItem from "./SpellItem";
import Icon from "../global/Icon";
import AddSpellsourceForm from "./AddSpellsourceForm";
import EditSpellsourceForm from "./EditSpellsourceForm";

// hooks
import useSpells from "../../hooks/spells/useSpells";


const { Text, Title } = Typography;



export default function Spells() {

    const {
        spellcasting,
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
    } = useSpells();

    return (
        <div style={styles.holder}>
            <div style={styles.titleHolder}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon
                        color="#F3E5F5"
                        icon={<BookOutlined style={{ fontSize: '1.3rem', color: '#5E35B1' }} />}
                        paddingBottom="0.4rem"
                    />
                    <Title level={4} style={{ marginBottom: 0 }}>Spellbook</Title>
                </div>
                {!isAddingSpellsource && editedSpellsourceIndex === -1 && (
                    <Button
                        color="primary"
                        variant="filled"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => addSpellSource(true)}
                    >Add</Button>
                )}
            </div>

            <div style={styles.filterHolder}>
                <Switch
                    checked={preparedOnly}
                    onChange={handlePreparedOnlySwitch}
                    checkedChildren="Prepared"
                    unCheckedChildren="All Spells"
                />
            </div>

            {isAddingSpellsource && (
                <AddSpellsourceForm
                    onSubmit={onAddSpellSource}
                    onCancel={() => addSpellSource(false)}
                />
            )}
            {spellcasting.length > 0 ? spellcasting.map((item, i) => (
                <div key={i} style={{ width: '100%', marginBottom: '1.5rem' }}>
                    {editedSpellsourceIndex !== i ? (
                        <div style={styles.sourceWrapper}>
                            <div style={styles.source}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Title level={4} style={{ color: 'blue' }}>{item.source} ({item.sourceType})</Title>
                                        <Button
                                            type="text"
                                            icon={<EditOutlined />}
                                            onClick={() => editSpellSource(i)}
                                            disabled={isAddingSpellsource || editedSpellsourceIndex !== -1}
                                        />
                                    </div>
                                    <Text style={{ color: '#2E3740' }}>Ability : {item.ability}</Text>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Text strong style={{ fontSize: '10px', color: 'gray' }}>SAVE DC</Text>
                                        <Text strong style={{ fontSize: '1.2rem' }}>{item.spellSaveDC}</Text>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '10px' }}>
                                        <Text strong style={{ fontSize: '10px', color: 'gray' }}>ATTACK</Text>
                                        <Text strong style={{ fontSize: '1.2rem' }}>+{item.spellAttackBonus}</Text>
                                    </div>
                                </div>
                            </div>
                            <Divider style={{ margin: '1rem 0px' }} />
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div
                                    onClick={() => handleHide(i)}
                                    style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                                    {hidedList.includes(i) ? (
                                        <DownOutlined />
                                    ) : (
                                        <UpOutlined />
                                    )}
                                    <Text>{hidedList.includes(i) ? 'Show' : 'Hide'}</Text>
                                </div>
                                <Button
                                    size="small"
                                    variant="text"
                                    color="primary"
                                    icon={<PlusOutlined />}
                                >
                                    Add Spell
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <EditSpellsourceForm
                            currentData={item}
                            onSubmit={onEditSpellSource}
                            onRemove={() => {
                                removeSpellSource();
                            }}
                            onCancel={() => editSpellSource(-1)}
                        />
                    )}

                    {!hidedList.includes(i) && (
                        <>
                            {item.spells.length > 0 ? (
                                item.spells.map((spellGroup, idx) => {
                                    return (
                                        <div key={idx}>
                                            <Text strong style={{ color: 'gray' }}>{spellGroup.levelName}</Text>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: "0.5rem" }}>
                                                {spellGroup.spells.map((spell, index) => {
                                                    return (
                                                        <SpellItem
                                                            key={index}
                                                            spell={spell}
                                                            handlePrepare={handlePrepare}
                                                            loading={loading}
                                                        />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div>
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                </div>
                            )}
                        </>
                    )}

                </div>
            )) : (
                <div style={{ paddingBottom: '2rem' }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
            )}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    holder: {
        width: '100%',
        backgroundColor: 'white',
        padding: '0rem 1rem',
        paddingBottom: '0rem',
        maxHeight: '85vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
    },
    sourceWrapper: {
        width: '100%',
        borderRadius: '10px',
        backgroundColor: '#EDF2F7',
        border: '1px solid #CBD5E0',
        boxShadow: '0 1px 4px rgba(16,24,40,0.04)',
        marginBottom: '1rem',
        padding: '1rem',
        position: 'sticky',
        top: 55,
        zIndex: 1,
    },
    source: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleHolder: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 5,
        backgroundColor: 'white',
    },
    filterHolder: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        marginTop: '0.7rem'
    }
}