import { Button, Spin, Tag, Tooltip, Typography } from "antd";
import { ThunderboltOutlined, InfoCircleOutlined, CheckCircleFilled, LoadingOutlined, EditOutlined } from "@ant-design/icons";

// interfaces
import type { Spell } from "../../models/dataInterface"

interface Props {
    spell: Spell;
    handlePrepare: (spellName: string, prepared: boolean, level: number) => void;
    loading: boolean;
    onEdit: () => void;
    editBtnDisabled: boolean;
}

const { Text, Title } = Typography;

export default function SpellItem({ spell, handlePrepare, loading, onEdit, editBtnDisabled }: Props) {
    return (
        <div style={{ ...styles.card, border: `${spell.prepared ? '1px solid #5B5FEF' : '1px solid #E2E8F0'}` }}>
            <div style={styles.headerRow}>
                <div style={styles.titleSection}>
                    <Title level={5} style={{ margin: 0 }}>{spell.name}</Title>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        style={{ marginRight: '8px' }}
                        onClick={onEdit}
                        disabled={editBtnDisabled}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Tag variant="outlined">Lvl {spell.level} • {spell.school}</Tag>
                        {spell.ritual && (
                            <Tooltip title="Ritual">
                                <Tag variant="outlined" color="orange">
                                    <Text strong style={{ color: '#F2994A', fontSize: '12px' }}>R</Text>
                                </Tag>
                            </Tooltip>
                        )}
                    </div>
                </div>
                <div
                    style={styles.toggleSection}
                    onClick={() => handlePrepare(spell.name, !spell.prepared, spell.level)}
                >
                    {loading ? (
                        <Spin indicator={<LoadingOutlined spin />} size="small" />
                    ) : spell.prepared ? (
                        <CheckCircleFilled style={{ fontSize: '24px', color: '#5B5FEF' }} />
                    ) : (
                        <div style={styles.unpreparedCircle}></div>
                    )}
                </div>
            </div>

            <div style={styles.statsGrid}>
                <div style={styles.statItem}>
                    <Tooltip title="Casting Time">
                        <ThunderboltOutlined style={{ color: '#F2994A', marginRight: 6 }} />
                    </Tooltip>
                    <Text>{spell.castingTime}</Text>
                </div>
                <div style={styles.statItem}>
                    <Tooltip title="Range">
                        <InfoCircleOutlined style={{ color: '#2F80ED', marginRight: 6 }} />
                    </Tooltip>
                    <Text>{spell.range}</Text>
                </div>
                <div style={styles.statItem}>
                    <Text type="secondary" style={styles.label}>Dur:</Text>
                    <Text>{spell.concentration ? 'Concentration, ' : ''}{spell.duration}</Text>
                </div>
                <div style={styles.statItem}>
                    <Text type="secondary" style={styles.label}>Comp:</Text>
                    <Text>
                        {spell.components.map((item, i) => (
                            <span key={i}>{item}{i < spell.components.length - 1 ? ', ' : ''}</span>
                        ))}
                    </Text>
                </div>
            </div>

            <div style={styles.descriptionBox}>
                <Text style={{ fontStyle: 'italic', color: '#4A5568', display: 'block', marginBottom: 8 }}>
                    {spell.description}
                </Text>
                <div style={styles.sourcePage}>
                    <Text type="secondary" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                        {spell.sourcePage?.toUpperCase()}
                    </Text>
                </div>
            </div>
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
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleSection: {
        maxWidth: '85%',
        display: 'flex',
        alignItems: 'center',
        rowGap: '4px',
        flexWrap: 'wrap'
    },
    toggleSection: {
        display: 'flex',
        alignItems: 'center',
    },
    unpreparedCircle: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        border: '2px solid #CBD5E0',
        cursor: 'pointer'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px 16px',
    },
    statItem: {
        display: 'flex',
        // alignItems: 'center',
        fontSize: '0.9rem'
    },
    label: {
        minWidth: '30px',
        fontWeight: 600,
        marginRight: 4,
        color: '#A0AEC0'
    },
    descriptionBox: {
        backgroundColor: '#F8FAFC',
        borderRadius: 8,
        padding: '12px',
        position: 'relative'
    },
    sourcePage: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '4px'
    }
}