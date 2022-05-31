import React, { useState, useEffect } from 'react';
import CharacteristicsItem from './characteristics/CharacteristicsItem'

function Characteristics(props) {
  const [characteristics, setCharacteristics] = useState({});

  function getCharacteristics() {
    setCharacteristics(props.reviewsMeta?.characteristics);
  }

  useEffect(() => {
    getCharacteristics();
  }, [props.reviewsMeta.characteristics]);

  if (props.reviewsMeta.characteristics) {
    return (
      <div>
        {Object.keys(characteristics).map((key, index) => (
          <CharacteristicsItem
            characteristic={key}
            value={Number(characteristics[key].value)}
            key={index}
          />
        ))}
      </div>
    );
  }
}

export default Characteristics;
