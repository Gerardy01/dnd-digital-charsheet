import { AutoComplete, Button, Form, Input, Select } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

// hooks
import { useAddFeatures } from "../../hooks/features/useFeatures";

// interfaces
import type { FeaturesAndTraits } from "../../models/dataInterface";
interface Props {
    onSubmit: (values: FeaturesAndTraits) => void;
    onCancel: () => void;
}

export default function AddFeatures({ onSubmit, onCancel }: Props) {

    const {
        addFeaturesForm,
        sourceTypeSelection,
        actionTypeSelection,
        submitNewFeatures,
        reset,
    } = useAddFeatures(onSubmit);

    return (
        <Form
            form={addFeaturesForm}
            name="addNewFeatures"
            layout="inline"
            style={styles.form}
            onFinish={submitNewFeatures}
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
                    name="sourceType"
                    rules={[
                        { required: true, message: 'Please select or key in the source' }
                    ]}
                >
                    <AutoComplete
                        options={sourceTypeSelection}
                        placeholder="Source"
                        showSearch={{
                            filterOption: (inputValue, option) => {
                                return option !== undefined && option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="source"
                    rules={[
                        { required: true, message: 'Please key in the source name' }
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Source Name : e.g. Elf"
                    />
                </Form.Item>
                <Form.Item
                    name="actionType"
                    initialValue=""
                    help="Select this field if this Feature need to be displayed in actions tab"
                >
                    <Select
                        options={actionTypeSelection}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                >
                    <Input.TextArea
                        placeholder="Description (Optional)"
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