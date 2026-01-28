
// utils
import { AbilityEnum } from "../../utils/enums";

// components
import AbilityItem from "./AbilityItem";

// Hooks
import useAbility from "../../hooks/ability/useAbility"



export default function Ability() {

    const { abilityData, changeAbilityModifier, changeAbilityScore } = useAbility();

    return (
        <div style={styles.abilityHolder}>
            {abilityData && (
                <>
                    <AbilityItem
                        name='STR'
                        abilityScore={abilityData.strength}
                        abilityName={AbilityEnum.STR}
                        changeAbilityModifier={changeAbilityModifier}
                        changeAbilityScore={changeAbilityScore}
                    />
                    <AbilityItem
                        name='DEX'
                        abilityScore={abilityData.dexterity}
                        abilityName={AbilityEnum.DEX}
                        changeAbilityModifier={changeAbilityModifier}
                        changeAbilityScore={changeAbilityScore}
                    />
                    <AbilityItem
                        name='CON'
                        abilityScore={abilityData.constitution}
                        abilityName={AbilityEnum.CON}
                        changeAbilityModifier={changeAbilityModifier}
                        changeAbilityScore={changeAbilityScore}
                    />
                    <AbilityItem
                        name='INT'
                        abilityScore={abilityData.intelligence}
                        abilityName={AbilityEnum.INT}
                        changeAbilityModifier={changeAbilityModifier}
                        changeAbilityScore={changeAbilityScore}
                    />
                    <AbilityItem
                        name='WIS'
                        abilityScore={abilityData.wisdom}
                        abilityName={AbilityEnum.WIS}
                        changeAbilityModifier={changeAbilityModifier}
                        changeAbilityScore={changeAbilityScore}
                    />
                    <AbilityItem
                        name='CHA'
                        abilityScore={abilityData.charisma}
                        abilityName={AbilityEnum.CHA}
                        changeAbilityModifier={changeAbilityModifier}
                        changeAbilityScore={changeAbilityScore}
                    />
                </>
            )}
        </div>
    )
}


const styles: { [key: string]: React.CSSProperties } = {
    abilityHolder: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: '2rem',
        rowGap: '2vw'
    }
}