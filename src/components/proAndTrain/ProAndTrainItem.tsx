import { Typography, Tag, Input } from "antd"
import { PlusOutlined } from "@ant-design/icons"

// hooks
import useProAndTrainItem from "../../hooks/proAndTrain/useProAndTrainItem";

// interfaces
import type { ProficienciesAndTraining } from "../../models/dataInterface";
interface Props {
    name: string;
    category: string;
    proAndTrain: ProficienciesAndTraining;
    handleRemove: (category: string, index: number) => void;
    handleAdd: (category: string, item: string) => void;
    color?: string;
}

const { Title, Text } = Typography;

export default function ProAndTrainItem({ name, category, proAndTrain, handleRemove, handleAdd, color }: Props) {

    const {
        inputVisible,
        inputValue,
        inputRef,
        showInput,
        handleChangeInput,
        resetInput,
    } = useProAndTrainItem();

    return (
        <div style={styles.section}>
            <Title level={5} style={styles.sectionTitle}>{name}</Title>
            <div style={styles.tags}>
                {proAndTrain &&
                proAndTrain[category as keyof ProficienciesAndTraining].length > 0 &&
                proAndTrain[category as keyof ProficienciesAndTraining].map((item, i) => {
                    return (
                        <Tag
                            key={i}
                            style={styles.tag}
                            closable
                            onClose={(e) => {
                                e.preventDefault();
                                handleRemove(category, i);
                            }}
                            color={color ? color : '#F3F4F6'}
                        >
                            <Text>{item}</Text>
                        </Tag>
                    )
                })}
                {inputVisible ? (
                    <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={styles.tagInputStyle}
                        value={inputValue}
                        onChange={(e) => handleChangeInput(e.target.value)}
                        onBlur={() => {
                            handleAdd(category, inputValue);
                            resetInput();
                        }}
                        onPressEnter={() => {
                            handleAdd(category, inputValue);
                            resetInput();
                        }}
                    />
                ) : (
                    <Tag
                        style={styles.tagPlusStyle}
                        icon={<PlusOutlined />}
                        onClick={() => showInput(true)}
                    >
                        Add
                    </Tag>
                )}
            </div>
        </div>
    )
}

const styles : { [key: string]: React.CSSProperties } = {
    section: {
        marginTop: 12,
    },
    sectionTitle: {
        color: '#374151',
        marginBottom: 8,
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        padding: '6px 8px',
        borderRadius: 8,
        fontSize: 10,
    },
    tagPlusStyle : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        borderStyle: 'dashed',
        color: 'blue',
        padding: '6px 8px',
        fontSize: 10,
    },
    tagInputStyle : {
        width: "6rem",
        height: "2.2rem",
        marginInlineEnd: 8,
        verticalAlign: 'top',
    }
}