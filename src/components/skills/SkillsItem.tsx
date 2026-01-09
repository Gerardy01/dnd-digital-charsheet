import { Typography } from "antd";
import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";

// interfaces
import type { SaveOrSkill } from "../../models/dataInterface";
interface Props {
    name: string;
    skillsData : SaveOrSkill;
}

const { Text } = Typography;


export default function SkillsItem({ name, skillsData } : Props) {
    return (
        <div style={styles.skillsItem}>
            <div style={styles.info}>
                {skillsData.proficient ? (
                    <CheckCircleTwoTone style={{ marginRight: '10px' }} />
                ) : (
                    <CloseCircleOutlined style={{ marginRight: '10px', color: 'lightgray' }} />
                )}
                <Text>{name}</Text>
            </div>
            <Text strong>{skillsData.modifier >= 0? `+${skillsData.modifier}` : `${skillsData.modifier}`}</Text>
        </div>
    )
}

const styles : { [key: string]: React.CSSProperties } = {
    skillsItem : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0.5rem',
        marginLeft: '0.25rem',
    },
    info : {
        display: 'flex',
        alignItems: 'center',
    }
}