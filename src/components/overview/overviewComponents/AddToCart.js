import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const StyledAddToCartForm = styled.form`

`;

const StyledSelectField = styled.select`

`;

const StyledSubmitButton = styled.input`

`;

export default function AddToCart({ curStyleQuantAndSizes }){

  const [selectedSize, setSelectedSize] = useState();
  const [selectedQuant, setSelectedQuant] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  let quantOptions = {};
  const sizeOptions = curStyleQuantAndSizes.map(({ size }) => {
    return {value: size, label: size}
  });
  const noStock = curStyleQuantAndSizes[0].size === 'Sold Out';
  let refs;

  function onSubmitHandler(e) {
    if(!selectedSize) {
      refs.focus();
      setMenuOpen(true);
    }
    e.preventDefault();
  }

  function onQuantChangeHandler(options) {
    setSelectedQuant(options);
  }

  function onSizeChangeHandler(options) {
    setSelectedSize(options);
    setSelectedQuant({value: 1, label: 1});
  }

  function onSizeInputChangeHandler(options, { action }) {
    if(action === 'menu-close') {
      setMenuOpen(false)
    }
  }


  if(selectedSize && !noStock){
    const maxStyleQuantity = curStyleQuantAndSizes.filter(({ size }) => size === selectedSize.value)[0].quantity;
    quantOptions = [...Array(maxStyleQuantity)].map((k, i) => {
      return {value: i + 1, label: i + 1}
    });
  }

  let submitButton = <StyledSubmitButton type="submit" value="Add To Bag"/>;

  if(noStock) {
    submitButton = <></>;
  }

  let placeholder = "Select Size".toUpperCase();
  if(menuOpen) {
    placeholder = "Please Select Size".toUpperCase();
  }

  return(
    <StyledAddToCartForm onSubmit={onSubmitHandler}>
      <Select
        name="Sizes"
        options={sizeOptions}
        onChange={onSizeChangeHandler}
        onInputChange={onSizeInputChangeHandler}
        placeholder={placeholder}
        value={selectedSize}
        openMenuOnFocus={true}
        ref={r => refs = r}
      />
      <Select
        name="Quant"
        options={quantOptions}
        onChange={onQuantChangeHandler}
        placeholder={"-"}
        value={selectedQuant}
      />
      {submitButton}
    </StyledAddToCartForm>
  )
}