import { AutoComplete, Button, Form, Input, InputNumber } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";

// hooks
import { useEditHitDice } from "../../hooks/combat/useCombatStat";

// interface
import type { HitDice } from "../../models/dataInterface";
interface Props {
    currentData: HitDice;
    onSubmit: (values: any) => void;
    onRemove: () => void;
    onCancel: () => void;
}


export default function EditHitDiceForm({ currentData, onSubmit, onCancel, onRemove }: Props) {

    const {
        editHitDiceForm,
        hitDiceSelection,
        submitData,
        reset
    } = useEditHitDice(onSubmit);

    return (
        <Form
            form={editHitDiceForm}
            name="addHitDice"
            layout="inline"
            style={styles.form}
            onFinish={submitData}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
            }}>
                <Form.Item
                    name="class"
                    rules={[
                        { required: true, message: 'Please key in the class' }
                    ]}
                    style={{ width: '70%' }}
                    initialValue={currentData.class}
                >
                    <Input
                        type="text"
                        placeholder="Class"
                    />
                </Form.Item>
                <Form.Item
                    name="count"
                    rules={[
                        { type: 'number', min: 1, message: 'Count minimum is 1' },
                        { required: true, message: 'Please key in the count' }
                    ]}
                    initialValue={currentData.total}
                >
                    <InputNumber
                        type="number"
                        placeholder="Count"
                    />
                </Form.Item>
                <Form.Item
                    name="dice"
                    rules={[
                        { required: true, message: 'Please key in the dice' }
                    ]}
                    style={{ width: '70%' }}
                    initialValue={currentData.type}
                >
                    <AutoComplete
                        options={hitDiceSelection}
                        placeholder="Dice"
                        showSearch={{
                            filterOption: (inputValue, option) => {
                                return option !== undefined && option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                        }}
                    />
                </Form.Item>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
            }}>
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
    },
}