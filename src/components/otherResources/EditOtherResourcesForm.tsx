import { AutoComplete, Button, Form, Input, InputNumber } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";


// hooks
import { useEditOtherResources } from "../../hooks/otherResources/useOtherResources";

// interface
import type { OtherResources } from "../../models/dataInterface";
interface Props {
    currentData: OtherResources;
    onSubmit: (newData: OtherResources) => void;
    onRemove: () => void;
    onCancel: () => void;
}


export default function EditOtherResourcesForm({
    currentData,
    onSubmit,
    onRemove,
    onCancel,
}: Props) {

    const {
        editOtherResourcesForm,
        resetSelection,
        submitEditData,
        reset,
    } = useEditOtherResources(onSubmit);

    return (
        <Form
            form={editOtherResourcesForm}
            name="edit"
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
                <Form.Item
                    name="count"
                    rules={[
                        { type: 'number', min: 1, message: 'Count minimum is 1' },
                        { required: true, message: 'Please key in the count' }
                    ]}
                    initialValue={currentData.max}
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
                    initialValue={currentData.reset}
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
                    initialValue={currentData.notes}
                >
                    <Input.TextArea
                        placeholder="Notes (Optional)"
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
                        onCancel();
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
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    }
}