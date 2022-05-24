// This will be responsible for actually making API requests to get both:
// Styles
// Ratings and Reviews so we can do that star thing
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { URL } from '../../App';

// const Title = styled.h1`
// font-size: 1.5em;
// text-align: center;
// color: palevioletred;
// `;


function RelatedListItem({ id, width }) {
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

  // Making a function to update the related IDs. This will be an array of ids
  // This is where I actually get the Image id
  function updateProduct(productID) {
    console.log('made request');
    fetch(`${URL}/products/${productID}/styles`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        let bool = false;
        result.results.forEach((style) => {
          if (!bool && style['default?']) {
            // this is default style
            setProduct(style);
            bool = true;
          }
        });
        // If bool wasn't flipped, we know theres no default
        // so we need to set default to be the first in the list
        if (!bool) {
          setProduct(result.results[0]);
        }
      });
  }

  useEffect(() => {
    updateProduct(id);
  }, []);


  const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
    display: inline-flex;
    border: 1px solid red;
    width: ${width}
    `;

  if (product.photos) {
    // return (
    //   <Wrapper>
    //     <div className="carousel-item" style={{ width }}>
    //       Product #: {id}<br />
    //       Style #: {product.style_id}<br />
    //       Name: {product.name}<br />
    //       <img
    //         alt='Img'
    //         src={product.photos['0'].thumbnail_url}
    //         style={{ width }}
    //       />
    //     </div>
    //   </Wrapper>
    // );
    return (
      <Wrapper>
        Product #: {id}<br />
        Style #: {product.style_id}<br />
        Name: {product.name}<br />
        <img
          alt='Img'
          src={product.photos['0'].thumbnail_url}
          style={{ width }}
        />
      </Wrapper>
    );
  }

  return <div />;
}

export default RelatedListItem;
