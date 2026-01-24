import { Typography } from "antd"

// interfaces
interface Props {
    title: string;
    value: string;
    onEdit: (value: string) => void;
}

const { Text } = Typography;



export default function AppearanceItem({ title, value, onEdit }: Props) {
    return (
        <div style={styles.card}>
            <Text strong style={styles.infoLabel}>{title}</Text>
            <Text
                strong
                style={{ margin: '0px', fontSize: '16px' }}
                editable={{
                    triggerType: ['text'],
                    onChange: (newText) => { onEdit(newText) }
                }}
            >{value || "-"}</Text>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        width: '48.5%',
        backgroundColor: '#F6F8FB',
        borderRadius: 7,
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #E6EAF0',
        boxShadow: '0 1px 4px rgba(16,24,40,0.04)'
    },
    infoLabel: {
        color: '#6B7280',
        fontSize: '10px'
    },
}