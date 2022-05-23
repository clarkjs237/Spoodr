// This will be responsible for actually making API requests to get both:
// Styles
// Ratings and Reviews so we can do that star thing
import React, { useState, useEffect } from 'react';

function RelatedListItem({ id }) {
  // return <div>{id}</div>
  // so this is where we will be making GET requests to get the product information
  // namely, I want category, product name, price, rating, and pictures
  // How do I decide which one will be shown?
  // There are no pictures in the base model for the item, only in the styles. Should I just
  // choose the first style?
  // WE USE THE DEFAULT STYLE. THIS SHOULD PROBABLY BE THE FIRST ONE ONLY BUT CAN'T BE CERTAIN
  // NEED TO LOOP THROUGH RESULTS AND SEE IF DEFAULT IS TRUE. IF IT IS THEN USE THIS AS THE INFO
  const [product, setProduct] = useState({});

  // Making a function to update the related IDs. This will be an array of ids
  function updateProduct(id) {
    fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/styles`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.results);
        result.results.forEach((style) => {
          if (style['default?']) {
            // this is default style
            console.log(style);
            setProduct(style);
            return;
          }
        });
      });
  }

  useEffect(() => {
    updateProduct(id);
  }, []);

  return (
    <div>
      Product:
      {product.style_id}
    </div>
  );
}

export default RelatedListItem;
