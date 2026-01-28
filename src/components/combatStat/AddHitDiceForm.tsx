import { AutoComplete, Button, Form, Input, InputNumber } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

// hooks
import { useAddHitDice } from "../../hooks/combat/useCombatStat";

// interface
interface Props {
    onSubmit: (values: any) => void;
    onCancel: () => void;
}


export default function AddHitPointForm({ onSubmit, onCancel }: Props) {

    const {
        addHitDiceForm,
        hitDiceSelection,
        submitNewHitDice,
        reset
    } = useAddHitDice(onSubmit);

    return (
        <Form
            form={addHitDiceForm}
            name="addHitDice"
            layout="inline"
            style={styles.form}
            onFinish={submitNewHitDice}
        >
            <Form.Item
                name="class"
                rules={[
                    { required: true, message: 'Please key in the class' }
                ]}
                style={{ width: '50%' }}
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
                style={{ width: '50%' }}
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
            <Form.Item
                style={{
                    width: '100%',
                    marginTop: '1rem',
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
                    onClick={() => {
                        reset();
                        onCancel();
                    }}
                />
            </Form.Item>
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
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '0.7rem'
    },
}