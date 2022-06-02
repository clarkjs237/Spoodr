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
  margin: 0.5rem;
  cursor: pointer;
  position: relative;
  // For whatever reason, I need this line for the outfit list formatting
  transform: ${(props) => (props.list === 'outfit' ? 'translateY(-9.3rem)' : 'translateY(0rem)')};

  /* Hovers correctly and offsets the margin so the rest of the list isn't shifted */
  &:hover {
    outline: 0.1rem solid #32292F;
  }

  top: ${(props) => (props.list === 'outfit' ? '-0.6rem' : '0rem')};
`;

const InsideCarousel = styled.div`
  display: flex;
  flex-direction: column;
`;

const Photo = styled.img`
  max-width: 95%;
  max-height: 100%;
  flex-shrink: 0;

  ${(props) => {
    if (!props.src) {
      // this is null so return a null image or something
      return css`
        content: url("https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg");
      `;
    }
  }};
`;

const PhotoWrapper = styled.div`
  position: absolute;
  bottom: 5.95rem;
  left: 0rem;
  width: 13rem;
  height: 10.05rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ProductName = styled.span`
  font-size: 1.13rem;
`;

const ActionButton = styled.span`
  font-size: 1.6rem;
  left: 10.7rem;
  top: 0rem;
  position: absolute;
  cursor: pointer;
  &:hover {
    color: #90D7FF;
  }
  &:before {
    ${(props) => {
    if (props.list === 'outfit') {
      return css`
        content: "\\2715";
        font-size: 1.4rem;
      `;
    }
    return css`
      content: "\\2606";
    `;
  }}
  }
  visibility: ${(props) => (props.hover ? 'visible' : 'hidden')};
`;

const BottomWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
  margin-bottom: -0.01rem;
  left: 0rem;
  width:13rem;
  height: 5.75rem;
  background-color: ${(props) => (props.hover ? '#E8F2F4' : 'white')};
`;

export default function CarouselItemComponent({
  defStyle, // style object handed to the carousel component
  id,       // product id (in string)
  info,     // general product info (object with at least category_name and product_name)
  review,   // an average rating (number) - exclude review from this bc it could be zero
  list,   // boolean, true if this belongs to the outfit list, false if it's related item
  index,      // specific index in the list, in string I believe
  removeItemFromOutfit, // this is for Outfit only. Will return specific index
  comparisonModal, // this is for RelatedList only. Will return a specific index
  handleItemClick, // this is when a card is clicked on. should reset state to this product_id/style
}) {
  const [hover, setHover] = useState(false);
  function individualCardClicked(e) {
    e.preventDefault();
    handleItemClick(id);
  }

  function actionButtonClick(e) {
    e.stopPropagation(); // need this in order to not activate things below
    // If this action is coming from the outfit, do removeItemFromOutfit
    // Else, do comparisonModal for relatedList
    if (list === 'outfit') {
      removeItemFromOutfit(index);
    } else {
      comparisonModal(index);
    }
  }

  if (defStyle && info && review && id && list && (review !== undefined)) {
    return (
      <CarouselItem
        list={list}
        onClick={individualCardClicked}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <InsideCarousel>
          <PhotoWrapper hover={hover}>
            <Photo src={defStyle.photos['0'].thumbnail_url}/>
          </PhotoWrapper>
          <BottomWrapper hover={hover}>
            <i>{info.category}</i><br />
            {/* {info.name}<br /> */}
            <ProductName>{info.name}</ProductName>
            <div>
              <StarRating averageStarRating={review} />
            </div>
            <ProductPrice
              style={{"fontSize": "1.5rem"}}
              productOrginalPrice={defStyle.original_price}
              productSalePrice={defStyle.sale_price}
            />
          </BottomWrapper>
          <ActionButton hover={hover} list={list} onClick={actionButtonClick}/>
        </InsideCarousel>
      </CarouselItem>
    );
  }
  return <div>emtpy</div>;
}
