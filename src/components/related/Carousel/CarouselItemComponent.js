import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
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
  margin: 0.5rem;
  cursor: pointer;
  border: 1.5px solid #32292F;
  box-shadow: 0.1rem 0.1rem 0.5rem black;


  // position: absolute;

  // For whatever reason, I need this line for the outfit list formatting
  transform: ${(props) => (props.outfit ? 'translateY(-9.4rem)' : 'translateY(0rem)')}
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

const ActionButton = styled.div`
  font-size: 1.6rem;
  left: 10.7rem;
  top: 0.1rem;
  position: absolute;
  &:hover {
    color: #90D7FF;
  }
  &:before {
    ${(props) => {
    if (props.outfit) {
      return css`
        content: "\\2716";
      `;
    }
    return css`
      content: "\\2605";
    `;
  }}
  }
  cursor: pointer;
`;

const BottomWrapper = styled.div`
  border: 2px red solid;
`;

export default function CarouselItemComponent({
  defStyle, // style object handed to the carousel component
  id,       // product id (in string)
  info,     // general product info (object with at least category_name and product_name)
  review,   // an average rating (number) - exclude review from this bc it could be zero
  outfit,   // boolean, true if this belongs to the outfit list, false if it's related item
  index,      // specific index in the list, in string I believe
  removeItemFromOutfit, // this is for Outfit only. Will return specific index
  comparisonModal, // this is for RelatedList only. Will return a specific index
  handleItemClick, // this is when a card is clicked on. should reset state to this product_id/style
}) {
  function individualCardClicked(e) {
    e.preventDefault();
    handleItemClick(id);
  }

  function actionButtonClick(e) {
    e.stopPropagation(); // need this in order to not activate things below
    // If this action is coming from the outfit, do removeItemFromOutfit
    // Else, do comparisonModal for relatedList
    if (outfit) {
      removeItemFromOutfit(index);
    } else {
      comparisonModal(index);
    }
  }

  if (defStyle && info && review && id && (review !== undefined)) {
    return (
      <CarouselItem outfit={outfit} onClick={individualCardClicked}>
        <InsideCarousel>
          <Photo src={defStyle.photos['0'].thumbnail_url}/>
          <BottomWrapper>
            {info.category}<br />
            {info.name}<br />
            <div>
              <StarRating averageStarRating={review} />
            </div>
            <ProductPrice
              productOrginalPrice={defStyle.original_price}
              productSalePrice={defStyle.sale_price}
            />
          </BottomWrapper>

          <ActionButton outfit={outfit} onClick={actionButtonClick}/>
        </InsideCarousel>
      </CarouselItem>
    );
  }
  return <div>emtpy</div>;
}
