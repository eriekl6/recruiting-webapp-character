import { FC } from 'react';
import { Character } from '../types';
import AttributeSection from './AttributeSection';
import ClassSection from './ClassSection';
import SkillSection from './SkillSection';
import './styles.css';

interface Props {
  character: Character;
  onUpdateCharacter: (character: Character) => void;
  onDeleteCharacterById: (id: string) => void;
}

// Displays the detailed information of all characters, and all the sections
const CharacterSheet: FC<Props> = ({ character, onUpdateCharacter, onDeleteCharacterById }) => {
  const handleDeleteCharButtonClick = (): void => {
    onDeleteCharacterById(character.id);
  };

  return (
    <div className='character-sheet'>
      <h1>{`Character: ${character.id}`}</h1>
      <button style={{ marginBottom: '1rem' }} onClick={handleDeleteCharButtonClick}>
        Delete Character
      </button>
      {/* TODO: implement a skill check component for this character */}
      <div className='character-sheet-item'>
        <AttributeSection character={character} onUpdateCharacter={onUpdateCharacter} />
        <ClassSection character={character} />
        <SkillSection character={character} onUpdateCharacter={onUpdateCharacter} />
      </div>
    </div>
  );
};

export default CharacterSheet;
