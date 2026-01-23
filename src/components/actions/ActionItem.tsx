import { Divider, Tag, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

// components
import Tracker from "../global/Tracker";

// interface
import type { ActionItem } from "../../models/dataInterface"
interface Props {
    actionItem: ActionItem
}

const { Text, Title } = Typography;

export default function ActionItem({ actionItem }: Props) {
    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <div style={{ maxWidth: '80%' }}>
                    <Title level={5} style={{ marginBottom: "5px", fontSize: '17px' }}>
                        {actionItem.name} {actionItem.level ? `(Lvl ${actionItem.level})` : ''}
                    </Title>
                    <Text strong style={{ color: '#778899', fontSize: '12px' }}>{actionItem.category.toUpperCase()}</Text>
                </div>
                {actionItem.activation.type !== "" && (
                    <div style={styles.tag}>
                        <Text strong style={{ color: '#45556E', fontSize: '12px' }}>{actionItem.activation.type}</Text>
                    </div>
                )}
            </div>
            {actionItem.activation.bonus !== 0 &&
                actionItem.activation.dice !== "" && (
                    <div style={styles.activations}>
                        {actionItem.activation.bonus !== 0 && (
                            <Tag
                                style={{
                                    padding: '0.2rem 0.5rem',
                                }}
                                color="blue"
                                variant="outlined"
                            >
                                To Hit:
                                +{actionItem.activation.bonus}
                            </Tag>
                        )}
                        {actionItem.activation.dice !== "" && (
                            <Tag
                                style={{
                                    padding: '0.2rem 0.5rem',
                                }}
                                color="red"
                                variant="outlined"
                            >
                                {actionItem.activation.dice} • {actionItem.activation.damageType}
                            </Tag>
                        )}
                    </div>
                )}
            {actionItem.description && (
                <Text style={{ color: '#45556E', fontSize: '16px' }}>{actionItem.description}</Text>
            )}

            {actionItem.resource !== "" && (
                <>
                    <Divider style={{ margin: '0px' }} />
                    {typeof actionItem.resource === "string" ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ReloadOutlined />
                            <Text italic style={{ color: '#45556E' }}>Uses: {actionItem.resource}</Text>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <Text strong style={{ color: '#778899', fontSize: '12px' }}>{actionItem.resource.name.toUpperCase()}</Text>
                            <Tracker
                                name={actionItem.resource.name}
                                current={actionItem.resource.current}
                                max={actionItem.resource.max}
                                notes={`Resets on ${actionItem.resource.reset}`}

                                onlyShowTracker
                            />
                            <Text italic style={{ color: 'gray' }}>Resets on {actionItem.resource.reset}</Text>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        backgroundColor: 'white',
        borderRadius: "14px",
        padding: '16px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    tag: {
        height: 'fit-content',
        backgroundColor: '#F1F4F9',
        borderRadius: 7,
        padding: '0.4rem 0.6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activations: {
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
    }
}