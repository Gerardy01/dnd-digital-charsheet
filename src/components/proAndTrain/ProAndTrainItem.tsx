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
                                style={{ ...styles.tag, border: '' }}
                                closable
                                onClose={(e) => {
                                    e.preventDefault();
                                    handleRemove(category, i);
                                }}
                                color={color ? color : '#F3F4F6'}
                                variant="outlined"
                            >
                                <Text style={{ fontSize: '12px' }}>{item}</Text>
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
                            resetInput();
                            if (inputValue.trim() === "") return;

                            handleAdd(category, inputValue);
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

const styles: { [key: string]: React.CSSProperties } = {
    section: {
        padding: "0.7rem 0",
    },
    sectionTitle: {
        color: '#374151',
        marginBottom: 8,
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center'
    },
    tag: {
        padding: '2px 8px',
        borderRadius: 6,
        fontSize: 10,
    },
    tagPlusStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        borderStyle: 'dashed',
        color: 'blue',
        padding: '2px 8px',
        fontSize: 10,
        cursor: 'pointer',
    },
    tagInputStyle: {
        width: "6rem",
        height: '1.8rem',
        marginInlineEnd: 8,
        verticalAlign: 'top',
    }
}