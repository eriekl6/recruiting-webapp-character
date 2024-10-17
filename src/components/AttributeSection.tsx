import { FC, useMemo } from 'react';
import { Attributes, Character } from '../types';
import './styles.css';
import { ATTRIBUTE_LIST } from '../consts';
import { calculateModifier } from '../Utils/Util';

interface Props {
  character: Character;
  onUpdateCharacter: (character: Character) => void;
}

// Displays the character’s attributes and allows for updates using + and - buttons
const AttributeSection: FC<Props> = ({ character, onUpdateCharacter }) => {
  const totalAttributes = useMemo<number>(() => {
    return Object.values(character.attributes).reduce((total, val) => total + val, 0);
  }, [character.attributes]);

  const handleIncrementButtonClick = (attribute: string): void => {
    if (totalAttributes >= 70) {
      alert('Total amount of attributes cannot exceed 70!');
    } else {
      const newAttributes: Attributes = {
        ...character.attributes,
        [attribute]: character.attributes[attribute] + 1,
      };
      const updatedCharacter: Character = {
        ...character,
        attributes: newAttributes,
      };
      onUpdateCharacter(updatedCharacter);
    }
  };

  const handleDecrementButtonClick = (attribute: string): void => {
    if (character.attributes[attribute] > 0) {
      const newAttributes: Attributes = {
        ...character.attributes,
        [attribute]: character.attributes[attribute] - 1,
      };
      const updatedCharacter: Character = {
        ...character,
        attributes: newAttributes,
      };
      onUpdateCharacter(updatedCharacter);
    }
  };

  return (
    <section>
      <h2>Attributes</h2>
      <ul>
        {ATTRIBUTE_LIST.map((attribute) => (
          <li key={attribute}>
            <label>{`${attribute}: ${character.attributes[attribute]} (Modifier: ${calculateModifier(character.attributes[attribute])})`}</label>
            <button className={'edit-button'} onClick={() => handleIncrementButtonClick(attribute)}>
              +
            </button>
            <button className={'edit-button'} onClick={() => handleDecrementButtonClick(attribute)}>
              -
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AttributeSection;
