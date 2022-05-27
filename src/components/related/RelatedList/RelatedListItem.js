import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRating from '../../overview/overviewComponents/ProductInfoComponents/StarRating';
import ProductPrice from '../../overview/overviewComponents/ProductInfoComponents/ProductPrice';
import ActionButton from '../ActionButton/ActionButton';

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
  transform: ${(props) => props.outfit ? 'translateY(-9.25rem)' : 'translateY(0rem)'}
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
function RelatedListItem({
  ind,
  defStyle,
  id,
  info,
  review,
  handleRelatedItemClick,
  actionButton,
  handleAddToOutfit,
  resetOutfit,
  outfit,
  product
}) {
  function handleRelatedClick(e) {
    // this will be the function that will use the
    // handleRelatedItemClick
    e.preventDefault();
    handleRelatedItemClick(id);
  }

  // function testerTest(e) {
  //   console.log(e.target.name);
  //   actionButton(e, e.target.name);
  // }

  function testerBoy(e) {
    console.log('In tester boy');
    console.log(e.target.name);
  }

  if (defStyle && info && review && id) {
    return (
      <CarouselItem
        // onClick={(e) => handleRelatedItemClick(e)}
        onClick={handleRelatedClick}
        outfit={outfit}
        id={id}
      >
        <InsideCarousel>
          <Photo src={defStyle.photos['0'].thumbnail_url}
            onClick={(e) => testerBoy(e)}
            name={'HELLO'}
          />
          {info.product_category}<br/>
          {info.product_name}<br/>
          <div>
            <StarRating averageStarRating={review}/>
          </div>
          <ProductPrice productOrginalPrice={defStyle.original_price} productSalePrice={defStyle.sale_price}/>
          <ActionButton
            outfit={outfit}
            name={'SADFFSDASADF'}
            onClick={testerBoy}
            // onClick={actionButton}
            // onClick={(e) => testerTest(e)}
          />
        </InsideCarousel>
      </CarouselItem>
    );
  }
  return <div>emtpy</div>;
}

export default RelatedListItem;
