import React from 'react';
import styled from 'styled-components';

const CharacteristicsLimits = styled.div`
  font-size: small;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

function CharacteristicsItem(props) {
  return (
    <div style={{width: "100%", maxWidth: "250px"}}>
      <div>
        {props.characteristic}
      </div>
      <meter value={props.value} min={0} max={5} style={{width: "100%"}}/>
      <CharacteristicsLimits>
        <div>Too Small</div>
        <div>Too Big</div>
      </CharacteristicsLimits>
    </div>
  );
}

export default CharacteristicsItem;