import { Button, Divider, Typography, Form } from "antd"
import { CheckOutlined, CloseOutlined, EditOutlined, SafetyOutlined } from "@ant-design/icons"

// hooks
import useSavings from "../../hooks/savings/useSavings";

// Components
import SavingsItem from "./SavingsItem";
import EditRows from "../global/EditRows";

const { Title } = Typography;


export default function Savings() {

    const {
        savingsData,
        editMode,
        editSavingsForm,
        isEdit,
        submitEditSavings,
        resetForm,
    } = useSavings();

    return (
        <div style={styles.savingsHolder}>
            <div style={styles.header}>
                <div style={styles.headerRight}>
                    <SafetyOutlined style={{ fontSize: '1.5rem', color: 'blue' }} />
                    <div style={styles.titleContainer}>
                        <Title style={{ margin: '0px' }} level={5}>SAVING THROWS</Title>
                        {!editMode && (
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                onClick={() => isEdit(true)}
                            />
                        )}
                    </div>
                </div>
                {editMode && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Button
                            variant="text"
                            color="green"
                            icon={<CheckOutlined />}
                            onClick={() => editSavingsForm.submit()}
                        />
                        <Button
                            variant="filled"
                            color="red"
                            icon={<CloseOutlined />}
                            onClick={resetForm}
                        />
                    </div>
                )}
            </div>
            <Divider style={{ marginTop: "0.5rem", marginBottom: '1rem' }} />

            {!editMode && savingsData && (
                <>
                    <SavingsItem
                        name="Strength"
                        savingsData={savingsData.strength}
                    />
                    <SavingsItem
                        name="Dexterity"
                        savingsData={savingsData.dexterity}
                    />

                    <SavingsItem
                        name="Constitution"
                        savingsData={savingsData.constitution}
                    />

                    <SavingsItem
                        name="Intelligence"
                        savingsData={savingsData.intelligence}
                    />

                    <SavingsItem
                        name="Wisdom"
                        savingsData={savingsData.wisdom}
                    />

                    <SavingsItem
                        name="Charisma"
                        savingsData={savingsData.charisma}
                    />
                </>
            )}

            {editMode && savingsData && (
                <Form
                    name="savings"
                    form={editSavingsForm}
                    style={styles.form}
                    onFinish={submitEditSavings}
                >
                    <EditRows
                        rowName="Strength"
                        proficiencyName="strProficiency"
                        proficiencyValue={savingsData.strength.proficient}
                        modifierName="strValue"
                        modifierValue={savingsData.strength.modifier}
                    />
                    <EditRows
                        rowName="Dexterity"
                        proficiencyName="dexProficiency"
                        proficiencyValue={savingsData.dexterity.proficient}
                        modifierName="dexValue"
                        modifierValue={savingsData.dexterity.modifier}
                    />
                    <EditRows
                        rowName="Constitution"
                        proficiencyName="conProficiency"
                        proficiencyValue={savingsData.constitution.proficient}
                        modifierName="conValue"
                        modifierValue={savingsData.constitution.modifier}
                    />
                    <EditRows
                        rowName="Intelligence"
                        proficiencyName="intProficiency"
                        proficiencyValue={savingsData.intelligence.proficient}
                        modifierName="intValue"
                        modifierValue={savingsData.intelligence.modifier}
                    />
                    <EditRows
                        rowName="Wisdom"
                        proficiencyName="wisProficiency"
                        proficiencyValue={savingsData.wisdom.proficient}
                        modifierName="wisValue"
                        modifierValue={savingsData.wisdom.modifier}
                    />
                    <EditRows
                        rowName="Charisma"
                        proficiencyName="chaProficiency"
                        proficiencyValue={savingsData.charisma.proficient}
                        modifierName="chaValue"
                        modifierValue={savingsData.charisma.modifier}
                    />
                </Form>
            )}

        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    savingsHolder: {
        width: '100%',
        marginTop: '2rem',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '1px 0px 10px -2px lightgray'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        color: '#6B7280'
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '10px',
    },
}