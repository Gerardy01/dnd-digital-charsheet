import { Typography } from 'antd';

// components
import Ability from '../components/ability/ability';
import Savings from '../components/savings/savings';

// hooks
import useMain from "../hooks/main/useMain";

const { Title, Text } = Typography;



export default function Main() {

    const { charInfoData } = useMain();

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
                        }}
                    >{charInfoData?.characterName}</Title>
                    <Title
                        style={styles.subTitle}
                        level={4}
                        editable
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
                </div>
                
                <Ability />
                <Savings />
                
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
}