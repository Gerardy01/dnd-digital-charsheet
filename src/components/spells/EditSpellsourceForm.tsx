import { AutoComplete, Button, Form, Input, InputNumber, Select } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";


// hooks
import { useEditSpellSource } from "../../hooks/spells/useSpells";

// interface
import type { SpellcastingSource, SpellcastingTransformed } from "../../models/dataInterface";
interface Props {
    currentData: SpellcastingTransformed;
    onSubmit: (newData: SpellcastingSource) => void;
    onRemove: () => void;
    onCancel: () => void;
}


export default function EditSpellsourceForm({ currentData, onSubmit, onRemove, onCancel }: Props) {

    const {
        editSpellsourceForm,
        sourceTypeSelection,
        abilitySelection,
        reset,
        submitEditData,
    } = useEditSpellSource(onSubmit);

    return (
        <Form
            form={editSpellsourceForm}
            name="edit"
            layout="inline"
            style={styles.form}
            onFinish={submitEditData}
        >
            <div style={styles.formContent}>
                <div style={{ display: 'flex' }}>
                    <Form.Item
                        name="source"
                        rules={[{ required: true, message: 'Please input Source Name' }]}
                        style={{ width: '47%' }}
                        initialValue={currentData.source}
                    >
                        <Input placeholder="Source Name" />
                    </Form.Item>
                    <Form.Item
                        name="sourceType"
                        rules={[{ required: true, message: 'Please select or key in the source' }]}
                        style={{ width: '43%' }}
                        initialValue={currentData.sourceType}
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
                    initialValue={currentData.ability}
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
                        style={{ width: '47%' }}
                        initialValue={currentData.spellSaveDC}
                    >
                        <InputNumber placeholder="Save DC" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="spellAttackBonus"
                        rules={[{ required: true, message: 'Please input Spell Attack Bonus' }]}
                        style={{ width: '43%' }}
                        initialValue={currentData.spellAttackBonus}
                    >
                        <InputNumber placeholder="Attack +" style={{ width: '100%' }} />
                    </Form.Item>
                </div>
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

        marginBottom: '1rem',
        position: 'sticky',
        top: 55,
        zIndex: 1,
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