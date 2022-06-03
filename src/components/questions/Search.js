import React from 'react';
import styled from 'styled-components';

const ScreenReaderText = styled.span`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
`;

const StyledSearch = styled.input`
  border: 1px solid #0B2027;
  padding: 1rem;
  width: 97%;
  ::placeholder {
    font-weight: bold;
    text-transform: uppercase;
  }
`;

function Search({
  id, value, type = 'text', onInputChange,
}) {
  return (
    <section>
      <label htmlFor={id}>
        <ScreenReaderText>Questions & answers</ScreenReaderText>
        <StyledSearch
          id={id}
          type={type}
          value={value}
          placeholder="Have a question? Search for answers..."
          onChange={onInputChange}
        />
      </label>
    </section>
  );
}

export default Search;
