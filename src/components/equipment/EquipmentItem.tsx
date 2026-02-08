import { Button, Tag, Typography } from "antd";
import { DownOutlined, EditOutlined, UpOutlined } from "@ant-design/icons";

// interface
import type { Item } from "../../models/dataInterface";
interface Props {
    item: Item;
    handleEquip: (itemName: string, equip: boolean) => void;
    onEdit: () => void;
    editBtnDisabled: boolean;
    handleClickQuantity: (itemName: string, isAdd: boolean) => void;
}

const { Title, Text } = Typography;

export default function EquipmentItem({ item, handleEquip, onEdit, editBtnDisabled, handleClickQuantity }: Props) {
    return (
        <div style={styles.card}>
            <div style={{ width: '83%' }}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '5px' }}>
                        <Title level={5} style={{
                            margin: '0px',
                            color: '#1F2D3D',
                        }}>{item.name}</Title>
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={onEdit}
                            disabled={editBtnDisabled}
                        />
                    </div>
                    {item.equipable && (
                        <div
                            style={{
                                fontSize: '10px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                            onClick={() => { handleEquip(item.name, !item.equipped) }}
                        >
                            {item.equipped ? (
                                <Tag
                                    color="green"
                                    variant="outlined"
                                >
                                    EQUIPPED
                                </Tag>
                            ) : (
                                <Tag
                                    variant="outlined"
                                >
                                    UNEQUIPPED
                                </Tag>
                            )}
                        </div>
                    )}
                </div>
                <Text style={{ color: '#2E3740' }}>
                    {item.description}
                </Text>
            </div>
            <div style={{
                width: '15%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <UpOutlined
                        style={{ fontSize: '10px', cursor: 'pointer' }}
                        onClick={() => handleClickQuantity(item.name, true)}
                    />
                    <Text style={{ fontSize: '1.1rem' }}>{item.quantity}x</Text>
                    <DownOutlined
                        style={{ fontSize: '10px', cursor: 'pointer' }}
                        onClick={() => handleClickQuantity(item.name, false)}
                    />
                </div>
                <Text strong style={{ fontSize: '10px', color: '#2E3740' }}>{item.weight} LBS</Text>
            </div>
        </div>
    )
}


const styles: { [key: string]: React.CSSProperties } = {
    card: {
        width: '100%',
        backgroundColor: '#F6F8FB',
        borderRadius: 10,
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #E6EAF0',
        margin: '0.5rem 0',
        boxShadow: '0 1px 4px rgba(16,24,40,0.04)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    }
}
