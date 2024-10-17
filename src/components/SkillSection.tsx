import { FC, useMemo } from 'react';
import { Character } from '../types';
import { SKILL_LIST } from '../consts';
import { calculateModifier } from '../Utils/Util';

interface Props {
  character: Character;
  onUpdateCharacter: (character: Character) => void;
}

// Displays the character’s skills and manages skill point usage
const SkillSection: FC<Props> = ({ character, onUpdateCharacter }) => {
  const totalSkillPoints = useMemo<number>(() => {
    return 10 + 4 * calculateModifier(character.attributes.Intelligence);
  }, [character.attributes]);

  const totalPointsUsed = useMemo<number>(() => {
    return Object.values(character.skills).reduce((total, val) => total + val, 0);
  }, [character.skills]);

  const handleIncrementSkillButtonClick = (skill: string): void => {
    if (totalPointsUsed < totalSkillPoints) {
      const newSkills = {
        ...character.skills,
        [skill]: character.skills[skill] + 1,
      };
      const updatedCharacter: Character = {
        ...character,
        skills: newSkills,
      };
      onUpdateCharacter(updatedCharacter);
    }
  };

  const handleDecrementSkillButtonClick = (skill: string): void => {
    const skillPointsAssigned = character.skills[skill];
    if (skillPointsAssigned > 0) {
      const newSkills = {
        ...character.skills,
        [skill]: character.skills[skill] - 1,
      };
      const updatedCharacter: Character = {
        ...character,
        skills: newSkills,
      };
      onUpdateCharacter(updatedCharacter);
    }
  };

  return (
    <section>
      <h2>Skills</h2>
      <h3 style={{ marginBottom: '1rem', color: totalSkillPoints - totalPointsUsed < 0 ? 'red' : 'white' }}>
        Available Points: {totalSkillPoints - totalPointsUsed}/{totalSkillPoints}
      </h3>
      <ul>
        {SKILL_LIST.map(({ name, attributeModifier }) => (
          <li key={name}>
            <label>
              {`${name} - points: ${character.skills[name]} (${attributeModifier} Modifier: ${calculateModifier(
                character.attributes[attributeModifier]
              )})`}
            </label>
            <button className={'edit-button'} onClick={() => handleIncrementSkillButtonClick(name)}>
              +
            </button>
            <button className={'edit-button'} onClick={() => handleDecrementSkillButtonClick(name)}>
              -
            </button>
            <label>{`Total: ${character.skills[name] + calculateModifier(character.attributes[attributeModifier])}`}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SkillSection;
