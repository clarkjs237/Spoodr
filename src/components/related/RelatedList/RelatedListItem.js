import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRating from '../../overview/overviewComponents/ProductInfoComponents/StarRating';
import ProductPrice from '../../overview/overviewComponents/ProductInfoComponents/ProductPrice';

const CarouselItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 18rem;
  min-width: 13rem;
  max-width: 13rem;
  max-height: 18rem;
  background-color: green;
  color: white;
  margin: 0.5rem;
`;

const InsideCarousel = styled.div`
  display: flex;
  flex-direction: column;
`;

const Photo = styled.img`
  height: 8rem;

  // height: 100%;
  // position: absolute;
`;
function RelatedListItem({ style, id, info, review, handleRelatedItemClick }) {
  // const [price, setPrice] = useState({});


  // function priceCalculator(style) {
  //   // will set the price to be the sale price or regular price
  //   const prices = {
  //     sale_price: style.sale_price,
  //     original_price: style.original_price,
  //   };
  //   setPrice(prices);
  // }

  function handleClick(e) {
    // this will be the function that will use the
    // handleRelatedItemClick

    e.preventDefault();
    handleRelatedItemClick(id);
  }

  // useEffect(() => {
  //   priceCalculator(style);
  // }, [style]); // Needed to add [style] to correctly update the price

  // conditional render here in the event that info isnt
  // assigned correctly yet
  if (style && info && review && id) {
    return (
      <CarouselItem
        onClick={(e) => handleClick(e)}
      >
        <InsideCarousel>
          <Photo src={style.photos['0'].thumbnail_url}/>
          {info.product_category}<br/>
          {info.product_name}<br/>
          <div>
            <StarRating averageStarRating={review}/>
          </div>
          <ProductPrice productOrginalPrice={style.original_price} productSalePrice={style.sale_price}/>
        </InsideCarousel>
      </CarouselItem>
    );
  }
  return <div>emtpy</div>;

}

export default RelatedListItem;
