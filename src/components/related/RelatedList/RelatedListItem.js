// This will be responsible for actually making API requests to get both:
// Styles
// Ratings and Reviews so we can do that star thing
import React, { useState, useEffect } from 'react';

// UNCOMMENT THE LINES BELOW 8-63 FOR THIS TO WORK AGAIN
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
  function updateProduct(productID) {
    fetch(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${productID}/styles`, {
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

  if (product.photos) {
    return (
      <div className="carousel-item" style={{ width }}>
        Product #: {id}<br />
        Style #: {product.style_id}<br />
        Name: {product.name}<br />
        {/* Photos: {product.photos['0'].thumbnail_url}<br></br> */}
        <img
          alt='Img'
          src={product.photos['0'].thumbnail_url}
          style={{ width }}
        />
      </div>
    );
  }

  return <div />;
}

// So right now, children is in reference to whatever text is inside
// of RelatedListItems text block back in Related

// function RelatedListItem({ children, width }) {
//   return (
//     <div className="carousel-item" style={{ width: width}}>
//       {children}
//     </div>
//   )
// }

export default RelatedListItem;
