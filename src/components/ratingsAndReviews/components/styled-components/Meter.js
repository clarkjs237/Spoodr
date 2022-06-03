import styled from 'styled-components';

export const Meter = styled.meter`
  width: 100%;
  &::-webkit-meter-bar {
    background: rgb(255, 255, 255);
    border-radius: 0px;
    height: 10px;
    width: 100%;
    -webkit-appearance: none;
    border: 1px solid lightgray;
    border-radius: 0px;
  }
  &::-webkit-meter-optimum-value {
    background:#454545;
  }
`;