import styled from 'styled-components';

export const CharacteristicsMeter = styled.div`
  width: 100%;
  height: 8px;
  background: #90D7FF;
  position: relative;
  top: 10px;
  border: none;
`;

export const CharacteristicsMeterPointer = styled.div`
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 10px solid #0B2027;
  position: relative;
  top: -5px;
  left: ${(props) => {
    return `${(props.value/5)*100}%`
  }}
`;