import { Typography, Tag } from "antd";


// interfaces
import type { AbilityScore, AbilityScores } from "../../models/dataInterface";
interface Props {
    name: string;
    abilityScore: AbilityScore
    abilityName: keyof AbilityScores;
    changeAbilityModifier: (abilityName: keyof AbilityScores, newModifier: string) => void;
    changeAbilityScore: (abilityName: keyof AbilityScores, newScore: string) => void;
}

const { Text, Title } = Typography;



export default function AbilityItem({ name, abilityScore, abilityName, changeAbilityModifier, changeAbilityScore }: Props) {
    return (
        <div style={styles.itemHolder}>
            <Text strong style={styles.infoLabel}>{name}</Text>
            <Title
                level={4}
                style={styles.modifier}
                editable={{
                    triggerType: ['text'],
                    onChange: (newText) => { changeAbilityModifier(abilityName, newText) }
                }}
            >{abilityScore.modifier >= 0 ? `+${abilityScore.modifier}` : abilityScore.modifier}</Title>
            <Tag color="cyan" variant="outlined" style={{ borderRadius: '15px' }}>
                <Text
                    strong
                    editable={{
                        triggerType: ['text'],
                        onChange: (newText) => { changeAbilityScore(abilityName, newText) }
                    }}
                >{abilityScore.score}</Text>
            </Tag>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    itemHolder: {
        width: '49%',
        backgroundColor: "#F2F5F9",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid lightgray',
        borderRadius: '5px',
        padding: '0.5rem'
    },
    infoLabel: {
        color: '#6B7280',
        fontSize: '10px'
    },
    modifier: {
        margin: '0px'
    }
}