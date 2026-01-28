import { Checkbox, Form, InputNumber, Typography } from "antd";

const { Text } = Typography;

// interface
interface Props {
    rowName: string;
    proficiencyName: string;
    proficiencyValue: boolean;
    modifierName: string;
    modifierValue: number;
}

export default function EditRows({ rowName, proficiencyName, proficiencyValue, modifierName, modifierValue }: Props) {
    return (
        <div style={styles.formRow}>
            <div style={styles.rightRow}>
                <Form.Item
                    name={proficiencyName}
                    initialValue={proficiencyValue}
                    style={styles.formItem}
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>
                <Text>{rowName}</Text>
            </div>
            <Form.Item
                name={modifierName}
                initialValue={modifierValue}
                style={styles.formItem}
            >
                <InputNumber style={{ maxWidth: '3.5rem' }} />
            </Form.Item>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    formRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    formItem: {
        margin: '0px'
    }
}