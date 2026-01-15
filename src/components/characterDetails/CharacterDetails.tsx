import { Divider, Typography } from "antd"
import { BookOutlined, FileTextOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons"

// components 
import AppearanceItem from "./AppearanceItem";
import PersonalityItem from "./PersonalityItem";

// hooks
import { useCharacterDetails } from "../../hooks/characterDetails/useCharacterDetails";
import MoreDetailsCard from "./MoreDetailsCard";

// utils
import { AppearanceEnum, MoreDetailsEnum, PersonalityEnum } from "../../utils/enums";

const { Title } = Typography;


export default function CharacterDetails() {

    const { characterDetails, editAppearance, editPersonality, editMoreDetails } = useCharacterDetails();

    return (
        <div style={styles.holder}>
            <div style={styles.header}>
                <div style={styles.headerRight}>
                    <UserOutlined style={{ fontSize: '1.4rem', color: 'blue' }} />
                    <Title style={styles.titleText} level={5}>CHARACTER DETAILS</Title>
                </div>
            </div>

            <Divider style={{ marginTop: "0.5rem", marginBottom: '1rem' }} />

            <Title level={5} style={styles.sectionTitle}>Appearance</Title>
            {characterDetails && (
                <div style={styles.appearanceItems}>
                    <AppearanceItem
                        title="GENDER"
                        value={characterDetails.appearance.gender}
                        onEdit={(value) => editAppearance(value, AppearanceEnum.GENDER)}
                    />
                    <AppearanceItem
                        title="AGE"
                        value={characterDetails.appearance.age.toString()}
                        onEdit={(value) => editAppearance(value, AppearanceEnum.AGE)}
                    />
                    <AppearanceItem
                        title="HEIGHT"
                        value={characterDetails.appearance.height}
                        onEdit={(value) => editAppearance(value, AppearanceEnum.HEIGHT)}
                    />
                    <AppearanceItem
                        title="WEIGHT"
                        value={characterDetails.appearance.weight}
                        onEdit={(value) => editAppearance(value, AppearanceEnum.WEIGHT)}
                    />
                    <AppearanceItem
                        title="SIZE"
                        value={characterDetails.appearance.size}
                        onEdit={(value) => editAppearance(value, AppearanceEnum.SIZE)}
                    />
                    <AppearanceItem
                        title="HAIR"
                        value={characterDetails.appearance.hair}
                        onEdit={(value) => editAppearance(value, AppearanceEnum.HAIR)}
                    />
                    <AppearanceItem
                        title="EYES"
                        value={characterDetails.appearance.eyes}
                        onEdit={(value) => editAppearance(value, AppearanceEnum.EYES)}
                    />
                    <AppearanceItem
                        title="SKIN"
                        value={characterDetails.appearance.skin}
                        onEdit={(value) => editAppearance(value, AppearanceEnum.SKIN)}
                    />
                    <AppearanceItem
                        title="FAITH"
                        value={characterDetails.appearance.faith}
                        onEdit={(value) => editAppearance(value, AppearanceEnum.FAITH)}
                    />
                </div>
            )}

            <Title level={5} style={{ ...styles.sectionTitle, marginTop: '1.5rem' }}>Personality</Title>
            {characterDetails && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <PersonalityItem
                        title="TRAITS"
                        value={characterDetails.personality.traits}
                        onEdit={(value) => editPersonality(value, PersonalityEnum.TRAITS)}
                    />
                    <PersonalityItem
                        title="IDEALS"
                        value={characterDetails.personality.ideals}
                        onEdit={(value) => editPersonality(value, PersonalityEnum.IDEALS)}
                    />
                    <PersonalityItem
                        title="BONDS"
                        value={characterDetails.personality.bonds}
                        onEdit={(value) => editPersonality(value, PersonalityEnum.BONDS)}
                    />
                    <PersonalityItem
                        title="FLAWS"
                        value={characterDetails.personality.flaws}
                        onEdit={(value) => editPersonality(value, PersonalityEnum.FLAWS)}
                    />
                </div>
            )}

            {characterDetails && (
                <>
                    <MoreDetailsCard
                        icon={<BookOutlined />}
                        title="BACKSTORY"
                        value={characterDetails.backstory}
                        onEdit={(value) => editMoreDetails(value, MoreDetailsEnum.BACKSTORY)}
                    />
                    <MoreDetailsCard
                        icon={<UsergroupAddOutlined />}
                        title="ALLIES & ORGANIZATIONS"
                        value={characterDetails.alliesAndOrganizations}
                        onEdit={(value) => editMoreDetails(value, MoreDetailsEnum.ALLIESANDORGANIZATIONS)}
                    />
                    <MoreDetailsCard
                        icon={<FileTextOutlined />}
                        title="ADDITIONAL NOTES"
                        value={characterDetails.additionalNotes}
                        onEdit={(value) => editMoreDetails(value, MoreDetailsEnum.ADDITIONALNOTES)}
                    />
                </>
            )}

        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    holder: {
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
    titleText: {
        margin: '0px',
        marginLeft: '10px',
    },
    sectionTitle: {
        color: '#374151',
        marginBottom: 8,
    },
    appearanceItems: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8
    }
}