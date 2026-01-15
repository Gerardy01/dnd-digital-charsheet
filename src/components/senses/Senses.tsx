import { Button, Divider, Form, InputNumber, Select, Tag, Typography } from "antd"
import { BulbOutlined, CheckOutlined, CloseOutlined, DeploymentUnitOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons"

// components
import PassiveItem from "./PassiveItem";

// utils
import { PassiveTypeEnum } from "../../utils/enums";

// hooks
import useSenses from "../../hooks/senses/useSenses";

const { Title, Text } = Typography;



export default function Senses() {

    const {
        passiveScores,
        extraSenses,
        inputVisible,
        addSenseForm,
        sensesNameSelection,
        handleRemove,
        showInput,
        submitNewSenses,
        resetInput,
        changePassive,
    } = useSenses();

    return (
        <div style={styles.holder}>
            <div style={styles.header}>
                <div style={styles.headerRight}>
                    <DeploymentUnitOutlined style={{ fontSize: '1.4rem', color: 'blue' }} />
                    <Title style={styles.titleText} level={5}>SENSES</Title>
                </div>
            </div>

            <Divider style={{ marginTop: "0.5rem", marginBottom: '1rem' }} />

            {passiveScores && (
                <>
                    <PassiveItem
                        name="Passive Perception"
                        points={passiveScores.perception}
                        icon={<EyeOutlined />}
                        changePassive={(newValue : string) => {
                            changePassive(newValue, PassiveTypeEnum.PERCEPTION)
                        }}
                    />
                    <PassiveItem
                        name="Passive Insight"
                        points={passiveScores.insight}
                        icon={<BulbOutlined />}
                        changePassive={(newValue : string) => {
                            changePassive(newValue, PassiveTypeEnum.INSIGHT)
                        }}
                    />
                    <PassiveItem
                        name="Passive Investigation"
                        points={passiveScores.investigation}
                        icon={<SearchOutlined />}
                        changePassive={(newValue : string) => {
                            changePassive(newValue, PassiveTypeEnum.INVESTIGATION)
                        }}
                    />
                </>
            )}

            <Divider style={{ marginTop: "1.5rem", marginBottom: '1rem' }} />

            <Text strong >ADDITIONAL SENSES</Text>
            <div style={styles.extraHolder}>
                {extraSenses.map((item, i) => {
                    return (
                        <Tag
                            key={i}
                            style={{ ...styles.tag, border: '' }}
                            closable
                            onClose={(e) => {
                                e.preventDefault();
                                handleRemove(item.name);
                            }}
                            variant="outlined"
                        >
                            {item.name} {item.distance}ft
                        </Tag>
                    )
                })}

                {inputVisible ? (
                    <Form
                        name="extraSenses"
                        form={addSenseForm}
                        style={styles.form}
                        onFinish={submitNewSenses}
                    >
                        <Form.Item name="name">
                            <Select
                                size="small"
                                style={styles.tagInputStyle}
                                placeholder="Name"
                                options={sensesNameSelection}
                            />
                        </Form.Item>
                        <Form.Item name="distance">
                            <InputNumber
                                type="number"
                                size="small"
                                style={{...styles.tagInputStyle, width: '4.5rem'}}
                                placeholder="distance"
                            />
                        </Form.Item>
                        <Form.Item style={{ marginRight: '10px' }}>
                            <Button htmlType="submit" icon={<CheckOutlined />} color="green" variant="text" />
                        </Form.Item>
                        <Button variant="filled" icon={<CloseOutlined />} color="red" onClick={resetInput} />
                    </Form>
                ) : (
                    <>
                        {sensesNameSelection.length !== 0 && (
                            <Tag
                                style={styles.tagPlusStyle}
                                icon={<PlusOutlined />}
                                onClick={() => showInput(true)}
                            >
                                Add
                            </Tag>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}


const styles : { [key: string]: React.CSSProperties } = {
    holder : {
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
    },
    extraHolder : {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
        marginTop: '0.7rem'
    },
    tag: {
        padding: '4px 8px',
        borderRadius: 6,
    },
    tagPlusStyle : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        borderStyle: 'dashed',
        color: 'blue',
        padding: '2px 8px',
        fontSize: 10,
    },
    tagInputStyle : {
        width: "8rem",
        height: '1.8rem',
        marginInlineEnd: 8,
        verticalAlign: 'top',
    },
    form : {
        display : 'flex'
    }
}