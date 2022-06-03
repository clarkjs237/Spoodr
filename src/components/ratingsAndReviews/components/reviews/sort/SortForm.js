/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import styled from 'styled-components';

const StyledDropdown = styled.select`
  border-style: none;
  background: none;
  text-decoration: underline;
`;

function SortForm({handleSortChange}) {
  function handleClick(event) {
    handleSortChange(event.target.value);
  }

  return (
    <form onChange={(handleClick)}>
      <StyledDropdown name="sort">
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
        <option value="relevant">relevant</option>
      </StyledDropdown>
    </form>
  );
}

export default SortForm;
