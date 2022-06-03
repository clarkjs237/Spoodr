import React from 'react';
import styled from 'styled-components';
import ProductPrice from './ProductInfoComponents/ProductPrice';
import StarRatingReview from './ProductInfoComponents/StarRatingReview';

const ProductTitle = styled.div`
  margin: 0;
  font-size: 3.5rem;
  font-weight: bold;
`;

const ProductCategory = styled.div`
  margin-top: 1.75rem;
  font-size: 1rem;
`;

const ProductInfoWrap = styled.div`
  margin-bottom: 1.75rem;
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
    <ProductInfoWrap>
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
    </ProductInfoWrap>
  );
}
