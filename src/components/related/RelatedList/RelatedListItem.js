import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CarouselItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 14rem;
  min-width: 12rem;
  max-width: 14rem;
  max-height: 12rem;
  background-color: green;
  color: white;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border: 2px red solid;
`;

const Photo = styled.img`
  height: 8rem;
`;
function RelatedListItem({ style, id, info }) {
  const [price, setPrice] = useState({});


  function priceCalculator(style) {
    // will set the price to be the sale price or regular price
    const prices = {
      sale_price: style.sale_price,
      original_price: style.original_price,
    };
    setPrice(prices);
  }

  useEffect(() => {
    priceCalculator(style);
  }, [style]); // Needed to add [style] to correctly update the price

  // conditional render here in the event that info isnt
  // assigned correctly yet
  if (style && info && id && price.original_price) {
    if (price.sale_price) {
      return (
        <CarouselItem>
          <div className="inside-carousel">
            <Photo src={style.photos['0'].thumbnail_url}/>
            {info.product_category}<br/>
            {info.product_name}<br/>
            ${price.sale_price}<s>${price.original_price}</s><br/>
          </div>
        </CarouselItem>
      );
    }
    return (
      <CarouselItem>
        <div className="inside-carousel">
          <Photo src={style.photos['0'].thumbnail_url}/>
          {info.product_category}<br/>
          {info.product_name}<br/>
          ${price.original_price}<br/>
        </div>
      </CarouselItem>
    );
  }
  return <div>emtpy</div>

}

export default RelatedListItem;
