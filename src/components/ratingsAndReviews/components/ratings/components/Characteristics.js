import React, { useState, useEffect } from 'react';
import CharacteristicsItem from './characteristics/CharacteristicsItem'
import styled from 'styled-components';

const StyledCharacteristics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;


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
      <StyledCharacteristics>
        {Object.keys(characteristics).map((key, index) => (
          <CharacteristicsItem
            characteristic={key}
            value={Number(characteristics[key].value)}
            key={index}
          />
        ))}
      </StyledCharacteristics>
    );
  }
}

export default Characteristics;
