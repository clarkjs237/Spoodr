import React, { useState } from 'react';
import styled from 'styled-components';

import Select from 'react-select';
import axios from 'axios';
import { URL } from '../../App';

const StyledSubmitButton = styled.input`
  font-size: 1.125rem;
  color: #0B2027;
  width: 17rem;
  background-color: #90D7FF;
  padding: .5rem;
  border: solid;
  border-color: #32292F;
  border-width: .1rem;
  border-radius: .25rem;
  text-align: left;
  &:hover {
    border-color: #D3AB9E;
    color: #D3AB9E;
    cursor: pointer;
  }
`;

const StyledForm = styled.form`
`;

const selectStyles = {
  option: (styles, { isSelected, selectProps: { width } }) => ({
    ...styles,
    backgroundColor: '#D3AB9E',
    color: isSelected ? '#90D7FF' : '#0B2027',
    border: '.01rem dotted #32292F',
    width,
  }),
  control: (styles, { selectProps: { width } }) => ({
    ...styles, backgroundColor: '#90D7FF', border: '.1rem solid #32292F', width, color: '#32292F', '&:hover': {borderColor: '#D3AB9E', color: '#D3AB9E' }
  }),
  dropdownIndicator: ((styles) => ({ ...styles, color: 'inherit','&:hover': { color: '#D3AB9E' }})),
  indicatorSeparator: ((styles) => ({...styles, backgroundColor: 'inherit'})),
  singleValue: (styles) => ({ ...styles, color: '#0B2027' }),
  container: (styles, { selectProps: { width } }) => ({
    ...styles, width, height: 'auto', display: 'inline-block', margin: '0 .5rem .5rem 0',
  }),
  placeholder: ((styles, { selectProps: { placeholderColor } }) => ({ ...styles, color: placeholderColor || '#D3AB9E' })),
};

export default function AddToCart({ curStyleQuantAndSizes }) {
  const [selectedSize, setSelectedSize] = useState();
  const [selectedQuant, setSelectedQuant] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  let quantOptions = {};
  const sizeOptions = curStyleQuantAndSizes.map(({ size }) => ({ value: size, label: size }));
  const noStock = curStyleQuantAndSizes[0].size === 'Sold Out';
  let refs;
  let cartPost;

  if (selectedSize && !noStock) {
    const { quantity, sku } = curStyleQuantAndSizes.filter(({ size }) => size === selectedSize.value)[0];
    quantOptions = [...Array(quantity)].map((k, i) => ({ value: i + 1, label: i + 1 }));
    cartPost = { sku_id: parseInt(sku) };
  }

  function postToCart() {
    return axios.post(`${URL}/cart`, cartPost, {
      headers: {
        Authorization: process.env.GITTOKEN,
        'content-type': 'application/json',
      },
    });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (!selectedSize) {
      refs.focus();
      setMenuOpen(true);
    } else {
      setSelectedQuant('');
      setSelectedSize('');
      console.log(cartPost, selectedQuant.value);
      Promise.all([...Array(selectedQuant.value)].map((element) => postToCart()))
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  }

  function onQuantChangeHandler(options) {
    setSelectedQuant(options);
  }

  function onSizeChangeHandler(options) {
    setSelectedSize(options);
    setSelectedQuant({ value: 1, label: 1 });
  }

  function onSizeInputChangeHandler(options, { action }) {
    if (action === 'menu-close') {
      setMenuOpen(false);
    }
  }

  let submitButton = (
    <StyledSubmitButton
      type="submit"
      value="ADD TO BAG                          +"
    />
  );

  if (noStock) {
    submitButton = <></>;
  }

  let placeholder = 'Select Size'.toUpperCase();
  if (menuOpen) {
    placeholder = 'Please Select Size'.toUpperCase();
  }

  return (
    <StyledForm onSubmit={onSubmitHandler}>
      <Select
        name="Sizes"
        options={sizeOptions}
        onChange={onSizeChangeHandler}
        onInputChange={onSizeInputChangeHandler}
        placeholder={placeholder}
        value={selectedSize}
        openMenuOnFocus
        ref={(r) => refs = r}
        styles={selectStyles}
        width={menuOpen ? 'auto' : '11.5rem'}
        placeholderColor={menuOpen ? '#0B2027' : '#D3AB9E'}
        onMouseOver={console.log('hi')}
      />
      <Select
        name="Quant"
        options={quantOptions}
        onChange={onQuantChangeHandler}
        placeholder="-"
        value={selectedQuant}
        styles={selectStyles}
        width="5rem"
      />
      <div>
        {submitButton}
      </div>
    </StyledForm>
  );
}