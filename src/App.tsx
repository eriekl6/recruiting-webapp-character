import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { DEFAULT_CHARACTER } from './consts';
import { Character } from './types';
import CharacterParty from './components/CharacterParty';
import API from './API/API';

// Manages the party of characters and provides the character creation and update methods
function App() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const { data } = await API.get('');
        setCharacters(data?.body?.body);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCharacters();
  }, []);

  const saveAllCharacters = async () => {
    try {
      const response = await API.post('', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: characters,
      });
      alert('Characters saved successfully.');
    } catch (error) {
      console.log(error);
      alert('Failed to save characters.');
    }
  };

  const createCharacter = (): Character => ({
    ...DEFAULT_CHARACTER,
    id: crypto.randomUUID(),
  });

  const addNewCharacterToRoster = (): void => {
    const newCharacter = createCharacter();
    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
  };

  // find the character to update based on the ids, then update just that character (no change if id not found)
  const updateCharacter = useCallback((updatedCharacter: Character): void => {
    const charId = updatedCharacter.id;
    setCharacters((prevCharacters) => prevCharacters.map((char) => (char.id === charId ? updatedCharacter : char)));
  }, []);

  const deleteCharacterById = useCallback((id: string): void => {
    setCharacters((prevCharacters) => prevCharacters.filter((char) => char.id !== id));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Sheet App - Eric Leung</h1>
      </header>
      <section className="App-section">
        <button onClick={addNewCharacterToRoster}>Add New Character</button>
        <button onClick={saveAllCharacters}>Save Characters</button>
        <CharacterParty characters={characters} onUpdateCharacter={updateCharacter} onDeleteCharacterById={deleteCharacterById} />
      </section>
    </div>
  );
}

export default App;
