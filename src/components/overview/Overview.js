import { useState } from 'react';
import styled from 'styled-components';
import ProductInfo from './OverviewComponents/ProductInfo';
import SocialMedia from './OverviewComponents/SocialMedia';

const ProductOverview = styled.div`
  color: #0B2027;
  background-color: #EAC9C1;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
`;

const ProductSlogan = styled.h4`

`;

export default function Overview({ product, productStyle, totalReviews, averageRating, averageStarRating }) {
  const [productStyleId, setProductStyleId] = useState(0);
  if(product.category && productStyle.product_id) {
    const url = productStyle.results[productStyleId].photos[productStyleId].url;
    return (
      <ProductOverview>
        <ProductInfo
          totalReviews={totalReviews}
          averageRating={averageRating}
          averageStarRating={averageStarRating}
          productCategory={product.category.toUpperCase()}
          productTitle={product.name}
          productOrginalPrice={productStyle.results[productStyleId].original_price}
          productSalePrice={productStyle.results[productStyleId].sale_price}
        />
        <div>
          <ProductSlogan>
            {product.slogan}<SocialMedia url={url} slogan={product.slogan}/>
          </ProductSlogan>
          <p>{product.description}</p>
        </div>
      </ProductOverview>
    )
  }
}