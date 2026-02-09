import { AutoComplete, Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

// hooks
import { useEditAction } from "../../hooks/actions/useActions";

// interfaces
import type { ActionItem } from "../../models/dataInterface";
interface Props {
    currentData: ActionItem;
    onSubmit: (newData: ActionItem) => void;
    onCancel: () => void;
}


export default function EditActionForm({ currentData, onSubmit, onCancel }: Props) {

    const {
        editActionForm,
        usabilitySelection,
        damageTypeSelection,
        resourceIsTracker,
        resetSelection,
        submitEditData,
        reset,
        handleResourceIsTracker,
    } = useEditAction(onSubmit, currentData);

    return (
        <Form
            form={editActionForm}
            name="editItem"
            layout="inline"
            style={styles.form}
            onFinish={submitEditData}
        >
            <div style={styles.formContent}>
                <Form.Item
                    name="name"
                    initialValue={currentData.name}
                >
                    <Input disabled />
                </Form.Item>
                <div style={{ display: 'flex' }}>
                    <Form.Item
                        name="type"
                        rules={[
                            { required: true, message: 'Please select the usability' }
                        ]}
                        style={{ width: '50%' }}
                        help="Usability"
                        initialValue={currentData.activation.type}
                    >
                        <Select
                            options={usabilitySelection}
                            placeholder="Usability"
                        />
                    </Form.Item>
                    <Form.Item
                        name="bonus"
                        style={{ flex: '1' }}
                        help="Bonus"
                        initialValue={currentData.activation.bonus}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            placeholder="Bonus: 0"
                        />
                    </Form.Item>

                </div>
                <Form.Item
                    name="dice"
                    initialValue={currentData.activation.dice}
                >
                    <Input
                        placeholder="Dice: e.g. 2d12+3"
                    />
                </Form.Item>
                <Form.Item
                    name="damageType"
                    help="Damage Type"
                    initialValue={currentData.activation.damageType}
                >
                    <Select
                        options={damageTypeSelection}
                        placeholder="Damage Type"
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    initialValue={currentData.description}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Description (Optional)"
                    />
                </Form.Item>
                <Form.Item
                    name="resourceTracker"
                    valuePropName="checked"
                    initialValue={resourceIsTracker}
                    style={{ marginTop: '10px' }}
                >
                    <Checkbox
                        onChange={(e) => handleResourceIsTracker(e.target.checked)}
                    >Resource Using Tracker</Checkbox>
                </Form.Item>
                {!resourceIsTracker ? (
                    <Form.Item
                        name="resourceStr"
                        initialValue={typeof currentData.resource === "string" ? currentData.resource : ""}
                    >
                        <Input
                            placeholder="Resource: e.g. Spell Slots"
                        />
                    </Form.Item>
                ) : (
                    <div style={styles.formContent}>
                        <Form.Item
                            name="resourceName"
                            rules={[
                                { required: true, message: 'Please enter the resource name' }
                            ]}
                            initialValue={typeof currentData.resource === "object" ? currentData.resource.name : ""}
                        >
                            <Input
                                placeholder="Resource Name"
                            />
                        </Form.Item>
                        <Form.Item
                            name="resourceCount"
                            rules={[
                                { required: true, message: 'Please enter the resource count' }
                            ]}
                            style={{ flex: 1 }}
                            initialValue={typeof currentData.resource === "object" ? currentData.resource.max : ""}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="Count: 0"
                            />
                        </Form.Item>
                        <Form.Item
                            name="resourceReset"
                            rules={[
                                { required: true, message: 'Please enter or select the resource reset' }
                            ]}
                            initialValue={typeof currentData.resource === "object" ? currentData.resource.reset : ""}
                        >
                            <AutoComplete
                                options={resetSelection}
                                placeholder="Reset : e.g. Short Rest"
                                showSearch={{
                                    filterOption: (inputValue, option) => {
                                        return option !== undefined && option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                    }
                                }}
                            />
                        </Form.Item>
                    </div>
                )}

            </div>
            <div style={styles.btnHolder}>
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
        </Form >
    )
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
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }
}