import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { URL } from '../../App';
import axios from 'axios';

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
  let refs, cartPost;

  if(selectedSize && !noStock){
    let { quantity, sku } = curStyleQuantAndSizes.filter(({ size }) => size === selectedSize.value)[0];
    quantOptions = [...Array(quantity)].map((k, i) => {
      return {value: i + 1, label: i + 1}
    });
    cartPost = {sku_id: parseInt(sku)}
  }

  function postToCart() {
    return axios.post(`${URL}/cart`, cartPost, {
      headers: {
        'Authorization': process.env.GITTOKEN,
        'content-type': 'application/json'
      }
    })
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if(!selectedSize) {
      refs.focus();
      setMenuOpen(true);
    } else {
      setSelectedQuant('');
      setSelectedSize('');
      console.log(cartPost, selectedQuant.value);
      Promise.all([...Array(selectedQuant.value)].map((element) => postToCart()))
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
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