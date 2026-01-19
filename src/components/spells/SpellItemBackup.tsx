import { Tag, Typography } from "antd";

// interfaces
import type { Spell } from "../../models/dataInterface"
interface Props {
    spell: Spell
}

const { Text } = Typography;


export default function SpellItem({ spell }: Props) {
    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <Text strong style={{ fontSize: '1rem' }}>{spell.name}</Text>
                    {spell.prepared ? (
                        <Tag
                            color="blue"
                            variant="outlined"
                        >
                            PREPARED
                        </Tag>
                    ) : (
                        <></>
                    )}
                </div>
                <Text style={{ color: 'gray' }}>{spell.school}</Text>
            </div>

            <div style={{ color: '#2E3740' }}>
                <div style={{ marginBottom: '5px' }}>
                    <Text>{spell.castingTime}</Text>{" • "}
                    <Text>{spell.range}</Text>{" • "}
                    <Text>
                        {spell.components.map((item, i) => {
                            const isLastKey = spell.components.length - 1 === i;
                            const word = !isLastKey ? `${item}, ` : item;
                            return (<>{word}</>)
                        })}
                    </Text>
                </div>
                <div style={{ marginBottom: '5px' }}>
                    <Text>{spell.duration}</Text>
                </div>
                <div>
                    <Text>{spell.description}</Text>
                    <Text> ({spell.sourcePage})</Text>
                </div>
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: '0.7rem 1rem',
        border: '1px solid #E6EAF0',
        margin: '0.5rem 0',
        boxShadow: '0 1px 4px rgba(16,24,40,0.04)',
    },
    header: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '5px'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
    }
}