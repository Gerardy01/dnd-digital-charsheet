import { Typography } from "antd";

// intefaces
interface Props {
    name: string;
    points: number;
    icon: React.ReactNode;
    changePassive: (newValue : string) => void;
}
const { Text } = Typography;



export default function PassiveItem({ name, points, icon, changePassive }: Props) {
    return (
        <div style={styles.holder}>
            <div style={styles.right}>
                {icon}
                <Text style={{ marginLeft: '0.5rem' }}>{name}</Text>
            </div>
            <Text
                strong
                editable={{
                    triggerType: ["text"],
                    onChange: (newText) => {changePassive(newText)}
                }}
            >
                {points}
            </Text>
        </div>
    )
}

const styles : { [key: string]: React.CSSProperties } = {
    holder: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.7rem',
        paddingRight: '0.5rem',
        paddingLeft: '0.25rem',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
    }
}