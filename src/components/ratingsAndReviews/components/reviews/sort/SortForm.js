import React from 'react';

function SortForm(props) {
  function handleClick(event){
    props.handleSortChange(event.target.value)
  }

  return (
    // <form onChange={(handleClick)}>
    //   <input type="radio" name="helpful" value="helpful" />
    //   <label htmlFor='helpful'>helpful</label>
    //   <input type="radio" name="newest" value="newest" />
    //   <label htmlFor='newest'>newest</label>
    //   <input type="radio" name="relevant" value="relevant" />
    //   <label htmlFor='relevant'>relevant</label>
    // </form>
    <form onChange={(handleClick)}>
      <select name="sort" class='underline-button'>
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
        <option value="relevant">relevant</option>
      </select>
    </form>
  );
}

export default SortForm;
