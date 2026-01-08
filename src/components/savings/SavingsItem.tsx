import { Typography } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";


const { Text } = Typography;


export default function SavingsItem() {
    return (
        <div>
            <CheckCircleTwoTone style={{ fontSize: '10px' }} />
            <Text>Strength</Text>
        </div>
    )
}

const styles : { [key: string]: React.CSSProperties } = {
    
}