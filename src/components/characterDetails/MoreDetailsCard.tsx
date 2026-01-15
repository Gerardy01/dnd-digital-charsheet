import { EditOutlined } from "@ant-design/icons";
import { Button, Input, Typography } from "antd"

// hooks
import { useMoreDetailsItem } from "../../hooks/characterDetails/useCharacterDetails";

// interfaces
interface Props {
    title: string;
    value: string;
    icon: React.ReactNode;
    onEdit: (value: string) => void;
}

const { Text } = Typography;
const { TextArea } = Input;


export default function MoreDetailsCard({ title, value, icon, onEdit }: Props) {

    const { showInput, inputValue, toggleInput, changeInputValue, resetInput } = useMoreDetailsItem();

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                {icon}
                <Text strong style={{ marginLeft: '1rem' }}>{title}</Text>
                <Button
                    type="text"
                    icon={<EditOutlined />}
                    style={{ color: 'blue' }}
                    onClick={() => {
                        toggleInput(!showInput);
                        changeInputValue(value);
                    }}
                />
            </div>
            {showInput ? (
                <TextArea
                    defaultValue={value}
                    onChange={(e) => changeInputValue(e.target.value)}
                    onBlur={() => {
                        onEdit(inputValue);
                        resetInput();
                    }}
                    onPressEnter={() => {
                        onEdit(inputValue);
                        resetInput();
                    }}
                    rows={4}
                />
            ) : (
                <Text style={{ marginTop: '0.2rem', fontSize: '0.9rem', color: 'gray' }}>{value === "" ? "-" : value}</Text>
            )}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        width: '100%',
        backgroundColor: '#F6F8FB',
        borderRadius: 7,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #E6EAF0',
        boxShadow: '0 1px 4px rgba(16,24,40,0.04)',
        // minHeight: '10rem',
        marginTop: '2rem'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.5rem'
    }
}