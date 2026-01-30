import { AutoComplete, Button, Form, Input, InputNumber } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

// hooks
import { useAddOtherResources } from "../../hooks/otherResources/useOtherResources";

// interfaces
import type { OtherResources } from "../../models/dataInterface";
interface Props {
    onSubmit: (values: OtherResources) => void;
    onCancel: () => void;
}

export default function AddOtherResourcesForm({ onSubmit, onCancel }: Props) {

    const {
        addOtherResourcesForm,
        resetSelection,
        submitNewOtherResources,
        reset
    } = useAddOtherResources(onSubmit);

    return (
        <Form
            form={addOtherResourcesForm}
            name="add"
            layout="inline"
            style={styles.form}
            onFinish={submitNewOtherResources}
        >
            <div style={styles.formContent}>
                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: 'Please key in the name' }
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Name"
                    />
                </Form.Item>
                <Form.Item
                    name="count"
                    rules={[
                        { type: 'number', min: 1, message: 'Count minimum is 1' },
                        { required: true, message: 'Please key in the count' }
                    ]}
                >
                    <InputNumber
                        type="number"
                        placeholder="Count : 0"
                    />
                </Form.Item>
                <Form.Item
                    name="reset"
                    rules={[
                        { required: true, message: 'Please key in the reset' }
                    ]}
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
                <Form.Item
                    name="notes"
                >
                    <Input.TextArea
                        placeholder="Notes (Optional)"
                        rows={4}
                    />
                </Form.Item>
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
        </Form>
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