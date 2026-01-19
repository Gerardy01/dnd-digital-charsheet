import { Typography } from "antd";

// components
import SpellItem from "./SpellItem";

// hooks
import useSpells from "../../hooks/spells/useSpells";



const { Text, Title } = Typography;

export default function Spells() {

    const { spellcasting, loading, handlePrepare } = useSpells();

    return (
        <div style={styles.holder}>
            {spellcasting.map((item, i) => (
                <div key={i} style={{ width: '100%', marginBottom: '1.5rem' }}>
                    <div style={styles.source}>
                        <div>
                            <Title level={4} style={{ color: 'blue' }}>{item.source} ({item.sourceType})</Title>
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

                    {item.spells.map((spellGroup, idx) => {
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
                    })}

                </div>
            ))}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    holder: {
        width: '100%',
        backgroundColor: 'white',
        padding: '0rem 1rem',
        paddingBottom: '0rem',
        maxHeight: '70vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
    },
    source: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        padding: '1rem',
        borderRadius: '10px',
        backgroundColor: '#EDF2F7',
        border: '1px solid #CBD5E0',
        boxShadow: '0 1px 4px rgba(16,24,40,0.04)'
    }
}