import React from 'react';
import SortForm from './SortForm';

function Sort(props) {
  return (
    <div className="sort-form" style={{display: "flex", fontSize: "small"}}>
      {props.totalReviews}
      &nbsp;reviews, sorted by:
      <SortForm
        handleSortChange={props.handleSortChange}
        sort={props.sort}
      />
    </div>
  );
}

export default Sort;
