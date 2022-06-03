import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import axios from 'axios';
import { URL } from '../../App';

const StyledSubmitButton = styled.input`
  font-size: 1.125rem;
  border: solid;
  border-width: 1.5px;
  color: #0B2027;
  width: 18.3rem;
  background-color: white;
  padding: 1rem;
  border-color: #32292F;
  text-align: left;
  &:hover {
    border-color: #90D7FF;
    cursor: pointer;
  }
`;

const StyledForm = styled.form`
`;

const selectStyles = {
  option: (styles, { isSelected, isFocused, selectProps: { width } }) => ({
    ...styles,
    backgroundColor: isSelected ? '#90D7FF' : 'white',
    outline: isFocused ? 'solid 1.5px #90D7FF' : '0',
    fontSize: isFocused ? '1.125rem' : 'inherit',
    color: '#0B2027',
    width,
    height: 'auto',
    '&:hover': {
      backgroundColor: '90D7FF',
    }
  }),
  control: (styles, { selectProps: { width } }) => ({
    ...styles,
    backgroundColor: 'white',
    borderRadius: '0',
    padding: '8.5px 8px',
    border: '1.5px solid',
    width,
    color: '#32292F',
    fontSize: '1.125rem',
    '&:hover': {
      borderColor: '#90D7FF',
      cursor: 'pointer',
    }
  }),
  dropdownIndicator: ((styles) => ({ ...styles, color: 'inherit','&:hover': { color: '#0B2027' }})),
  indicatorSeparator: ((styles) => ({...styles, backgroundColor: 'inherit'})),
  singleValue: (styles) => ({ ...styles, color: '#0B2027' }),
  container: (styles, { selectProps: { width } }) => ({
    ...styles, width, height: 'auto', display: 'inline-block', margin: '0 .5rem .5rem 0',
  }),
  placeholder: ((styles, { selectProps: { placeholderColor } }) => ({ ...styles, margin: '0', color: placeholderColor || '#0B2027' })),
};

export default function AddToCart({ curStyleQuantAndSizes, className }) {
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

  useEffect(()=>{
    setSelectedQuant('');
      setSelectedSize('');
  },[curStyleQuantAndSizes]);

  function onSubmitHandler(e) {
    e.preventDefault();
    if (!selectedSize) {
      refs.focus();
      setMenuOpen(true);
    } else {
      setSelectedQuant('');
      setSelectedSize('');
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
    if(options.value !== 'Sold Out')
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
      value="ADD TO BAG                         +"
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
        className={className}
        name="Sizes"
        options={sizeOptions}
        onChange={onSizeChangeHandler}
        onInputChange={onSizeInputChangeHandler}
        placeholder={placeholder}
        value={selectedSize}
        openMenuOnFocus
        ref={(r) => refs = r}
        styles={selectStyles}
        width={menuOpen ? 'auto' : '12.3rem'}
      />
      <Select
        className={className}
        name="Quant"
        options={quantOptions}
        onChange={onQuantChangeHandler}
        placeholder="-"
        value={selectedQuant}
        styles={selectStyles}
        width="5.5rem"
      />
      <div>
        {submitButton}
      </div>
    </StyledForm>
  );
}