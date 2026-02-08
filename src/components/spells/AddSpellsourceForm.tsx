import { AutoComplete, Button, Form, Input, InputNumber, Select } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

// hooks
import type { SpellcastingSource } from "../../models/dataInterface";
import { useAddSpellSource } from "../../hooks/spells/useSpells";

// interfaces
interface Props {
    onSubmit: (values: SpellcastingSource) => void;
    onCancel: () => void;
}

export default function AddSpellSourceForm({ onSubmit, onCancel }: Props) {

    const {
        addSpellsourceForm,
        sourceTypeSelection,
        abilitySelection,
        resetAddSpellsource,
        submitNewSpellSource,
    } = useAddSpellSource(onSubmit);

    return (
        <Form
            form={addSpellsourceForm}
            name="addSpellsource"
            layout="inline"
            style={styles.form}
            onFinish={submitNewSpellSource}
        >
            <div style={styles.formContent}>
                <div style={{ display: 'flex' }}>
                    <Form.Item
                        name="source"
                        rules={[{ required: true, message: 'Please input Source Name' }]}
                        style={{ flex: '1' }}
                    >
                        <Input placeholder="Source Name" />
                    </Form.Item>
                    <Form.Item
                        name="sourceType"
                        rules={[{ required: true, message: 'Please select or key in the source' }]}
                        style={{ flex: '1' }}
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
                </div>
                <Form.Item
                    name="ability"
                    rules={[{ required: true, message: 'Please select the ability' }]}
                >
                    <Select
                        options={abilitySelection}
                        placeholder="Ability"
                    />
                </Form.Item>
                <div style={{ display: 'flex' }}>
                    <Form.Item
                        name="spellSaveDC"
                        rules={[{ required: true, message: 'Please input Spell Save DC' }]}
                        style={{ flex: '1' }}
                    >
                        <InputNumber placeholder="Save DC" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="spellAttackBonus"
                        rules={[{ required: true, message: 'Please input Spell Attack Bonus' }]}
                        style={{ flex: '1' }}
                    >
                        <InputNumber placeholder="Attack +" style={{ width: '100%' }} />
                    </Form.Item>
                </div>
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
                            resetAddSpellsource();
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