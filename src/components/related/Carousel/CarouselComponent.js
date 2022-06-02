import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import CarouselItemComponent from './CarouselItemComponent';

const Inner = styled.div`
  white-space: nowrap;
  transition: transform 0.3s ease-out;

  ${(props) => css`
      transform: translateX(-${props.activeIndex * 14 + 0.5}rem);
  `};

  position: absolute;
`;

const CarouselWindow = styled.div`
  overflow: hidden;
  max-width: 48.5rem;
  min-width: 48.5rem;
  min-height: 19rem;
  max-height: 19rem;


  // Attempting to overlay button
  position: relative;

  // Changes
  // border: 1px green solid;
`;

const Blur = styled.div`
  position: absolute;
  width: 4.5rem;
  height: 19.5rem;

  ${(props) => {
    if (props.left && props.activeIndex > 0) {
      return css`
        left: 0rem;
        background-image: linear-gradient(-90deg, transparent, white 80%);
        top: -0.5rem;
      `;
    }
    if (!props.left) {
      return css`
        left: 44.5rem;
        background-image: linear-gradient(90deg, transparent, white 80%);
        top: -0.15rem;
    `;
    }
    return css`
      visibility: hidden;
    `;
  }};
`;

const Chevron = styled.span`
  font-size: 4rem;
  position: absolute;
  top: 7rem;
  left: ${(props) => (props.left ? '0.5rem' : '46.5rem')};
  visibility ${(props) => {
    if (props.left && props.activeIndex === 0) {
      return 'hidden';
    }
    if (!props.left && props.activeIndex === props.length) {
      return 'hidden';
    }
    return 'visible';
  }};
  &:hover {
    color: #90D7FF;
  }
  &:before {
    ${(props) => {
    if (props.left) {
      return css`
        content: "\\27E8";
      `;
    }
    return css`
      content: "\\27E9";
    `;
  }}
  }
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  position: relative;

  // Attempted changes
  // position: absolute;
  // border: 1px solid blue;
`;

export const AddOutfitCard = styled.div`
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
  // border: 1.5px solid #32292F;
  transform: translateY(-0.4rem);
  position: relative;

  background-image: linear-gradient(to bottom, white, transparent);
  &:hover {
    margin-top: 0.3rem;
    margin-right: 0.3rem;
    border: 0.1rem solid #32292F;
    transform: translate(-0.1rem, -0.3rem);
  }
`;

const AddOutfitButton = styled.span`
  font-size: 6rem;
  position: absolute;
  top: 4rem;
  left: 4.65rem;
  &:before {
    content: "\\002B";
  }
`;

const AddButtonContentWrapper = styled.div`
  position: absolute;
  top: 0rem;
  left: 0rem;
`;

export const AddButtonText = styled.span`
  font-size: 1.3rem;
  font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  position: absolute;
  top: 11rem;
  left: 1.8rem;
`;

