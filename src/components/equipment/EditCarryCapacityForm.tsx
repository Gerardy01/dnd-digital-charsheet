import { Button, Form, InputNumber } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

// hooks
import { useEditCapacity } from "../../hooks/equipment/useEquipment";

// interfaces
interface Props {
    currentData: { weightCapacity: number; pushDragLift: number };
    onSubmit: (newData: { weightCapacity: number; pushDragLift: number }) => void;
    onCancel: () => void;
}


export default function EditCarryCapacityForm({ currentData, onSubmit, onCancel }: Props) {

    const { editCapacityForm, submitEditedCapacity, reset } = useEditCapacity(onSubmit);

    return (
        <Form
            form={editCapacityForm}
            name="editCapacity"
            layout="inline"
            style={styles.form}
            onFinish={submitEditedCapacity}
        >
            <div style={styles.formContent}>
                <Form.Item
                    name="weightCapacity"
                    rules={[
                        { required: true, message: 'Please key in the weight capacity' },
                        { type: 'number', min: 1, message: 'Weight capacity must be at least 1' }
                    ]}
                    style={{ flex: '1' }}
                    initialValue={currentData.weightCapacity}
                    help="Weight Capacity"
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        type="number"
                        placeholder="Weight Capacity"
                    />
                </Form.Item>
                <Form.Item
                    name="pushDragLift"
                    rules={[
                        { required: true, message: 'Please key in the push/drag/lift' },
                        { type: 'number', min: 1, message: 'Push/drag/lift must be at least 1' }
                    ]}
                    style={{ flex: '1' }}
                    initialValue={currentData.pushDragLift}
                    help="Push/Drag/Lift"
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        type="number"
                        placeholder="Push/Drag/Lift"
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
