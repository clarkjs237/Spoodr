import styled from 'styled-components';
import ProductPrice from './ProductInfoComponents/ProductPrice';
import StarRatingReview from './ProductInfoComponents/StarRatingReview';

const ProductTitle = styled.h2`
  margin: 0;
  font-size: 2em;
`;
const ProductCategory = styled.div`
  margin-top: 1em;
  font-size: 1em;
`;

export default function ProductInfo({
  productCategory, productTitle, productOrginalPrice, productSalePrice, totalReviews, averageRating, averageStarRating,
}) {
  return (
    <div>
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
    </div>
  );
}
