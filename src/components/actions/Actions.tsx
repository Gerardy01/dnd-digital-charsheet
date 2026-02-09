import { Typography } from "antd";
import { FieldTimeOutlined, SafetyOutlined, ThunderboltOutlined } from "@ant-design/icons";

// components
import ActionItem from "./ActionItem";
import Icon from "../global/Icon";
import EditActionForm from "./EditActionForm";

// hooks
import useActions from "../../hooks/actions/useActions";

// utils
import { ActionCategoryEnum, ActionTypeEnum, DefaultActionsEnum, UsabilityEnum } from "../../utils/enums";


const { Title, Text } = Typography;


export default function Actions() {

    const {
        actions,
        edited,
        actionCache,
        editAction,
        onEditAction,
        handleCache,
        changePoint,
    } = useActions();

    return (
        <div style={styles.holder}>
            <div style={styles.titleHolder}>
                <Icon
                    color="#E8EDFF"
                    icon={<ThunderboltOutlined style={{ fontSize: '1.4rem', color: '#3A36DB' }} />}
                />
                <Title level={4} style={{ marginBottom: 0 }}>Actions</Title>
            </div>
            <div style={styles.contentHolder}>
                {actions.actions.map((item, i) => {
                    const cachedData = actionCache.find(cache => cache.name === item.name);
                    return (
                        <div key={i}>
                            {edited.actionType === ActionTypeEnum.ACTION && edited.index === i ? (
                                <EditActionForm
                                    currentData={item}
                                    onSubmit={onEditAction}
                                    onCancel={() => editAction(-1, "")}
                                />
                            ) : (
                                <ActionItem
                                    actionItem={item}
                                    onEdit={() => editAction(i, ActionTypeEnum.ACTION)}
                                    editBtnDisabled={edited.actionType !== "" || edited.index !== -1}
                                    onCaching={() => handleCache(i, ActionTypeEnum.ACTION)}
                                    cacheDisabled={`${JSON.stringify(cachedData)}` === `${JSON.stringify(item)}`}
                                    onChangePoint={(newCurrent) => {
                                        changePoint(newCurrent, ActionTypeEnum.ACTION, i);
                                    }}
                                />
                            )}
                        </div>
                    )
                })}
                <ActionItem
                    actionItem={{
                        name: DefaultActionsEnum.STANDARD,
                        level: null,
                        category: ActionCategoryEnum.OTHER,
                        activation: {
                            type: UsabilityEnum.UTILITY,
                            bonus: 0,
                            dice: "",
                            damageType: ""
                        },
                        description: "Dash / Disengage / Dodge / Help / Hide / Use an Object",
                        resource: ""
                    }}
                />
            </div>
            <div style={styles.titleHolder}>
                <Icon
                    color="#FFE8EC"
                    icon={<FieldTimeOutlined style={{ fontSize: '1.4rem', color: '#B10031' }} />}
                />
                <Title level={4} style={{ marginBottom: 0 }}>Bonus Actions</Title>
            </div>
            <div style={styles.contentHolder}>
                {actions.bonusActions.length > 0 ? actions.bonusActions.map((item, i) => {
                    const cachedData = actionCache.find(cache => cache.name === item.name);
                    return (
                        <div key={i}>
                            {edited.actionType === ActionTypeEnum.BONUSACTION && edited.index === i ? (
                                <EditActionForm
                                    currentData={item}
                                    onSubmit={onEditAction}
                                    onCancel={() => editAction(-1, "")}
                                />
                            ) : (
                                <ActionItem
                                    actionItem={item}
                                    onEdit={() => editAction(i, ActionTypeEnum.BONUSACTION)}
                                    editBtnDisabled={edited.actionType !== "" || edited.index !== -1}
                                    onCaching={() => handleCache(i, ActionTypeEnum.BONUSACTION)}
                                    cacheDisabled={`${JSON.stringify(cachedData)}` === `${JSON.stringify(item)}`}
                                    onChangePoint={(newCurrent) => {
                                        changePoint(newCurrent, ActionTypeEnum.BONUSACTION, i);
                                    }}
                                />
                            )}
                        </div>
                    )
                }) : (
                    <Text italic style={{ textAlign: 'center' }}>--- No Data ---</Text>
                )}
            </div>
            <div style={styles.titleHolder}>
                <Icon
                    color="#FFF4D1"
                    icon={<SafetyOutlined style={{ fontSize: '1.4rem', color: '#A35200' }} />}
                />
                <Title level={4} style={{ marginBottom: 0 }}>Reactions</Title>
            </div>
            <div style={styles.contentHolder}>
                {actions.reactions.map((item, i) => {
                    const cachedData = actionCache.find(cache => cache.name === item.name);
                    return (
                        <div key={i}>
                            {edited.actionType === ActionTypeEnum.REACTION && edited.index === i ? (
                                <EditActionForm
                                    currentData={item}
                                    onSubmit={onEditAction}
                                    onCancel={() => editAction(-1, "")}
                                />
                            ) : (
                                <ActionItem
                                    actionItem={item}
                                    onEdit={() => editAction(i, ActionTypeEnum.REACTION)}
                                    editBtnDisabled={edited.actionType !== "" || edited.index !== -1}
                                    onCaching={() => handleCache(i, ActionTypeEnum.REACTION)}
                                    cacheDisabled={`${JSON.stringify(cachedData)}` === `${JSON.stringify(item)}`}
                                    onChangePoint={(newCurrent) => {
                                        changePoint(newCurrent, ActionTypeEnum.REACTION, i);
                                    }}
                                />
                            )}
                        </div>
                    )
                })}
                <ActionItem
                    actionItem={{
                        name: DefaultActionsEnum.OPPORTUNITY,
                        level: null,
                        category: ActionCategoryEnum.OTHER,
                        activation: {
                            type: UsabilityEnum.ATTACK,
                            bonus: 0,
                            dice: "",
                            damageType: ""
                        },
                        description: "Make one melee attack against a hostile creature that moves out of your reach.",
                        resource: ""
                    }}
                />
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    holder: {
        width: '100%',
        backgroundColor: 'white',
        padding: '0rem 1rem',
        maxHeight: '70vh',
        overflow: 'auto',
    },
    titleHolder: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        paddingBottom: '0.7rem',
        position: 'sticky',
        top: 0,
        zIndex: 5,
        backgroundColor: 'white',
    },
    contentHolder: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        marginBottom: '2rem'
    }
}