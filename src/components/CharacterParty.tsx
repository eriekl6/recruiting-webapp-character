import { FC } from 'react';
import { Character } from '../types';
import CharacterSheet from './CharacterSheet';

interface Props {
  characters: Character[];
  onUpdateCharacter: (character: Character) => void;
  onDeleteCharacterById: (id: string) => void;
}

// Displays the list of characters and provides options to add or delete characters.
const CharacterParty: FC<Props> = ({ characters, onUpdateCharacter, onDeleteCharacterById }) => {
  return (
    <div>
      {/* TODO: implement a party skill check */}
      {characters.map((character) => (
        <CharacterSheet key={character.id} character={character} onUpdateCharacter={onUpdateCharacter} onDeleteCharacterById={onDeleteCharacterById} />
      ))}
    </div>
  );
};

export default CharacterParty;
