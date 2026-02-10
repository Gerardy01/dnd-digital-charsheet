import { Button, Tag, Typography } from "antd"
import { EditOutlined, InboxOutlined, PlusOutlined, SketchOutlined } from "@ant-design/icons";

// components
import EquipmentItem from "./EquipmentItem";
import Icon from "../global/Icon";
import AddItemForm from "./AddItemForm";
import EditItemForm from "./EditItemForm";
import EditCarryCapacityForm from "./EditCarryCapacityForm";

// hooks
import useEquipment from "../../hooks/equipment/useEquipment";

// utils
import { CurrencyEnum } from "../../utils/enums";


const { Text, Title } = Typography;


export default function Equipment() {

    const {
        equipment,
        weightCarried,
        progress,
        addItem,
        addMagicItem,
        editItemIdx,
        editMagicItemIdx,
        editCapacity,
        handleEquip,
        handleCurrency,
        addingItem,
        addingMagicItem,
        editItem,
        editMagicItem,
        handleClickQuantity,
        onAddItem,
        onAddMagicItem,
        onEditItem,
        onEditMagicItem,
        removeItem,
        removeMagicItem,
        onEditCapacity,
        handleEditCapacity,
    } = useEquipment();

    return (
        <div style={styles.holder}>
            <div style={styles.currencyHolder}>
                <Tag
                    style={styles.currency}
                >
                    <Text strong style={{ color: '#A0522D' }}>CP</Text>
                    <Text
                        strong
                        editable={{
                            triggerType: ['text'],
                            onChange: (newText) => { handleCurrency(CurrencyEnum.CP, newText) }
                        }}
                    >{equipment ? equipment.currency.cp : 0}</Text>
                </Tag>
                <Tag
                    style={styles.currency}
                >
                    <Text strong style={{ color: '#6B7280' }}>SP</Text>
                    <Text
                        strong
                        editable={{
                            triggerType: ['text'],
                            onChange: (newText) => { handleCurrency(CurrencyEnum.SP, newText) }
                        }}
                    >{equipment ? equipment.currency.sp : 0}</Text>
                </Tag>
                <Tag
                    style={styles.currency}
                >
                    <Text strong style={{ color: '#DDAF52' }}>EP</Text>
                    <Text
                        strong
                        editable={{
                            triggerType: ['text'],
                            onChange: (newText) => { handleCurrency(CurrencyEnum.EP, newText) }
                        }}
                    >{equipment ? equipment.currency.ep : 0}</Text>
                </Tag>
                <Tag
                    style={styles.currency}
                >
                    <Text strong style={{ color: '#FFD700' }}>GP</Text>
                    <Text
                        strong
                        editable={{
                            triggerType: ['text'],
                            onChange: (newText) => { handleCurrency(CurrencyEnum.GP, newText) }
                        }}
                    >{equipment ? equipment.currency.gp : 0}</Text>
                </Tag>
                <Tag
                    style={styles.currency}
                >
                    <Text strong style={{ color: '#B7C9E2' }}>PP</Text>
                    <Text
                        strong
                        editable={{
                            triggerType: ['text'],
                            onChange: (newText) => { handleCurrency(CurrencyEnum.PP, newText) }
                        }}
                    >{equipment ? equipment.currency.pp : 0}</Text>
                </Tag>
            </div>

            {equipment && (
                <>
                    {!editCapacity ? (
                        <div style={styles.carryTracker}>
                            <div style={styles.carryHeader}>
                                <div>
                                    <Text style={{ color: '#6B7280' }} strong>Carrying Capacity</Text>
                                    <Button
                                        type="text"
                                        icon={<EditOutlined />}
                                        onClick={() => handleEditCapacity(true)}
                                    />
                                </div>
                                <Text strong>
                                    {weightCarried} / {" "}
                                    {weightCarried > equipment.weightCapacity ? (
                                        <Text>{equipment.pushDragLift}</Text>
                                    ) : (
                                        <Text>{equipment.weightCapacity}</Text>
                                    )}
                                    {" "}lbs
                                </Text>
                            </div>
                            <div style={styles.progress}>
                                <div
                                    style={{
                                        width: `${progress}%`,
                                        height: '100%',
                                        backgroundColor: `${weightCarried > equipment?.weightCapacity ? 'red' : 'blue'}`
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <EditCarryCapacityForm
                            currentData={equipment}
                            onSubmit={onEditCapacity}
                            onCancel={() => handleEditCapacity(false)}
                        />
                    )}
                </>
            )}
            <div style={{ marginTop: '0.5rem' }} />
            <div style={styles.titleHolder}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon
                        color="#FFF4D1"
                        icon={<InboxOutlined style={{ fontSize: '1.3rem', color: '#A35200' }} />}
                        paddingBottom="0.4rem"
                    />
                    <Title level={4} style={{ marginBottom: 0 }}>Items</Title>
                </div>
                {!addItem && editItemIdx === -1 && (
                    <Button
                        color="primary"
                        variant="filled"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => addingItem(true)}
                    >Add</Button>
                )}
            </div>
            {addItem || (equipment && equipment.items.length > 0) ? (
                <div style={{ width: '100%' }}>
                    {equipment?.items.map((item, index) => (
                        <div key={index}>
                            {editItemIdx !== index ? (
                                <EquipmentItem
                                    item={item}
                                    handleEquip={(itemName, equip) => handleEquip(itemName, equip, 'item')}
                                    onEdit={() => editItem(index)}
                                    editBtnDisabled={editItemIdx !== -1 || addItem}
                                    handleClickQuantity={(itemName, isAdd) => handleClickQuantity(itemName, isAdd, 'item')}
                                />
                            ) : (
                                <EditItemForm
                                    currentData={item}
                                    onSubmit={onEditItem}
                                    onRemove={removeItem}
                                    onCancel={() => editItem(-1)}
                                />
                            )}
                        </div>
                    ))}

                    {addItem && (
                        <AddItemForm
                            onSubmit={onAddItem}
                            onCancel={() => addingItem(false)}
                        />
                    )}
                </div>
            ) : (
                <Text italic style={{ textAlign: 'center' }}>--- No Data ---</Text>
            )}
            <div style={{ marginTop: '1.5rem' }} />
            <div style={styles.titleHolder}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon
                        color="#FFF4D1"
                        icon={<SketchOutlined style={{ fontSize: '1.3rem', color: '#A35200' }} />}
                    />
                    <Title level={4} style={{ marginBottom: 0 }}>Attuned Magic Items</Title>
                </div>
                {!addMagicItem && editMagicItemIdx === -1 && (
                    <Button
                        color="primary"
                        variant="filled"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => addingMagicItem(true)}
                    >Add</Button>
                )}
            </div>
            {addMagicItem || (equipment && equipment.attunedMagicItems.length > 0) ? (
                <div style={{ width: '100%' }}>
                    {equipment?.attunedMagicItems.map((item, index) => (
                        <div key={index}>
                            {editMagicItemIdx !== index ? (
                                <EquipmentItem
                                    item={item}
                                    handleEquip={(itemName, equip) => handleEquip(itemName, equip, 'magicItem')}
                                    onEdit={() => editMagicItem(index)}
                                    editBtnDisabled={editMagicItemIdx !== -1 || addMagicItem}
                                    handleClickQuantity={(itemName, isAdd) => handleClickQuantity(itemName, isAdd, 'magicItem')}
                                />
                            ) : (
                                <EditItemForm
                                    currentData={item}
                                    onSubmit={onEditMagicItem}
                                    onRemove={removeMagicItem}
                                    onCancel={() => editMagicItem(-1)}
                                />
                            )}
                        </div>
                    ))}

                    {addMagicItem && (
                        <AddItemForm
                            onSubmit={onAddMagicItem}
                            onCancel={() => addingMagicItem(false)}
                        />
                    )}
                </div>
            ) : (
                <div style={{ paddingBottom: '2rem' }}>
                    <Text italic style={{ textAlign: 'center' }}>--- No Data ---</Text>
                </div>
            )}
        </div >
    )
}


const styles: { [key: string]: React.CSSProperties } = {
    holder: {
        width: '100%',
        backgroundColor: 'white',
        padding: '0rem 1rem',
        paddingBottom: '0.7rem',
        maxHeight: '70vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    currencyHolder: {
        width: '80%',
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '1.3rem'
    },
    currency: {
        borderRadius: '1rem',
        padding: '3px 0.7rem',
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        border: '1px solid #E5E7EB',
    },
    carryTracker: {
        width: '100%',
        padding: '1rem',
        backgroundColor: '#F6F8FB',
        borderRadius: 12,
        border: '1px solid #E6EAF0',
        boxShadow: '0 1px 4px rgba(16,24,40,0.04)',
        marginBottom: '1.3rem'
    },
    carryHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem'
    },
    progress: {
        width: '100%',
        height: '0.5rem',
        borderRadius: 12,
        backgroundColor: '#E6EAF0',
        overflow: 'hidden'
    },
    titleHolder: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '0.7rem',
        position: 'sticky',
        top: 0,
        zIndex: 5,
        backgroundColor: 'white',
    }
}
