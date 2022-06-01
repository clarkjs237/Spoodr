import React from 'react';

function ReviewFormCharacteristics(props) {
  return (
    <div>
      {props.name}
      <label htmlFor={props.name}>
        <input type="radio" name={props.name} value="1" onChange={props.handleInputChange} required />
        1
      </label>
      <label htmlFor={props.name}>
        <input type="radio" name={props.name} value="2" onChange={props.handleInputChange} required />
        2
      </label>
      <label htmlFor={props.name}>
        <input type="radio" name={props.name} value="3" onChange={props.handleInputChange} required />
        3
      </label>
      <label htmlFor={props.name}>
        <input type="radio" name={props.name} value="4" onChange={props.handleInputChange} required />
        4
      </label>
      <label htmlFor={props.name}>
        <input type="radio" name={props.name} value="5" onChange={props.handleInputChange} required />
        5
      </label>
    </div>
  );
}

export default ReviewFormCharacteristics;
