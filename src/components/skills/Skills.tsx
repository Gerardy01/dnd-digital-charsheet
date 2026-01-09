import { Divider, Typography } from "antd"
import { BulbOutlined } from "@ant-design/icons"

// hooks
import useSkills from "../../hooks/skills/useSkills";

// components
import SkillsItem from "./SkillsItem";

const { Title } = Typography;


export default function Skills() {

    const { skillsData } = useSkills();

    return (
        <div style={styles.skillsHolder}>
            <div style={styles.header}>
                <div style={styles.headerRight}>
                    <BulbOutlined style={{ fontSize: '1.4rem', color: 'blue' }} />
                    <Title style={styles.titleText} level={5}>SKILLS</Title>
                </div>
            </div>

            <Divider style={{ marginTop: "0.5rem", marginBottom: '1rem' }} />

            {skillsData && (
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
            
        </div>
    )
}

const styles : { [key: string]: React.CSSProperties } = {
    skillsHolder : {
        width: '100%',
        marginTop: '2rem',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '1px 0px 10px -2px lightgray'
    },
    eader : {
        display: 'flex',
        justifyContent: 'space-between',
    },
    headerRight : {
        display: 'flex',
        alignItems: 'center',
        color: '#6B7280'
    },
    titleText : {
        margin: '0px',
        marginLeft: '10px',
    }
}