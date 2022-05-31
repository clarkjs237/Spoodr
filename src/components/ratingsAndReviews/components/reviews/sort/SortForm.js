/* eslint-disable react/jsx-filename-extension */
import React from 'react';

function SortForm(props) {
  function handleClick(event){
    props.handleSortChange(event.target.value)
  }

  return (
    <form>
      <input type="radio" name="helpful" value="helpful" onClick={handleClick} />
      <label>helpful</label>
      <input type="radio" name="newest" value="newest" onClick={handleClick}/>
      <label>newest</label>
      <input type="radio" name="relevant" value="relevant" onClick={handleClick}/>
      <label>relevant</label>
    </form>
  );
}

export default SortForm;
