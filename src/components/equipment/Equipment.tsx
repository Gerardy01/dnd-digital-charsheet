import { Tag, Typography } from "antd"

// components
import EquipmentItem from "./equipmentItem";

// hooks
import useEquipment from "../../hooks/equipment/useEquipment";

// utils
import { CurrencyEnum } from "../../utils/enums";


const { Text } = Typography;


export default function Equipment() {

    const { equipment, weightCarried, progress, handleEquip, handleCurrency } = useEquipment();

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

            {
                equipment && (
                    <div style={styles.carryTracker}>
                        <div style={styles.carryHeader}>
                            <Text style={{ color: '#6B7280' }} strong>Carrying Capacity</Text>
                            <Text strong>{weightCarried} / {weightCarried > equipment.weightCapacity ? equipment.pushDragLift : equipment.weightCapacity} lbs</Text>
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
                )
            }

            {
                equipment?.items.map((item, index) => (
                    <EquipmentItem
                        key={index}
                        item={item}
                        handleEquip={handleEquip}
                    />
                ))
            }
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
    }
}
