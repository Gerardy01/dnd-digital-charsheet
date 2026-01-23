import { Typography } from "antd";
import { FieldTimeOutlined, SafetyOutlined, ThunderboltOutlined } from "@ant-design/icons";

// components
import ActionItem from "./ActionItem";

// hooks
import useActions from "../../hooks/actions/useActions";


const { Title } = Typography;


export default function Actions() {

    const { actions } = useActions();

    return (
        <div style={styles.holder}>
            <div style={styles.titleHolder}>
                <div style={{
                    ...styles.iconHolder,
                    background: '#E8EDFF',
                    paddingBottom: '0.3rem'
                }}>
                    <ThunderboltOutlined style={{ fontSize: '1.4rem', color: '#3A36DB' }} />
                </div>
                <Title level={4} style={{ marginBottom: 0 }}>Actions</Title>
            </div>
            <div style={styles.contentHolder}>
                {actions.actions.map((item, i) => {
                    return (
                        <ActionItem
                            key={i}
                            actionItem={item}
                        />
                    )
                })}
            </div>
            <div style={styles.titleHolder}>
                <div style={{
                    ...styles.iconHolder,
                    background: '#FFE8EC',
                    paddingBottom: '0.3rem'
                }}>
                    <FieldTimeOutlined style={{ fontSize: '1.4rem', color: '#B10031' }} />
                </div>
                <Title level={4} style={{ marginBottom: 0 }}>Bonus Actions</Title>
            </div>
            <div style={styles.contentHolder}>
                {actions.bonusActions.map((item, i) => {
                    return (
                        <ActionItem
                            key={i}
                            actionItem={item}
                        />
                    )
                })}
            </div>
            <div style={styles.titleHolder}>
                <div style={{
                    ...styles.iconHolder,
                    background: '#FFF4D1',
                    paddingBottom: '0.3rem'
                }}>
                    <SafetyOutlined style={{ fontSize: '1.4rem', color: '#A35200' }} />
                </div>
                <Title level={4} style={{ marginBottom: 0 }}>Reactions</Title>
            </div>
            <div style={styles.contentHolder}>
                {actions.reactions.map((item, i) => {
                    return (
                        <ActionItem
                            key={i}
                            actionItem={item}
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
        backgroundColor: 'white',
        padding: '0rem 1rem',
        maxHeight: '70vh',
        overflow: 'auto',
    },
    titleHolder: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: '1rem'
    },
    iconHolder: {
        padding: '0.5rem',
        borderRadius: '10px'
    },
    contentHolder: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        marginBottom: '2rem'
    }
}