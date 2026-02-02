import { Divider, Tag, Typography, Form, Button, Select, Input } from "antd"
import { CheckOutlined, CloseOutlined, PlusOutlined, SafetyCertificateOutlined, SafetyOutlined, ThunderboltOutlined, WarningOutlined } from "@ant-design/icons"

// hooks
import useDefense from "../../hooks/defense/useDefense";

// utils
import { DefensesTypeEnum } from "../../utils/enums";


const { Title, Text } = Typography;


export default function Defenses() {

    const {
        defenses,
        inputVisible,
        addDefensesForm,
        defensesTypeSelection,
        handleRemove,
        resetInput,
        showInput,
        submitNewDefenses,
    } = useDefense();

    return (
        <div style={styles.skillsHolder}>
            <div style={styles.header}>
                <div style={styles.headerRight}>
                    <SafetyCertificateOutlined style={{ fontSize: '1.4rem', color: 'blue' }} />
                    <Title style={styles.titleText} level={5}>DEFENSES</Title>
                </div>
            </div>

            <Divider style={{ marginTop: "0.5rem", marginBottom: '1rem' }} />

            <div style={styles.holder}>
                {defenses.map((item, i) => {
                    return (
                        <div key={i}>
                            {item.type === DefensesTypeEnum.RESISTANCE ? (
                                <Tag
                                    variant="outlined"
                                    icon={<SafetyOutlined />}
                                    style={styles.tag}
                                    color={'green'}
                                    closable
                                    onClose={(e) => {
                                        e.preventDefault();
                                        handleRemove(item.name);
                                    }}
                                >
                                    <div style={styles.tagContent}>
                                        <Text strong style={{ marginRight: '7px', color: 'green' }}>{item.name}</Text>
                                        <div style={{ height: '15px', width: '2px', backgroundColor: 'green' }} />
                                        <Text style={{ fontSize: '10px', marginLeft: '7px', color: 'darkgreen' }}>RES</Text>
                                    </div>
                                </Tag>
                            ) : item.type === DefensesTypeEnum.IMMUNITIES ? (
                                <Tag
                                    variant="outlined"
                                    icon={<ThunderboltOutlined />}
                                    style={styles.tag}
                                    color={'purple'}
                                    closable
                                    onClose={(e) => {
                                        e.preventDefault();
                                        handleRemove(item.name);
                                    }}
                                >
                                    <div style={styles.tagContent}>
                                        <Text strong style={{ marginRight: '7px', color: 'purple' }}>{item.name}</Text>
                                        <div style={{ height: '15px', width: '2px', backgroundColor: 'purple' }} />
                                        <Text style={{ fontSize: '10px', marginLeft: '7px', color: 'darkblue' }}>IMM</Text>
                                    </div>
                                </Tag>
                            ) : (
                                <Tag
                                    variant="outlined"
                                    icon={<WarningOutlined />}
                                    style={styles.tag}
                                    color={'red'}
                                    closable
                                    onClose={(e) => {
                                        e.preventDefault();
                                        handleRemove(item.name);
                                    }}
                                >
                                    <div style={styles.tagContent}>
                                        <Text strong style={{ marginRight: '7px', color: 'red' }}>{item.name}</Text>
                                        <div style={{ height: '15px', width: '2px', backgroundColor: 'red' }} />
                                        <Text style={{ fontSize: '10px', marginLeft: '7px', color: 'brown' }}>VUL</Text>
                                    </div>
                                </Tag>
                            )}
                        </div>
                    )
                })}

                {inputVisible ? (
                    <Form
                        name="defenses"
                        form={addDefensesForm}
                        style={styles.form}
                        onFinish={submitNewDefenses}
                    >
                        <Form.Item name="name">
                            <Input
                                type="text"
                                size="small"
                                placeholder="name"
                                style={styles.tagInputStyle}
                            />
                        </Form.Item>
                        <Form.Item name="type">
                            <Select
                                size="small"
                                style={styles.tagInputStyle}
                                placeholder="Type"
                                options={defensesTypeSelection}
                            />
                        </Form.Item>
                        <Form.Item style={{ marginRight: '10px' }}>
                            <Button htmlType="submit" icon={<CheckOutlined />} color="green" variant="text" />
                        </Form.Item>
                        <Button variant="filled" icon={<CloseOutlined />} color="red" onClick={resetInput} />
                    </Form>
                ) : (
                    <Tag
                        style={styles.tagPlusStyle}
                        icon={<PlusOutlined />}
                        onClick={() => showInput(true)}
                    >
                        Add
                    </Tag>
                )}
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    skillsHolder: {
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
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        color: '#6B7280'
    },
    titleText: {
        margin: '0px',
        marginLeft: '10px',
    },
    holder: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
        marginTop: '0.7rem'
    },
    tag: {
        width: 'fit-content',
        padding: '2px 8px',
        borderRadius: 6,
        fontWeight: 'bold',
        display: 'flex'
    },
    tagContent: {
        display: 'flex',
        alignItems: 'center'
    },
    tagPlusStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        borderStyle: 'dashed',
        color: 'blue',
        padding: '2px 8px',
        fontSize: 10,
        cursor: 'pointer',
    },
    tagInputStyle: {
        width: "7rem",
        height: '1.8rem',
        marginInlineEnd: 8,
        verticalAlign: 'top',
    },
    form: {
        display: 'flex'
    }
}