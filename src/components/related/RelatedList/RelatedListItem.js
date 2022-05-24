import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


function RelatedListItem({ style, width }) {
  // so this is where we will be making GET requests to get the product information
  // namely, I want category, product name, price, rating, and pictures
  // How do I decide which one will be shown?
  // There are no pictures in the base model for the item, only in the styles. Should I just
  // choose the first style?
  // WE USE THE DEFAULT STYLE. THIS SHOULD PROBABLY BE THE FIRST ONE ONLY BUT CAN'T BE CERTAIN
  // NEED TO LOOP THROUGH RESULTS AND SEE IF DEFAULT IS TRUE. IF IT IS THEN USE THIS AS THE INFO
  // What to do if there is no default? It's still related but there is no default? How about just
  // use the first item in the list?
  // Another consideration is that the default style, even if it is the default, may have no
  // pictures for it. This is troubling
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(style);
  }, []);


  const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
    display: inline-flex;
    border: 1px solid red;
    width: ${width}
    `;

  if (Object.keys(product).lenght === 0) {
    return <div>Empty</div>;
  }
  return (
    <Wrapper>
      {/* Product #: {id}<br /> */}
      Style #: {product.style_id}<br />
      Name: {product.name}<br />
      {/* <img
        alt='Img'
        src={product.photos['0'].thumbnail_url}
        style={{ width }}
      /> */}
    </Wrapper>
  );
}

export default RelatedListItem;
