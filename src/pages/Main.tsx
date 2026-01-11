import { Typography } from 'antd';

// components
import Ability from '../components/ability/Ability';
import Savings from '../components/savings/Savings';
import Skills from '../components/skills/Skills';
import ProAndTrain from '../components/proAndTrain/ProAndTrain';

// hooks
import useMain from "../hooks/main/useMain";
import CombatStat from '../components/combatStat/CombatStat';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;



export default function Main() {

    const {
        charInfoData,
        infoStatData,
        changeName,
        changeRace,
    } = useMain();

    return (
        <div style={styles.container}>
            <div style={styles.contentHolder}>
                <div style={styles.charInfoHolder}>
                    <Title
                        style={styles.title}
                        level={1}
                        editable={{
                            tooltip: 'click to edit text',
                            triggerType: ['text'],
                            onChange: (newText) => {changeName(newText)}
                        }}
                    >{charInfoData?.characterName}</Title>
                    <Title
                        style={styles.subTitle}
                        level={4}
                        editable={{
                            onChange: (newText) => {changeRace(newText)}
                        }}
                    >{charInfoData?.species}</Title>

                    <div style={styles.infoHolder}>
                        <div style={styles.info}>
                            <Text strong style={styles.infoLabel}>CLASS & LEVEL</Text>
                            <Text strong style={{ color: 'white' }} >{charInfoData?.classesAndLevel}</Text>
                        </div>
                        <div style={styles.info}>
                            <Text strong style={styles.infoLabel}>BACKGROUND</Text>
                            <Text strong style={{ color: 'white' }} >{charInfoData?.background}</Text>
                        </div>
                        <div style={styles.info}>
                            <Text strong style={styles.infoLabel}>ALIGNMENT</Text>
                            <Text strong style={{ color: 'white' }} >{charInfoData?.alignment}</Text>
                        </div>
                        <div style={styles.info}>
                            <Text strong style={styles.infoLabel}>EXPERIENCE POINTS</Text>
                            <Text strong style={{ color: 'white' }} >{charInfoData?.experiencePoints}</Text>
                        </div>
                    </div>

                    <div style={styles.infoStatHolder}>
                        <div style={styles.statItem}>
                            <Text strong style={styles.infoLabel}>PROFICIENCY</Text>
                            <Title level={2} style={{ margin: '0.5rem 0', color: 'white' }}>+{infoStatData?.proficiencyBonus}</Title>
                        </div>
                        <div style={styles.statItem}>
                            <Text strong style={styles.infoLabel}>INSPIRATION</Text>
                            <div style={{ margin: '0.5rem 0px', fontSize: '1.7rem', color: 'white' }}>
                                {infoStatData?.heroicInspiration ? (
                                    <CheckOutlined />
                                ) : (
                                    <CloseOutlined />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <Ability />
                <Savings />
                <Skills />
                <CombatStat />
                <ProAndTrain />
                
            </div>
        </div>
    )
}

const styles : { [key: string]: React.CSSProperties } = {
    container : {
        width: '100%',
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#F2F5F9'
    },
    contentHolder : {
        flex : 1,
        maxWidth: '72rem',
    },
    charInfoHolder : {
        width: '100%',
        backgroundColor: 'rgb(67, 56, 202)',
        padding: '1rem',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '1px 0px 10px 1px gray'
    },
    title : {
        color : 'white',
        margin: '0px',
        marginBottom: '0.5rem'
    },
    subTitle : {
        color: '#E6D9A2',
        margin: '0px'
    },
    infoHolder : {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '1rem'
    },
    info : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
        padding: '1rem 0px',
        textAlign: 'center'
    },
    infoLabel : {
        color: 'rgba(255,255,255,0.7)',
        fontSize: '10px'
    },
    infoStatHolder : {
        display: 'flex',
        marginTop: '1rem',
        marginBottom: '1rem',
        width: '100%',
        justifyContent: 'space-evenly'
    },
    statItem : {
        width: '35%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4A4ED7',
        border: '1px solid #6266EB',
        padding: '1rem',
        borderRadius: '10px',
        textAlign: 'center',
    },
}