// This will be the modularized Carousel for both the RelatedList and OutfitList
// -----------------------------------------------------------------------
// RelatedList needs:
// RelatedStyles (product_id key, default styles object value) 1:1 OBJECT
// RelatedInfos (product_id key, general product object) 1:1 OBJECT
// RelatedReviews (product_id key, average review Number) 1:1 OBJECT
// handleRelatedItemClick - the event that a product is clicked on and needs to change the global state in App.js
// -----------------------------------------------------------------------
// OutfitList needs:
// product (this is the current product object) OBJECT
// productStyle (this is the object with the list of styles for this current product) OBJECT
// curStyleId (the currently selected style id, so I know which one to add to outfit) NUMBER
// averageStarRating (avg star rating for the current product, so I can add to outfit) NUMBER
export default function CarouselComponent({
  // THESE ARE BOOLEANS TO DETERMINE WHICH LIST WE'RE BUILDING FOR
  RelatedListBool,
  OutfitListBool,
  // Below is for RelatedList
  relStyles,
  relInfos,
  relReviews,
  comparisonModal, // this is the function that will handle displaying a modal popping up
  // Below is for OutfitList
  outfitList, // this will be just one array, so I don't think I need any of the things above
  handleAddToOutfit, // this is the function for adding to the OutfitList
  removeItemFromOutfit, // this will remove a specific item from My Outfit
  // Keep track of the activeIndex, needs to be stored in state
  relatedActiveIndex,
  setRelatedActiveIndex,
  outfitActiveIndex,
  setOutfitActiveIndex,
  // Function for both
  handleItemClick
}) {
  // NEED TO STORE ACTIVE INDEX IN PARENT COMPONENT
  // -----------------------------------------------------------------------
  // RELATED PRODUCTS LIST
  if (RelatedListBool && !OutfitListBool) {
    // We are building for the RelatedList
    // Length determined by the number of keys in the styles object
    const length = Object.keys(relStyles).length <= 3 ? 0 : Object.keys(relStyles).length - 3;

    const nextCard = () => {
      // if the activeIndex is the last in the array, stay at end
      // else, increase by 1 (move right)
      setRelatedActiveIndex(relatedActiveIndex === length ? relatedActiveIndex : relatedActiveIndex + 1);
    };
    const prevCard = () => {
      // if the index is 0, stay at 0
      // else, decrease the index by 1
      setRelatedActiveIndex(relatedActiveIndex === 0 ? 0 : relatedActiveIndex - 1);
    };

    return (
      <Container>
        <CarouselWindow>
          <Inner activeIndex={relatedActiveIndex}>
            {Object.values(relStyles).map((style, index) => (
              <CarouselItemComponent
                defStyle={style}
                id={Object.keys(relStyles)[index]}
                info={Object.values(relInfos)[index]}
                review={Object.values(relReviews)[index]}
                list={'related'} // specify which list this is for
                index={index}
                // add individual card functionality here
                // this is where the modal functionality will go
                comparisonModal={comparisonModal}
                handleItemClick={handleItemClick}
              />
            ))}
          </Inner>
        </CarouselWindow>
        <Blur
          left={true}
          activeIndex={relatedActiveIndex}
          length={length}
        />
        <Blur
          left={false}
          activeIndex={relatedActiveIndex}
          length={length}
        />
        <Chevron
          left={true}
          activeIndex={relatedActiveIndex}
          length={length}
          onClick={prevCard}
        />
        <Chevron
          left={false}
          activeIndex={relatedActiveIndex}
          length={length}
          onClick={nextCard}
        />
      </Container>
    );
  }

  // -----------------------------------------------------------------------
  // MY OUTFIT LIST
  if (!RelatedListBool && OutfitListBool) {
    // We are building for the OutfitList
    // Length here is determined by the number of children Outfit has - 1 for the add button
    const length = outfitList.length < 3 ? 0 : outfitList.length - 2;

    const nextCard = () => {
      // if the activeIndex is the last in the array, stay at end
      // else, increase by 1 (move right)
      setOutfitActiveIndex(outfitActiveIndex === length ? outfitActiveIndex : outfitActiveIndex + 1);
    };
    const prevCard = () => {
      // if the index is 0, stay at 0
      // else, decrease the index by 1
      setOutfitActiveIndex(outfitActiveIndex === 0 ? 0 : outfitActiveIndex - 1);
    };

    return (
      <Container>
        <CarouselWindow>
          <Inner activeIndex={outfitActiveIndex}>
            <AddOutfitCard onClick={handleAddToOutfit}>
              <AddButtonContentWrapper>
                <AddOutfitButton />
                <AddButtonText>Add to My Outfit</AddButtonText>
              </AddButtonContentWrapper>
            </AddOutfitCard>
            {outfitList.map((item, index) => (
              <CarouselItemComponent
                defStyle={item.style}
                id={item.id}
                info={item.info}
                review={item.review}
                list={'outfit'} // specify which list this is for
                index={index}
                // add individual card functionality here
                removeItemFromOutfit={removeItemFromOutfit}
                handleItemClick={handleItemClick}
              />
            ))}
          </Inner>
        </CarouselWindow>
        <Blur
          left={true}
          activeIndex={outfitActiveIndex}
          length={length}
        />
        <Blur
          left={false}
          activeIndex={outfitActiveIndex}
          length={length}
        />
        <Chevron
          left={true}
          activeIndex={outfitActiveIndex}
          length={length}
          onClick={prevCard}
        />
        <Chevron
          left={false}
          activeIndex={outfitActiveIndex}
          length={length}
          onClick={nextCard}
        />
      </Container>
    );
  }
}
