import { Divider, Typography } from "antd"
import { ToolOutlined } from "@ant-design/icons"

// components
import ProAndTrainItem from "./ProAndTrainItem";

// hook
import useProAndTrain from "../../hooks/proAndTrain/useProAndTrain"

// utils
import { ProAndTrainEnum } from "../../utils/enums";

const { Title } = Typography

export default function ProAndTrain() {
    const { proAndTrain, handleRemove, handleAdd } = useProAndTrain()

    return (
        <div style={styles.holder}>
            <div style={styles.header}>
                <div style={styles.headerRight}>
                    <ToolOutlined style={{ fontSize: '1.4rem', color: '#10B981' }} />
                    <Title style={styles.titleText} level={5}>PROFICIENCIES & TRAINING</Title>
                </div>
            </div>

            <Divider style={{ marginTop: "0.5rem", marginBottom: '1rem' }} />
            
            {proAndTrain && (
                <>
                    <ProAndTrainItem
                        name="Armor"
                        category={ProAndTrainEnum.ARMOR}
                        proAndTrain={proAndTrain}
                        handleRemove={handleRemove}
                        handleAdd={handleAdd}
                    />
                    
                    <ProAndTrainItem
                        name="Weapons"
                        category={ProAndTrainEnum.WEAPONS}
                        proAndTrain={proAndTrain}
                        handleRemove={handleRemove}
                        handleAdd={handleAdd}
                    />

                    <ProAndTrainItem
                        name="Tools"
                        category={ProAndTrainEnum.TOOLS}
                        proAndTrain={proAndTrain}
                        handleRemove={handleRemove}
                        handleAdd={handleAdd}
                        color="gold"
                    />

                    <ProAndTrainItem
                        name="Languages"
                        category={ProAndTrainEnum.LANGUAGES}
                        proAndTrain={proAndTrain}
                        handleRemove={handleRemove}
                        handleAdd={handleAdd}
                        color="purple"
                    />

                    <ProAndTrainItem
                        name="Other"
                        category={ProAndTrainEnum.OTHER}
                        proAndTrain={proAndTrain}
                        handleRemove={handleRemove}
                        handleAdd={handleAdd}
                        color="red"
                    />
                </>
            )}
        </div>
    )
}

const styles : { [key: string]: React.CSSProperties } = {
    holder : {
        width: '100%',
        marginTop: '2rem',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '1px 0px 10px -2px lightgray'
    },
    header : {
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
    },
}