import { Divider, Empty, Typography } from "antd";
import { SyncOutlined } from "@ant-design/icons";

// components
import Tracker from "../global/Tracker";

// hooks
import useOtherResources from "../../hooks/otherResources/useOtherResources";


const { Title } = Typography;


export default function OtherResources() {

    const { otherResources } = useOtherResources();

    return (
        <div style={styles.holder}>
            <div style={styles.header}>
                <div style={styles.headerRight}>
                    <SyncOutlined style={{ fontSize: '1.4rem', color: 'blue' }} />
                    <Title style={styles.titleText} level={5}>OTHER RESOURCES</Title>
                </div>
            </div>

            <Divider style={{ marginTop: "0.5rem", marginBottom: '1rem' }} />

            {otherResources && otherResources.length > 0 ? otherResources.map((item, i) => {
                return (
                    <Tracker
                        key={i}
                        name={item.name}
                        current={item.current}
                        max={item.max}
                        changeCurrent={(newCurrent) => {

                        }}
                        notes={`Resets on ${item.reset}`}
                        notes2={item.notes === "" ? undefined : item.notes}
                    />
                )
            }) : (
                <div style={{
                    paddingBottom: '2rem'
                }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
            )}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    holder: {
        width: '100%',
        marginTop: '2rem',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '1px 0px 10px -2px lightgray'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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