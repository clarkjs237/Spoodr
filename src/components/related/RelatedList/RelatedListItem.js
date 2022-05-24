import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { URL } from '../../App';



function RelatedListItem({ id, width }) {
  const [product, setProduct] = useState({});

  // Making a function to update the related IDs. This will be an array of ids
  function updateProduct(productID) {
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
