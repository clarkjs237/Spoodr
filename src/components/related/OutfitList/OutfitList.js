// This will behave very similarly to RelatedList
// This will be a functional stateless component that just maps the ids that are passed into
// it from Related.js
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import OutfitListItem from './OutfitListItem';
import RelatedList, { Container, Carousel, Inner, Blur, Chevron } from '../RelatedList/RelatedList';
import RelatedListItem from '../RelatedList/RelatedListItem';

const AddOutfitCard = styled.div`
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
  transform: translateY(-0.3rem);
  position: relative;
  background-image: linear-gradient(to bottom, white, transparent)
`;

const AddOutfitButton = styled.span`
  font-size: 6rem;
  position: absolute;
  top: 4rem;
  left: 4.65rem;
`;

const AddButtonText = styled.span`
  font-size: 1.3rem;
  font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  position: absolute;
  top: 11rem;
  left: 1.8rem;
`;

function OutfitList({
  product,
  productStyle,
  curStyleId,
  averageStarRating
}) {
  // I want the category, name, and id from this
  // id = string version of id (currently in a number)
  // I want {info: {category_name: '', product_name: ''}}
  // review = Number (all good now with averageStarRating, except need to convert to num from string)
  // style= the productStyle.results[curStyleId]
  // I think this will work

  // I want to create an array that stores the state of what localStorage.outfit is
  const [outfit, setOutfit] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // Length here is determined by the number of children Outfit has - 1 for the add button
  const length = outfit.length < 3 ? 0 : outfit.length - 2;
  // This is when the Add to Outfit button is clicked
  function handleAddToOutfit() {
    // This will be when the user clicks add to outfit
    // I just need to pass product down into RelatedListItem and this should work
    // Add it to local storage
    // I ALSO WANT TO ADD THIS TO THE STATE OUTFIT
    // Do this in an array
    if (!localStorage.outfit) {
      console.log('First entry to outfit');
      let res = {
        id: productStyle.product_id,
        info: {category_name: product.category, product_name: product.name},
        review: Number(averageStarRating),
        style: productStyle.results[curStyleId]
      };
      localStorage.setItem('outfit', JSON.stringify([res]));
      setOutfit((oldArray) => [...oldArray, res]);
    } else {
      console.log('Next entry to outfit');

      let currOutfitList = JSON.parse(localStorage.outfit);
      // This is where I want to see if the item is already in the outfit list
      // currOutfitList is an array of objects
      let bool = true;
      for (var i = 0; i < currOutfitList.length; i++) {
        let outfit = currOutfitList[i];
        // If the product ids are the same AND the style ids are the same,
        // this is the same product and cannot be added to outfit list
        if (outfit.id === productStyle.product_id &&
          outfit.style.style_id === productStyle.results[curStyleId].style_id) {
          // this is the same product and I will not add it to the outfit list
          console.log('Same product and style cannot be added to outfit');
          bool = false;
          break;
        }
      }
      // If the product/style wasn't found in the list, add it to the outfit list
      if (bool) {
        // If the product isn't already in the outfit list, add it to it
        let res = {
          id: productStyle.product_id,
          info: {category_name: product.category, product_name: product.name},
          review: Number(averageStarRating),
          style: productStyle.results[curStyleId]
        };
        currOutfitList.push(res);
        let newOutfitList = JSON.stringify(currOutfitList);
        localStorage.setItem('outfit', newOutfitList);
        setOutfit((oldArray) => [...oldArray, res]);
      }
    }
  }

  function generateInitialOutfitList() {
    // I want to set the initial state of outfit using localStorage
    if (localStorage.outfit) {
      // if there is presently entries into outfit,
      // we want to set the state of outfit to this array.
      // otherwise do nothing
      const arr = JSON.parse(localStorage.outfit);
      setOutfit(arr);
    }
  }

  const nextCard = () => {
    // if the activeIndex is the last in the array, stay at end
    // else, increase by 1 (move right)
    // console.log('right');
    setActiveIndex(activeIndex === length ? activeIndex : activeIndex + 1);
    // console.log(activeIndex);
  };

  const prevCard = () => {
    // if the index is 0, stay at 0
    // else, decrease the index by 1
    // console.log('left');
    setActiveIndex(activeIndex === 0 ? 0 : activeIndex - 1);
  };

  function handleOutfitItemClick(e) {
    // this is when an outfit item is clicked
    console.log('Outfit Item Clicked');
    console.log(e.target.id);
  }

  function resetOutfit() {
    // This is when we want to clear localstorage
    let res = confirm('Are you sure you want to delete My Outfit?');
    if (res) {
      console.log('outfit deleted');
      localStorage.removeItem('outfit');
      setOutfit([]);
    }
  }

  useEffect(() => {
    generateInitialOutfitList();
  }, []);

  return (
    <Container>
      <Carousel>
        <Inner activeIndex={activeIndex}>
          <AddOutfitCard>
            {/* Add Current Outfit to My Outfit<br /> */}
            <AddOutfitButton onClick={handleAddToOutfit}>&#43;</AddOutfitButton>
            <AddButtonText>Add to My Outfit</AddButtonText>
            {/* <button onClick={resetOutfit}>Delete Outfit</button> */}
          </AddOutfitCard>
          {outfit.map((item, index) => (
            <RelatedListItem
              outfit={true}
              key={index}
              defStyle={item.style}
              info={item.info}
              review={item.review}
              id={item.id}
              handleItemClick={handleOutfitItemClick}
            />
          ))}
        </Inner>
        <Blur
          left={true}
          activeIndex={activeIndex}
          length={length}
        />
        <Blur
          left={false}
          activeIndex={activeIndex}
          length={length}
        />
        <Chevron
          left={true}
          activeIndex={activeIndex}
          length={length}
          onClick={prevCard}
        >&#10216;</Chevron>
        <Chevron
          left={false}
          activeIndex={activeIndex}
          length={length}
          onClick={nextCard}
        >&#10217;</Chevron>
      </Carousel>
    </Container>
  );
}

export default OutfitList;
