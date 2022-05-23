import ProductPrice from './ProductInfoComponents/ProductPrice';

export default function ProductInfo({ productCategory, productTitle, productOrginalPrice, productSalePrice }) {
  return (
    <div>
      <h4>Star Rating Todo</h4>
      <div>{productCategory.toUpperCase()}</div>
      <h2>{productTitle}</h2>
      <ProductPrice productOrginalPrice={productOrginalPrice}productSalePrice={productSalePrice} />
    </div>
  )
}