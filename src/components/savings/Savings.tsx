import { Divider, Typography } from "antd"
import { SafetyOutlined } from "@ant-design/icons"


const { Title } = Typography;


export default function Savings() {
    return (
        <div style={styles.savingsHolder}>
            <div style={styles.header}>
                <div style={styles.headerRight}>
                    <SafetyOutlined style={{ fontSize: '1.5rem', color: 'blue' }} />
                    <Title style={styles.titleText} level={5}>SAVING THROWS</Title>
                </div>
            </div>
            <Divider style={{ marginTop: " 0.5rem" }} />

            
        </div>
    )
}

const styles : { [key: string]: React.CSSProperties } = {
    savingsHolder : {
        width: '100%',
        marginTop: '2rem',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '1px 0px 10px -2px lightgray'
    },
    header : {
        display: 'flex',
        justifyContent: 'space-between',
    },
    headerRight : {
        display: 'flex',
        alignItems: 'center',
        color: '#6B7280'
    },
    titleText : {
        margin: '0px',
        marginLeft: '10px',
    }
}