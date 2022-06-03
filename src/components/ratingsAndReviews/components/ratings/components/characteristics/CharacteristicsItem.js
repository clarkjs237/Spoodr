import React from 'react';
import styled from 'styled-components';
import { Meter } from '../../../styled-components/Meter';
import { CharacteristicsMeter, CharacteristicsMeterPointer } from '../../../styled-components/CharacteristicsMeter';

const StyledCharacteristicsItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CharacteristicsLimits = styled.div`
  font-size: small;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  gap: 80%;
`;

function CharacteristicsItem(props) {
  return (
    <StyledCharacteristicsItem>
      <div>
        {props.characteristic}
      </div>
      <div>
        <CharacteristicsMeter />
        <CharacteristicsMeterPointer value={props.value}/>
      </div>
      <CharacteristicsLimits>
        <div>-</div>
        <div>+</div>
      </CharacteristicsLimits>
    </StyledCharacteristicsItem>
  );
}

export default CharacteristicsItem;