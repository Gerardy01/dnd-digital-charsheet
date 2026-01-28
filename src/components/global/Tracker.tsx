import { EditOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

// interface
interface Props {
    name: string;
    current: number;
    max: number;
    changeCurrent?: (newCurrent: number) => void;
    onlyShowTracker?: boolean;
    notes?: string;
    notes2?: string;
    onClickEdit?: () => void;
    editDisabled?: boolean;
}

const { Text, Title } = Typography;

export default function Tracker({
    name,
    current,
    max,
    changeCurrent,
    notes,
    notes2,
    onlyShowTracker = false,
    onClickEdit,
    editDisabled = false,
}: Props) {

    const items = Array.from({ length: max }, (_, i) => i + 1);

    if (onlyShowTracker) {
        return (
            <div style={styles.row} aria-hidden="true">
                {items.map(i => (
                    <div
                        key={i}
                        onClick={() => {
                            if (i > current) {
                                changeCurrent && changeCurrent(i);
                            }

                            if (i <= current) {
                                changeCurrent && changeCurrent(i - 1);
                            }
                        }}
                        style={{
                            ...styles.box,
                            ...(i <= current ? styles.boxFilled : styles.boxEmpty),
                        }}
                    />
                ))}
            </div>
        );
    }
    return (
        <div style={styles.card} role="group" aria-label={`${name} ${current}/${max}`}>
            <div style={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Title level={5} style={{ margin: '0px' }}>{name}</Title>
                    {onClickEdit && (
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={onClickEdit}
                            disabled={editDisabled}
                        />
                    )}
                </div>
                <Text style={styles.fraction}>
                    {current}/{max}
                </Text>
            </div>

            <div style={styles.row} aria-hidden="true">
                {items.map(i => (
                    <div
                        key={i}
                        onClick={() => {
                            if (i > current) {
                                changeCurrent && changeCurrent(i);
                            }

                            if (i <= current) {
                                changeCurrent && changeCurrent(i - 1);
                            }
                        }}
                        style={{
                            ...styles.box,
                            ...(i <= current ? styles.boxFilled : styles.boxEmpty),
                        }}
                    />
                ))}
            </div>
            {notes && (
                <Text italic style={{ color: '#45556E' }}>{notes}</Text>
            )}
            {notes2 && (
                <Text italic style={{ color: '#45556E' }}>{notes2}</Text>
            )}
        </div>
    );
}


const styles: { [key: string]: React.CSSProperties } = {
    card: {
        backgroundColor: '#F6F8FB',
        borderRadius: 10,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 200,
        border: '1px solid #E6EAF0',
        margin: '0.7rem 0',
        boxShadow: '0 1px 4px rgba(16,24,40,0.04)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    },
    fraction: {
        fontSize: 12,
        color: '#9aa0a6',
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
    },
    box: {
        width: 20,
        height: 20,
        borderRadius: 6,
        boxSizing: 'border-box',
    },
    boxFilled: {
        background: '#1A73E8',
        border: '3px solid #1765CC',
    },
    boxEmpty: {
        background: '#F2F2F2',
        border: '3px solid #DADCE0',
    }
}