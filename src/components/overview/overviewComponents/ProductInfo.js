import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProductPrice from './ProductInfoComponents/ProductPrice';
import StarRatingReview from './ProductInfoComponents/StarRatingReview';

const ProductTitle = styled.h2`
  margin: 0;
  font-size: 2.25rem;
`;
const ProductCategory = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
`;

export default function ProductInfo({
  productCategory,
  productTitle,
  productOrginalPrice,
  productSalePrice,
  totalReviews,
  averageRating,
  averageStarRating,
}) {
  return (
    <>
      <StarRatingReview
        totalReviews={totalReviews}
        averageRating={averageRating}
        averageStarRating={averageStarRating}
      />
      <ProductCategory>{productCategory.toUpperCase()}</ProductCategory>
      <ProductTitle>{productTitle}</ProductTitle>
      <ProductPrice
        productOrginalPrice={productOrginalPrice}
        productSalePrice={productSalePrice}
      />
    </>
  );
}

ProductInfo.propTypes = {

};
