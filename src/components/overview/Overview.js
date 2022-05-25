import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProductInfo from './overviewComponents/ProductInfo';
import SocialMedia from './overviewComponents/SocialMedia';
import StyleSelector from './overviewComponents/StyleSelector';

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
  const [curStyleId, setCurStyleId] = useState(0);
  if (product.category && productStyle.product_id) {
    const socialUrl = productStyle.results[curStyleId].photos[curStyleId].url;
    const productOrginalPrice = productStyle.results[curStyleId].original_price;
    const productSalePrice = productStyle.results[curStyleId].sale_price;
    const curStyleName = productStyle.results[curStyleId].name;
    let i = -1;
    const styleThumbnails = productStyle.results.map((element) => {
      i++;
      return { id: i, thumbnail: element.photos[0].thumbnail_url };
    });
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
        <StyleSelector
          curStyleId={curStyleId}
          setCurStyleId={setCurStyleId}
          curStyleName={curStyleName}
          styleThumbnails={styleThumbnails}
        />
        <SocialMedia url={socialUrl} slogan={product.slogan} />
        <ProductSlogan>{product.slogan}</ProductSlogan>
        <ProductDescription>{product.description}</ProductDescription>
      </ProductOverview>
    );
  }
}

Overview.propTypes = {

};
