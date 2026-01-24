import { Typography } from "antd";
import { FieldTimeOutlined, SafetyOutlined, ThunderboltOutlined } from "@ant-design/icons";

// components
import ActionItem from "./ActionItem";
import Icon from "../global/Icon";

// hooks
import useActions from "../../hooks/actions/useActions";


const { Title, Text } = Typography;


export default function Actions() {

    const { actions } = useActions();

    return (
        <div style={styles.holder}>
            <div style={styles.titleHolder}>
                <Icon
                    color="#E8EDFF"
                    icon={<ThunderboltOutlined style={{ fontSize: '1.4rem', color: '#3A36DB' }} />}
                />
                <Title level={4} style={{ marginBottom: 0 }}>Actions</Title>
            </div>
            <div style={styles.contentHolder}>
                {actions.actions.length > 0 ? actions.actions.map((item, i) => {
                    return (
                        <ActionItem
                            key={i}
                            actionItem={item}
                        />
                    )
                }) : <Text italic style={{ textAlign: 'center' }}>--- No Data ---</Text>}
            </div>
            <div style={styles.titleHolder}>
                <Icon
                    color="#FFE8EC"
                    icon={<FieldTimeOutlined style={{ fontSize: '1.4rem', color: '#B10031' }} />}
                />
                <Title level={4} style={{ marginBottom: 0 }}>Bonus Actions</Title>
            </div>
            <div style={styles.contentHolder}>
                {actions.bonusActions.length > 0 ? actions.bonusActions.map((item, i) => {
                    return (
                        <ActionItem
                            key={i}
                            actionItem={item}
                        />
                    )
                }) : (
                    <Text italic style={{ textAlign: 'center' }}>--- No Data ---</Text>
                )}
            </div>
            <div style={styles.titleHolder}>
                <Icon
                    color="#FFF4D1"
                    icon={<SafetyOutlined style={{ fontSize: '1.4rem', color: '#A35200' }} />}
                />
                <Title level={4} style={{ marginBottom: 0 }}>Reactions</Title>
            </div>
            <div style={styles.contentHolder}>
                {actions.reactions.length > 0 ? actions.reactions.map((item, i) => {
                    return (
                        <ActionItem
                            key={i}
                            actionItem={item}
                        />
                    )
                }) : <Text italic style={{ textAlign: 'center' }}>--- No Data ---</Text>}
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
    contentHolder: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        marginBottom: '2rem'
    }
}