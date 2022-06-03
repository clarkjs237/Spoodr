import React from 'react';
import styled from 'styled-components';
import { Meter } from '../../../styled-components/Meter';

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
      <Meter value={props.value} min={0} max={5} style={{width: "100%"}}/>
      <CharacteristicsLimits>
        <div>-</div>
        <div>+</div>
      </CharacteristicsLimits>
    </StyledCharacteristicsItem>
  );
}

export default CharacteristicsItem;