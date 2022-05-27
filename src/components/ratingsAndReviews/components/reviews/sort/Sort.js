import React from 'react';
import SortForm from './SortForm';

function Sort(props) {
  return (
    <div>
      {props.totalReviews} reviews, sorted by: {props.sort}
      <SortForm handleSortChange={props.handleSortChange}/>
    </div>
  );
}

export default Sort;
