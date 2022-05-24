import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProductInfo from './OverviewComponents/ProductInfo';
import SocialMedia from './OverviewComponents/SocialMedia';

const ProductOverview = styled.div`
  color: #0B2027;
  background-color: #EAC9C1;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
`;

const ProductSlogan = styled.h4`
`;

const ProductDescription = styled.p`
`;

export default function Overview({
  product,
  productStyle,
  totalReviews,
  averageRating,
  averageStarRating,
}) {
  const [productStyleId, setProductStyleId] = useState(2);
  if (product.category && productStyle.product_id) {
    const socialUrl = productStyle.results[productStyleId].photos[productStyleId];
    const productOrginalPrice = productStyle.results[productStyleId].original_price;
    const productSalePrice = productStyle.results[productStyleId].sale_price;
    return (
      <ProductOverview>
        <ProductInfo
          totalReviews={totalReviews}
          averageRating={averageRating}
          averageStarRating={averageStarRating}
          productCategory={product.category.toUpperCase()}
          productTitle={product.name}
          productOrginalPrice={productOrginalPrice}
          productSalePrice={productSalePrice}
        />
        <ProductSlogan>{product.slogan}</ProductSlogan>
        <SocialMedia url={socialUrl} slogan={product.slogan} />
        <ProductDescription>{product.description}</ProductDescription>
      </ProductOverview>
    );
  }
}

Overview.propTypes = {

};
