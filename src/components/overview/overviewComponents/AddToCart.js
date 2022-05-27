import React, { useState } from 'react';
import styled from 'styled-components';

const StyledAddToCartForm = styled.form`

`;

const StyledSelectField = styled.select`

`;

const StyledInputButton = styled.input`

`;

export default function AddToCart({ curStyleQuantAndSizes }){

  const [selectedSize, setSelectedSize] = useState();
  const [selectedQuant, setSelectedQuant] = useState();

  function onSubmitHandler(e) {
    console.log("post it bebe!");
  }

  function onChangeHandler(e) {
    if(e.target.id === 'sizes') {
      setSelectedSize(e.target.value)
    }
  }

  return(
    <StyledAddToCartForm onSubmit={onSubmitHandler}>
      <StyledSelectField id="sizes" value={selectedSize} onChange={onChangeHandler}>
        <option value={null}>Select Size</option>
        {curStyleQuantAndSizes.map(({ size }) =>
          <option id="size" value={size}>{size}</option>
        )}
      </StyledSelectField>
    </StyledAddToCartForm>
  )
}