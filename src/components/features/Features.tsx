import { Button, Empty, Tag, Typography } from "antd";
import { EditOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";

// hooks
import { useFeatures } from "../../hooks/features/useFeatures";

// components
import Icon from "../global/Icon";
import AddFeatures from "./AddFeatures";
import EditFeatures from "./EditFeatures";

const { Text, Title } = Typography;


export default function Features() {

    const {
        featuresAndTraits,
        isAdding,
        editedIndex,
        adding,
        onClickEdit,
        onAddFeatures,
        onEditFeatures,
        removeFeatures,
    } = useFeatures();

    return (
        <div style={styles.holder}>
            <div style={styles.titleHolder}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon
                        color="#F5F1E8"
                        icon={<UserOutlined style={{ fontSize: '1.3rem', color: '#800000' }} />}
                    />
                    <Title level={4} style={{ marginBottom: 0 }}>Features & Traits</Title>
                </div>
                {!isAdding && editedIndex === -1 && (
                    <Button
                        color="primary"
                        variant="filled"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => adding(true)}
                    >Add</Button>
                )}
            </div>
            {isAdding || featuresAndTraits.length > 0 ? (
                <>
                    {featuresAndTraits.map((item, i) => {
                        return (
                            <div key={i}>
                                {editedIndex !== i ? (
                                    <div style={styles.card}>
                                        <div style={styles.header}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '5px' }}>
                                                <Title level={5} style={{
                                                    margin: '0px',
                                                    color: '#1F2D3D',
                                                }}>{item.name}</Title>
                                                <Button
                                                    type="text"
                                                    icon={<EditOutlined />}
                                                    onClick={() => onClickEdit(i)}
                                                    disabled={isAdding || editedIndex !== -1}
                                                />
                                            </div>
                                            <Tag
                                                style={styles.tag}
                                                color="blue"
                                            >
                                                {item.sourceType} ({item.source})
                                            </Tag>
                                        </div>

                                        <Text style={{ color: '#2E3740' }}>
                                            {item.description}
                                        </Text>
                                    </div>
                                ) : (
                                    <EditFeatures
                                        currentData={item}
                                        onSubmit={onEditFeatures}
                                        onRemove={() => {
                                            removeFeatures(i);
                                        }}
                                        onCancel={() => onClickEdit(-1)}
                                    />
                                )}
                            </div>
                        )
                    })}

                    {isAdding && (
                        <AddFeatures
                            onSubmit={onAddFeatures}
                            onCancel={() => adding(false)}
                        />
                    )}
                </>
            ) : (
                <div style={{ paddingBottom: '2rem' }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
            )}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    holder: {
        width: '100%',
        backgroundColor: 'white',
        padding: '0rem 1rem',
        maxHeight: '70vh',
        overflow: 'auto'
    },
    card: {
        backgroundColor: '#F6F8FB',
        borderRadius: 10,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 200,
        border: '1px solid #E6EAF0',
        margin: '1rem 0',
        boxShadow: '0 1px 4px rgba(16,24,40,0.04)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tag: {
        padding: '4px 10px',
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 600,
    },
    titleHolder: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '1rem',
        marginBottom: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: 'white',
    }
}
