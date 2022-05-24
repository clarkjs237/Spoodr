import ProductPrice from './ProductInfoComponents/ProductPrice';
import StarRating from './ProductInfoComponents/S'

export default function ProductInfo({ productCategory, productTitle, productOrginalPrice, productSalePrice, totalReviews, averageRating, averageRoundRating }) {
  return (
    <div>
      <StarRating
        totalReviews={totalReviews}
        averageRating={averageRating}
        averageRoundRating={averageRoundRating}
      />
      <div>{productCategory.toUpperCase()}</div>
      <h2>{productTitle}</h2>
      <ProductPrice
        productOrginalPrice={productOrginalPrice}
        productSalePrice={productSalePrice}
      />
    </div>
  )
}