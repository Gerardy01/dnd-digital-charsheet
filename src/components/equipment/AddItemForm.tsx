import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

// hooks
import { useAddItem } from "../../hooks/equipment/useEquipment";

// utils
import { actionTypeOptionalList } from "../../utils/selectionData";

// interfaces
import type { Item } from "../../models/dataInterface";
interface Props {
    onSubmit: (values: Item) => void;
    onCancel: () => void;
}


export default function AddEquipment({ onSubmit, onCancel }: Props) {

    const {
        addItemForm,
        submitNewItem,
        reset,
    } = useAddItem(onSubmit);

    return (
        <Form
            form={addItemForm}
            name="addNewItem"
            layout="inline"
            style={styles.form}
            onFinish={submitNewItem}
        >
            <div style={styles.formContent}>
                <Form.Item
                    name="name"
                    rules={[
                        { required: true, message: 'Please key in the name' }
                    ]}
                >
                    <Input
                        placeholder="Name"
                        type="text"
                    />
                </Form.Item>
                <div style={{ display: 'flex' }}>
                    <Form.Item
                        name="quantity"
                        rules={[
                            { required: true, message: 'Please key in the quantity' }
                        ]}
                        style={{ flex: '1' }}
                    >
                        <InputNumber
                            type="number"
                            placeholder="Qty : 0"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="weight"
                        rules={[
                            { required: true, message: 'Please key in the weight' }
                        ]}
                        style={{ flex: '1' }}
                    >
                        <InputNumber
                            type="number"
                            placeholder="Weight"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    name="equipable"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Checkbox>Equipable</Checkbox>
                </Form.Item>
                <Form.Item
                    name="actionType"
                    initialValue=""
                    help="Select this field if this Item need to be displayed in actions tab"
                >
                    <Select
                        options={actionTypeOptionalList}
                    />
                </Form.Item>
                <Form.Item
                    name="description"
                    rules={[
                        { required: true, message: 'Please key in the description' }
                    ]}
                >
                    <Input.TextArea
                        placeholder="Description"
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
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    form: {
        width: '100%',
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