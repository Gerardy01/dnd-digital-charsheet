import { Typography, Tabs, Button, Dropdown } from 'antd';
import { CheckOutlined, CloseOutlined, SettingOutlined } from '@ant-design/icons';

// components
import Ability from '../components/ability/Ability';
import Savings from '../components/savings/Savings';
import Skills from '../components/skills/Skills';
import ProAndTrain from '../components/proAndTrain/ProAndTrain';
import Defenses from '../components/defenses/Defenses';
import CombatStat from '../components/combatStat/CombatStat';
import Senses from '../components/senses/Senses';
import CharacterDetails from '../components/characterDetails/CharacterDetails';
import OtherResources from '../components/otherResources/OtherResources';

// hooks
import useMain from "../hooks/main/useMain";

const { Title, Text } = Typography;



export default function Main() {

    const {
        charInfoData,
        infoStatData,
        selectedTab,
        tabs,
        dropdownItem,
        changeName,
        changeRace,
        changeClassAndLevel,
        changeBackgroud,
        changeAlignment,
        changeExp,
        changeProficiencyBonus,
        changeInspiration,
        onTabChange,
    } = useMain();

    return (
        <div style={styles.container}>
            <div style={styles.contentHolder}>
                <div style={styles.charInfoHolder}>
                    <div style={styles.titleHolder}>
                        <div style={{ width: '10%' }} />
                        <div style={{ flex: '1', maxWidth: '80%' }}>
                            <Title
                                style={styles.title}
                                level={1}
                                editable={{
                                    triggerType: ['text'],
                                    onChange: (newText) => { changeName(newText) }
                                }}
                            >{charInfoData?.characterName || 'Character name'}</Title>
                        </div>
                        <div style={{ width: '10%', display: 'flex', justifyContent: 'flex-end' }}>
                            <Dropdown
                                menu={{ items: dropdownItem }}
                                trigger={['click']}
                                placement="bottomRight"
                            >
                                <Button
                                    type="text"
                                    icon={<SettingOutlined />}
                                    style={{ fontSize: '1.5rem', color: 'white' }}
                                />
                            </Dropdown>
                        </div>
                    </div>
                    <Title
                        style={styles.subTitle}
                        level={4}
                        editable={{
                            triggerType: ['text'],
                            onChange: (newText) => { changeRace(newText) }
                        }}
                    >{charInfoData?.species || 'Character race'}</Title>

                    <div style={styles.infoHolder}>
                        <div style={styles.info}>
                            <Text strong style={styles.infoLabel}>CLASS & LEVEL</Text>
                            <Text
                                strong
                                style={{ color: 'white' }}
                                editable={{
                                    triggerType: ['text'],
                                    onChange: (newText) => { changeClassAndLevel(newText) }
                                }}
                            >{charInfoData?.classesAndLevel || 'Class & Level'}</Text>
                        </div>
                        <div style={styles.info}>
                            <Text strong style={styles.infoLabel}>BACKGROUND</Text>
                            <Text
                                strong
                                style={{ color: 'white' }}
                                editable={{
                                    triggerType: ['text'],
                                    onChange: (newText) => { changeBackgroud(newText) }
                                }}
                            >{charInfoData?.background || 'Background'}</Text>
                        </div>
                        <div style={styles.info}>
                            <Text strong style={styles.infoLabel}>ALIGNMENT</Text>
                            <Text
                                strong
                                style={{ color: 'white' }}
                                editable={{
                                    triggerType: ['text'],
                                    onChange: (newText) => { changeAlignment(newText) }
                                }}
                            >{charInfoData?.alignment || 'Alignment'}</Text>
                        </div>
                        <div style={styles.info}>
                            <Text strong style={styles.infoLabel}>EXPERIENCE POINTS</Text>
                            <Text
                                strong
                                style={{ color: 'white' }}
                                editable={{
                                    triggerType: ['text'],
                                    onChange: (newText) => { changeExp(newText) }
                                }}
                            >{charInfoData?.experiencePoints || 'Experience Points'}</Text>
                        </div>
                    </div>

                    <div style={styles.infoStatHolder}>
                        <div style={styles.statItem}>
                            <Text strong style={styles.infoLabel}>PROFICIENCY</Text>
                            <Title
                                level={2}
                                style={{ margin: '0.5rem 0', color: 'white' }}
                                editable={{
                                    triggerType: ['text'],
                                    onChange: (newText) => { changeProficiencyBonus(newText) }
                                }}
                            >+{infoStatData?.proficiencyBonus}</Title>
                        </div>
                        <div style={styles.statItem}>
                            <Text strong style={styles.infoLabel}>INSPIRATION</Text>
                            <div
                                style={{ margin: '0.5rem 0px', fontSize: '1.7rem', color: 'white' }}
                                onClick={() => { changeInspiration() }}
                            >
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
                <Senses />
                <Defenses />
                <OtherResources />

                <div style={styles.tabsHolder}>
                    <Tabs
                        activeKey={selectedTab}
                        centered
                        items={tabs.map(tab => ({
                            label: tab.label,
                            key: tab.key,
                            children: tab.children,
                            // icon: tab.key === selectedTab ? tab.icon : undefined
                        }))}
                        onChange={onTabChange}
                    />
                </div>

                <CharacterDetails />

            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        width: '100vw',
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#F2F5F9'
    },
    contentHolder: {
        flex: 1,
        maxWidth: '72rem',
    },
    charInfoHolder: {
        width: '100%',
        backgroundColor: 'rgb(67, 56, 202)',
        padding: '1rem',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '1px 0px 10px 1px gray'
    },
    titleHolder: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        gap: '8px',
        textAlign: 'center',
    },
    title: {
        color: 'white',
        margin: '0px',
        lineHeight: '1'
    },
    subTitle: {
        color: '#E6D9A2',
        margin: '0px'
    },
    infoHolder: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '1rem'
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
        padding: '1rem 0px',
        textAlign: 'center'
    },
    infoLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: '10px'
    },
    infoStatHolder: {
        display: 'flex',
        marginTop: '1rem',
        marginBottom: '1rem',
        width: '100%',
        justifyContent: 'space-evenly'
    },
    statItem: {
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
    tabsHolder: {
        width: '100%',
        marginTop: '2rem',
        borderRadius: '10px',
        backgroundColor: 'white',
        overflow: 'hidden',
        border: '1px solid lightgray',
        boxShadow: '1px 0px 10px -2px lightgray'
    }
}