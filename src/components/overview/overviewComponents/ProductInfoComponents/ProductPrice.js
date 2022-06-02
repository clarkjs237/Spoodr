import React from 'react';
import styled from 'styled-components';

const PriceContainer = styled.p`
  margin-top: 1.75rem;
  font-size: 1.125;
`;

const Price = styled.span`
  color: ${(props) => (props.sale ? '#90D7FF' : 'inherit')};
  text-decoration: ${(props) => (props.orgsale ? 'line-through' : 'inherit')};
  font-weight: ${(props) => (props.sale ? 'bold' : 'inherit')};
  margin-right: .75em;
  -webkit-text-stroke: ${(props) => (props.sale ? '.5px #32292F' : 'inherit')};
`;

export default function ProductPrice({ productOrginalPrice, productSalePrice }) {
  if (productSalePrice) {
    return (
      <PriceContainer>
        <Price sale>{`$${parseInt(productSalePrice)}`}</Price>
        <Price orgsale>{`$${parseInt(productOrginalPrice)}`}</Price>
      </PriceContainer>
    );
  }
  return (
    <PriceContainer>
      <Price>{`$${parseInt(productOrginalPrice)}`}</Price>
    </PriceContainer>
  );
}

