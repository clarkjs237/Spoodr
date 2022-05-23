export default function ProductPrice({ productOrginalPrice, productSalePrice }) {
  if(productSalePrice) {
    return (
      <div>
        {`$${productSalePrice}`}
        {`$${productOrginalPrice}`}
      </div>
    )
  } else {
    return (
      <div>{`$${productOrginalPrice}`}</div>
    )
  }
};