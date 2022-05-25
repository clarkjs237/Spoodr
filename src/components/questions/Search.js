import React from "react";

function Search({ id, value, type = "text", onInputChange }) {
  return (
    <>
      <label htmlFor={id}>Questions & answers</label>
      <input id={id} type={type} value={value} onChange={onInputChange} />
    </>
  );
}

export default Search;
