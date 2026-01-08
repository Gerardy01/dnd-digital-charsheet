import { Typography, Tag } from "antd"; 

// interfaces
import type { AbilityScore } from "../../models/dataInterface";
interface Props {
    name : string;
    abilityScore : AbilityScore
}

const { Text, Title } = Typography;



export default function AbilityItem({ name, abilityScore } : Props) {



    return (
        <div style={styles.itemHolder}>
            <Text strong style={styles.infoLabel}>{name}</Text>
            <Title
                level={4}
                style={styles.modifier}
                editable={{
                    triggerType: ['text']
                }}
            >{abilityScore.modifier > 0 ? `+${abilityScore.modifier}` : abilityScore.modifier}</Title>
            <Tag color="cyan" variant="outlined" style={{ borderRadius: '15px' }}>
                <Text
                    strong
                    editable={{
                        triggerType: ['text']
                    }}
                >{abilityScore.score}</Text>
            </Tag>
        </div>
    )
}

const styles : { [key: string]: React.CSSProperties } = {
    itemHolder : {
        width: '49%',
        backgroundColor: "#F2F5F9",
        display: 'flex',
        flexDirection: 'column',
        alignItems : 'center',
        border: '1px solid lightgray',
        borderRadius: '5px',
        padding: '0.5rem'
    },
    infoLabel : {
        color: '#6B7280',
        fontSize: '10px'
    },
    modifier : {
        margin: '0px'
    }
}