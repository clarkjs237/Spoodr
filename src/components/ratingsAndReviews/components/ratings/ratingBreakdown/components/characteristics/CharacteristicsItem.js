import React from 'react';

function CharacteristicsItem(props) {
  return (
    <div>
      <div>
        {props.characteristic}
      </div>
      <meter value={props.value} min={0} max={5} />
      <div className='characteristic-limits'>
        <div>Too Small</div>
        <div>Too Big</div>
      </div>
    </div>
  );
}

export default CharacteristicsItem;