import { useState } from 'react';
import ProductInfo from './overviewComponents/ProductInfo';

export default function Overview({ product, productStyle, totalReviews, averageRating, averageRoundRating }) {
  const [productStyleId, setProductStyleId] = useState(0);
  if(product.id && productStyle.product_id) {
    return (
      <div>
        <ProductInfo
          totalReviews={totalReviews}
          averageRating={averageRating}
          averageRoundRating={averageRoundRating}
          productCategory={product.category.toUpperCase()}
          productTitle={product.name}
          productOrginalPrice={productStyle.results[productStyleId].original_price}
          productSalePrice={productStyle.results[productStyleId].sale_price}
        />
        <div>
          <h4>{product.slogan}</h4>
          <p>{product.description}</p>
        </div>
      </div>
    )
  }
}