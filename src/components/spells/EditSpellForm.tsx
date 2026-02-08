import { AutoComplete, Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";

// hooks
import { useEditSpell } from "../../hooks/spells/useSpells";

// utils
import { actionTypeList } from "../../utils/selectionData";

// interface
import type { Spell } from "../../models/dataInterface";
interface Props {
    currentData: Spell;
    onSubmit: (newData: Spell) => void;
    onRemove: () => void;
    onCancel: () => void;
}



export default function EditSpellForm({
    currentData,
    onSubmit,
    onRemove,
    onCancel,
}: Props) {

    const {
        editSpellForm,
        castingTimeSelection,
        schoolOptions,
        rangeSelection,
        durationSelection,
        componentSelection,
        reset,
        submitEditData,
    } = useEditSpell(onSubmit);

    return (
        <Form
            form={editSpellForm}
            name="editSpell"
            layout="inline"
            style={styles.form}
            onFinish={submitEditData}
        >
            <div style={styles.formContent}>
                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: 'Please key in the name' }
                    ]}
                    initialValue={currentData.name}
                >
                    <Input
                        type="text"
                        placeholder="Name"
                    />
                </Form.Item>
                <div style={{ display: 'flex' }}>
                    <Form.Item
                        name="level"
                        rules={[
                            { required: true, message: 'Please key in the level' }
                        ]}
                        style={{ width: '30%' }}
                        initialValue={currentData.level}
                    >
                        <InputNumber
                            type="number"
                            placeholder="Lv : 0"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="school"
                        rules={[
                            { required: true, message: 'Please key in the school' }
                        ]}
                        style={{ flex: '1' }}
                        initialValue={currentData.school}
                    >
                        <Select
                            options={schoolOptions}
                            placeholder="School"
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    name="castingTime"
                    rules={[
                        { required: true, message: 'Please key in the casting time' }
                    ]}
                    initialValue={currentData.castingTime}
                >
                    <AutoComplete
                        options={castingTimeSelection}
                        placeholder="Casting Time e.g. Action"
                        showSearch={{
                            filterOption: (inputValue, option) => {
                                return option !== undefined && option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="range"
                    rules={[
                        { required: true, message: 'Please key in the range' }
                    ]}
                    initialValue={currentData.range}
                >
                    <AutoComplete
                        options={rangeSelection}
                        placeholder="Range e.g. 30ft"
                        showSearch={{
                            filterOption: (inputValue, option) => {
                                return option !== undefined && option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="components"
                    rules={[
                        { required: true, message: 'Please choose at least one component' }
                    ]}
                    initialValue={currentData.components}
                >
                    <Checkbox.Group
                        options={componentSelection}
                    />
                </Form.Item>
                <Form.Item
                    name="duration"
                    rules={[
                        { required: true, message: 'Please key in the duration' }
                    ]}
                    initialValue={currentData.duration}
                >
                    <AutoComplete
                        options={durationSelection}
                        placeholder="Duration e.g. 1 hour"
                        showSearch={{
                            filterOption: (inputValue, option) => {
                                return option !== undefined && option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        }}
                    />
                </Form.Item>
                <div style={{ display: 'flex' }}>
                    <Form.Item
                        name="ritual"
                        valuePropName="checked"
                        style={{ flex: '1' }}
                        initialValue={currentData.ritual}
                    >
                        <Checkbox>Ritual</Checkbox>
                    </Form.Item>
                    <Form.Item
                        name="concentration"
                        valuePropName="checked"
                        style={{ flex: '1' }}
                        initialValue={currentData.concentration}
                    >
                        <Checkbox>Concentration</Checkbox>
                    </Form.Item>
                </div>
                <Form.Item
                    name="sourcePage"
                    initialValue={currentData.sourcePage}
                >
                    <Input
                        type="text"
                        placeholder="Source Page (Optional)"
                    />
                </Form.Item>
                <Form.Item
                    name="actionType"
                    initialValue={currentData.actionType}
                    help="Select this field if this Spell need to be displayed in actions tab"
                >
                    <Select
                        options={actionTypeList}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    initialValue={currentData.description}
                >
                    <Input.TextArea
                        placeholder="Description (Optional)"
                        rows={4}
                    />
                </Form.Item>
            </div>
            <div style={styles.btnHolder}>
                <Button
                    variant="filled"
                    color="red"
                    icon={<DeleteOutlined />}
                    onClick={() => {
                        reset();
                        onRemove();
                    }}
                />
                <Form.Item
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        variant="text"
                        color="green"
                        icon={<CheckOutlined />}
                        htmlType="submit"
                        style={{ marginRight: '0.7rem' }}
                    />
                    <Button
                        variant="filled"
                        color="red"
                        icon={<CloseOutlined />}
                        style={{ marginRight: '-0.8rem' }}
                        onClick={() => {
                            reset();
                            onCancel();
                        }}
                    />
                </Form.Item>
            </div>
        </Form>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        backgroundColor: 'white',
        borderRadius: "14px",
        padding: '16px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.7rem'
    },
    formContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: 1,
    },
    btnHolder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    }
}