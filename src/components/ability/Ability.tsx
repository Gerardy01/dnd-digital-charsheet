

// components
import AbilityItem from "./AbilityItem";

// Hooks
import useAbility from "../../hooks/ability/useAbility"



export default function Ability() {

    const { abilityData } = useAbility();

    return (
        <div style={styles.abilityHolder}>
            {abilityData && (
                <>
                    <AbilityItem
                        name='STR'
                        abilityScore={abilityData.strength}
                    />
                    <AbilityItem
                        name='DEX'
                        abilityScore={abilityData.dexterity}
                    />
                    <AbilityItem
                        name='CON'
                        abilityScore={abilityData.constitution}
                    />
                    <AbilityItem
                        name='INT'
                        abilityScore={abilityData.intelligence}
                    />
                    <AbilityItem
                        name='WIS'
                        abilityScore={abilityData.wisdom}
                    />
                    <AbilityItem 
                        name='CHA'
                        abilityScore={abilityData.charisma}
                    />
                </>
            )}
        </div>
    )
}


const styles : { [key: string]: React.CSSProperties } = {
    abilityHolder: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: '2rem',
        rowGap: '2vw'
    }
}