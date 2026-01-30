import { Button, Divider, Empty, Typography } from "antd";
import { PlusOutlined, SyncOutlined } from "@ant-design/icons";

// components
import Tracker from "../global/Tracker";
import AddOtherResourcesForm from "./AddOtherResourcesForm";
import EditOtherResourcesForm from "./EditOtherResourcesForm";

// hooks
import { useOtherResources } from "../../hooks/otherResources/useOtherResources";


const { Title } = Typography;


export default function OtherResources() {

    const {
        otherResources,
        isAdding,
        editedIndex,
        adding,
        onClickEdit,
        changePoint,
        onAddOtherResources,
        onEditOtherResources,
        removeOtherResources,
    } = useOtherResources();

    return (
        <div style={styles.holder}>
            <div style={styles.header}>
                <div style={styles.headerRight}>
                    <SyncOutlined style={{ fontSize: '1.4rem', color: 'blue' }} />
                    <Title style={styles.titleText} level={5}>OTHER RESOURCES</Title>
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

            <Divider style={{ marginTop: "0.5rem", marginBottom: '1rem' }} />

            {isAdding || (otherResources && otherResources.length > 0) ? (
                <>
                    {otherResources.map((item, i) => {
                        return (
                            <>
                                {editedIndex !== i ? (
                                    <Tracker
                                        key={i}
                                        name={item.name}
                                        current={item.current}
                                        max={item.max}
                                        changeCurrent={(newCurrent) => {
                                            changePoint(newCurrent, i);
                                        }}
                                        notes={`Resets on ${item.reset}`}
                                        notes2={item.notes === "" ? undefined : item.notes}
                                        onClickEdit={() => onClickEdit(i)}
                                        editDisabled={isAdding || editedIndex !== -1}
                                    />
                                ) : (
                                    <EditOtherResourcesForm
                                        currentData={item}
                                        onSubmit={onEditOtherResources}
                                        onRemove={() => {
                                            onClickEdit(-1);
                                            removeOtherResources(i);
                                        }}
                                        onCancel={() => onClickEdit(-1)}
                                    />
                                )}
                            </>
                        )
                    })}

                    {isAdding && (
                        <AddOtherResourcesForm
                            onSubmit={onAddOtherResources}
                            onCancel={() => adding(false)}
                        />
                    )}
                </>
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
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