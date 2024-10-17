import { FC, useEffect, useMemo, useState } from 'react';
import { Attributes, Character, Class } from '../types';
import './styles.css';
import { CLASS_LIST } from '../consts';

interface Props {
  character: Character;
}

// Displays the available classes and highlights the valid classes
// Display detailed requirements for the selected class
const ClassSection: FC<Props> = ({ character }) => {
  const [selectedClass, setSelectedClass] = useState<Class>(null);

  const validClasses = useMemo<Class[]>(
    () =>
      (Object.entries(CLASS_LIST) as [Class, Attributes][])
        .filter(([_, requiredAttributes]) =>
          Object.entries(requiredAttributes).every( // class passes if every attribute requirement is met
            ([attr, requirement]) => character.attributes[attr as keyof Attributes] >= requirement
          )
        )
        .map(([className]) => className),
    [character.attributes]
  );

  const handleClassNameClick = (className) => {
    setSelectedClass(className);
  };

  const handleCloseReqsButtonClick = () => {
    setSelectedClass(null);
  };

  return (
    <section>
      <h2>Classes</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ul>
          {Object.keys(CLASS_LIST).map((className: Class) => (
            <li key={className}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '12pt',
                  textDecoration: selectedClass === className ? 'underline' : 'none',
                  color: validClasses.includes(className) ? '#3ca06e' : 'white',
                }}
                onClick={() => handleClassNameClick(className)}
              >
                {className}
              </button>
            </li>
          ))}
        </ul>
        {selectedClass && (
          <div className={'class-requirements'}>
            <h3>{selectedClass} Requirements</h3>
            <ul>
              {Object.entries(CLASS_LIST[selectedClass]).map(([attribute, value]) => (
                <li key={`${selectedClass}-${attribute}`}>
                  {attribute}: {value}
                </li>
              ))}
            </ul>
            <button onClick={handleCloseReqsButtonClick}>Close</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClassSection;
