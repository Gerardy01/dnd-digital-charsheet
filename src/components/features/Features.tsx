import { Tag, Typography } from "antd";

// hooks
import useFeatures from "../../hooks/features/useFeatures";

const { Text, Title } = Typography;


export default function Features() {

    const { featuresAndTraits } = useFeatures();

    return (
        <div style={styles.holder}>
            {featuresAndTraits.map((item, i) => {
                return (
                    <div style={styles.card} key={i}>
                        <div style={styles.header}>
                            <Title level={5} style={{
                                margin: '0px',
                                color: '#1F2D3D',
                                marginRight: '5px'
                            }}>{item.name}</Title>
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
                )
            })}
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
}
