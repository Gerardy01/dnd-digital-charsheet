import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";

// hooks
import { useEditItem } from "../../hooks/equipment/useEquipment";

// utils
import { actionTypeOptionalList } from "../../utils/selectionData";

// interfaces
import type { Item } from "../../models/dataInterface";
interface Props {
    currentData: Item;
    onSubmit: (newData: Item) => void;
    onRemove: () => void;
    onCancel: () => void;
}


export default function EditItemForm({ currentData, onSubmit, onRemove, onCancel }: Props) {

    const {
        editItemForm,
        submitEditedItem,
        reset,
    } = useEditItem(onSubmit);

    return (
        <Form
            form={editItemForm}
            name="editItem"
            layout="inline"
            style={styles.form}
            onFinish={submitEditedItem}
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
                        initialValue={currentData.quantity}
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
                        initialValue={currentData.weight}
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
                    initialValue={currentData.equipable}
                >
                    <Checkbox>Equipable</Checkbox>
                </Form.Item>
                <Form.Item
                    name="actionType"
                    initialValue={currentData.actionType}
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
                    initialValue={currentData.description}
                >
                    <Input.TextArea
                        placeholder="Description"
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