import React from 'react';

function SortForm({handleSortChange}) {
  function handleClick(event) {
    handleSortChange(event.target.value);
  }

  return (
    <form onChange={(handleClick)}>
      <select name="sort" className="underline-button">
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
        <option value="relevant">relevant</option>
      </select>
    </form>
  );
}

export default SortForm;
