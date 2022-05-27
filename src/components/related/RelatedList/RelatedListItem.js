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
  background-color: #EAC9C1;
  // color: white;
  margin: 0.5rem;
  cursor: pointer;
  border: 1.5px solid #32292F;
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
function RelatedListItem({ style, id, info, review, handleRelatedItemClick, addIcon, product }) {
  function handleRelatedClick(e) {
    // this will be the function that will use the
    // handleRelatedItemClick
    e.preventDefault();
    handleRelatedItemClick(id);
  }

  function handleAddToOutfit(e) {
    // This will be when the user clicks add to outfit
    e.preventDefault();
    console.log('Added to Outfit!');
    // I just need to pass product down into RelatedListItem and this should work
    // Add it to local storage
    // Do this in an array
    if (localStorage.outfit === undefined) {
      // There is nothing in the outfit
      // Add item to array and stringify it
      localStorage.setItem('outfit', JSON.stringify([product]));
    } else {
      // convert localStorage.outfit to a array, which will be a JSON.parse
      // #################################################################
      // Need to check and make sure this isn't already in the list.
      // #################################################################
      let currOutfitList = JSON.parse(localStorage.outfit);
      let newOutfitList = JSON.stringify(currOutfitList.push(product));
      localStorage.setItem('outfit', newOutfitList);
    }
  }
  // conditional render here in the event that info isnt
  // assigned correctly yet
  // addIcon is a boolean to determine if this is part of Outfit or Not
  if (addIcon) {
    return (
      <CarouselItem
        style={
          { "textAlign": "center",
            "transform": "translateX(-0.5rem)",
            "whiteSpace": "normal"
          }}
        onClick={handleAddToOutfit}
      >
        Add Current Product to My Outfit
      </CarouselItem>)
  }
  if (style && info && review && id && !addIcon) {
    return (
      <CarouselItem
        onClick={(e) => handleRelatedClick(e)}
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
