import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Overview from './overview/Overview';
import Questions from './questions/Questions';
import Related from './related/Related';
import Reviews from './reviews/Reviews';

const PRODUCT_ID = 65631;
const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp';

// const Title = styled.h1`
// font-size: 1.5em;
// text-align: center;
// color: palevioletred;
// `;
// const Wrapper = styled.section`
// padding: 4em;
// background: papayawhip;
// `;

function App() {
  const [product, setProduct] = useState({'id': PRODUCT_ID});
  const [productStyle, setProductStyle] = useState({});

  function updateProductByID(id) {
    fetch(`${URL}/products/${id}`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => setProduct(result))
      //remove catch later
      .catch((error) => console.log(error));

    fetch(`${URL}/products/${id}/styles`, {
      headers: {
        Authorization: process.env.GITTOKEN,
      },
    })
      .then((response) => response.json())
      .then((result) => setProductStyle(result))
      //remove catch later
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    updateProductByID(product.id);
  }, []);

  return (
    <>
      <Overview product={product} productStyle={productStyle} />
      <Questions product={product} />
      <Related product={product} />
      <Reviews product={product} />
    </>

  );
}

export default App;
