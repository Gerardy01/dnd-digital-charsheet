import { Button, Divider, Typography } from "antd"
import { BulbOutlined, FieldTimeOutlined, HeartTwoTone, MinusOutlined, PlusOutlined, SafetyCertificateOutlined, UpCircleOutlined } from "@ant-design/icons"

// components
import Tracker from "../global/Tracker";

// hooks
import useCombatStat from "../../hooks/combat/useCombatStat";

const { Text, Title } = Typography;



export default function CombatStat() {

    const { combatData, hpPercentage, changeHitDicePoint, changeHP, changeHpWithBtn } = useCombatStat();

    return (
        <div style={styles.holder}>
            <div style={styles.health}>
                <div style={styles.healthHolder}>
                    <div style={{ width: `${hpPercentage}%`, height: '7px', backgroundColor: 'green' }} />
                    <div style={styles.healthContent}>
                        <Button onClick={() => changeHpWithBtn(false)} icon={<MinusOutlined />} />
                        <div style={styles.healthMain}>
                            <HeartTwoTone twoToneColor="red" style={{ fontSize: '1.5rem' }} />
                            <Title level={3} style={{ margin: '0.5rem 0' }}>
                                <Text
                                    strong
                                    style={{ fontSize: '1.5rem' }}
                                    editable={{
                                        triggerType: ['text'],
                                        onChange: (newText) => {
                                            changeHP(Number(newText), combatData?.hitPoints.max ?? 0);
                                        }
                                    }}
                                >{combatData?.hitPoints.current}</Text>
                                <Text strong style={{ fontSize: '1.5rem' }}> / </Text>
                                <Text
                                    strong
                                    style={{ fontSize: '1.5rem' }}
                                    editable={{
                                        triggerType: ['text'],
                                        onChange: (newText) => {
                                            changeHP(combatData?.hitPoints.current ?? 0, Number(newText));
                                        }
                                    }}
                                >{combatData?.hitPoints.max}</Text>
                            </Title>
                            <Text strong style={styles.infoLabel}>HEALTH</Text>
                        </div>
                        <Button onClick={() => changeHpWithBtn(true)} icon={<PlusOutlined />} />
                    </div>
                </div>
                <div style={styles.statItem}>
                    <HeartTwoTone twoToneColor="orange" style={{ fontSize: '1.5rem' }} />
                    <Title
                        level={3}
                        style={{ margin: '0.5rem 0' }}
                        editable={{
                            triggerType: ['text']
                        }}
                    >{combatData?.hitPoints.temporary}</Title>
                    <Text strong style={styles.infoLabel}>TEMPORARY</Text>
                </div>
            </div>
            <div style={styles.statHolder}>
                <div style={styles.statItem}>
                    <SafetyCertificateOutlined style={{ fontSize: '1.5rem', color: 'blue' }} />
                    <Title level={4} style={{ margin: '0.5rem 0' }}>{combatData?.armorClass}</Title>
                    <Text strong style={styles.infoLabel}>ARMOR CLASS</Text>
                </div>
                <div style={styles.statItem}>
                    <BulbOutlined style={{ fontSize: '1.5rem', color: '#66D2AD' }} />
                    <Title level={4} style={{ margin: '0.5rem 0' }}>+{combatData?.initiative}</Title>
                    <Text strong style={styles.infoLabel}>INITIATIVE</Text>
                </div>
                <div style={styles.statItem}>
                    <FieldTimeOutlined style={{ fontSize: '1.5rem', color: '#F7C04A' }} />
                    <Title level={4} style={{ margin: '0.5rem 0' }}>{combatData?.speed}</Title>
                    <Text strong style={styles.infoLabel}>SPEED</Text>
                </div>
            </div>

            <div style={styles.hitDice}>
                <div style={styles.header}>
                    <div style={styles.headerRight}>
                        <UpCircleOutlined style={{ fontSize: '1.4rem', color: 'blue' }} />
                        <Title style={styles.titleText} level={5}>HIT DICE</Title>
                    </div>
                </div>

                <Divider style={{ marginTop: "0.5rem", marginBottom: '1rem' }} />

                {combatData?.hitDice.map((item, i) => {
                    return (
                        <Tracker
                            key={i}
                            name={item.class}
                            current={item.remaining}
                            max={item.total}
                            changeCurrent={(newCurrent) => {
                                changeHitDicePoint(newCurrent, item.class);
                            }}
                            notes={`Dice: ${item.type}`}
                        />
                    )
                })}
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    holder: {
        width: '100%',
        marginTop: '2rem',
    },
    health: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1.3rem',
    },
    healthHolder: {
        width: '65%',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        borderRadius: '10px',
        boxShadow: '1px 0px 10px -2px lightgray',
        overflow: 'hidden',
    },
    healthContent: {
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    healthMain: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    statHolder: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statItem: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '1px 0px 10px -2px lightgray',
        textAlign: 'center',
    },
    infoLabel: {
        color: '#6B7280',
        fontSize: '10px'
    },
    hitDice: {
        width: '100%',
        marginTop: '1.5rem',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        padding: '1rem',
        paddingBottom: '0.3rem',
        borderRadius: '10px',
        boxShadow: '1px 0px 10px -2px lightgray'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        color: '#6B7280'
    },
    titleText: {
        margin: '0px',
        marginLeft: '10px',
    }
}