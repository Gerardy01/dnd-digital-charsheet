

// interface
interface Props {
    color: string;
    icon: React.ReactNode;
    paddingBottom?: string;
}


export default function Icon({ color, icon, paddingBottom }: Props) {
    return (
        <div style={{
            ...styles.iconHolder,
            background: color,
            paddingBottom: paddingBottom ?? '0.3rem'
        }}>
            {icon}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    iconHolder: {
        padding: '0.5rem',
        borderRadius: '10px'
    },
}