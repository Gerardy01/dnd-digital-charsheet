import { Button, Divider, Form, Typography } from "antd"
import { BulbOutlined, CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons"

// hooks
import useSkills from "../../hooks/skills/useSkills";

// components
import SkillsItem from "./SkillsItem";
import EditRows from "../global/EditRows";

const { Title } = Typography;


export default function Skills() {

    const {
        skillsData,
        editMode,
        editSkillsForm,
        isEdit,
        submitEditSkills,
        resetForm,
    } = useSkills();

    return (
        <div style={styles.skillsHolder}>
            <div style={styles.header}>
                <div style={styles.headerRight}>
                    <BulbOutlined style={{ fontSize: '1.4rem', color: 'blue' }} />
                    <div style={styles.titleContainer}>
                        <Title style={{ margin: '0px' }} level={5}>SKILLS</Title>
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
                            onClick={() => editSkillsForm.submit()}
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

            {!editMode && skillsData && (
                <>
                    <SkillsItem
                        name="Acrobatics"
                        skillsData={skillsData.acrobatics}
                    />
                    <SkillsItem
                        name="Animal Handling"
                        skillsData={skillsData.animalHandling}
                    />
                    <SkillsItem
                        name="Arcana"
                        skillsData={skillsData.arcana}
                    />
                    <SkillsItem
                        name="Athletics"
                        skillsData={skillsData.athletics}
                    />
                    <SkillsItem
                        name="Deception"
                        skillsData={skillsData.deception}
                    />
                    <SkillsItem
                        name="History"
                        skillsData={skillsData.history}
                    />
                    <SkillsItem
                        name="Insight"
                        skillsData={skillsData.insight}
                    />
                    <SkillsItem
                        name="Intimidation"
                        skillsData={skillsData.intimidation}
                    />
                    <SkillsItem
                        name="Investigation"
                        skillsData={skillsData.investigation}
                    />
                    <SkillsItem
                        name="Medicine"
                        skillsData={skillsData.medicine}
                    />
                    <SkillsItem
                        name="Nature"
                        skillsData={skillsData.nature}
                    />
                    <SkillsItem
                        name="Perception"
                        skillsData={skillsData.perception}
                    />
                    <SkillsItem
                        name="Performance"
                        skillsData={skillsData.performance}
                    />
                    <SkillsItem
                        name="Persuasion"
                        skillsData={skillsData.persuasion}
                    />
                    <SkillsItem
                        name="Religion"
                        skillsData={skillsData.religion}
                    />
                    <SkillsItem
                        name="Sleight of Hand"
                        skillsData={skillsData.sleightOfHand}
                    />
                    <SkillsItem
                        name="Stealth"
                        skillsData={skillsData.stealth}
                    />
                    <SkillsItem
                        name="Survival"
                        skillsData={skillsData.survival}
                    />
                </>
            )}

            {editMode && skillsData && (
                <Form
                    name="skills"
                    form={editSkillsForm}
                    style={styles.form}
                    onFinish={submitEditSkills}
                >
                    <EditRows
                        rowName="Acrobatics"
                        proficiencyName="acrobaticsProficiency"
                        proficiencyValue={skillsData.acrobatics.proficient}
                        modifierName="acrobaticsValue"
                        modifierValue={skillsData.acrobatics.modifier}
                    />
                    <EditRows
                        rowName="Animal Handling"
                        proficiencyName="animalHandlingProficiency"
                        proficiencyValue={skillsData.animalHandling.proficient}
                        modifierName="animalHandlingValue"
                        modifierValue={skillsData.animalHandling.modifier}
                    />
                    <EditRows
                        rowName="Arcana"
                        proficiencyName="arcanaProficiency"
                        proficiencyValue={skillsData.arcana.proficient}
                        modifierName="arcanaValue"
                        modifierValue={skillsData.arcana.modifier}
                    />
                    <EditRows
                        rowName="Athletics"
                        proficiencyName="athleticsProficiency"
                        proficiencyValue={skillsData.athletics.proficient}
                        modifierName="athleticsValue"
                        modifierValue={skillsData.athletics.modifier}
                    />
                    <EditRows
                        rowName="Deception"
                        proficiencyName="deceptionProficiency"
                        proficiencyValue={skillsData.deception.proficient}
                        modifierName="deceptionValue"
                        modifierValue={skillsData.deception.modifier}
                    />
                    <EditRows
                        rowName="History"
                        proficiencyName="historyProficiency"
                        proficiencyValue={skillsData.history.proficient}
                        modifierName="historyValue"
                        modifierValue={skillsData.history.modifier}
                    />
                    <EditRows
                        rowName="Insight"
                        proficiencyName="insightProficiency"
                        proficiencyValue={skillsData.insight.proficient}
                        modifierName="insightValue"
                        modifierValue={skillsData.insight.modifier}
                    />
                    <EditRows
                        rowName="Intimidation"
                        proficiencyName="intimidationProficiency"
                        proficiencyValue={skillsData.intimidation.proficient}
                        modifierName="intimidationValue"
                        modifierValue={skillsData.intimidation.modifier}
                    />
                    <EditRows
                        rowName="Investigation"
                        proficiencyName="investigationProficiency"
                        proficiencyValue={skillsData.investigation.proficient}
                        modifierName="investigationValue"
                        modifierValue={skillsData.investigation.modifier}
                    />
                    <EditRows
                        rowName="Medicine"
                        proficiencyName="medicineProficiency"
                        proficiencyValue={skillsData.medicine.proficient}
                        modifierName="medicineValue"
                        modifierValue={skillsData.medicine.modifier}
                    />
                    <EditRows
                        rowName="Nature"
                        proficiencyName="natureProficiency"
                        proficiencyValue={skillsData.nature.proficient}
                        modifierName="natureValue"
                        modifierValue={skillsData.nature.modifier}
                    />
                    <EditRows
                        rowName="Perception"
                        proficiencyName="perceptionProficiency"
                        proficiencyValue={skillsData.perception.proficient}
                        modifierName="perceptionValue"
                        modifierValue={skillsData.perception.modifier}
                    />
                    <EditRows
                        rowName="Performance"
                        proficiencyName="performanceProficiency"
                        proficiencyValue={skillsData.performance.proficient}
                        modifierName="performanceValue"
                        modifierValue={skillsData.performance.modifier}
                    />
                    <EditRows
                        rowName="Persuasion"
                        proficiencyName="persuasionProficiency"
                        proficiencyValue={skillsData.persuasion.proficient}
                        modifierName="persuasionValue"
                        modifierValue={skillsData.persuasion.modifier}
                    />
                    <EditRows
                        rowName="Religion"
                        proficiencyName="religionProficiency"
                        proficiencyValue={skillsData.religion.proficient}
                        modifierName="religionValue"
                        modifierValue={skillsData.religion.modifier}
                    />
                    <EditRows
                        rowName="Sleight of Hand"
                        proficiencyName="sleightOfHandProficiency"
                        proficiencyValue={skillsData.sleightOfHand.proficient}
                        modifierName="sleightOfHandValue"
                        modifierValue={skillsData.sleightOfHand.modifier}
                    />
                    <EditRows
                        rowName="Stealth"
                        proficiencyName="stealthProficiency"
                        proficiencyValue={skillsData.stealth.proficient}
                        modifierName="stealthValue"
                        modifierValue={skillsData.stealth.modifier}
                    />
                    <EditRows
                        rowName="Survival"
                        proficiencyName="survivalProficiency"
                        proficiencyValue={skillsData.survival.proficient}
                        modifierName="survivalValue"
                        modifierValue={skillsData.survival.modifier}
                    />
                </Form>
            )}

        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    skillsHolder: {
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